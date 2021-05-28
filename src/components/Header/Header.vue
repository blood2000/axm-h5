<template>
	<view class="header">
		<view class="header-box">
			<view class="status_bar">
			  <!-- 这里是状态栏 -->
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
	</view>
</template>

<script>
	export default {
		props:{
			showBack: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				pages: {},
			}
		},
		onShow() {
			this.pages = getCurrentPages();
			console.log(this.pages);
		},
		methods: {
			back() {
				/*uni.navigateBack({
				delta: 1
				})*/
				//@zxyuns 处理兼容，如果没有上一级界面则返回首页
				if (this.pages.length === 2) {
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
