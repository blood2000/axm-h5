<template>
	<view class="shipment-index">
		<Header :show-bg="false">
			<text slot="title">统计服务</text>
		</Header>
		
		<Screen v-model="TabCur" />
		
		<view class="scroll-box">
			<view class="c-app-container">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(10000) }}</text>
							<text class="unit">{{ numberFormatUnit(10000) }}单</text>
						</view>
						<view class="label" @click="transportMore(1)">运单完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(255) }}</text>
							<text class="unit">{{ numberFormatUnit(255) }}元</text>
						</view>
						<view class="label" @click="transportMore(2)">实收运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(255) }}</text>
							<text class="unit">{{ numberFormatUnit(255) }}人</text>
						</view>
						<view class="label" @tap="driverMore">活跃司机<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(255) }}</text>
							<text class="unit">{{ numberFormatUnit(255) }}辆</text>
						</view>
						<view class="label" @tap="carMore">用车<text class="has-arrow"></text></view>
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
				></LineChart>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">用车统计</text>
					<text class="button" @tap="carMore">查看更多</text>
				</view>
				<view class="c-app-container__box ly-flex-pack-justify">
					<view class="order-box">
						总车辆
						<text class="unit">({{ numberFormatUnit(15202) }}辆)</text>
						<text class="count">{{ numberFormat(15202) }}</text>
					</view>
					<view class="order-box">
						活跃车辆
						<text class="unit">({{ numberFormatUnit(15202) }}辆)</text>
						<text class="count">{{ numberFormat(15202) }}</text>
					</view>
				</view>
				<view class="c-app-container__box">
					<view class="order-title">运输TOP3</view>
					<!-- v-for -->
					<view v-for="(item, index) in carList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
						<view class="c-order-box__label ly-flex-align-center">
							<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
							<text class="name">闽A12345</text>
						</view>
						<text class="c-order-box__count">486单</text>
					</view>
				</view>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">司机统计</text>
					<text class="button" @tap="driverMore">查看更多</text>
				</view>
				<view class="c-app-container__box ly-flex-pack-justify">
					<view class="order-box">
						总司机
						<text class="unit">({{ numberFormatUnit(255) }}人)</text>
						<text class="count">{{ numberFormat(255) }}</text>
					</view>
					<view class="order-box">
						活跃司机
						<text class="unit">({{ numberFormatUnit(255) }}人)</text>
						<text class="count">{{ numberFormat(255) }}</text>
					</view>
				</view>
				<view class="c-app-container__box">
					<view class="order-title">运输TOP3</view>
					<!-- v-for -->
					<view v-for="(item, index) in driverList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
						<view class="c-order-box__label ly-flex-align-center">
							<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
							<text class="name">张三</text>
						</view>
						<text class="c-order-box__count">486单</text>
					</view>
				</view>
			</view>
			
			<view class="cu-load load-modal" v-if="loadModal">
				<view class="gray-text">加载中...</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '@/components/Header/Header.vue';
	import LineChart from '@/pages/components/lineChart.vue';
	import { getTransportData } from '@/config/service/team.js';
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
				this.getTransportFun();
			}
		},
		data() {
			return {
				// 时间筛选
				TabCur: 1,
				// 用车统计
				carList: [{}, {}, {}],
				// 司机统计
				driverList: [{}, {}, {}],
				// 运输统计
				transportTime: [],
				transportData: [],
				transportUnit: '单',
				transportUnitTime: '天',
				// 运费统计
				peeTime: [1, 2, 3, 4],
				peeData: [{
					name: '实收金额',
					data: [1, 2, 3, 4],
					color: '#55C876'
				}],
				peeUnit: '元',
				peeUnitTime: '天',
				// 加载中
				loadModal: false
			}
		},
		async mounted() {
			await this.$onLaunched;
			this.getTransportFun();
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
			getTransportFun() {
				getTransportData(this.TabCur, this.headerInfo).then(response => {
					const { orderReceivingList, orderUnloadList } = response.data;
					const orderArr = [];
					const unloadArr = [];
					this.transportTime = [];
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
