<template>
	<view class="shipment-index">
		<Header :show-bg="false">
			<text slot="title">统计服务</text>
		</Header>
		
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
						<view class="label" @tap="transportMore">运费完成<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label" @tap="transportMore">实付运费<text class="has-arrow"></text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label" @tap="transportMore">开票<text class="has-arrow"></text></view>
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
					<text class="text">开票统计</text>
					<text class="button" @tap="transportMore">查看更多</text>
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
			itemMore() {
				uni.navigateTo({
					url: '/pages/shipment/projectReport/index'
				});
			},
			orderMore() {
				uni.navigateTo({
					url: '/pages/shipment/orderReport/index'
				});
			},
			transportMore() {
				uni.navigateTo({
					url: '/pages/shipment/billReport/index'
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
}
</style>
