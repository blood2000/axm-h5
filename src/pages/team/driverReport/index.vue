<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">司机报表</text>
		</Header>
		<Screen v-model="queryParams.timeType" :showHistory="true" />
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-align-center">
				<text class="text">张三</text>
				<text class="phone">15980277720</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="245"></text>
							<text class="unit">单</text>
						</view>
						<view class="label">已接单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="786"></text>
							<text class="unit">辆</text>
						</view>
						<view class="label">已卸货</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="886"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">运费</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Screen from '@/components/Screen/Screen.vue';
	export default {
		components: {
			Screen
		},
		data() {
			return {
				queryParams: {
					timeType: 1
				},
			}
		},
		onLoad(options) {
			if (options) {
				this.queryParams.timeType = options.day - 0;
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
.min .num {
	font-size: 32upx;
}
.phone{
	margin-top: 4upx;
	margin-left: 24upx;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #999999;
}
</style>
