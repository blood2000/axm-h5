<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">司机报表</text>
		</Header>
		<view class="top-fixed">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.day==TabCur?'onchoose':''" v-for="(item,index) in timelist" :key="index" @tap="tabSelect(item.day)">
						<view class="flex flex-direction align-center justify-center">
							<view class="">{{item.tag}}</view>
							<view v-if="item.day==TabCur" class="tab-bottom"></view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view style="height: 90upx;"></view>
		
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
							<text class="unit">单</text>
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
	export default {
		data() {
			return {
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
				timelist: [{ tag: '近七天', day: 7 }, { tag: '近一月', day: 30 }, { tag: '近半年', day: 180 }, { tag: '近一年', day: 365 }, { tag: '历史总计', day: 0 }],
				TabCur: 7,
				queryParams: {
					startTime: null,
					endTime: null
				},
			}
		},
		methods: {
			tabSelect(e) {
				if (e === 0){
					this.TabCur = e;
					this.queryParams.startTime = null;
					this.queryParams.endTime = null;
				}else{
					this.queryParams.startTime = this.parseTime(new Date().getTime() - 24 * 60 * 60 * 1000 * e, '{y}-{m}-{d}');
					this.queryParams.endTime = this.parseTime(new Date(), '{y}-{m}-{d}');
					console.log(this.queryParams);
					this.TabCur = e;
				}
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
// 时间筛选
.nav{
	border-bottom: 1upx solid #F2F2F3;
}
.top-fixed{
	position: fixed;
	left: 0;
	z-index: 10;
	width: 100%;
}
.onchoose{
	font-size: 32upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #477AE4;
}
.tab-bottom{
	position: relative;
	bottom: 4upx;
	width: 56upx;
	height: 4upx;
	background: #477AE4;
	border-radius: 2upx;
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
