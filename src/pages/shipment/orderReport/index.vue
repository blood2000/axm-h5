<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">货源报表</text>
		</Header>
		<Screen v-model="queryParams.timeType" :showHistory="true" />
		
		<view class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">煤炭</text>
			</view>
			<view style="margin-top: 30upx;">
				<view class="order-load flex align-center">
					<image class="order-loadimg" style="margin-right: 7upx;" src="../../../static/report/icon_load.png" mode=""></image>
					<view class="order-loadname">福建省福州市闽侯县</view>
				</view>
				<image class="order-icon" src="../../../static/report/icon_shu.png" mode=""></image>
				<view class="order-load flex align-center">
					<image class="order-loadimg" src="../../../static/report/icon_unload.png" mode=""></image>
					<view class="order-loadname">福建省福州市闽侯县</view>
				</view>
				<view class="c-app-container min" style="margin: 0; border-radius: 0;">
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
								<text class="unit">单</text>
							</view>
							<view class="label">已卸货</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="886"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">已结算</text></view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="1245"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">实付金额</text></view>
						</view>
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
// 时间筛选
.top-fixed{
	position: fixed;
	left: 0;
	z-index: 10;
	width: 100%;
}
.min .num {
	font-size: 32upx;
}
.order-load{
	padding: 0 24upx;
}
.order-icon{
	margin: 8upx 40upx 6upx;
	width: 6upx;
	height: 44upx;
}
.order-loadimg{
	width: 40upx;
	height: 36upx;
	margin-right: 7upx;
}
.order-loadname{
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #333333;
}
</style>
