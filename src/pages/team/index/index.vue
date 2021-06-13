<template>
	<view class="shipment-index">
		<Header :show-bg="false">
			<text slot="title">统计服务</text>
		</Header>
		
		<Screen v-model="TabCur" />
		
		<view class="scroll-box">
			<view class="c-app-container" style="height: 170rpx;">
				<Loading v-if="statisticLoading"></Loading>
				<view v-else class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(orderNum) }}</text>
							<text class="unit">{{ numberFormatUnit(orderNum) }}单</text>
						</view>
						<view class="label" @click="transportMore(1)">运单完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(PeeNum) }}</text>
							<text class="unit">{{ numberFormatUnit(PeeNum) }}元</text>
						</view>
						<view class="label" @click="transportMore(2)">实收运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(statisticData.activeDriverNum) }}</text>
							<text class="unit">{{ numberFormatUnit(statisticData.activeDriverNum) }}人</text>
						</view>
						<view class="label" @tap="driverMore">活跃司机<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(statisticData.activeVechicleNum) }}</text>
							<text class="unit">{{ numberFormatUnit(statisticData.activeVechicleNum) }}辆</text>
						</view>
						<view class="label" @tap="carMore">活跃车辆<text class="has-arrow"></text></view>
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
					<view class="c-app-container__box ly-flex-pack-justify">
						<view class="order-box">
							总车辆
							<text class="unit">({{ numberFormatUnit(statisticData.vechicleNum) }}辆)</text>
							<text class="count">{{ numberFormat(statisticData.vechicleNum) }}</text>
						</view>
						<view class="order-box">
							活跃车辆
							<text class="unit">({{ numberFormatUnit(statisticData.activeVechicleNum) }}辆)</text>
							<text class="count">{{ numberFormat(statisticData.activeVechicleNum) }}</text>
						</view>
					</view>
					<view class="c-app-container__box">
						<view class="order-title">运输TOP3</view>
						<!-- v-for -->
						<view v-for="(item, index) in carList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
							<view class="c-order-box__label ly-flex-align-center">
								<image class="order" :src="'/static/order_' + (index + 1) + '.png'"></image>
								<text class="name">{{ item.vehicleName }}</text>
							</view>
							<text class="c-order-box__count">{{ item.orderReceiving }}单</text>
						</view>
					</view>
				</template>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">司机统计</text>
					<text class="button" @tap="driverMore">查看更多</text>
				</view>
				<Loading v-if="driverLoading"></Loading>
				<template v-else>
					<view class="c-app-container__box ly-flex-pack-justify">
						<view class="order-box">
							总司机
							<text class="unit">({{ numberFormatUnit(statisticData.driverNum) }}人)</text>
							<text class="count">{{ numberFormat(statisticData.driverNum) }}</text>
						</view>
						<view class="order-box">
							活跃司机
							<text class="unit">({{ numberFormatUnit(statisticData.activeDriverNum) }}人)</text>
							<text class="count">{{ numberFormat(statisticData.activeDriverNum) }}</text>
						</view>
					</view>
					<view class="c-app-container__box">
						<view class="order-title">运输TOP3</view>
						<!-- v-for -->
						<view v-for="(item, index) in driverList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
							<view class="c-order-box__label ly-flex-align-center">
								<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
								<text class="name">{{ item.driverName }}</text>
							</view>
							<text class="c-order-box__count">{{ item.orderReceiving }}单</text>
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
				this.driverTask.abort();
				this.getStatisticFun();
				this.getTransportFun();
				this.getPeeFun();
				this.getCarFun();
				this.getDriverFun();
			}
		},
		data() {
			return {
				// 时间筛选
				TabCur: 1,
				statisticTask: null,
				statisticLoading: false,
				statisticData: {
					vechicleNum: 0,
					activeVechicleNum: 0,
					driverNum: 0,
					activeDriverNum: 0
				},
				orderNum: 0,
				PeeNum: 0,
				// 用车统计
				carTask: null,
				carList: [],
				carLoading: false,
				// 司机统计
				driverTask: null,
				driverList: [],
				driverLoading: false,
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
		async mounted() {
			await this.$onLaunched;
			this.getStatisticFun();
			this.getTransportFun();
			this.getPeeFun();
			this.getCarFun();
			this.getDriverFun();
		},
		methods: {
			carMore() {
				uni.navigateTo({
					url: '/pages/team/vehicleReport/index?day=' + this.TabCur
				});
			},
			driverMore() {
				uni.navigateTo({
					url: '/pages/team/driverReport/index?day=' + this.TabCur
				});
			},
			transportMore(tab) {
				uni.navigateTo({
					url: '/pages/team/billReport/index?day=' + this.TabCur + '&tab=' + tab
				});
			},
			getStatisticFun() {
				this.statisticLoading = true;
				this.statisticTask = uni.request({
				    url: process.env.VUE_APP_BASE_API + '/transportation/team-app/statistics/getTeamOfCarAndDriver',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						if (res.data && res.data.data) {
							this.statisticData = res.data.data;
						} else {
							this.statisticData = {
								vechicleNum: 0,
								activeVechicleNum: 0,
								driverNum: 0,
								activeDriverNum: 0
							};
						}
					},
					complete: () => {
						this.statisticLoading = false;
					}
				});
			},
			getTransportFun() {
				this.transportLoading = true;
				this.transportTask = uni.request({
				    url: process.env.VUE_APP_BASE_API + '/transportation/team-app/statistics/getTeamWaybillCount',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.orderNum = 0;
						this.transportTime = [];
						const orderArr = [];
						const unloadArr = [];
						if (res.data && res.data.data) {
							this.orderNum = res.data.data.orderUnloaCount || 0;
							const { orderReceivingList, orderUnloadList } = res.data.data;
							if(orderReceivingList){
								orderReceivingList.forEach(el => {
									this.transportTime.push(el.timeTag);
									orderArr.push(el.waybill);
								});
							}
							if(orderUnloadList){
								orderUnloadList.forEach(el => {
									unloadArr.push(el.waybill);
								});
							}
						}
						this.transportData = [{
							name: '已接单',
							data: orderArr,
							color: '#FFCF5B'
						},{
							name: '已卸货',
							data: unloadArr,
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
				    url: process.env.VUE_APP_BASE_API + '/transportation/team-app/statistics/getTeamWaybillFreight',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.PeeNum = 0;
						this.peeTime = [];
						const peeArr = [];
						if (res.data && res.data.data) {
							this.PeeNum = res.data.data.waybillAmount || 0;
							const { freightVoList } = res.data.data;
							if(freightVoList){
								freightVoList.forEach(el => {
									this.peeTime.push(el.timeTag);
									peeArr.push(el.money);
								});
							}
						}
						this.peeData = [{
							name: '实收金额',
							data: peeArr,
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
				    url: process.env.VUE_APP_BASE_API + '/transportation/team-app/statistics/getTeamVehicleRanking',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						if (res.data && res.data.data) {
							this.carList = res.data.data;
						} else {
							this.carList = [];
						}
					},
					complete: () => {
						this.carLoading = false;
					}
				});
			},
			getDriverFun() {
				this.driverLoading = true;
				this.driverTask = uni.request({
				    url: process.env.VUE_APP_BASE_API + '/transportation/team-app/statistics/getTeamDriverRanking',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						if (res.data && res.data.data) {
							this.driverList = res.data.data;
						} else {
							this.driverList = [];
						}
					},
					complete: () => {
						this.driverLoading = false;
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
