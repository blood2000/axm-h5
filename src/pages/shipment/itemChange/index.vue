<template>
	<view class="change-item-page">
		<WhiteHeader>
			<text slot="title">更改项目</text>
		</WhiteHeader>
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
	import { mapState } from 'vuex';
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import { ListStatistics } from '@/config/service/statistic.js';
	export default {
		components: {
			WhiteHeader
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
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
		async onLoad(option) {
			await this.$onLaunched;
			this.projectCode = option.projectCode;
			this.getData();
		},
		methods: {
			getData(){
				ListStatistics(this.queryParams, this.headerInfo).then(response => {
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
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	&__scroll{
		width: 100%;
		height: 100%;
		margin: 142rpx 22rpx 0;
		box-sizing: border-box;
	}
}
</style>
