<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">车辆报表</text>
		</Header>
		<Screen v-model="timeType" :showHistory="true" />
		
		<view v-for="(item, index) in vehicleList" :key="index" class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-align-center">
				<text class="text">{{ item.licenseNumber }}</text>
				<text class="param flex align-center justify-center">{{ item.carType }} 载重{{ item.vehicleLoadWeight }}吨</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.transportNum) }}</text>
							<text class="unit">{{ numberFormatUnit(item.transportNum) }}趟</text>
						</view>
						<view class="label">运输次数</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.totalLoadWeight) }}</text>
							<text class="unit">{{ numberFormatUnit(item.totalLoadWeight) }}吨</text>
						</view>
						<view class="label">载重</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.totalMileage) }}</text>
							<text class="unit">{{ numberFormatUnit(item.totalMileage) }}公里</text>
						</view>
						<view class="label">车程</text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(item.totalDeliveryFee) }}</text>
							<text class="unit">{{ numberFormatUnit(item.totalDeliveryFee) }}元</text>
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
		<!-- 空数据 -->
		<NonePage v-if="vehicleList.length === 0 && !loadModal" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Screen from '@/components/Screen/Screen.vue';
	import Header from '@/components/Header/Header.vue';
	import NonePage from '@/components/NonePage/NonePage.vue';
	import { getVehicleReport } from '@/config/service/driver.js';
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
			timeType(){
				this.isEnd = false;
				this.getReport();
			}
		},
		data() {
			return {
				vehicleList: [],
				loadModal: false,
				isEnd: false,
				timeType: 1
			}
		},
		onLoad(options) {
			this.loadModal = true;
			if (options) {
				this.timeType = options.day - 0;
			}
			this.getReport();
		},
		methods: {
			getReport() {
				this.loadModal = true;
				getVehicleReport(this.timeType, this.headerInfo).then(response => {
					this.loadModal = false;
					this.vehicleList = response.data;
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
	padding: 0 20upx;
	// width: 213upx;
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
