<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<template slot="title">
				<view class="tabs flex align-center">
					<view v-for="(item, index) in tablist" :key="index" :class="tab === item.tab ? 'tabs-onbotton': 'tabs-botton'" @click="handleClick(item.tab)">
						{{ item.tabName }}
					</view>
				</view>
			</template>
		</Header>
		<Screen v-model="timeType" />
		<view class="top-fixed">
			<view v-if="tab === 1" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="label">已接单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.loadedCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.loadedCount) }}单</text>
						</view>
						<view class="label">已装货</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.unloadedCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.unloadedCount) }}单</text>
						</view>
						<view class="label">已卸货</text></view>
					</view>
				</view>
			</view>
			<view v-if="tab === 2" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;">{{ numberFormat(costHead.unpaidCount) }}</text>
							<text class="unit">{{ numberFormatUnit(costHead.unpaidCount) }}单</text>
						</view>
						<view class="count">
							<text class="num">{{ numberFormat(costHead.unpaidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(costHead.unpaidSum) }}元</text>
						</view>
						<view class="label">待付款</view>
					</view>
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;">{{ numberFormat(costHead.paidCount) }}</text>
							<text class="unit">{{ numberFormatUnit(costHead.paidCount) }}单</text>
						</view>
						<view class="count">
							<text class="num">{{ numberFormat(costHead.paidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(costHead.paidSum) }}元</text>
						</view>
						<view class="label">已付款</view>
					</view>
				</view>
			</view>
		</view>
		<view :style="tab === 2? 'height: 242upx;':'height: 170upx;'"></view>
		
		<uni-collapse v-if="tab === 1" :accordion="true" @change="transChange">
			<uni-collapse-item v-for="(item, index) in monthList" :key="index" :name="item" :title="parseTime(item, '{y}年{m}月')" :show-animation="true">
				<view v-for="(cont, index) in transData[item]" :key="index" class="c-app-container min">
					<view class="time">{{ parseTime(cont.dayTime, '{m}月{d}日') }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.receiveCount) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.receiveCount) }}单</text>
							</view>
							<view class="label">已接单</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.loadedCount) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.loadedCount) }}单</text>
							</view>
							<view class="label">已装货</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(cont.unloadedCount) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.unloadedCount) }}单</text>
							</view>
							<view class="label">已卸货</text></view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<uni-collapse v-if="tab === 2" :accordion="true" @change="costChange">
			<uni-collapse-item v-for="(item, index) in monthList" :key="index" :name="item" :title="parseTime(item, '{y}年{m}月')" :show-animation="true">
				<view v-for="(cont, index) in costData[item]" :key="index" class="c-app-container min">
					<view class="time">{{ parseTime(cont.dayTime, '{m}月{d}日') }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count" style="margin-bottom: 30upx;">
								<text class="num" style="font-size: 28upx;">{{ numberFormat(cont.unpaidCount) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.unpaidCount) }}单</text>
							</view>
							<view class="count">
								<text class="num">{{ numberFormat(cont.unpaidSum) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.unpaidSum) }}元</text>
							</view>
							<view class="label">待付款</view>
						</view>
						<view class="c-count-box">
							<view class="count" style="margin-bottom: 30upx;">
								<text class="num" style="font-size: 28upx;">{{ numberFormat(cont.paidCount) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.paidCount) }}单</text>
							</view>
							<view class="count">
								<text class="num">{{ numberFormat(cont.paidSum) }}</text>
								<text class="unit">{{ numberFormatUnit(cont.paidSum) }}元</text>
							</view>
							<view class="label">已付款</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		<!-- 空数据 -->
		<NonePage v-if="monthList.length === 0" />
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Screen from '@/components/Screen/Screen.vue';
	import Header from '@/components/Header/Header.vue';
	import NonePage from '@/components/NonePage/NonePage.vue';
	import { getTransMonth, getTransHead, getTransData, getCostMonth, getCostHead, getCostData } from '@/config/service/driver.js';
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
				this.getTransHead();
				this.getCostHead();
			}
		},
		data() {
			return {
				// Tabs参数
				tablist: [{ tabName: '运输报表', tab: 1 }, { tabName: '费用报表', tab: 2 }],
				tab: 1,
				timeType: 1,
				monthList: [],
				transHead: {},
				transData: {},
				costHead: {},
				costData: {}
			}
		},
		onLoad(options) {
			if (options) {
				this.timeType = options.day - 0;
				this.tab = options.tab - 0;
				if(options.tab == 1){
					this.getTransMonth();
					this.getTransHead();
				}else{
					this.getCostMonth();
					this.getCostHead();
				}
			}
		},
		methods: {
			// 判断数组是否有该项值
			judgeList(list, key){
				this.judge = false;
				this.judge = list.hasOwnProperty(key);
			},
			transChange(e){
				if(e.length !== 0){
					if(this.transData){
						this.judgeList(this.transData, e[0])
						if (this.judge){
							return;
						}else{
							this.getTransData(e[0]);
						}
					}else{
						this.getTransData(e[0]);
					}
				}
			},
			costChange(e){
				if (e.length !== 0){
					if(this.costData){
						this.judgeList(this.costData, e[0])
						if (this.judge){
							return;
						}else{
							this.getCostData(e[0]);
						}
					}else{
						this.getCostData(e[0]);
					}
				}
			},
			handleClick(e){
				this.tab = e;
				this.monthList = [];
				if (e == 1){
					this.getTransMonth();
					this.getTransHead();
				}else{
					this.getCostMonth();
					this.getCostHead();
				}
			},
			// 获取运输报表月份
			getTransMonth() {
				getTransMonth(this.headerInfo).then(response => {
					this.monthList = response.data;
				})
			},
			// 获取运输报表头部
			getTransHead() {
				getTransHead(this.timeType, this.headerInfo).then(response => {
					this.transHead = response.data;
				})
			},
			// 获取运输报表月份数据
			getTransData(e) {
				// console.log(e);
				getTransData(e, this.headerInfo).then(response => {
					this.transData = {...this.transData, [e]: response.data};
				})
			},
			// 获取费用报表月份
			getCostMonth() {
				getCostMonth(this.headerInfo).then(response => {
					this.monthList = response.data;
				})
			},
			// 获取费用报表头部
			getCostHead() {
				getCostHead(this.timeType, this.headerInfo).then(response => {
					this.costHead = response.data;
				})
			},
			// 获取费用报表月份数据
			getCostData(e) {
				getCostData(e, this.headerInfo).then(response => {
					this.costData = {...this.costData, [e]: response.data};
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	padding-bottom: 30upx;
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
// 头部导航栏
.tabs{
	height: 75upx;
	// width: 100%;
	// margin: 0 30upx;
	border-radius: 50upx;
	background: rgba(255,255,255,0.2);
}
.tabs-onbotton{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 220upx;
	height: 75upx;
	font-weight: bold;
	font-size: 28upx;
	color: #4478E4;
	border-radius: 50upx;
	background-color: #FFFFFF;
}
.tabs-botton{
	display: flex;
	align-items: center;
	justify-content: center;
	width: 200upx;
	height: 75upx;
	font-weight: bold;
	font-size: 28upx;
	color: #FFFFFF;
}
.top-fixed{
	position: fixed;
	left: 0;
	z-index: 10;
	width: 100%;
}
// 手风琴样式
::v-deep .uni-collapse{
	background-color: #00000000;
}
::v-deep .uni-collapse-cell{
	margin: 20upx 24upx 0;
	border-radius: 12upx;
	overflow: hidden;
	border: 0;
}
::v-deep .uni-collapse-cell__title{
	background-color: rgba(68, 120, 228, 0.15);
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #4478E4;
	line-height: 32upx;
}
::v-deep .uni-collapse-cell--hide .uni-collapse-cell__title{
	background-color: #FFFFFF;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #4478E4;
	line-height: 32upx;
}
::v-deep .uni-collapse-cell__content{
	background-color: #FFFFFF;
}
.min{
	border-bottom: 1upx solid #F2F2F3;
	margin: 0 30upx;
	border-radius: 0;
	// padding: 40upx 30upx;
}
.min .num {
	font-size: 32upx;
}
.time{
	margin: 0 0 50upx;
	font-size: 28upx;
	font-family: PingFang SC;
	font-weight: bold;
	color: #333333;
	line-height: 32upx;
}
</style>
