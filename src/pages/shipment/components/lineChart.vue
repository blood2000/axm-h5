<template>
	<view class="chart-box" :id="id"></view>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		props: {
			
		},
		data() {
			return {
				id: 'lineChart' + new Date().getTime(),
				chart: null,
				timeData: [1, 2, 3, 4, 5],
				countData: [1, 2, 3, 4, 5]
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
			  let typeName = '货单';
			  let pointColor = '#18B8C5';
			  let lineColot = '#267BB7';
			  this.chart.setOption({
				legend: {
				  show: true,
				  right: 0,
				  top: '5%',
				  icon: 'circle',
				  textStyle: {
					color: '#D5EAFF',
					fontFamily: 'PingFang Medium'
				  },
				  data: [{
					name: typeName
				  }]
				},
				grid: {
				  left: '0%',
				  right: '3%',
				  bottom: '0%',
				  top: '22%',
				  containLabel: true
				},
				xAxis: {
				  type: 'category',
				  // x轴字体样式
				  axisLabel: {
					show: true,
					textStyle: {
					  color: '#D5EAFF',
					  fontFamily: 'PingFang Regular'
					}
				  },
				  // x轴颜色
				  axisLine: {
					lineStyle: {
					  color: '#3F5C84'
					}
				  },
				  data: this.timeData
				},
				yAxis: {
				  name: '订单数',
				  nameTextStyle: {
					color: '#D5EAFF',
					paddingLeft: '2%',
					fontFamily: 'PingFang Medium'
				  },
				  type: 'value',
				  minInterval: 1, // 只显示整数
				  axisLine: {
					show: true,
					lineStyle: {
					  color: '#3F5C84'
					}
				  },
				  // y轴字体样式
				  axisLabel: {
					show: true,
					textStyle: {
					  color: '#D5EAFF',
					  fontFamily: 'PingFang Medium'
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
					color: '#ffffff',
					fontFamily: 'PingFang Regular'
				  }
				},
				series: [{
				  name: typeName + '订单数',
				  data: this.countData,
				  type: 'line',
				  symbol: 'circle',
				  color: pointColor, // 拐点颜色
				  // 折线样式
				  itemStyle: {
					normal: {
					  lineStyle: {
						color: lineColot
					  }
					}
				  }
				}]
			  });
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
