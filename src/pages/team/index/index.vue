<template>
	<view class="shipment-index">
		<Header :show-bg="false">
			<text slot="title">统计服务</text>
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
		<view style="height: 94upx;"></view>
		
		<view class="scroll-box">
			<view class="c-app-container">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="255"></text>
							<text class="unit">单</text>
						</view>
						<view class="label" @tap="transportMore">运单完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="255"></text>
							<text class="unit">元</text>
						</view>
						<view class="label" @tap="transportMore">实收运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="255"></text>
							<text class="unit">人</text>
						</view>
						<view class="label" @tap="driverMore">活跃司机<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="255"></text>
							<text class="unit">辆</text>
						</view>
						<view class="label" @tap="carMore">用车<text class="has-arrow"></text></view>
					</view>
				</view>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">运输统计</text>
					<text class="button" @tap="transportMore">查看更多</text>
				</view>
				<LineChart 
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
					<text class="button" @tap="transportMore">查看更多</text>
				</view>
				<LineChart 
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
						<text class="unit">(辆)</text>
						<text class="count" v-number-format="78655"></text>
					</view>
					<view class="order-box">
						活跃车辆
						<text class="unit">(辆)</text>
						<text class="count" v-number-format="78655"></text>
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
						<text class="unit">(人)</text>
						<text class="count" v-number-format="78655"></text>
					</view>
					<view class="order-box">
						活跃司机
						<text class="unit">(人)</text>
						<text class="count" v-number-format="78655"></text>
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
		data() {
			return {
				// 时间筛选
				timelist: [
					{ tag: '近七天', day: 7 }, 
					{ tag: '近一月', day: 30 }, 
					{ tag: '近半年', day: 180 }, 
					{ tag: '近一年', day: 365 },
				],
				TabCur: 7,
				queryParams: {
					startTime: null,
					endTime: null
				},
				// 用车统计
				carList: [{}, {}, {}],
				// 司机统计
				driverList: [{}, {}, {}],
				// 运输统计
				transportTime: [1, 2, 3, 4],
				transportData: [{
					name: '已接单',
					data: [1, 2, 3, 4],
					color: '#FFCF5B'
				},{
					name: '已卸货',
					data: [6, 7, 8, 9],
					color: '#477AE4'
				}],
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
				// 开票统计
				billTime: [1, 2, 3, 4],
				billData: [{
					name: '已开票金额',
					data: [1, 2, 3, 4],
					color: '#7E5DEB'
				}],
				billUnit: '元',
				billUnitTime: '天'
			}
		},
		async mounted() {
			await this.$onLaunched;
			
		},
		methods: {
			tabSelect(e) {
				this.queryParams.startTime = this.parseTime(new Date().getTime() - 24 * 60 * 60 * 1000 * e, '{y}-{m}-{d}');
				this.queryParams.endTime = this.parseTime(new Date(), '{y}-{m}-{d}');
				this.TabCur = e;
			},
			carMore() {
				uni.navigateTo({
					url: '/'
				});
			},
			driverMore() {
				uni.navigateTo({
					url: '/'
				});
			},
			transportMore() {
				uni.navigateTo({
					url: '/'
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
