<template>
	<view class="mud-tail-table">
		<view class="mud-tail-table__header">
			<view class="label"><uni-dateformat :date="queryDate" format="yyyy年MM月dd日"></uni-dateformat></view>
			<view class="content">
				<text v-for="(item, index) in muckardCounts" :key="index">{{ item.mudtail + '：' + item.trainNumber }}</text>
			</view>
			<view class="count">合计：{{ total }}</view>
		</view>
		<view class="mud-tail-table__content">
			<view class="mud-tail-table__content__item" v-for="(item, index) in dataList" :key="index">
				<view class="title">
					<text class="index">{{ index + 1 > 9 ? index : '0'+(index + 1) }}</text>
					<text class="label">{{ item.licenseNumber }}</text>
				</view>
				<!-- for -->
				<view class="content" v-for="(val, num) in item.muckardCounts" :key="num">
					<view class="box" style="width: 60%;">
						<text class="lebel">泥尾：</text>
						<text class="text">{{ val.mudtail }}</text>
					</view>
					<view class="box" style="width: 36%;">
						<text class="lebel">车次：</text>
						<text class="text">{{ val.trainNumber }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { MudtailDetails } from '../../config/service/statistic.js';
	export default {
		props: {
			projectCode: {
				type: String,
				default: null
			},
			queryDate: {
				type: String,
				default: null
			}
		},
		data() {
			return {
				total: 0,
				muckardCounts: [],
				dataList: []
			};
		},
		watch: {
			projectCode(val) {
				if (val) {
					this.getData();
				}
			},
			queryDate(val) {
				if (val) {
					this.getData();
				}
			}
		},
		mounted() {
			this.getData();
		},
		methods: {
			getData(){
				MudtailDetails({
					projectCode: this.projectCode,
					queryDate: this.queryDate
				}).then(response => {
					this.total = response.data.total || 0;
					this.muckardCounts = response.data.muckardCounts || [];
					this.dataList = response.data.vechicleMuckards || [];
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.mud-tail-table{
	&__header{
		width: 100%;
		height: 195rpx;
		background: #D0DDF6;
		border-radius: 14rpx 14rpx 0 0;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 20rpx 0 16rpx;
		box-sizing: border-box;
		.label{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
		}
		.content{
			display: flex;
			justify-content: space-between;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
			margin: 0 25rpx;
		}
		.count{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			text-align: right;
			margin-right: 25rpx;
		}
	}
	&__content{
		width: 100%;
		border-left: 1rpx solid #D0DDF6;
		border-right: 1rpx solid #D0DDF6;
		border-bottom: 1rpx solid #D0DDF6;
		border-radius: 0 0 14rpx 14rpx;
		padding: 0 28rpx;
		&__item{
			width: 100%;
			&:not(:last-child){
				border-bottom: 1rpx solid rgba(153, 153, 153, 0.1);
			}
			>.title{
				color: #333333;
				padding: 44rpx 0;
				.index{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					
				}
				.label{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: bold;
					margin-left: 8rpx;
				}
			}
			>.content{
				display: flex;
				justify-content: space-between;
				padding-bottom: 44rpx;
				>.box{
					display: flex;
					.lebel{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #999999;
					}
					.text{
						font-size: 28rpx;
						font-family: PingFang SC;
						font-weight: 500;
						color: #333333;
						flex: 1;
					}
				}
			}
		}
	}
}
</style>
