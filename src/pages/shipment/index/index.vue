<template>
	<view class="shipment-index">
		<view class="c-app-container">
			<view class="ly-flex-pack-around" style="margin-bottom: 40rpx;">
				<view class="c-count-box">
					<view class="count">234<text class="unit">个</text></view>
					<view class="label">项目<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count">234<text class="unit">个</text></view>
					<view class="label">货源<text class="has-arrow"></text></view>
				</view>
			</view>
			<view class="ly-flex-pack-around">
				<view class="c-count-box">
					<view class="count">234<text class="unit">单</text></view>
					<view class="label">运费完成<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count">234<text class="unit">元</text></view>
					<view class="label">实付运费<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count">234<text class="unit">元</text></view>
					<view class="label">开票<text class="has-arrow"></text></view>
				</view>
			</view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">货源统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="c-app-container__box">
				123
			</view>
			<view class="c-app-container__box">
				456
			</view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运输统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运费统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">开票统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	.chart-box{
		width: 100%;
		height: 450rpx;
	}
}
</style>
