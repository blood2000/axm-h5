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
		<!-- 头部数据 -->
		<view class="top-fixed">
			<!-- 运输报表头部 -->
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
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="label">已装货</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="label">已卸货</text></view>
					</view>
				</view>
			</view>
			<!-- 费用报表头部 -->
			<view v-if="tab === 2" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">已核算</view>
					</view>
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">已申请</view>
					</view>
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}单</text>
						</view>
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">已打款</text></view>
					</view>
				</view>
			</view>
			<!-- 开票报表头部 -->
			<view v-if="tab === 3" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">待申请</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">已申请</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
							<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
						</view>
						<view class="label">已开票</text></view>
					</view>
				</view>
			</view>
		</view>
		<view :style="tab === 2? 'height: 242upx;':'height: 170upx;'"></view>
		
		<!-- 运输报表内容 -->
		<uni-collapse v-if="tab === 1" :accordion="true" @change="transChange">
			<uni-collapse-item v-for="(item, index) in monthList" :key="index" :name="item" :title="parseTime(item, '{y}年{m}月')" :show-animation="true">
				<view v-for="(cont, index) in transData" :key="index" class="c-app-container min">
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
		
		<!-- 费用报表内容 -->
		<uni-collapse v-if="tab === 2" :accordion="true" @change="costChange">
			<uni-collapse-item v-for="(item, index) in monthList" :key="index" :name="item" :title="parseTime(item, '{y}年{m}月')" :show-animation="true">
				<view v-for="(cont, index) in costData" :key="index" class="c-app-container min">
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
							<view class="label">已核算</view>
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
							<view class="label">已申请</view>
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
							<view class="label">已打款</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<!-- 开票报表内容 -->
		<uni-collapse v-if="tab === 3" :accordion="true" @change="billingChange">
			<uni-collapse-item v-for="(item, index) in monthList" :key="index" :name="item" :title="parseTime(item, '{y}年{m}月')" :show-animation="true">
				<view v-for="(cont, index) in billingData" :key="index" class="c-app-container min">
					<view class="time">{{ parseTime(cont.dayTime, '{m}月{d}日') }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
								<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
							</view>
							<view class="label">待申请</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
								<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
							</view>
							<view class="label">已申请</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num">{{ numberFormat(transHead.receiveCount) }}</text>
								<text class="unit">{{ numberFormatUnit(transHead.receiveCount) }}元</text>
							</view>
							<view class="label">已开票</text></view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Screen from '@/components/Screen/Screen.vue';
	import Header from '@/components/Header/Header.vue';
	import { getTransMonth, getTransHead, getTransData, getCostMonth, getCostHead, getCostData, getBillingMonth, getBillingHead, getBillingData } from '@/config/service/shipment.js';
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
			timeType(){
				this.getTransHead();
				this.getCostHead();
				this.getBillingHead();
			}
		},
		data() {
			return {
				// Tabs参数
				tablist: [{ tabName: '运输报表', tab: 1 }, { tabName: '费用报表', tab: 2 }, { tabName: '开票报表', tab: 3 }],
				tab: 1,
				timeType: 1,
				monthList: [],
				transHead: {},
				transData: [],
				costHead: {},
				costData: [],
				billingHead: {},
				billingData: []
			}
		},
		onLoad(options) {
			if (options) {
				this.timeType = options.day - 0;
				this.tab = options.tab - 0;
				if(options.tab == 1){
					this.getTransMonth();
					this.getTransHead();
				}else if(options.tab == 2){
					this.getCostMonth();
					this.getCostHead();
				}else{
					this.getBillingMonth();
					this.getBillingHead();
				}
			}
		},
		methods: {
			transChange(e){
				this.transData = [];
				if(e.length !== 0){
					this.getTransData(e);
				}
			},
			costChange(e){
				this.costData = [];
				if (e.length !== 0){
					this.getCostData(e);
				}
			},
			billingChange(e){
				this.billingData = [];
				if (e.length !== 0){
					this.getBillingData(e);
				}
			},
			handleClick(e){
				this.tab = e;
				if (e == 1){
					this.getTransMonth();
					this.getTransHead();
				}else if(e == 2){
					this.getCostMonth();
					this.getCostHead();
				}else{
					this.getBillingMonth();
					this.getBillingHead();
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
				getTransData(e[0], this.headerInfo).then(response => {
					this.transData = response.data;
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
				getCostData(e[0], this.headerInfo).then(response => {
					this.costData = response.data;
				})
			},
			// 获取开票报表月份
			getBillingMonth() {
				getBillingMonth(this.headerInfo).then(response => {
					this.monthList = response.data;
				})
			},
			// 获取开票报表头部
			getBillingHead() {
				getBillingHead(this.timeType, this.headerInfo).then(response => {
					this.billingHead = response.data;
				})
			},
			// 获取开票报表月份数据
			getBillingData(e) {
				getBillingData(e[0], this.headerInfo).then(response => {
					this.billingData = response.data;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
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
// 时间筛选
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
