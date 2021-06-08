<template>
	<view class="shipment-index">
		<view class="c-app-container">
			<view class="ly-flex-pack-around" style="margin-bottom: 40rpx;">
				<view class="c-count-box">
					<view class="count" v-number-format="25567"><text class="unit">个</text></view>
					<view class="label">项目<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count" v-number-format="25567"><text class="unit">个</text></view>
					<view class="label">货源<text class="has-arrow"></text></view>
				</view>
			</view>
			<view class="ly-flex-pack-around">
				<view class="c-count-box">
					<view class="count" v-number-format="25567"><text class="unit">单</text></view>
					<view class="label">运费完成<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count" v-number-format="25567"><text class="unit">元</text></view>
					<view class="label">实付运费<text class="has-arrow"></text></view>
				</view>
				<view class="c-count-box">
					<view class="count" v-number-format="25567"><text class="unit">元</text></view>
					<view class="label">开票<text class="has-arrow"></text></view>
				</view>
			</view>
		</view>
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">货源统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="c-app-container__box">
				<view class="order-title">接单TOP3</view>
				<view class="order-box">
					<!-- v-for -->
					<view v-for="(item, index) in orderList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
						<view class="c-order-box__label ly-flex-align-center">
							<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
							<text class="name">煤炭</text>
							<text class="address">宝安机场—华林广场</text>
						</view>
						<text class="c-order-box__count">486单</text>
					</view>
				</view>
			</view>
			<view class="c-app-container__box">
				<view class="order-title">付款TOP3</view>
				<view class="order-box">
					<!-- v-for -->
					<view v-for="(item, index) in peeList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
						<view class="c-order-box__label ly-flex-align-center">
							<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
							<text class="name">煤炭</text>
							<text class="address">宝安机场—华林广场</text>
						</view>
						<text class="c-order-box__count">486单</text>
					</view>
				</view>
			</view>
		</view>
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运输统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运费统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
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
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}]
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	font-family: PingFang SC;
	.order-title{
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}
	.chart-box{
		width: 100%;
		height: 450rpx;
	}
}
</style>
