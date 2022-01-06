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
			<el-amap ref="amapref" vid="amaps" :resize-enable="true" :expand-zoom-range="true" :zoom="zoom"
				:center="center" :plugin="plugins" :events="events">

				<el-amap-marker :position="marker.position" :icon="marker.icon" :offset="[-16, -26]" />

				<el-amap-polygon v-if="form.geomType === 3" :path="path" fillColor="#2b83f9" :editable="true"
					fillOpacity="0.5" strokeWeight="2" strokeColor="#3A65FF" strokeOpacity="0.5" />

				<el-amap-circle v-if="form.geomType === 1" :center="circleCenter" :radius="circleRadius"
					fillColor="#2b83f9" :editable="true" fillOpacity="0.5" strokeWeight="2" strokeColor="#3A65FF"
					strokeOpacity="1" :events="circelEvent" />

				<el-amap-rectangle v-if="form.geomType === 2" fillColor="#2b83f9" :editable="true" :fillOpacity="0.2"
					:strokeWeight="2" strokeColor="#3A65FF" :bounds="rectanglelnglat" :events="rectangleEvent" />

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
						<button type="primary" class="drawButton">重绘</button>
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

				circle: null, // 圆形实例
				circleCenter: [], // 圆心
				circleRadius: 200, // 半径

				rectangle: null, // 矩形实例
				rectanglelnglat: [
					[
						0.0,
						0.0
					],
					[
						0.0,
						0.0
					]
				], // 矩形第一个点
				_rectanglelnglat: [], // 矩形第二个点

				polygon: null, // 多边形实例
				polygonPath: [], // 多边形路径
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
				}], // 
				events: {
					init: (o) => {
						_this.map = o
					},
					click(e) {
						_this.typeClick = true; // 点击才赋值
						if (!_this.drawStatus) {
							_this.marker.position = [e.lnglat.getLng(), e.lnglat.getLat()]
						} else if (_this.form.geomType == 3) {
							_this.path.push([e.lnglat.getLng(), e.lnglat.getLat()])
						} else if (_this.form.geomType == 2) {
							_this.map.setStatus({
								dragEnable: false
							})
							_this.rectanglelnglat[0] = [e.lnglat.getLng(), e.lnglat.getLat()]
						}
					},
					touchstart(e) {
						if (_this.form.geomType == 2) {
							_this.map.setStatus({
								dragEnable: false
							})
							_this.rectanglelnglat[0] = [e.lnglat.getLng(), e.lnglat.getLat()]
						}
					},
					complete: () => {
						// _this.setFitView();
					},
					touchmove(e) {
						if (_this.form.geomType === 2) {
							_this.rectanglelnglat[1] = [e.lnglat.getLng(), e.lnglat.getLat()]
							_this.rectangle.setBounds(new AMap.Bounds(_this.rectanglelnglat[0], _this.rectanglelnglat[1]))
						}
					}
				},
				circelEvent: {
					adjust: (e) => {
						this.circleRadius = e.radius
					},
					move: (e) => {
						this.circleCenter = [e.lnglat.getLng(), e.lnglat.getLat()]
						this.marker.position = this.circleCenter
					}
				},
				rectangleEvent: {
					init: (e) => {
						_this.rectangle = e
					},
					move: (e) => {
						this.circleCenter = [e.lnglat.getLng(), e.lnglat.getLat()]
						this.marker.position = this.circleCenter
					}
				},
				marker: {
					icon: '/static/icon_location.png',
					position: [116.397497, 39.906888]
				},
			}
		},
		methods: {
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
					} = this.rectangle.getBounds().getCenter()
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
			},
			// 画圆形
			drawCircle() {
				this.form.geomType = 1
				this.isDraw = false
				this.circleCenter = this.marker.position
			},
			// 画矩形
			drawRectangle() {
				this.form.geomType = 2
				this.isDraw = false
			},
			// 结束绘制
			close() {
				const _this = this
				if (_this.form.geomType === 3) {
					//多边形
				} else if (_this.form.geomType === 2) {
					//矩形
				} else if (_this.form.geomType === 1) {
					//圆形
				}
				this.isDraw = true
				this.isEdit = false
				this.drawStatus = false
			},
			// 重新绘制
			reDraw() {
				this.resetCover()
				this.isDraw = true
				this.isEdit = true
				this.drawStatus = true
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

			// 重置覆盖物
			resetCover() {}
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
		bottom: 24rpx;
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
		justify-content: flex-end;
		border: none;
		border-radius: 0rpx;
		border-color: #00000000;
		min-width: 110rpx;
	}
</style>
