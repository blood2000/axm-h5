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
				<view class="ly-flex-pack-around" style="margin-bottom: 40rpx;">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">个</text>
						</view>
						<view class="label" @tap="itemMore">项目<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">个</text>
						</view>
						<view class="label" @tap="orderMore">货源<text class="has-arrow"></text></view>
					</view>
				</view>
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">单</text>
						</view>
						<view class="label" @click="transportMore(1)">运单完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label" @click="transportMore(2)">实付运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label" @click="transportMore(3)">开票<text class="has-arrow"></text></view>
					</view>
				</view>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">货源统计</text>
					<text class="button" @tap="orderMore">查看更多</text>
				</view>
				<view class="c-app-container__box">
					<view class="order-title">接单TOP3</view>
					<view class="order-box">
						<!-- v-for -->
						<view v-for="(item, index) in orderList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
							<view class="c-order-box__label ly-flex-align-center">
								<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
								<text class="name">煤炭</text>
								<text class="address">宝安机场—华林广场</text>
							</view>
							<text class="c-order-box__count">486单</text>
						</view>
					</view>
				</view>
				<view class="c-app-container__box">
					<view class="order-title">付款TOP3</view>
					<view class="order-box">
						<!-- v-for -->
						<view v-for="(item, index) in peeList" :key="index" class="c-order-box ly-flex-pack-justify ly-flex-align-center">
							<view class="c-order-box__label ly-flex-align-center">
								<image class="order" :src="'../../../static/order_' + (index + 1) + '.png'"></image>
								<text class="name">煤炭</text>
								<text class="address">宝安机场—华林广场</text>
							</view>
							<text class="c-order-box__count">486单</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="c-app-container" style="padding-bottom: 15rpx;">
				<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
					<text class="text">运输统计</text>
					<text class="button" @click="transportMore(1)">查看更多</text>
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
					<text class="button" @click="transportMore(2)">查看更多</text>
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
					<text class="text">开票统计</text>
					<text class="button" @click="transportMore(3)">查看更多</text>
				</view>
				<LineChart 
					:id="'bill'"
					:timeData="billTime"
					:countData="billData"
					:unit="billUnit"
					:unitTime="billUnitTime"
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
		data() {
			return {
				// 时间筛选
				timelist: [
					{ tag: '近七天', day: 1 }, 
					{ tag: '近一月', day: 2 }, 
					{ tag: '近半年', day: 3 }, 
					{ tag: '近一年', day: 4 },
				],
				TabCur: 1,
				queryParams: {
					startTime: null,
					endTime: null
				},
				// 货源统计
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
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
					name: '实付金额',
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
