<template>
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
</template>

<script>
	export default {
		data() {
			return {
				timelist: [{ tag: '近七天', day: 7 }, { tag: '近一月', day: 30 }, { tag: '近半年', day: 180 }, { tag: '近一年', day: 365 }, { tag: '历史总计', day: 0 }],
				TabCur: 7,
				queryParams: {
					startTime: null,
					endTime: null
				},
			}
		},
		methods: {
			tabSelect(e) {
				if (e === 0){
					this.TabCur = e;
					this.queryParams.startTime = null;
					this.queryParams.endTime = null;
				}else{
					this.queryParams.startTime = this.parseTime(new Date().getTime() - 24 * 60 * 60 * 1000 * e, '{y}-{m}-{d}');
					this.queryParams.endTime = this.parseTime(new Date(), '{y}-{m}-{d}');
					console.log(this.queryParams);
					this.TabCur = e;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
