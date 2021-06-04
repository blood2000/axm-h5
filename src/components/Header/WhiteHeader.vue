<template>
	<view class="top-frame">
		<view class="status_bar">
		  <!-- 这里是状态栏 -->
		</view>
		<view class="top-title flex align-center justify-between">
			<text v-if="showBack" class="cuIcon-back" @click="back"></text>
			<view v-else style="width: 18upx;"></view>
			<slot name="title"></slot>
			<view style="width: 18upx;"></view>
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
.top-frame{
	position: fixed;
	top: 0;
	left: 0;
	z-index: 10;
	height: 130upx;
	width: 100%;
	overflow: hidden;
	background-color: #FFFFFF;
	.top-title{
		line-height: 95upx;
		width: 100%;
		padding: 0 20upx;
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #000000;
		position: relative;
		z-index: 10;
	}
}
.status_bar{
	height: 35upx;
}
</style>
