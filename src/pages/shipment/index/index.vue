<template>
	<view class="shipment-index">
		<Header :show-bg="false">
			<text slot="title">统计服务</text>
		</Header>
		
		<Screen v-model="TabCur" />
		
		<view class="scroll-box">
			<view class="c-app-container">
				<Loading v-if="statisticLoading"></Loading>
				<template v-else>
					<view class="ly-flex-pack-around" style="margin-bottom: 40rpx;">
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(statisticData.project) }}</text>
								<text class="unit">{{ numberFormatUnit(statisticData.project) }}个</text>
							</view>
							<view class="label" @tap="itemMore">项目<text class="has-arrow"></text></view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(statisticData.sourceOfGoods) }}</text>
								<text class="unit">{{ numberFormatUnit(statisticData.sourceOfGoods) }}个</text>
							</view>
							<view class="label" @tap="orderMore">货源<text class="has-arrow"></text></view>
						</view>
					</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(statisticData.waybillCompleted) }}</text>
								<text class="unit">{{ numberFormatUnit(statisticData.waybillCompleted) }}单</text>
							</view>
							<view class="label" @click="transportMore(1)">运单完成<text class="has-arrow"></text></view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(statisticData.sumShipperRealPay) }}</text>
								<text class="unit">{{ numberFormatUnit(statisticData.sumShipperRealPay) }}元</text>
							</view>
							<view class="label" @click="transportMore(2)">实付运费<text class="has-arrow"></text></view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(statisticData.sumInvoicedAmountApplied) }}</text>
								<text class="unit">{{ numberFormatUnit(statisticData.sumInvoicedAmountApplied) }}元</text>
							</view>
							<view class="label" @click="transportMore(3)">开票<text class="has-arrow"></text></view>
						</view>
					</view>
				</template>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">货源统计</text>
					<text class="button" @tap="orderMore">查看更多</text>
				</view>
				<Loading v-if="orderLoading"></Loading>
				<template v-else>
					<view class="c-app-container__box">
						<view class="order-title">接单TOP3</view>
						<view class="order-box">
							<!-- v-for -->
							<template v-for="(item, index) in orderList">
								<view class="c-order-box ly-flex-pack-justify ly-flex-align-center">
									<view class="c-order-box__label ly-flex-align-center">
										<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
										<text class="name">{{ item.goodsBigTypeName }}</text>
									</view>
									<text class="c-order-box__count">{{item.sourceStatistics ? item.sourceStatistics : 0}}单</text>
								</view>
								<view class="c-order-address">{{ (item.loadCity ? item.loadCity: '') + ((item.loadCity || item.unloadCity) ? '—' : '') + (item.unloadCity ? item.unloadCity : '') }}</view>
							</template>
						</view>
					</view>
					<view class="c-app-container__box">
						<view class="order-title">付款TOP3</view>
						<view class="order-box">
							<!-- v-for -->
							<template v-for="(item, index) in peeList">
								<view class="c-order-box ly-flex-pack-justify ly-flex-align-center">
									<view class="c-order-box__label ly-flex-align-center">
										<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
										<text class="name">{{ item.goodsBigTypeName }}</text>
									</view>
									<text class="c-order-box__count">{{item.sourceStatistics ? item.sourceStatistics : 0}}单</text>
								</view>
								<view class="c-order-address">{{ (item.loadCity ? item.loadCity: '') + ((item.loadCity || item.unloadCity) ? '—' : '') + (item.unloadCity ? item.unloadCity : '') }}</view>
							</template>
						</view>
					</view>
				</template>
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
					<text class="text">开票统计</text>
					<text class="button" @click="transportMore(3)">查看更多</text>
				</view>
				<LineChart 
					ref="BillRef"
					:id="'bill'"
					:timeData="billTime"
					:countData="billData"
					:unit="billUnit"
					:unitTime="billUnitTime"
					:loading="billLoading"
				></LineChart>
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
				this.orderTask.abort();
				this.transportTask.abort();
				this.peeTask.abort();
				this.billTask.abort();
				this.getStatisticFun();
				this.getOrderFun();
				this.getTransportFun();
				this.getPeeFun();
				this.getBillFun();
			}
		},
		data() {
			return {
				// 时间筛选
				TabCur: 1,
				statisticTask: null,
				statisticLoading: false,
				statisticData: {
					sourceOfGoods: 0,
					project: 0,
					sumInvoicedAmountApplied: 0,
					sumShipperRealPay: 0,
					waybillCompleted: 0
				},
				// 货源统计
				orderTask: null,
				orderLoading: false,
				orderList: [],
				peeList: [],
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
				peeUnitTime: '天',
				// 开票统计
				billTask: false,
				billLoading: false,
				billTime: [],
				billData: [],
				billUnit: '元',
				billUnitTime: '天'
			}
		},
		async mounted() {
			await this.$onLaunched;
			this.getStatisticFun();
			this.getOrderFun();
			this.getTransportFun();
			this.getPeeFun();
			this.getBillFun();
		},
		methods: {
			itemMore() {
				uni.navigateTo({
					url: '/pages/shipment/projectReport/index?day=' + this.TabCur
				});
			},
			orderMore() {
				uni.navigateTo({
					url: '/pages/shipment/orderReport/index?day=' + this.TabCur
				});
			},
			transportMore(tab) {
				uni.navigateTo({
					url: '/pages/shipment/billReport/index?day=' + this.TabCur + '&tab=' + tab
				});
			},
			getStatisticFun() {
				this.statisticLoading = true;
				this.statisticTask = uni.request({
				    url: 'apis/transportation/bulkCargoStatistics/queryStatisticsData',
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
			getOrderFun() {
				this.orderLoading = true;
				this.orderTask = uni.request({
				    url: 'apis/transportation/bulkCargoStatistics/querySourceStatistics',
				    data: {
						timeType: this.TabCur,
						topNumber: 3
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						this.orderList = res.data.data.receivingOrdersStatisticsVos;
						this.peeList = res.data.data.paymentStatisticsVos;
					},
					complete: () => {
						this.orderLoading = false;
					}
				});
			},
			getTransportFun() {
				this.transportLoading = true;
				this.transportTask = uni.request({
				    url: 'apis/transportation/bulkCargoStatistics/queryTransportationStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						const { orderReceivedStatisticsVo, unloadedStatisticsVo } = res.data.data;
						const orderArr = [];
						const unloadArr = [];
						this.transportTime = [];
						if(orderReceivedStatisticsVo){
							orderReceivedStatisticsVo.forEach(el => {
								this.transportTime.push(el.createTime);
								orderArr.push(el.numberStatistics);
							});
						}
						if(unloadedStatisticsVo){
							unloadedStatisticsVo.forEach(el => {
								unloadArr.push(el.numberStatistics)
							});
						}
						this.transportData = [{
							name: '已接单',
							data: orderArr,
							color: '#FFCF5B'
						},{
							name: '已卸货',
							data: unloadArr,
							color: '#477AE4'
						}]
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
				    url: 'apis/transportation/bulkCargoStatistics/queryFreightStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						const arr = [];
						this.peeTime = [];
						res.data.data.forEach(el => {
							this.peeTime.push(el.createTime);
							arr.push(el.numberStatistics);
						});
						this.peeData = [{
							name: '实付金额',
							data: arr,
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
			getBillFun() {
				this.billLoading = true;
				this.billTask = uni.request({
				    url: 'apis/transportation/bulkCargoStatistics/queryBillingStatistics',
				    data: {
						timeType: this.TabCur
					},
					header: Object.assign({'Content-Type': 'application/x-www-form-urlencoded'}, this.headerInfo),
					success: (res) => {
						const arr = [];
						this.billTime = [];
						res.data.data.forEach(el => {
							this.billTime.push(el.createTime);
							arr.push(el.numberStatistics);
						});
						this.billData = [{
							name: '已开票金额',
							data: arr,
							color: '#7E5DEB'
						}];
						this.$nextTick(() => {
							this.$refs['BillRef'].initChart();
						})
					},
					complete: () => {
						this.billLoading = false;
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
