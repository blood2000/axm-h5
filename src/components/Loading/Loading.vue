<template>
	<view class="c-loading-box">
		<image src="https://image.weilanwl.com/gif/loading-1.gif" mode="aspectFit" class="gif-white response" style="height:240upx"></image>
	</view>
</template>

<script>
	
</script>

<style scoped lang="scss">
	.c-loading-box{
		width: 100%;
		height: 100%;
		min-height: 100rpx;
		position: relative;
		>.gif-white{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
