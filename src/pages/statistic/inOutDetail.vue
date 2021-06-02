<template>
	<view class="in-out-table">
		<view class="in-out-table__header">
			<view class="label"><uni-dateformat :date="queryDate" format="yyyy年MM月dd日"></uni-dateformat></view>
		</view>
		<view class="in-out-table__content">
			<view class="in-out-table__content__item" v-for="(item, index) in dataList" :key="item.vehicleCode + index">
				<view class="title">
					<view class="plate">
						<text class="index">{{ index + 1 > 9 ? index : '0'+(index + 1) }}</text>
						<text class="label">{{ item.licenseNumber }}</text>
					</view>
					<view class="time">进 : {{ item.inTime }} &nbsp; 出 : {{ item.outTime }}</view>
				</view>
				<view class="content">
					<view class="box">
						<text class="lebel">驾驶员姓名：</text>
						<text class="text">{{ item.driverName }}</text>
					</view>
					<view class="box">
						<text class="lebel">土石方量(m²)：</text>
						<text class="text">{{ item.loadWeight }}</text>
					</view>
					<view class="box">
						<text class="lebel">超高超载：</text>
						<text class="text" v-if="item.overload === 1">是</text>
						<text class="text" v-else-if="item.overload === 0">否</text>
						<text class="text" v-else>未装货</text>
					</view>
					<view class="box">
						<text class="lebel">泥尾：</text>
						<text class="text">{{ item.mudtail }}</text>
					</view>
					<view class="box">
						<text class="lebel">记录人：</text>
						<text class="text">{{ item.noteTaker }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { InOutDetails } from '../../config/service/statistic.js';
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
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
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
		async mounted() {
			await this.$onLaunched;
			this.getData();
		},
		methods: {
			getData(){
				InOutDetails({
					projectCode: this.projectCode,
					queryDate: this.queryDate
				}, this.headerInfo).then(response => {
					this.dataList = response.data.vechicleWaybillInfos || [];
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.in-out-table{
	&__header{
		width: 100%;
		height: 98rpx;
		line-height: 98rpx;
		background: #D0DDF6;
		border-radius: 14rpx 14rpx 0 0;
		.label{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
			text-align: center;
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
				display: flex;
				justify-content: space-between;
				align-items: center;
				>.plate{
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
				.time{
					width: 290rpx;
					height: 52rpx;
					line-height: 52rpx;
					font-size: 22rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #4478E4;
					background: rgba(249, 251, 255, 0.99);
					border-radius: 26rpx;
					text-align: center;
				}
			}
			>.content{
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				>.box{
					width: 49%;
					padding-bottom: 44rpx;
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
