<template>
	<!-- <view class="header">
		<view class="header-box">
			<view class="status_bar">
			  这里是状态栏
			</view>
			<view class="header-box__title flex align-center justify-between">
				<text v-if="showBack" class="cuIcon-back" @click="back"></text>
				<view v-else style="width: 18upx;"></view>
				<slot name="title"></slot>
				<view style="width: 18upx;"></view>
			</view>
			<view class="circle-big"></view>
			<view class="circle-middle"></view>
			<view class="circle-small"></view>
		</view>
	</view> -->
	<view class="top">
		<view class="top-frame" :style="{height: titleHeight + 'upx' }">
			<!-- <view class="top-bgframe1">
				<image class="top-bg" src="/static/tab_bg.png" mode=""></image>
			</view> -->
			<view :style="{height: statusBarHeight*2 + 'upx' }">
			  <!-- 这里是状态栏 -->
			</view>
			<view class="top-title flex align-center justify-between">
				<text v-if="showBack" class="cuIcon-back" @click="back"></text>
				<view v-else style="width: 18upx;"></view>
				<slot name="title"></slot>
				<view style="width: 18upx;"></view>
			</view>
		</view>
		<view v-if="showBg" class="top-bgframe2">
			<image class="top-bg" src="/static/tab_bg.png" mode=""></image>
		</view>
		<view :style="{height: titleHeight + 'upx' }"></view>
		<!-- <view class="cu-modal bottom-modal" :class="modalName=='bottomModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green">确定</view>
					<view class="action text-blue" @tap="hideModal">取消</view>
				</view>
				<view class="padding-xl">
					状态栏高度：{{ statusBarHeight }}
					是否安卓：{{ isAndroid }}
					是否ios：{{ isiOS }}
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		props:{
			showBack: {
				type: Boolean,
				default: false
			},
			showBg: {
				type: Boolean,
				default: true
			},
			// 是否二级页面
			isSecondaryPage: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState({
				// headerInfo: state => state.header.headerInfo,
				statusBarHeight: state => state.header.statusBarHeight,
				isAndroid: state => state.header.isAndroid,
				isiOS: state => state.header.isiOS
			})
		},
		data() {
			return {
				pages: {},
				titleHeight: 0, //状态栏和导航栏的总高度
				naviBarHeight:0,//导航栏高度
				// modalName: 'bottomModal'
			}
		},
		beforeMount(){
			this.pages = getCurrentPages();
			console.log(this.pages);
			this.titleHeight = this.statusBarHeight*2 + 100;
			console.log(this.statusBarHeight);
			console.log(this.titleHeight);
		},
		async onLoad() {
			await this.$onLaunched;
		},
		onShow() {
			
		},
		methods: {
			// showModal(e) {
			// 	this.modalName = e.currentTarget.dataset.target
			// },
			// hideModal(e) {
			// 	this.modalName = null
			// },
			back() {
				//@zxyuns 处理兼容，如果没有上一级界面则返回首页
				if (this.isSecondaryPage) {
					if (this.isAndroid) {
						if(window.Android !== null && typeof(window.Android) !== 'undefined') {
							window.Android.callAndroid('back');
						}
					} else if (this.isiOS) {
						this.$WebViewJavascriptBridge.callHandler('back');
					}
				} else if (this.pages.length === 2) {
					uni.navigateBack({
						delta: 1
					});
				} else if (this.pages.length === 1) {
					uni.switchTab({
						url: '/pages/home/home',
					})
				} else {
					uni.navigateBack({
						delta: 1
					});
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
.top-frame{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	// height: 185upx;
	width: 100%;
	overflow: hidden;
	background: url('/static/tab_bg.png') no-repeat;
	background-size: 100% 350upx;
	.top-title{
		height: 100upx;
		width: 100%;
		padding: 0 20upx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		position: relative;
		z-index: 10;
	}
	.top-bgframe1{
		position: relative;
		top: 0;
		left: 0;
		height: 0;
		width: 100%;
		z-index: 9;
	}
}
.top-bgframe2{
	position: relative;
	top: 0;
	left: 0;
	z-index: 0;
	height: 0;
	width: 100%;
}
.top-bg{
	height: 350upx;
	width: 100%;
}
.status_bar{
	height: 35upx;
}

.header{
	position: fixed;
	width: 200%;
	height: 800rpx;
	border-radius: 50%;
	left: 50%;
	margin-left: -100%;
	top: -460rpx;
	background: #3D6DCC;
	overflow: hidden;
	.header-box{
		width: 50%;
		height: 340rpx;
		position: absolute;
		bottom: 0;
		left: 25%;
		z-index: 0;
		.status_bar{
			height: var(--status-bar-height);
			width: 100%;
		}
		&__title{
			height: calc(185rpx - var(--status-bar-height));
			line-height: calc(185rpx - var(--status-bar-height));
			// text-align: center;
			padding: 0 20upx;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			position: relative;
			z-index: 5;
		}
		.circle-big{
			position: absolute;
			top: 30rpx;
			right: 180rpx;
			width: 453rpx;
			height: 454rpx;
			background: linear-gradient(117deg, #B3C2E4 0%, #5671F7 96%);
			opacity: 0.1;
			border-radius: 50%;
			z-index: 1;
		}
		.circle-middle{
			position: absolute;
			top: -300rpx;
			right: -150rpx;
			width: 600rpx;
			height: 500rpx;
			background: linear-gradient(166deg, #ECF6FE 0%, #72AAFD 98%);
			opacity: 0.2;
			border-radius: 50%;
			z-index: 2;
		}
		.circle-small{
			position: absolute;
			right: -160rpx;
			top: 10rpx;
			width: 304rpx;
			height: 304rpx;
			background: linear-gradient(117deg, #9DD9FF 0%, #2942FF 100%, #FFC34D 100%, #FFC34D 100%);
			opacity: 0.15;
			border-radius: 50%;
			z-index: 3;
		}
	}
}
</style>
