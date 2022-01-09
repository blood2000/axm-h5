<template>
	<view class="">
		<view class="map-content">
			<view class="name flex">
				<input type="text" v-model.trim="form.name" placeholder="请输入电子围栏名称" />
			</view>
			<MenuWhiteHeader :showBack="true" :isSecondaryPage="false">
				<text slot="title" style="font-weight: bold;">{{title}}</text>
				<text class="submit" slot="menu">保存</text>
			</MenuWhiteHeader>
			<el-amap ref="amapref" vid="amaps" @init="initMap" @touchend="touchend" @click="clickMap" :center="center"
				:zoom="15" viewMode="3D" :dragEnable="mapDragEnable" @touchmove="touchmove" @touchstart="touchstart">

				<el-amap-marker :position="marker.position" :icon="marker.icon" :offset="[-11, -30]" />

				<el-amap-polygon v-if="form.geomType === 3" :path="polygon.path" :visible="polygon.visible"
					@adjust="adjust" @addnode="addnode" :editable="polygon.edit" :draggable="polygon.draggable"
					@init="initPolygon"></el-amap-polygon>

				<el-amap-rectangle v-if="form.geomType === 2 &&  rectanglelnglat.length > 1" @init="initRectangle"
					:bounds="rectanglelnglat" :editable="rectangle.edit" :draggable="rectangle.draggable"
					@move="moveRectangle">
				</el-amap-rectangle>

				<el-amap-circle v-if="form.geomType === 1 && circleCenter !== null" :center="circleCenter"
					:radius="circleRadius" :editable="circleEdit" @init="initCircle"></el-amap-circle>

			</el-amap>
			<view class="input-card">
				<view v-if='isDraw&&isEdit' class="flex">
					<button type="primary" class="drawButton" @click="drawPolygon">绘制多边形 </button>
					<button type="primary" class="drawButton" @click="drawRectangle">绘制矩形 </button>
					<button type="primary" class="drawButton" @click="drawCircle">绘制圆形</button>
				</view>
				<view v-else>
					</button>
					<view v-if='isEdit' class="flex">
						<button type="primary" class="drawButton" @click="close">确定</button>
						<button type="primary" class="drawButton" @click="clearFence">重绘</button>
					</view>
					<button v-else type="primary" class="drawButton" @click="reDraw">绘制围栏 </button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';
	import {
		mapState
	} from "vuex";

	export default {
		components: {
			MenuWhiteHeader
		},
		plugin: {
			pName: 'Geolocation',
			events: {}
		},
		onShow() {},
		onLoad(options) {
			if (options.data) {
				this.form = JSON.parse(options.data)
				this.title = '编辑电子围栏'
			}
			// this.center = options.center.split(',')
			// this.marker.position = options.center.split(',')
		},
		computed: {
			...mapState({
				statusBarHeight: (state) => state.header.statusBarHeight,
			}),
		},
		mounted() {},
		data() {
			const _this = this
			return {
				form: {
					geomText: undefined,
					geomType: undefined,
					functionType: 'collision',
					centerLat: undefined,
					centerLng: undefined,
					name: undefined,
					status: 0,
					delFlag: 0,
				},
				path: [],

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
				polygon: {
					draggable: false,
					visible: true,
					edit: false,
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
		methods: {
			clickMap(e) {
				const _this = this
				_this.typeClick = true; // 点击才赋值
				if (!_this.drawStatus) {
					_this.marker.position = [e.lnglat.getLng(), e.lnglat.getLat()]
				} else if (_this.form.geomType == 3) {
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
			submit() {
				let pages = getCurrentPages()
				let prePage = pages[pages.length - 2]
				// 圆形
				if (this.form.geomType === 1) {
					this.form.geomText = [...this.circleCenter, Math.floor(this.circleRadius)].join()
					this.form.centerLng = this.circleCenter[0]
					this.form.centerLat = this.circleCenter[1]
				}
				// 矩形
				if (this.form.geomType === 2) {
					this.form.geomText = [...this.rectanglelnglat, ...this._rectanglelnglat].join()
					const {
						lng,
						lat
					} = this.rectangleInstance.getBounds().getCenter()
					this.form.centerLng = lng
					this.form.centerLat = lat
				}
				// 多边形
				if (this.form.geomType === 3) {
					this.form.geomText = this.polygonPath.join()
					const {
						lng,
						lat
					} = this.polygon.getBounds().getCenter()
					this.form.centerLng = lng
					this.form.centerLat = lat
				}
				if (this.form.name) {
					prePage.addList(this.form)
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.showToast({
						title: '请输入名称',
						icon: 'none',
						duration: 1000
					})
				}
			},
			navigateBack() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 画多边形
			drawPolygon() {
				this.form.geomType = 3
				this.isDraw = false
				this.mapDragEnable = true
			},
			// 画圆形
			drawCircle() {
				let _this = this
				_this.form.geomType = 1
				_this.isDraw = false
				_this.mapDragEnable = true
			},
			// 画矩形
			drawRectangle() {
				this.form.geomType = 2
				this.isDraw = false
				this.mapDragEnable = false
			},
			// 结束绘制
			close() {
				const _this = this
				if (_this.form.geomType === 3) {
					//多边形
					console.log("多边形点坐标 -> ", _this.polygon.path)
				} else if (_this.form.geomType === 2) {
					//矩形
				} else if (_this.form.geomType === 1) {
					//圆形

				}
				this.isDraw = true
				this.isEdit = false
				this.drawStatus = false
				this.mapDragEnable = true
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
				this.drawStatus = true
				this.mapDragEnable = true
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
				console.log(_this.polygon.path)
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
