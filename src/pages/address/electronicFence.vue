<template>
	<view class="">
		<view class="map-content">
			<WhiteHeader :showBack="true" :isSecondaryPage="true">
				<text slot="title" style="font-weight: bold;">{{title}}</text>
			</WhiteHeader>
			<el-amap ref="amapref" vid="amaps" @init="initMap" @touchend="touchend" @click="clickMap" :center="center"
				:zoom="15" viewMode="3D" :dragEnable="mapDragEnable" @touchmove="touchmove" @touchstart="touchstart">

				<el-amap-marker :position="marker.position" :icon="marker.icon" :offset="[-11, -30]" />

				<el-amap-polygon v-if="form.geomType === 3 && polygon.path.length > 0" :path="polygon.path"
					:visible="polygon.visible" @adjust="adjust" @addnode="addnode" :editable="polygon.edit"
					:draggable="polygon.draggable" @init="initPolygon"></el-amap-polygon>

				<el-amap-rectangle v-if="form.geomType === 2 &&  rectanglelnglat.length > 1" @init="initRectangle"
					:bounds="rectanglelnglat" :editable="rectangle.edit" :draggable="rectangle.draggable"
					@move="moveRectangle">
				</el-amap-rectangle>

				<el-amap-circle v-if="form.geomType === 1 && circleCenter !== null" :center="circleCenter"
					:radius="circleRadius" :editable="circleEdit" @init="initCircle">
				</el-amap-circle>

			</el-amap>
			<view class="input-card">
				<view v-if='isDraw&&isEdit' class="flex">
					<button type="primary" class="drawButton" @click="drawPolygon">绘制多边形 </button>
					<button type="primary" class="drawButton" @click="drawRectangle">绘制矩形 </button>
					<button type="primary" class="drawButton" @click="drawCircle">绘制圆形</button>
				</view>
				<view v-else>
					<view v-if='isEdit' class="flex">
						<button type="primary" class="drawButton" @click="close">确定</button>
						<button type="primary" class="drawButton" @click="clearFence">重绘</button>
					</view>
					<view class="flex flex--direction" v-else>
						<button type="primary" class="drawButton" @click="reDraw">绘制围栏 </button>
						<button type="primary" class="drawButton" @click="viewFence">信息查看</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import store from '@/store/index.js';
	import {
		mapState
	} from "vuex";

	export default {
		components: {
			WhiteHeader
		},
		plugin: {
			pName: 'Geolocation',
			events: {}
		},
		onShow() {},
		onLoad(options) {
			const _this = this
			if (options.data) {
				this.form = JSON.parse(options.data)
				this.title = '编辑电子围栏'
			}
			if (this.form.geomText === null) {
				return
			}
			let temp = this.form.geomText.split(',')
			if (this.form.geomType === 3) {
				//多边形
				for (var i = 0; i < temp.length; i = i + 2) {
					this.polygon.path.push([temp[i], temp[i + 1]])
				}
				this.reDraw()
				this.drawPolygon()
				//不设置延时 编辑的点点出不来. hmp
				this.delayEdit(_this.polygon.edit)
			} else if (this.form.geomType === 2) {
				//矩形
				for (var i = 0; i < temp.length; i = i + 2) {
					this.rectanglelnglat.push([temp[i], temp[i + 1]])
				}
				this.reDraw()
				this.drawRectangle()
				this.rectangle.edit = true
			} else if (this.form.geomType === 1) {
				//圆形
				this.circleCenter = [this.form.centerLng, this.form.centerLat]
				this.circleRadius = temp[2]
				this.reDraw()
				this.drawCircle()
				//不设置延时 编辑的点点出不来. hmp
				this.delayEdit(_this.circleEdit)
			}

		},
		computed: {
			...mapState({
				statusBarHeight: (state) => state.header.statusBarHeight,
				isAndroid: state => state.header.isAndroid,
				isiOS: state => state.header.isiOS
			}),
		},
		data() {
			const _this = this
			return {
				form: {
					geomType: null,
					geomText: null,
					centerLat: null,
					centerLng: null,
				},
				title: '电子围栏',
				map: null, // 地图实例
				mapDragEnable: true, //地图是否可通过鼠标拖拽平移
				circleInstance: null, // 圆形实例
				circle: null, // 圆形实例
				circleCenter: null, // 圆心
				circleEdit: false,
				circleRadius: 200, // 半径

				rectangleInstance: null, // 矩形实例
				rectanglelnglat: [], // 矩形点
				rectangle: {
					draggable: false,
					edit: false,
					disabled: true,
					editStatus: "编辑",
				},
				_rectanglelnglat: [], // 矩形第二个点
				polygonEdit: true,
				polygonInstance: null, // 多边形实例
				polygonPath: [], // 多边形路径
				polygon: {
					draggable: false,
					visible: true,
					edit: true,
					path: [],
					polygonMarker: []
				},
				drawStatus: false, //是否正在绘制围栏
				isDraw: true, // 画图 
				isEdit: false, // 编辑
				addressName: '', // 地址
				zoom: 14,
				center: [116.397497, 39.906888],
				plugins: [{
					pName: 'ToolBar',
					position: 'RT',
					events: {}
				}],
				marker: {
					icon: '/static/icon_location.png',
					position: [116.397497, 39.906888]
				},

			}
		},

		mounted() {
			this.fetchFenceInfo()
		},
		methods: {
			delayEdit(edit) {
				setTimeout(function() {
					edit = false
				}, 200)
				setTimeout(function() {
					edit = true
				}, 800)
			},
			makeToast(title) {
				uni.showToast({
					title: title,
					icon: 'none',
					duration: 2000
				})
			},
			clickMap(e) {
				const _this = this
				_this.typeClick = true; // 点击才赋值
				if (!_this.drawStatus) {
					_this.marker.position = [e.lnglat.getLng(), e.lnglat.getLat()]
				} else if (_this.form.geomType == 3) {
					//添加多边形围栏时鼠标左击事件
					_this.polygon.path.push([e.lnglat.getLng(), e.lnglat.getLat()])
					setTimeout(function() {
						_this.polygonInstance.setPath(_this.polygon.path)
						if (_this.polygon.path.length < 2) {
							for (var i = 0; i < _this.polygon.path.length; i++) {
								let temp = _this.polygon.path[i]
								let marker = new AMap.Marker({
									icon: "/static/ic_fence_polygon_poing.png",
									position: [temp[0], temp[1]],
									offset: [-15, -15],
								})
								marker.setMap(_this.map)
								_this.polygon.polygonMarker.push(marker)
							}
						} else {
							for (var i = 0; i < _this.polygon.polygonMarker.length; i++) {
								//移除多边形第一个和第二个点的marker
								_this.polygon.polygonMarker[i].setMap(null)
							}
						}
						_this.polygon.edit = false
						//延时
						setTimeout(function() {
							_this.polygon.edit = true
							_this.polygon.visible = true
						}, 100);
					}, 200)
				} else if (_this.form.geomType == 2) {
					//矩形
					_this.rectanglelnglat[0] = [e.lnglat.getLng(), e.lnglat.getLat()]
				} else if (_this.form.geomType == 1 && _this.circleCenter === null) {
					//圆形
					_this.circleCenter = [e.lnglat.getLng(), e.lnglat.getLat()]
					_this.circleEdit = true
				}
			},
			initMap(e) {
				this.map = e
			},
			initPolygon(e) {
				this.polygonInstance = e
				this.polygonInstance.editor.editable = true
			},
			initRectangle(e) {
				this.rectangleInstance = e
			},
			initCircle(e) {
				this.circleInstance = e
			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 画多边形
			drawPolygon() {
				let _this = this
				_this.form.geomType = 3
				_this.isDraw = false
				_this.drawStatus = true
				_this.polygon.edit = false
				setTimeout(function() {
					_this.polygon.edit = true
				}, 100)
				_this.mapDragEnable = true
			},
			// 画圆形
			drawCircle() {
				let _this = this
				_this.form.geomType = 1
				_this.drawStatus = true
				_this.isDraw = false
				_this.mapDragEnable = true
			},
			// 画矩形
			drawRectangle() {
				let _this = this
				_this.form.geomType = 2
				_this.drawStatus = true
				_this.isDraw = false
				_this.mapDragEnable = false
			},
			// 结束绘制
			close() {
				if (this.form.geomType === 1) {
					//圆形 
					if (!this.validateCircle()) {
						return
					}
					const {
						lng,
						lat
					} = this.circleInstance.getCenter()
					this.form.geomText = [lng, lat, Math.floor(this.circleRadius)].join()
					this.form.centerLng = lng
					this.form.centerLat = lat
				} else if (this.form.geomType === 2) {
					//矩形
					if (!this.validateRectangle()) {
						return
					}
					this.form.geomText = [...this.rectanglelnglat[0], ...this.rectanglelnglat[1]].join()
					const {
						lng,
						lat
					} = this.rectangleInstance.getBounds().getCenter()
					this.form.centerLng = lng
					this.form.centerLat = lat
				} else if (this.form.geomType === 3) {
					//多边形
					if (!this.validatePolygon()) {
						return
					}
					let temp = this.polygonInstance.getPath()
					this.form.geomText = temp.join()
					const {
						lng,
						lat
					} = this.polygonInstance.getBounds().getCenter()
					this.form.centerLng = lng
					this.form.centerLat = lat
				}
				uni.showModal({
					title: '确认',
					content: '围栏已操作完，确认提交',
					success: function(res) {
						if (res.confirm) {
							this.onFenceFinishSucceed()
						}
					}.bind(this)
				});
			},
			//判断圆形围栏
			validateCircle() {
				if (this.circleInstance !== null && this.circleInstance.getCenter() !== null) {
					if (this.circleInstance.getRadius() < 200) {
						this.makeToast("圆形围栏半径最小值为200")
						return false
					}
					return true
				} else {
					this.makeToast("请完善圆形围栏后提交")
					return false
				}
			},
			//判断矩形围栏
			validateRectangle() {
				let temp = this.rectangleInstance
				if (temp !== null && this.rectanglelnglat !== null && this.rectanglelnglat.length === 2) {
					return true
				} else {
					this.makeToast("请完善矩形围栏后提交")
					return false
				}
			},
			//判断多边形围栏
			validatePolygon() {
				let temp = this.polygonInstance
				if (temp !== null && temp.getPath() !== null && temp.getPath().length > 2) {
					return true
				} else {
					this.makeToast("请完善多变形围栏后提交")
					return false
				}
			},
			//重绘
			clearFence() {
				const _this = this
				if (_this.form.geomType === 3) {
					//多边形
					_this.polygon.path = []
					_this.polygon.edit = false
					_this.polygon.visible = false
					_this.polygonInstance.setPath(_this.polygon.path)
				} else if (_this.form.geomType === 2) {
					//矩形
					_this.rectanglelnglat = []
					_this.rectangle.disabled = false
					_this.rectangle.edit = false
					_this.rectangleInstance.setMap(null)
					_this.initRectangle()
				} else if (_this.form.geomType === 1) {
					//圆形
					_this.circleEdit = false
					_this.circleRadius = 200
					_this.circleCenter = null
					_this.circleInstance.setMap(null)
					_this.initCircle()
				}
			},
			// 重新绘制
			reDraw() {
				this.isDraw = true
				this.isEdit = true
				this.mapDragEnable = true
			},
			onFenceFinishSucceed() {
				let _this = this
				console.log(JSON.stringify(_this.form))
				if (this.isAndroid) {
					if (window.Android !== null && typeof(window.Android) !== 'undefined') {
						window.Android.onFenceFinishSucceed(JSON.stringify(_this.form));
					}
				} else if (this.isiOS) {
					this.$WebViewJavascriptBridge.callHandler('onFenceFinishSucceed', JSON.stringify(_this.form));
				}
			},
			viewFence() {
				if (this.isAndroid) {
					if (window.Android !== null && typeof(window.Android) !== 'undefined') {
						window.Android.viewFence();
					}
				} else if (this.isiOS) {
					this.$WebViewJavascriptBridge.callHandler('viewFence');
				}
			},
			// 结束
			circleEvent(e) {
				const {
					lng,
					lat
				} = e.lnglat
				const radius = AMap.GeometryUtil.distance(this.circleCenter, [lng, lat])
				this.circleRadius = radius
				this.circle.setRadius(radius)
			},
			//矩形围栏手势移动事件
			touchmove(e) {
				let _this = this
				if (_this.form.geomType === 2 && this.drawStatus) {
					_this.rectanglelnglat[1] = [e.lnglat.getLng(), e.lnglat.getLat()]
					let temp = [_this.rectanglelnglat[0], _this.rectanglelnglat[1]]
					_this.rectanglelnglat = temp
					if (_this.rectangleInstance !== null && _this.rectangleInstance !== undefined && temp.length > 1) {
						_this.rectangleInstance.setBounds(new AMap.Bounds(temp[0], temp[1]))
						_this.rectangle.disabled = false
						_this.rectangle.edit = false
					}
				}
			},
			//矩形围栏手势按下事件
			touchstart(e) {
				if (this.drawStatus) {
					let temp = [
						[e.lnglat.getLng(), e.lnglat.getLat()]
					]
					this.rectanglelnglat = temp
					this.rectangle.edit = false
					this.rectangle.draggable = false
				}
			},
			adjust(e) {
				let _this = this
				_this.polygon.edit = false
				_this.polygon.path = _this.polygonInstance.getPath()
				//延时
				setTimeout(function() {
					_this.polygon.edit = true
					_this.polygon.visible = true
				}, 100);
			},
			addnode(e) {
				let _this = this
				_this.polygon.edit = false
				_this.polygon.path = _this.polygonInstance.getPath()
				//延时
				setTimeout(function() {
					_this.polygon.edit = true
					_this.polygon.visible = true
				}, 100);
			},
			//矩形围栏手势抬起事件
			touchend(e) {
				this.rectangle.edit = true
			},
			//移动矩形围栏
			moveRectangle(e) {
				let northEast = this.rectangleInstance.getBounds().getNorthEast()
				let southWest = this.rectangleInstance.getBounds().getSouthWest()
				this.rectanglelnglat[0] = [northEast.getLng(), northEast.getLat()]
				this.rectanglelnglat[1] = [southWest.getLng(), southWest.getLat()]
			},
			fetchFenceInfo() {
				// ios
				if (this.isiOS) {
					iosPromise().then(() => {
						Vue.prototype.$WebViewJavascriptBridge = WebViewJavascriptBridge;
						WebViewJavascriptBridge.callHandler('fetchFenceInfo', function(response) {
							this.makeToast(response)
						});
					})
				}
				// Android
				if (this.isAndroid) {
					if (window.Android !== null && typeof(window.Android) !== 'undefined') {
						const fenceInfo = window.Android.fetchFenceInfo();
						//this.makeToast(fenceInfo)
						this.form = JSON.parse(fenceInfo.data)
					}
				}
			},
			iosPromise() {
				return new Promise((resolve, reject) => {
					// OC调JS，需要给OC调用的函数必须写在这个函数里面
					setupWebViewJavascriptBridge(function(bridge) {
						bridge.registerHandler('fetchFenceInfo', function(data, responseCallback) {
							responseCallback('js执行过了');
						})
						resolve();
					})
				})
			},
		}

	}
</script>

<style lang="scss" scoped>
	.map-content {
		position: relative;
		height: calc(100vh - 88rpx);
		width: 100%;

		::v-deep .amap-marker .amap-icon img {
			max-width: 40px !important;
			max-height: 30px !important;
		}

		.name {
			input {
				position: fixed;
				width: 70%;
				height: 80rpx;
				line-height: 80rpx;
				left: 0;
				right: 0;
				top: 100rpx;
				margin: auto;
				border: 1px solid black;
				border-radius: 40rpx;
				z-index: 1;
				background-color: #FFFFFF;
				text-align: center;
			}
		}
	}

	.input-card {
		position: fixed;
		width: 90%;
		left: 0;
		right: 0;
		bottom: 60rpx;
		margin: auto;
		z-index: 501;
	}

	.drawButton {
		width: 200rpx;
		margin: auto;
		font-size: 26rpx;
	}

	.submit {
		border-radius: 0rpx;
		background-color: #FFFFFF;
		font-size: 26rpx;
		display: flex;
		color: #333333;
		outline-style: none;
		outline-width: 0rpx;
		outline: none;
		justify-content: flex-start;
		border: none;
		border-radius: 0rpx;
		border-color: #00000000;
	}
</style>
