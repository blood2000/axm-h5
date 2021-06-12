<template>
	<view class="shipment-index">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">统计服务</text>
		</Header>
		
		<Screen v-model="TabCur" />
		
		<view class="scroll-box">
			<view class="c-app-container" style="height: 170rpx;">
				<Loading v-if="statisticLoading"></Loading>
				<view v-else class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(statisticData.waybillFinishNum) }}</text>
							<text class="unit">{{ numberFormatUnit(statisticData.waybillFinishNum) }}单</text>
						</view>
						<view class="label" @click="transportMore(1)">运单完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(statisticData.actualFreight) }}</text>
							<text class="unit">{{ numberFormatUnit(statisticData.actualFreight) }}元</text>
						</view>
						<view class="label" @click="transportMore(2)">实收运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(statisticData.transportCar) }}</text>
							<text class="unit">{{ numberFormatUnit(statisticData.transportCar) }}辆</text>
						</view>
						<view class="label" @tap="carMore">运输车辆<text class="has-arrow"></text></view>
					</view>
				</view>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">运输统计</text>
					<text class="button" @click="transportMore(1)">查看更多</text>
				</view>
				<LineChart 
					ref="TransportRef"
					:id="'transport'"
					:timeData="transportTime"
					:countData="transportData"
					:unit="transportUnit"
					:unitTime="transportUnitTime"
					:loading="transportLoading"
				></LineChart>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">运费统计</text>
					<text class="button" @click="transportMore(2)">查看更多</text>
				</view>
				<LineChart 
					ref="PeeRef"
					:id="'pee'"
					:timeData="peeTime"
					:countData="peeData"
					:unit="peeUnit"
					:unitTime="peeUnitTime"
					:loading="peeLoading"
				></LineChart>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">用车统计</text>
					<text class="button" @tap="carMore">查看更多</text>
				</view>
				<Loading v-if="carLoading"></Loading>
				<template v-else>
					<view class="c-app-container__box">
						<view class="order-box">
							用车
							<text class="unit">({{ numberFormatUnit(carNum) }}辆)</text>
							<text class="count">{{ numberFormat(carNum) }}</text>
						</view>
					</view>
					<view class="c-app-container__box" style="padding-top: 0;">
						<!-- v-for -->
						<view v-for="(item, index) in carList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
							<view class="c-order-box__label ly-flex-align-center">
								<image class="order" :src="'/static/order_' + (index + 1) + '.png'"></image>
								<text class="name">{{ item.licenseNumber }}</text>
							</view>
							<text class="c-order-box__count">{{ item.count }}单</text>
						</view>
					</view>
				</template>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '@/components/Header/Header.vue';
	import LineChart from '@/pages/components/lineChart.vue';
	export default {
		components: {
			Header,
			LineChart
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		watch: {
			TabCur(){
				this.statisticTask.abort();
				this.transportTask.abort();
				this.peeTask.abort();
				this.carTask.abort();
				this.getStatisticFun();
				this.getTransportFun();
				this.getPeeFun();
				this.getCarFun();
			}
		},
		data() {
			return {
				isSecondaryPage: false,
				TabCur: 1,
				statisticTask: null,
				statisticLoading: false,
				statisticData: {
					waybillFinishNum: 0,
					actualFreight: 0,
					transportCar: 0
				},
				// 用车统计
				carTask: null,
				carLoading: false,
				carNum: 0,
				carList: [],
				// 运输统计
				transportTask: null,
				transportLoading: false,
				transportTime: [],
				transportData: [],
				transportUnit: '单',
				transportUnitTime: '天',
				// 运费统计
				peeTask: null,
				peeLoading: false,
				peeTime: [],
				peeData: [],
				peeUnit: '元',
				peeUnitTime: '天'
			}
		},
		async onLoad(options) {
			await this.$onLaunched;
			const isSecondaryPage = options.isSecondaryPage;
			if (isSecondaryPage === '1') {
				this.isSecondaryPage = true;
			}
		},
		async mounted() {
			await this.$onLaunched;
			this.getStatisticFun();
			this.getTransportFun();
			this.getPeeFun();
			this.getCarFun();
		},
		methods: {
			carMore() {
				uni.navigateTo({
					url: '/pages/driver/vehicleReport/index?day=' + this.TabCur
				});
			},
			transportMore(tab) {
				uni.navigateTo({
					url: '/pages/driver/billReport/index?day=' + this.TabCur + '&tab=' + tab
				});
			},
			getStatisticFun() {
				this.statisticLoading = true;
				this.statisticTask = uni.request({
				    url: 'apis/transportation/driverStatistics/headStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.statisticData = res.data.data;
					},
					complete: () => {
						this.statisticLoading = false;
					}
				});
			},
			getTransportFun() {
				this.transportLoading = true;
				this.transportTask = uni.request({
				    url: 'apis/transportation/driverStatistics/transportStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.transportTime = res.data.data.xtime;
						this.transportData = [{
							name: '已接单',
							data: res.data.data.orderReceivedList,
							color: '#FFCF5B'
						},{
							name: '已卸货',
							data: res.data.data.unloadedList,
							color: '#477AE4'
						}];
						this.$nextTick(() => {
							this.$refs['TransportRef'].initChart();
							})
					},
					complete: () => {
						this.transportLoading = false;
					}
				});
			},
			getPeeFun() {
				this.peeLoading = true;
				this.peeTask = uni.request({
				    url: 'apis/transportation/driverStatistics/shippingStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.peeTime = res.data.data.xtime;
						this.peeData = [{
							name: '实收金额',
							data: res.data.data.actualAmountList,
							color: '#55C876'
						}];
						this.$nextTick(() => {
							this.$refs['PeeRef'].initChart();
						})
					},
					complete: () => {
						this.peeLoading = false;
					}
				});
			},
			getCarFun() {
				this.carLoading = true;
				this.carTask = uni.request({
				    url: 'apis/transportation/driverStatistics/carStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.carNum = res.data.data.carNum;
						this.carList = res.data.data.carStatisticsList;
					},
					complete: () => {
						this.carLoading = false;
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	font-family: PingFang SC;
	.scroll-box{
		position: relative;
		z-index: 1;
		padding-bottom: 1rpx;
	}
	.order-title{
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}
	.order-box{
		font-family: PingFang SC;
		font-size: 24rpx;
		font-weight: 500;
		color: #999999;
		.unit{
			display: inline-block;
			transform: scale(0.8);
			padding-left: 4rpx;
		}
		.count{
			font-size: 36rpx;
			font-weight: bold;
			color: #333333;
			padding-left: 16rpx;
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
}
</style>
