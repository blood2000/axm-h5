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
		<Screen v-model="queryParams.timeType" />
		<view class="top-fixed">
			<view v-if="tab === 1" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">单</text>
						</view>
						<view class="label">已接单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">单</text>
						</view>
						<view class="label">已装货</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">单</text>
						</view>
						<view class="label">已卸货</text></view>
					</view>
				</view>
			</view>
			<view v-if="tab === 2" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;" v-number-format="234"></text>
							<text class="unit">单</text>
						</view>
						<view class="count">
							<text class="num" v-number-format="1252631"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">待付款</view>
					</view>
					<view class="c-count-box">
						<view class="count" style="margin-bottom: 30upx;">
							<text class="num" style="font-size: 32upx;" v-number-format="234"></text>
							<text class="unit">单</text>
						</view>
						<view class="count">
							<text class="num" v-number-format="1252631"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">已付款</view>
					</view>
				</view>
			</view>
		</view>
		<view :style="tab === 2? 'height: 242upx;':'height: 170upx;'"></view>
		
		<uni-collapse v-if="tab === 1" :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<view v-for="(cont, index) in item.content" :key="index" class="c-app-container min">
					<view class="time">{{ cont.time }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">单</text>
							</view>
							<view class="label">已接单</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">单</text>
							</view>
							<view class="label">已装货</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">单</text>
							</view>
							<view class="label">已卸货</text></view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
		
		<uni-collapse v-if="tab === 2" :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<view v-for="(cont, index) in item.content" :key="index" class="c-app-container min">
					<view class="time">{{ cont.time }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count" style="margin-bottom: 30upx;">
								<text class="num" style="font-size: 28upx;" v-number-format="234"></text>
								<text class="unit">单</text>
							</view>
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">待付款</view>
						</view>
						<view class="c-count-box">
							<view class="count" style="margin-bottom: 30upx;">
								<text class="num" style="font-size: 28upx;" v-number-format="234"></text>
								<text class="unit">单</text>
							</view>
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">已付款</view>
						</view>
					</view>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList: [{}, {}, {}],
				peeList: [{}, {}, {}],
				// Tabs参数
				tablist: [{ tabName: '运输报表', tab: 1 }, { tabName: '费用报表', tab: 2 }],
				tab: 1,
				queryParams: {
					timeType: 1
				},
				accordion: [{
						id: 0,
						title: '3月',
						content: [{
							time: '3月5日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '3月4日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '3月3日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						}],
						animation: true
					},
					{
						id: 1,
						title: '2月',
						content: [{
							time: '2月5日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '2月4日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '2月3日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						}],
						animation: true
					},
					{
						id: 2,
						title: '1月',
						content: [{
							time: '1月5日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '1月4日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						},{
							time: '1月3日',
							jiedan: '126',
							zhuanghuo: '135',
							xiehuo: '256'
						}],
						animation: true
					}
				],
			}
		},
		onLoad(options) {
			if (options) {
				this.queryParams.timeType = options.day - 0;
				this.tab = options.tab - 0;
			}
		},
		methods: {
			handleClick(e){
				this.tab = e;
			}
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
