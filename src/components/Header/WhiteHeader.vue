<template>
	<view class="">
		<view class="top-frame" :class="{showLine: showLine}">
			<view class="status_bar" :style="{height: statusBarHeight*2 + 'upx'}">
			  <!-- 这里是状态栏 -->
			</view>
			<view class="top-title flex align-center justify-between">
				<text v-if="showBack" class="cuIcon-back back" @click="back"></text>
				<view v-else style="width: 18upx;"></view>
				<view class="title"><slot name="title"></slot></view>
				<view style="width: 18upx;"></view>
			</view>
		</view>
		<view :style="{height: titleHeight + 'upx'}"></view>
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
			showLine: {
				type: Boolean,
				default: false
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
				naviBarHeight:0//导航栏高度
			}
		},
		beforeMount(){
			this.pages = getCurrentPages();
			this.titleHeight = this.statusBarHeight*2 + 95;
		},
		async onLoad() {
			await this.$onLaunched;
		},
		onShow() {
		},
		methods: {
			back() {
				this.$emit('close')
				//@zxyuns 处理兼容，如果没有上一级界面则返回首页
				if (this.isSecondaryPage) {
					if (this.isAndroid) {
						if(window.Android !== null && typeof(window.Android) !== 'undefined') {
							window.Android.back();
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
.showLine{
	border-bottom: 1upx solid rgba(153, 153, 153, 0.2);
}
.top-frame{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	// height: 130upx;
	width: 100%;
	overflow: hidden;
	background-color: #FFFFFF;
	.top-title{
		height: 95upx;
		width: 100%;
		padding: 0 20upx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		position: relative;
		z-index: 10;
		>.title{
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
.status_bar{
	height: 35upx;
}
.back{
	line-height: 100upx;
	width: 60upx;
	font-size: 42upx;
}
</style>
