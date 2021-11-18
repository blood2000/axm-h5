<template>
	<view class="item-card">
		<view class="item-card__title" @click="handleItem()">
			<view class="title-box">
				<text class="label">项目：</text>
				<text class="title">{{ itemDataCount.projectName }}</text>
			</view>
			<template v-if="place === 'home'">
				<text class="g-icon-arrow"></text>
			</template>
			<template v-if="place === 'statistic' && !hasTime">
				<view class="arrow-box">
					<text class="arrow-text">更改</text>
					<text class="g-icon-arrow blue"></text>
				</view>
			</template>
			<template v-if="place === 'change'">
				<text v-if="changed === itemDataCount.projectCode" class="change-text">已选择</text>
				<button v-else type="default" class="change-button" @click="changeItem">选择</button>
			</template>
			<view v-if="hasTime" class="example-body" @click.stop>
				<uni-datetime-picker
					v-model="range"
					type="daterange"
					rangeSeparator="-"
					:border="false"
					:clear-icon="true"
					@change="changeTime"
				/>
			</view>
		</view>
		<view class="item-card__content">
			<view class="item-card__content__block">
				<text class="count">{{ itemDataCount.todayFinishCount || 0 }}</text>
				<text class="label">今日完成量</text>
			</view>
			<view class="item-card__content__block">
				<text class="count">{{ itemDataCount.todayApproachCount || 0 }}</text>
				<text class="label">今日进场量</text>
			</view>
			<view class="item-card__content__block" @click="handleCountDetail">
				<text class="count">{{ itemDataCount.cumulativeCount || 0 }}</text>
				<text class="label">累计完成量<text v-if="hasTime" class="has-arrow" /></text>
			</view>
		</view>
		
		<uni-popup ref="popup" type="center" :mask-click="true">
			<view class="own-popup-page">
				<h5>
					累计完成量
					<uni-icons class="fr" type="closeempty" size="22" style="font-weight: normal;margin-top: -2upx;" @click="closePopup"></uni-icons>
				</h5>
				<view class="row" v-for="(item, index) in muckardCounts" :key="index">
					<text class="label">{{ item.mudtail }}：</text>
					<text class="text">{{ item.trainNumber }}</text>
				</view>
				<view class="total">
					<text class="label">合计：</text>
					<text class="text">{{ muckardTotal }}</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { MudtailDetailsByTime, getCountByTime } from '@/config/service/statistic.js';
	export default {
		props: {
			itemData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			place: {
				type: String,
				default: null
			},
			changed: {
				type: String,
				default: null
			},
			hasTime: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				range: [this.parseTime(new Date(), '{y}-{m}-{d}'), this.parseTime(new Date(), '{y}-{m}-{d}')],
				itemDataCount: this.itemData,
				muckardCounts: [],
				muckardTotal: 0
			}
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		watch: {
			'itemData.projectCode': {
				handler(value) {
					this.itemDataCount = this.itemData;
					this.changeTime(this.range);
				},
			}
		},
		methods: {
			handleItem() {
				if(this.place === 'home'){
					uni.navigateTo({
						url: '/pages/finance/statistic/index?item=' + encodeURIComponent(JSON.stringify(this.itemDataCount))
					});
				}
				if(this.place === 'statistic'){
					uni.navigateTo({
						url: '/pages/finance/itemChange/index?projectCode=' + this.itemDataCount.projectCode
					});
				}
			},
			changeItem() {
				let pages = getCurrentPages(); // 获取当前页面栈的实例，以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面
				let nowPage = pages[pages.length - 1]; //当前页页面实例
				let prevPage = pages[pages.length - 2]; //上一页页面实例
				prevPage.$vm.getItemData(this.itemDataCount); // 给上一页綁定方法getItemData
				uni.navigateBack({
					delta: 1
				});
			},
			// 弹窗的泥尾统计
			handleCountDetail() {
				if (!this.hasTime) {
					return;
				}
				if (!this.range || this.range.length === 0 || (this.range[0] === '' && this.range[1] === '')) {
					uni.showToast({
						title: '起始日期-结束日期不能为空',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				this.$refs.popup.open('center');
				MudtailDetailsByTime({
					bigQueryDate: this.range[0],
					endQueryDate: this.range[1],
					projectCode: this.itemDataCount.projectCode
				}, this.headerInfo).then(response => {
					this.muckardCounts = response.data.muckardCounts || [];
					this.muckardTotal = response.data.total || 0;
				})
			},
			// 按时间段查统计量
			changeTime(arr) {
				if (arr && arr.length > 0) {
					getCountByTime({
						bigQueryDate: arr[0],
						endQueryDate: arr[1],
						projectCode: this.itemDataCount.projectCode
					}, this.headerInfo).then(response => {
						this.itemDataCount = response.data;
					})
				} else {
					this.itemDataCount = this.itemData
				}
			},
			// 关闭
			closePopup() {
				this.$refs.popup.close()
			}
		}
	}
</script>

<style lang="scss" scoped>
.item-card{
	width: calc(100% - 44rpx);
	height: 259rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 30rpx;
	padding: 0 24rpx;
	margin-bottom: 24rpx;
	color: #333333;
	&__title{
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #F2F2F2;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		&::before{
			content: '';
			position: absolute;
			left: -24rpx;
			top: 50%;
			margin-top: -21rpx;
			width: 10rpx;
			height: 42rpx;
			background: #477AE4;
			border-radius: 5rpx;
		}
		>.title-box{
			width: 60%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			.label{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}
			.title{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
		>.arrow-box{
			display: flex;
			align-items: center;
			.arrow-text{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #4478E4;
			}
		}
		.change-button{
			width: 122rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #4478E4;
			border-radius: 10px;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
			margin: 0;
		}
		.change-text{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
	}
	&__content{
		height: 158rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		&__block{
			.count{
				display: block;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 44rpx;
				text-align: center;
			}
			.label{
				display: block;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				line-height: 44rpx;
				text-align: center;
				.has-arrow{
					display: inline-block;
					vertical-align: middle;
					width: 9rpx;
					height: 16rpx;
					background: url('/static/icon_arrow.png') no-repeat;
					background-size: 100% 100%;
					margin-top: -5rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	// 弹窗样式
	.own-popup-page{
		width: 80vw;
		min-height: 250rpx;
		border-radius: 10rpx;
		overflow: hidden;
		background: #FFFFFF;
		padding: 30rpx;
		>h5{
			text-align: center;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #000;
			margin-bottom: 26rpx;
		}
		>.row {
			display: inline-block;
			width: 50%;
		}
		>.row, >.total{
			line-height: 50rpx;
			font-size: 28rpx;
		}
		>.total{
			margin-top: 20rpx;
			text-align: right;
			font-weight: bold;
		}
	}
}

// 时间控件样式
/deep/.uni-date__icon-logo{
	display: none;
}
/deep/.uni-date-x {
	height: 24rpx;
	font-size: 22rpx;
	padding: 0;
}
/deep/.uni-date__input{
	width: 160rpx;
}
</style>
