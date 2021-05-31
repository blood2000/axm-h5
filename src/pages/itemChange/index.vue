<template>
	<view class="change-item-page">
		<scroll-view :scroll-y="true" :show-scrollbar="false" @scrolltolower="pullDown" class="change-item-page__scroll">
			<ItemCard 
				class="change-item-page__scroll__item-card"
				v-for="(item, index) in itemList" 
				:key="item.projectCode + index" 
				:item-data="item"
				:changed="projectCode"
				place="change"
			></ItemCard>
		</scroll-view>
	</view>
</template>

<script>
	import { ListStatistics } from '../../config/service/statistic.js';
	export default {
		data() {
			return {
				projectCode: null,
				queryParams: {
					pageNum: 1,
					pageSize: 10
				},
				itemList: []
			};
		},
		onLoad(option) {
			this.projectCode = option.projectCode;
			this.getData();
		},
		methods: {
			getData(){
				ListStatistics(this.queryParams).then(response => {
					// this.itemList = response.data.list || [];
					if(response.data.list.length === 0) {
						this.isEnd = true;
						// console.log("ceshi")
						return
					}
					this.itemList = [...this.itemList,...response.data.list]
				});
			},
			pullDown() {
				if(!this.isEnd) {
					this.queryParams.pageNum++
					this.getData()
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.change-item-page{
	width: 100%;
	height: 100%;
	overflow: hidden;
	&__scroll{
		width: 100%;
		height: 100%;
		margin: 0 22rpx;
		box-sizing: border-box;
		&__item-card:first-child{
			margin-top: 22rpx;
		}
	}
}
</style>
