<template>
	<view :value="value" class="screen">
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="item.day==day?'onchoose':''" v-for="(item,index) in timelist" :key="index" @tap="tabSelect(item.day)">
					<view class="flex flex-direction align-center justify-center">
						<view class="">{{item.tag}}</view>
						<view v-if="item.day==day" class="tab-bottom"></view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view style="height: 90upx;"></view>
	</view>
</template>

<script>
	export default {
		props:{
			value: {
				type: Number,
				default: 1
			},
			showHistory: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				timelist: [{ tag: '近七天', day: 1 }, { tag: '近一月', day: 2 }, { tag: '近半年', day: 3 }, { tag: '近一年', day: 4 }],
				day: 1,
			}
		},
		watch:{
			value(val) {
				// console.log(val);
				this.day = val;
			},
			day(val) {
				this.$emit('input', val);
			}
		},
		beforeMount(){
			if (this.showHistory){
				this.timelist = [
					...this.timelist,
					{
						tag: '历史总计',
						day: 5
					}
				]
			}
		},
		methods: {
			tabSelect(e) {
				this.day = e;
			}
		}
	}
</script>

<style lang="scss" scoped>
// 时间筛选
.nav{
	position: fixed;
	left: 0;
	z-index: 10;
	width: 100%;
	border-bottom: 1upx solid #F2F2F3;
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
