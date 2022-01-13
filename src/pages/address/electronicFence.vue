<template>
	<view class="">
		<view class="map-content">
			<WhiteHeader :showBack="true" :isSecondaryPage="true">
				<text slot="title" style="font-weight: bold;">{{title}}</text>
			</WhiteHeader>
			<el-amap ref="amapref" vid="amaps" @init="initMap" @touchend="touchend" @click="clickMap" :center="center"
				:plugin="plugins" :zoom="15" viewMode="3D" :dragEnable="mapDragEnable" @touchmove="touchmove"
				@touchstart="touchstart" @complete="mapComplete">

				<el-amap-control-tool-bar :visible="false"></el-amap-control-tool-bar>

				<el-amap-marker :bubble="true" :position="marker.position" :icon="marker.icon" :offset="[-11, -30]" />

				<el-amap-polygon v-if="form.geomType === 3 && polygon.path.length > 0" :bubble="true"
					:path="polygon.path" :visible="polygon.visible" @adjust="adjust" @addnode="addnode"
					:editable="polygon.edit" @init="initPolygon"></el-amap-polygon>

				<el-amap-rectangle v-if="form.geomType === 2 &&  rectanglelnglat.length > 1" @init="initRectangle"
					:bubble="true" :bounds="rectanglelnglat" :editable="rectangle.edit" :draggable="rectangle.draggable"
					@move="moveRectangle">
				</el-amap-rectangle>

				<el-amap-circle v-if="form.geomType === 1 && circleCenter !== null" :center="circleCenter"
					:bubble="true" :radius="circleRadius" :editable="circleEdit" @init="initCircle">
				</el-amap-circle>

			</el-amap>
			<view>
				<image class="positionIcon" src="../../static/ic_fence_current_position.png" @click="moveToPosition">
				</image>
			</view>
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
						<button type="primary" class="drawButton" @click="cancelDraw">返回</button>
					</view>
					<view class="flex flex--direction" v-else>
						<button type="primary" class="drawButton" @click="reDraw">新建围栏 </button>
						<button v-if="addressInfo.isEditing === 1 " type="primary" class="drawButton"
							@click="changeFence">修改围栏</button>
						<button v-if="addressInfo.isEditing === 1 " type="primary" class="drawButton"
							@click="viewFence">信息查看</button>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import store from '@/store/index.js';
	import Vue from 'vue'
	import {
		mapState
	} from "vuex";

	export default {
		components: {
			WhiteHeader
		},
		plugin: {

		},
		onLoad() {},

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
				addressInfo: {
					locationLat: null,
					locationLon: null,
					addressLat: null,
					addressLon: null,
					position: null,
					isEditing: null,
					data: null
				},
				form: {
					geomType: null,
					geomText: null,
					centerLat: null,
					centerLng: null,
				},
				options: null,
				title: '新增电子围栏',
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
				polygonLimit: 20, // 多边形坐标点个数限制
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
					icon: '/static/ic_fence_position.png',
					position: [116.397497, 39.906888]
				},

			}
		},

		mounted() {
			let _this = this
			this.fetchFenceInfo()
		},
		methods: {
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
					if (_this.polygon.path.length >= _this.polygonLimit) {
						_this.makeToast("多边形围栏限制" + _this.polygonLimit + "个坐标点")
						return
					}
					//添加多边形围栏时鼠标左击事件
					_this.polygon.path.push([e.lnglat.getLng(), e.lnglat.getLat()])
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
			mapComplete() {},
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
				_this.drawStatus = true
				_this.isDraw = false
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
			cancelDraw() {
				uni.showModal({
					title: '提醒',
					content: '返回将重置已画围栏，是否继续？',
					success: function(res) {
						if (res.confirm) {
							this.drawStatus = false
							this.isDraw = true
							this.isEdit = false
							this.clearFence()
						}
					}.bind(this)
				});
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
					this.form.geomText = [lng, lat, Math.floor(this.circleInstance.getRadius())].join()
					this.form.centerLng = lng.toString()
					this.form.centerLat = lat.toString()
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
					this.form.centerLng = lng.toString()
					this.form.centerLat = lat.toString()
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
					this.form.centerLng = lng.toString()
					this.form.centerLat = lat.toString()
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
				this.makeToast("???" + this.circleCenter)
				if (this.circleInstance !== null && this.circleInstance !== undefined && this.circleCenter !== null) {
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
					if (!_this.rectangleInstance) {
						_this.rectangleInstance.setMap(null)
						_this.initRectangle()
					}
				} else if (_this.form.geomType === 1) {
					//圆形
					_this.circleEdit = false
					_this.circleRadius = 200
					_this.circleCenter = null
					if (!_this.circleInstance) {
						_this.circleInstance.setMap(null)
						_this.initCircle()
					}
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
				_this.polygon.visible = false
				let temp = JSON.parse(JSON.stringify(_this.polygon.path))
				_this.polygon.path = _this.polygonInstance.getPath()
				if (_this.polygon.path.length >= _this.polygonLimit) {
					_this.makeToast("多边形围栏限制" + _this.polygonLimit + "个坐标点")
					_this.polygon.path = temp
					_this.polygonInstance.setPath(_this.polygon.path)
				}
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
			//获取应用端的围栏和定位等信息
			fetchFenceInfo() {
				let _this = this
				// ios
				if (this.isiOS) {
					this.iosPromise().then(() => {
						Vue.prototype.$WebViewJavascriptBridge = WebViewJavascriptBridge;
						WebViewJavascriptBridge.callHandler('fetchFenceInfo', function(response) {
							_this.options = response
							_this.addressInfo = JSON.parse(response)
							_this.moveCamera("3")
							_this.onParamFetch(_this.options)
						});
					})
				}
				// Android
				if (this.isAndroid) {
					if (window.Android !== null && typeof(window.Android) !== 'undefined') {
						const fenceInfo = window.Android.fetchFenceInfo();
						_this.options = fenceInfo
						_this.addressInfo = JSON.parse(fenceInfo)
						_this.moveCamera("3")
						_this.onParamFetch(_this.options)
					}
				}
			},
			iosPromise() {
				return new Promise((resolve, reject) => {
					// OC调JS，需要给OC调用的函数必须写在这个函数里面
					this.setupWebViewJavascriptBridge(function(bridge) {
						bridge.registerHandler('fetchFenceInfo', function(data, responseCallback) {})
						resolve();
					})
				})
			},
			// 这是必须要写的，用来初始化一些设置
			setupWebViewJavascriptBridge(callback) {
				if (window.WebViewJavascriptBridge) {
					return callback(WebViewJavascriptBridge);
				}
				if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback);
				}
				window.WVJBCallbacks = [callback];
				var WVJBIframe = document.createElement('iframe');
				WVJBIframe.style.display = 'none';
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
				document.documentElement.appendChild(WVJBIframe);
				setTimeout(function() {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			},
			//处理应用端的围栏和定位等信息
			onParamFetch(options) {
				let _this = this
				if (this.addressInfo.data !== null && this.addressInfo.data !== undefined) {
					this.form = this.addressInfo.data
					this.title = '编辑电子围栏'
				} else {
					return false
				}
				let temp = this.form.geomText.split(',')
				if (this.form.geomType === 3) {
					//多边形
					for (var i = 0; i < temp.length; i = i + 2) {
						this.polygon.path.push([temp[i], temp[i + 1]])
					}
					setTimeout(function() {
						_this.polygon.edit = false
					}, 500);
					//延时
					setTimeout(function() {
						_this.polygon.edit = true
					}, 1000);
				} else if (this.form.geomType === 2) {
					//矩形
					for (var i = 0; i < temp.length; i = i + 2) {
						this.rectanglelnglat.push([temp[i], temp[i + 1]])
					}
					this.rectangle.edit = true
				} else if (this.form.geomType === 1) {
					//圆形
					this.circleCenter = [this.form.centerLng, this.form.centerLat]
					this.circleRadius = temp[2]
					setTimeout(function() {
						_this.circleEdit = false
					}, 200);
					//延时
					setTimeout(function() {
						_this.circleEdit = true
					}, 400);
				}
			},
			//当前位置点击事件
			moveToPosition() {
				this.moveCamera("1")
			},
			changeFence() {
				if (this.form.geomType === 3) {
					//多边形
					this.reDraw()
					this.drawPolygon()
				} else if (this.form.geomType === 2) {
					//矩形
					this.reDraw()
					this.drawRectangle()
				} else if (this.form.geomType === 1) {
					//圆形
					this.reDraw()
					this.drawCircle()
				}
			},
			//移动视图
			moveCamera(isPosition) {
				if (isPosition === "1") {
					let centerLat = this.addressInfo.locationLat
					let centerLng = this.addressInfo.locationLon
					this.center = [centerLng, centerLat]
					this.marker.position = [centerLng, centerLat]
				} else if (isPosition === "2") {
					let centerLat = this.addressInfo.data.centerLat
					let centerLng = this.addressInfo.data.centerLng
					this.center = [centerLng, centerLat]
					this.marker.position = [centerLng, centerLat]
				} else {
					let centerLat = this.addressInfo.addressLat
					let centerLng = this.addressInfo.addressLon
					this.center = [centerLng, centerLat]
					this.marker.position = [centerLng, centerLat]
				}
			}
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

	.positionBtn {
		position: fixed;
		height: 50rpx;
		width: 200rpx;
		right: 20rpx;
		bottom: 160rpx;
		margin: auto;
		font-size: 26rpx;
		z-index: 501;
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

	.positionIcon {
		position: absolute;
		right: 40rpx;
		bottom: 100rpx;
		width: 60rpx;
		height: 60rpx;
	}
</style>
