<template>
	<view class="home-page">
		<Header>
			<text slot="title">统计</text>
		</Header>
		
		<view class="home-page__scroll">
			<ItemCard
				v-for="item in itemList" 
				:key="item.projectCode" 
				:item-data="item"
				place="home"
			></ItemCard>
		</view>
		
		<!-- 加载失败 -->
		<NonePage v-if="itemList.length === 0"></NonePage>
		
		<!-- 弹框加载 -->
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
		
		<!-- <scroll-view :scroll-y="true" :show-scrollbar="false" @scrolltolower="pullDown" class="home-page__scroll">
			<ItemCard 
				v-for="item in itemList" 
				:key="item.projectCode" 
				:item-data="item"
				place="home"
			></ItemCard>
		</scroll-view> -->
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '@/components/Header/Header.vue';
	import ItemCard from '@/components/ItemCard/ItemCard.vue';
	import { ListStatistics } from '@/config/service/statistic.js';
	import NonePage from '@/components/NonePage/NonePage.vue';
	export default {
		components: {
			Header,
			ItemCard,
			NonePage
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
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
				// 弹框加载
				loadModal: false
			}
		},
		async onLoad() {
			this.loadModal = true;
			await this.$onLaunched;
			this.getData();
		},
		onPullDownRefresh() {
			this.itemList = []
			this.queryParams.pageNum = 1
			this.getData()
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		},
		// 触底加载
		onReachBottom() {
			// console.log("触底")
			if(!this.isEnd) {
				this.queryParams.pageNum++
				this.getData()
			}
		},
		methods: {
			getData(){
				ListStatistics(this.queryParams, this.headerInfo).then(response => {
					this.loadModal = false;
					// this.itemList = response.data.list || [];
					if(response.data.list.length === 0) {
						this.isEnd = true;
						// console.log("ceshi")
						return
					}
					this.itemList = [...this.itemList,...response.data.list]
				}).catch(() => {
					this.loadModal = false;
				});
			},
			// pullDown() {
			// 	if(!this.isEnd) {
			// 		this.queryParams.pageNum++
			// 		this.getData()
			// 	}
			// }
		}
	}
</script>

<style lang="scss" scoped>
.home-page{
	width: 100%;
	// height: 100vh;
	overflow-y: scroll;
	overflow-x: hidden;
	&__scroll{
		width: 100%;
		height: calc(100% - 185rpx);
		margin: 0 22rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
	}
}
</style>
