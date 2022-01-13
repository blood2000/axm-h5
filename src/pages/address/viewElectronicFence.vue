<template>
	<view class="">
		<view class="map-content">
			<WhiteHeader :showBack="true" :isSecondaryPage="true">
				<text slot="title" style="font-weight: bold;">{{title}}</text>
			</WhiteHeader>
			<el-amap ref="amapref" vid="amaps" @init="initMap" :center="center" :zoom="16" viewMode="3D">

				<el-amap-marker :bubble="true" :position="marker.position" :icon="marker.icon" :offset="[-11, -30]" />

				<el-amap-polygon v-if="form.geomType === 3 && polygon.path.length > 0" :bubble="true"
					:path="polygon.path" :visible="polygon.visible" @adjust="adjust" @addnode="addnode"
					:editable="false" @init="initPolygon"></el-amap-polygon>

				<el-amap-rectangle v-if="form.geomType === 2 &&  rectanglelnglat.length > 1" @init="initRectangle"
					:bubble="true" :bounds="rectanglelnglat" :editable="false" :draggable="rectangle.draggable"
					@move="moveRectangle">
				</el-amap-rectangle>

				<el-amap-circle v-if="form.geomType === 1 && circleCenter !== null" :center="circleCenter"
					:bubble="true" :radius="circleRadius" :editable="false" @init="initCircle">
				</el-amap-circle>

			</el-amap>
			<view class="input-card">
				<view class="positionView">
					<image src="../../static/icon_location_my_current.png" class="drawButton" @click="moveToPosition">
					</image>
					<image style="margin-top: 24rpx;" src="../../static/icon_location_fence_current.png"
						class="drawButton" @click="moveFencePosition">
					</image>
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
					locationLon: null,
					locationLat: null,
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
					duration: 20000
				})
			},
			initMap(e) {
				this.map = e
			},
			initPolygon(e) {
				this.polygonInstance = e
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
							_this.marker.position = [_this.addressInfo.locationLon, _this.addressInfo
								.locationLat
							]
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
						_this.marker.position = [_this.addressInfo.locationLon, _this.addressInfo.locationLat]
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
				this.moveCamera("2")
			},
			//当前位置点击事件
			moveToPosition() {
				this.moveCamera("1")
			},
			//围栏位置点击事件
			moveFencePosition() {
				this.moveCamera("2")
			},
			//移动视图
			moveCamera(isPosition) {
				if (isPosition === "1") {
					let centerLat = this.addressInfo.locationLat
					let centerLng = this.addressInfo.locationLon
					this.center = [centerLng, centerLat]
				} else if (isPosition === "2") {
					let centerLat = this.addressInfo.data.centerLat
					let centerLng = this.addressInfo.data.centerLng
					this.center = [centerLng, centerLat]
				} else {
					let centerLat = this.addressInfo.addressLat
					let centerLng = this.addressInfo.addressLon
					this.center = [centerLng, centerLat]
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

	.positionView {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 20rpx;
		bottom: 120rpx;
	}

	.drawButton {
		width: 174rpx;
		margin: auto;
		height: 45rpx;
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
