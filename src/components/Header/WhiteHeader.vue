<template>
	<view class="">
		<view :style="{height: titleHeight + 'upx'}"></view>
		<view class="top-frame" :style="{height: titleHeight + 'upx'}">
			<view class="status_bar" :style="{height: statusBarHeight*2 + 'upx'}">
			  <!-- 这里是状态栏 -->
			</view>
			<view class="top-title flex align-center justify-between">
				<text v-if="showBack" class="cuIcon-back" @click="back"></text>
				<view v-else style="width: 18upx;"></view>
				<slot name="title"></slot>
				<view style="width: 18upx;"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		props:{
			showBack: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			...mapState({
				// headerInfo: state => state.header.headerInfo,
				statusBarHeight: state => state.header.statusBarHeight
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
		onShow() {
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
	}
}
.status_bar{
	height: 35upx;
}
.back{
	line-height: 100upx;
	width: 100upx;
	font-size: 42upx;
}
</style>
