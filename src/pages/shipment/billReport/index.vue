<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<template slot="title">
				<view class="tabs flex align-center">
					<view v-for="(item, index) in tablist" :key="index" :class="activeName === item.tabName ? 'tabs-onbotton': 'tabs-botton'" @click="handleClick(item.tabName)">
						{{ item.tabName }}
					</view>
				</view>
			</template>
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
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">786<text class="unit">单</text></view>
						<view class="label">已接单</view>
					</view>
					<view class="c-count-box">
						<view class="count">254<text class="unit">单</text></view>
						<view class="label">已装货</view>
					</view>
					<view class="c-count-box">
						<view class="count">234<text class="unit">单</text></view>
						<view class="label">已卸货</text></view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 260upx;"></view>
		
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">货源统计</text>
				<text class="button">查看更多</text>
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
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运输统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">运费统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
		
		<view class="c-app-container">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">开票统计</text>
				<text class="button">查看更多</text>
			</view>
			<view class="chart-box"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
				// Tabs参数
				tablist: [{ tabName: '运输报表' }, { tabName: '费用报表' }, { tabName: '开票报表' }],
				timelist: [{ tag: '近七天', day: 7 }, { tag: '近一月', day: 30 }, { tag: '近半年', day: 180 }, { tag: '近一年', day: 365 }],
				activeName: '运输报表',
				TabCur: 7,
				queryParams: {
					startTime: null,
					endTime: null
				}
			}
		},
		methods: {
			handleClick(e){
				this.activeName = e;
			},
			tabSelect(e) {
				this.queryParams.startTime = this.parseTime(new Date().getTime() - 24 * 60 * 60 * 1000 * e, '{y}-{m}-{d}');
				this.queryParams.endTime = this.parseTime(new Date(), '{y}-{m}-{d}');
				console.log(this.queryParams);
				this.TabCur = e;
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
</style>
