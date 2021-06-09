<template>
	<view class="chart-container">
		<view class="lengend-box ly-flex-v ly-flex-pack-justify">
			<view class="time ly-flex-pack-start">4月28日</view>
			<view class="legend ly-flex-pack-start">
				<view class="legend-item ly-flex-align-center" v-for="(item, index) in legendData" :key="index">
					<text class="round" :style="{background: item.color}"></text>
					<text class="text">{{ item.name }}</text>
					<text class="count">{{ item.count + unit }}</text>
				</view>
			</view>
		</view>
		
		<view class="chart-box" :id="id"></view>
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
			}
		},
		computed:{
			legendData() {
				const arr = [];
				this.countData.forEach(el => {
					arr.push({
						color: el.color,
						name: el.name,
						count: el.data[el.data.length - 1]
					});
				})
				return arr;
			},
			seriesData() {
				const arr = [];
				this.countData.forEach(el => {
					arr.push({
						name: el.name,
						data: el.data,
						type: 'line',
						symbol: 'circle',
						symbolSize: 4,
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
				})
				return arr;
			}
		},
		data() {
			return {
				chart: null
			}
		},
		async mounted() {
			//await this.$onLaunched;
			this.initChart();
		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id));
				this.setOption();
			},
			setOption() {
			  // 构造数据
			  this.chart.setOption({
				grid: {
				  left: '5%',
				  right: '5%',
				  bottom: '3%',
				  top: '20%',
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
				  name: this.unit + '/' + this.unitTime,
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
					show: false// 隐藏y坐标轴刻度
				  }
				},
				tooltip: {
				  trigger: 'axis',
				  axisPointer: {
					lineStyle: {
					  color: '#3F5C84'
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
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
.chart-container{
	padding-top: 100rpx;
	position: relative;
	.lengend-box{
		max-width: 334rpx;
		min-width: 200rpx;
		height: 84rpx;
		border: 1px solid rgba(51, 51, 51, 0.22);
		position: absolute;
		top: 25rpx;
		right: 24rpx;
		font-family: PingFang SC;
		padding: 10rpx;
		>.time{
			font-size: 20rpx;
			font-weight: 500;
			color: #333333;
			transform: scale(0.9, 0.9);
		}
		>.legend{
			>.legend-item{
				&:not(:last-child){
					margin-right: 20rpx;
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
					padding-left: 12rpx;
				}
			}
		}
	}
	.chart-box{
		width: 100%;
		height: 370rpx;
	}
}
</style>
