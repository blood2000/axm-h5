<template>
	<view class="home-page">
		<Header>
			<text slot="title">统计</text>
		</Header>
		<scroll-view :scroll-y="true" :show-scrollbar="false" @scrolltolower="pullDown" class="home-page__scroll">
			<ItemCard 
				v-for="item in itemList" 
				:key="item.projectCode" 
				:item-data="item"
				place="home"
			></ItemCard>
		</scroll-view>
	</view>
</template>

<script>
	import Header from '../../components/Header/Header.vue';
	import ItemCard from '../../components/ItemCard/ItemCard.vue';
	import { ListStatistics } from '../../config/service/statistic.js';
	export default {
		components: {
			Header,
			ItemCard
		},
		data() {
			return {
				queryParams: {
					pageNum: 1,
					pageSize: 10
				},
				itemList: [],
				// 是否无数据了
				isEnd: false,
			}
		},
		onLoad() {
			this.getData();
		},
		// onReachBottom() {
		// 	if(!this.isEnd) {
		// 		this.queryParams.pageNum++
		// 		this.getData()
		// 	}
		// },
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
.home-page{
	width: 100%;
	height: 100%;
	overflow: hidden;
	&__scroll{
		width: 100%;
		height: calc(100% - 185rpx);
		margin: 185rpx 22rpx 0;
		box-sizing: border-box;
	}
}
</style>
