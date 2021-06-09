<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">车辆报表</text>
		</Header>
		<Screen v-model="queryParams.timeType" :showHistory="true" />
		
		<view class="c-app-container" style="padding-bottom: 15rpx;" @click="show">
			<view class="c-title-box ly-flex-align-center">
				<text class="text">闽A1245</text>
				<text class="param flex align-center justify-center">重卡 载重40吨</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="245"></text>
							<text class="unit">趟</text>
						</view>
						<view class="label">运输次数</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="786"></text>
							<text class="unit">吨</text>
						</view>
						<view class="label">载重</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="886"></text>
							<text class="unit">公里</text>
						</view>
						<view class="label">车程</text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="1245"></text>
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
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
				queryParams: {
					timeType: 1
				},
			}
		},
		onLoad(options) {
			this.queryParams.timeType = options.day - 0;
		},
		methods: {
			show(){
				console.log(this.queryParams);
			}
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
.param{
	width: 213upx;
	height: 47upx;
	background: rgba(71, 122, 228, 0.14);
	border-radius: 24upx;
	margin-left: 24upx;
	font-size: 24upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #477AE4;
}
</style>
