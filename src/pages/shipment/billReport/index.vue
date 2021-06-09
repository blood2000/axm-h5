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
			<view v-if="activeName === '运输报表'" class="c-app-container" style="margin: 0; border-radius: 0;">
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
			<view v-if="activeName === '费用报表'" class="c-app-container" style="margin: 0; border-radius: 0;">
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
						<view class="label">已核算</view>
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
						<view class="label">已申请</view>
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
						<view class="label">已打款</text></view>
					</view>
				</view>
			</view>
			<view v-if="activeName === '开票报表'" class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">待申请</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">已申请</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num" v-number-format="25567"></text>
							<text class="unit">元</text>
						</view>
						<view class="label">已开票</text></view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 260upx;"></view>
		
		<uni-collapse v-if="activeName === '运输报表'" :accordion="true">
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
		
		<uni-collapse v-if="activeName === '开票报表'" :accordion="true">
			<uni-collapse-item v-for="item in accordion" :key="item.id" :title="item.title" :show-animation="item.animation">
				<view v-for="(cont, index) in item.content" :key="index" class="c-app-container min">
					<view class="time">{{ cont.time }}</view>
					<view class="ly-flex-pack-around">
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">待申请</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">元</text>
							</view>
							<view class="label">已申请</view>
						</view>
						<view class="c-count-box">
							<view class="count">
								<text class="num" v-number-format="25567"></text>
								<text class="unit">元</text>
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
