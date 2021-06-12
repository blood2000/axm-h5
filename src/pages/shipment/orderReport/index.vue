<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">货源报表</text>
		</Header>
		<Screen v-model="tabCur" :showHistory="true" />
		
		<view v-for="(cont, index) in orderList" :key="index" class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">{{ cont.goodsBigTypeName }}</text>
			</view>
			<view style="margin-top: 30upx;">
				<view class="order-load flex align-center">
					<image class="order-loadimg" style="margin-right: 7upx;" src="../../../static/report/icon_load.png" mode=""></image>
					<view class="order-loadname">{{ cont.loadCity }}</view>
				</view>
				<image class="order-icon" src="../../../static/report/icon_shu.png" mode=""></image>
				<view class="order-load flex align-center">
					<image class="order-loadimg" src="../../../static/report/icon_unload.png" mode=""></image>
					<view class="order-loadname">{{  cont.unloadCity }}</view>
				</view>
				<view class="c-app-container min" style="margin: 0; border-radius: 0;">
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.orderReceived) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.orderReceived) }}单</text>
							</view>
							<view class="label">已接单</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.unloaded) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.unloaded) }}单</text>
							</view>
							<view class="label">已卸货</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.settled) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.settled) }}单</text>
							</view>
							<view class="label">已结算</text></view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.amountActuallyPaid) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.amountActuallyPaid) }}元</text>
							</view>
							<view class="label">实付金额</text></view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框加载 -->
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
		<!-- 空数据 -->
		<NonePage v-if="orderList.length === 0 && !loadModal" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Screen from '@/components/Screen/Screen.vue';
	import Header from '@/components/Header/Header.vue';
	import NonePage from '@/components/NonePage/NonePage.vue';
	import { getOrderReport } from '@/config/service/shipment.js';
	export default {
		components: {
			Screen,
			Header,
			NonePage
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		watch: {
			tabCur(e){
				this.orderList = [];
				this.getReport();
			}
		},
		data() {
			return {
				orderList: [],
				loadModal: false,
				tabCur: 1
			}
		},
		onLoad(options) {
			this.loadModal = true;
			if (options) {
				this.tabCur = options.day - 0;
			}
			this.getReport();
		},
		methods: {
			getReport() {
				this.loadModal = true;
				getOrderReport(this.tabCur, this.headerInfo).then(response => {
					this.loadModal = false;
					this.orderList = response.data
				}).catch(() => {
					this.loadModal = false;
				});
			},
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
