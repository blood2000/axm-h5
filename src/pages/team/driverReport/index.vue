<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">司机报表</text>
		</Header>
		<Screen v-model="tabCur" :showHistory="true" />
		<view v-for="(item, index) in driverList" :key="index" class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-align-center">
				<text class="text">{{ item.driverName }}</text>
				<text class="phone">{{ item.telPhone }}</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.orderReceiving) }}</text>
							<text class="unit">{{ numberFormatUnit(item.orderReceiving) }}单</text>
						</view>
						<view class="label">已接单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.orderUnload) }}</text>
							<text class="unit">{{ numberFormatUnit(item.orderUnload) }}辆</text>
						</view>
						<view class="label">已卸货</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.orderRemitAmount) }}</text>
							<text class="unit">{{ numberFormatUnit(item.orderRemitAmount) }}元</text>
						</view>
						<view class="label">运费</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框加载 -->
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Screen from '@/components/Screen/Screen.vue';
	import Header from '@/components/Header/Header.vue';
	import { getDriverReport } from '@/config/service/team.js';
	export default {
		components: {
			Screen,
			Header
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		watch: {
			tabCur(e){
				this.isEnd = false;
				this.queryParams.timeType = e - 0;
				this.driverList = [];
				this.getReport();
			}
		},
		data() {
			return {
				driverList: [],
				loadModal: false,
				isEnd: false,
				tabCur: 1,
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					timeType: 1
				},
			}
		},
		onLoad(options) {
			this.loadModal = true;
			if (options) {
				this.tabCur = options.day - 0;
				this.queryParams.timeType = options.day - 0;
			}
			this.getReport();
		},
		onPullDownRefresh() {
			this.driverList = []
			this.queryParams.pageNum = 1
			this.getReport()
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		},
		// 触底加载
		onReachBottom() {
			// console.log("触底")
			if(!this.isEnd) {
				this.queryParams.pageNum++
				this.getReport()
			}
		},
		methods: {
			getReport() {
				this.loadModal = true;
				getDriverReport(this.queryParams, this.headerInfo).then(response => {
					this.loadModal = false;
					if(response.data.length === 0) {
						this.isEnd = true;
						return
					}
					this.driverList = [...this.driverList,...response.data]
				}).catch(() => {
					this.loadModal = false;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	padding-bottom: 10upx;
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
