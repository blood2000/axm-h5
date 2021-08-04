<template>
	<view class="project-table">
		<view class="project-table__header">
			<view class="label"><uni-dateformat :date="queryDate" format="yyyy年MM月dd日"></uni-dateformat></view>
			<view class="content">
				<text>车队：{{ countData.teamCount }}</text>
				<text>车辆：{{ countData.vehicleCount }}</text>
				<text>车次：{{ countData.trainNumber }}</text>
			</view>
		</view>
		<uni-table border stripe emptyText="暂无数据">
			<uni-tr>
				<uni-th align="center">车牌号码</uni-th>
				<uni-th align="center">车次</uni-th>
				<uni-th align="center">车牌号码</uni-th>
				<uni-th align="center">车次</uni-th>
			</uni-tr>
			 <uni-tr v-for="(item,index) in vehicleOdd" :key="index">
				<!-- 奇数列 -->
				<uni-td align="center" @click.native="navToCar(item)">
					{{ item.licenseNumber }}
					<text class="g-icon-arrow"></text>
				</uni-td>
				<uni-td align="center">{{ item.trainNumber }}</uni-td>
				<!-- 偶数列 -->
				<uni-td align="center" @click.native="navToCar(vehicleEven[index])">
					{{ vehicleEven[index] ? vehicleEven[index].licenseNumber : '' }}
					<text class="g-icon-arrow" v-show="vehicleEven[index]"></text>
				</uni-td>
				<uni-td align="center">{{ vehicleEven[index] ? vehicleEven[index].trainNumber : '' }}</uni-td>
			</uni-tr>
		</uni-table>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { ProjectDetails } from '@/config/service/statistic.js';
	export default {
		props: {
			projectCode: {
				type: String,
				default: null
			},
			queryDate: {
				type: String,
				default: null
			},
			groudActive: {
				type: String,
				default: ''
			}
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			}),
			waybillClasses() {
				return this.groudActive === '2' ? '' : this.groudActive
			}
		},
		data() {
			return {
				countData: {},
				vehicleList: [],
				vehicleOdd: [], // 奇数列
				vehicleEven: [] // 偶数列
			}
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
			},
			groudActive(val) {
				this.getData();
			}
		},
		async mounted() {
			await this.$onLaunched;
			this.getData();
		},
		methods: {
			getData(){
				ProjectDetails({
					projectCode: this.projectCode,
					queryDate: this.queryDate,
					waybillClasses: this.waybillClasses
				}, this.headerInfo).then(response => {
					this.countData = response.data || {};
					if(response.data.vehicleCounts){
						this.vehicleOdd = [];
						this.vehicleEven = [];
						response.data.vehicleCounts.forEach((el, index) => {
							if((index + 1) % 2 == 0){
								this.vehicleEven.push(el);
							}else{
								this.vehicleOdd.push(el);
							}
						});
					}else{
						this.vehicleList = [];
					}
				})
			},
			navToCar(item){
				const quary = {
					...item,
					projectCode: this.projectCode,
					queryDate: this.queryDate,
					groudActive: this.groudActive
				}
				console.log(quary);
				uni.navigateTo({
					url: '/pages/finance/carDetail/index?item=' + encodeURIComponent(JSON.stringify(quary))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.project-table{
	&__header{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		padding: 14rpx 0;
		width: 100%;
		height: 164rpx;
		background: #D0DDF6;
		border-radius: 14rpx 14rpx 0 0;
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
			justify-content: space-around;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
	}
	/deep/ .uni-table{
		min-width: 100% !important;
		.uni-table-th-content{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: bold;
			color: #333333;
		}
		.uni-table-td{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #333333;
		}
		.uni-table-tr{
			height: 96rpx;
			&:nth-child(odd){
				background: #fff;
			}
			&:nth-child(even){
				background: #F8FAFF;
			}
			// &:last-child{
			// 	>.uni-table-td{
			// 		&:first-child{
			// 			border-radius: 0 0 0 14rpx;
			// 		}
			// 		&:last-child{
			// 			border-radius: 0 0 14rpx 0;
			// 		}
			// 	}
			// }
		}
		.table--border{
			border-color: #EAEAEA;
		}
	}
}
</style>
