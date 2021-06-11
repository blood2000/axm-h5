<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">车辆报表</text>
		</Header>
		<Screen v-model="tabCur" :showHistory="true" />
		
		<view v-for="(item, index) in vehicleList" :key="index" class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-align-center">
				<text class="text">{{ item.licenseNumber }}</text>
				<text class="param flex align-center justify-center">{{ item.dictLable }} 载重{{ item.vehicleLoadWeight }}吨</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.waybillCount) }}</text>
							<text class="unit">{{ numberFormatUnit(item.waybillCount) }}趟</text>
						</view>
						<view class="label">运输次数</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.weight) }}</text>
							<text class="unit">{{ numberFormatUnit(item.weight) }}吨</text>
						</view>
						<view class="label">载重</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.mileage) }}</text>
							<text class="unit">{{ numberFormatUnit(item.mileage) }}公里</text>
						</view>
						<view class="label">车程</text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.freight) }}</text>
							<text class="unit">{{ numberFormatUnit(item.freight) }}元</text>
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
	import { getVehicleReport } from '@/config/service/team.js';
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
				this.vehicleList = [];
				this.getReport();
			}
		},
		data() {
			return {
				vehicleList: [],
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
			this.vehicleList = []
			this.queryParams.pageNum = 1
			this.getReport()
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		},
		// 触底加载
		onReachBottom() {
			console.log("触底");
			console.log(this.isEnd);
			if(!this.isEnd) {
				this.queryParams.pageNum++;
				this.getReport();
			}
		},
		methods: {
			getReport() {
				this.loadModal = true;
				getVehicleReport(this.queryParams, this.headerInfo).then(response => {
					this.loadModal = false;
					if(response.data.length === 0) {
						this.isEnd = true;
						return
					}
					this.vehicleList = [...this.vehicleList,...response.data]
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
.param{
	// width: 213upx;
	padding: 0 20upx;
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
