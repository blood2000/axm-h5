<template>
	<view class="none-page-index">
		<view class="none-image"></view>
		<view class="none-text">{{ msg }}</view>
	</view>
</template>

<script>
	export default {
		props: {
			msg: {
				type: String,
				default: '暂无数据'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.none-page-index{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		.none-image{
			width: 625rpx;
			height: 390rpx;
			background: url('/static/has_none.png') no-repeat;
			background-size: 100% 100%;
		}
		.none-text{
			text-align: center;
			color: rgba(153, 153, 153, 1);
			font-size: 28rpx;
			margin-top: -40rpx;
		}
	}
</style>
