<template>
	<view class="chart-container">
		<Loading v-if="loading"></Loading>
		<template v-else>
			<view v-if="seriesData && seriesData.length > 0 && seriesData[0].data.length > 0" class="lengend-box ly-flex-v ly-flex-pack-around">
				<view class="time ly-flex-pack-start">{{ today }}</view>
				<view class="legend ly-flex-pack-start">
					<view class="legend-item ly-flex-align-center" v-for="(item, index) in legendData" :key="index">
						<text class="round" :style="{background: item.color}"></text>
						<text class="text">{{ item.name }}</text>
						<text class="count">{{ item.count + isWan + unit }}</text>
					</view>
				</view>
			</view>
			<view class="chart-box" :id="id"></view>
		</template>
	</view>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		props: {
			id: {
				type: String,
				default: 'lineChart' + new Date().getTime()
			},
			timeData: {
				type: Array,
				default: () => {
					return [];
				}
			},
			countData: {
				type: Array,
				default: () => {
					return [];
				}
			},
			unit: {
				type: String,
				default: ''
			},
			unitTime: {
				type: String,
				default: ''
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		computed: {
			today(){
				const today = new Date();
				return (today.getMonth() + 1) + '月' + today.getDate() + '日'
			},
			isWan(){
				if (this.isChange) {
					return '万';
				} else {
					return '';
				}
			}
		},
		data() {
			return {
				chart: null,
				legendData: [],
				seriesData: [],
				isChange: false
			}
		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id));
				this.setData().then(() => {
					this.setOption();
				}).then(() => {
					this.showToolTip();
				});
			},
			setData() {
				return new Promise((resolve, reject) => {
					this.seriesData = [];
					this.legendData = [];
					this.isChange = false;
					this.countData.forEach(el => {
						el.data.forEach(val => {
							if (val > 9999) {
								this.isChange = true;
							}
						})
					});
					setTimeout(() => {
						this.countData.forEach(el => {
							let arr = [];
							if (this.isChange) {
								el.data.forEach(val => {
									arr.push(this.changeNum(val));
								})
							}else{
								arr = el.data;
							}
							this.seriesData.push({
								name: el.name,
								data: arr,
								type: 'line',
								symbol: 'circle',
								symbolSize: 2,
								color: el.color,
								itemStyle: {
									normal: {
										lineStyle: {
											color: el.color,
											width: 1
										}
									}
								}
							})
							let count = el.data[el.data.length - 1];
							if (this.isChange) {
								count = this.changeNum(count);
							}
							this.legendData.push({
								color: el.color,
								name: el.name,
								count: count
							});
						})
						resolve();
					}, 0);
				})
			},
			setOption() {
				return new Promise((resolve, reject) => {
					this.chart.setOption({
						legend: {
							show: true,
							left: '5%',
							top: '9%',
							icon: 'circle',
							itemWidth: 6,
							itemHeight: 6,
							textStyle: {
								color: '#333333',
								fontSize: 9
							},
							data: this.legendData
						},
						grid: {
							left: '5%',
							right: '5%',
							bottom: '3%',
							top: '36%',
							containLabel: true
						},
						xAxis: {
							type: 'category',
							// x轴字体样式
							axisLabel: {
								show: true,
								textStyle: {
									color: '#333333'
								}
							},
							// x轴颜色
							axisLine: {
								lineStyle: {
									color: '#E9E9E9'
								}
							},
							data: this.timeData
						},
						yAxis: {
							name: this.isWan + this.unit + '/' + this.unitTime,
							nameTextStyle: {
								color: '#333333',
								paddingLeft: '2%'
							},
							type: 'value',
							minInterval: 1, // 只显示整数
							axisLine: {
								show: true,
								lineStyle: {
									color: '#E9E9E9'
								}
							},
							// y轴字体样式
							axisLabel: {
								show: true,
								textStyle: {
									color: '#333333'
								}
							},
							// 网格样式
							splitLine: {
								show: false
							},
							axisTick: {
								show: true // y坐标轴刻度
							}
						},
						tooltip: {
							trigger: 'axis',
							//triggerOn: 'none',
							axisPointer: {
								lineStyle: {
									color: 'rgba(55, 55, 55, 0)'
								}
							},
							borderColor: 'rgba(0, 0, 0, 0)',
							backgroundColor: 'rgba(70, 70, 70, 0.5)',
							textStyle: {
								color: '#ffffff'
							}
						},
						series: this.seriesData
					});
					resolve();
				})
			},
			showToolTip() {
				this.chart.dispatchAction({
					type: 'showTip',
					seriesIndex: 0,
					dataIndex: this.seriesData[0].data.length - 1,
					position: [-1000, 0]
				});
			},
			changeNum(val) {
				let num = Math.floor(val/100)/100;
				return num;
			}
		}
	}
</script>

<style lang="scss" scoped>
.chart-container{
	position: relative;
	height: 450rpx;
	.lengend-box{
		max-width: 450rpx;
		min-width: 200rpx;
		height: 84rpx;
		border: 1px solid rgba(51, 51, 51, 0.22);
		position: absolute;
		top: 25rpx;
		right: 24rpx;
		font-family: PingFang SC;
		padding: 4rpx 8rpx;
		>.time{
			font-size: 20rpx;
			font-weight: 500;
			color: #333333;
			transform: scale(0.9, 0.9);
		}
		>.legend{
			>.legend-item{
				&:not(:last-child){
					margin-right: 10rpx;
				}
				.round{
					display: inline-block;
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					margin-left: 10rpx;
				}
				.text{
					font-size: 18rpx;
					font-weight: 500;
					color: #333333;
					transform: scale(0.85, 0.85);
				}
				.count{
					font-size: 18rpx;
					font-weight: 500;
					color: rgba(51, 51, 51, 0.8);
					transform: scale(0.85, 0.85);
					margin-left: -4rpx;
				}
			}
		}
	}
	.chart-box{
		width: 100%;
		height: 450rpx;
	}
}
</style>
