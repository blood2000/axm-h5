<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">项目报表</text>
		</Header>
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">宝安COON</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="245"></text>
							<text class="unit">个</text>
						</view>
						<view class="label">货源</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="786"></text>
							<text class="unit">单</text>
						</view>
						<view class="label">运单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="886"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">运单</text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="1245"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">开票</text></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
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
