<template>
	<view class="statistic-page">
		<Header :showBack="true">
			<text slot="title">统计</text>
		</Header>
		<view class="statistic-page__scroll">
			<ItemCard
				class="statistic-page__item-card"
				:item-data="itemData"
				place="statistic"
			></ItemCard>
			<view class="statistic-page__content">
				<view class="statistic-page__content__title flex align-center">
					<text class="label">时间：</text>
					<picker mode="date" :value="queryDate" start="2000-01-01" end="2200-01-01" @change="DateChange">
						<view class="picker">
							<uni-dateformat :date="queryDate" format="yyyy/MM/dd"></uni-dateformat>
							<text class="g-icon-arrow"></text>
						</view>
					</picker>
				</view>
				<view class="statistic-page__content__tab">
					<view class="tab-bar" :class="'tab-bar-' + currentIndex">
						<text 
							class="tab-item" 
							:class="currentIndex===tabIndex ? 'active' : ''"
							v-for="(tab, tabIndex) in tabList"
							:key="tabIndex"
							@click="handleTab(tabIndex)"
						>{{ tab }}</text>
					</view>
					<view class="tab-box">
						<!-- 项目统计 -->
						<ProjectCard 
							v-show="currentIndex === 0" 
							:projectCode="itemData.projectCode"
							:queryDate="queryDate"
						></ProjectCard>
						<!-- 进出明细 -->
						<InOutDetailCard 
							v-show="currentIndex === 1" 
							:projectCode="itemData.projectCode"
							:queryDate="queryDate"
						></InOutDetailCard>
						<!-- 泥尾统计 -->
						<MudTail 
							v-show="currentIndex === 2" 
							:projectCode="itemData.projectCode"
							:queryDate="queryDate"
						></MudTail>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/Header/Header.vue';
	import ItemCard from '@/components/ItemCard/ItemCard.vue';
	import ProjectCard from './project.vue';
	import InOutDetailCard from './inOutDetail.vue';
	import MudTail from './mudTail.vue';
	export default {
		components: {
			Header,
			ItemCard,
			ProjectCard,
			InOutDetailCard,
			MudTail
		},
		data() {
			return {
				itemData: {},
				queryDate: '',
				tabList: ['项目统计', '进出明细', '泥尾统计'],
				currentIndex: 0
			};
		},
		onLoad(option){
			const nowDate = new Date();
			const date = {
				year: nowDate.getFullYear(),
				month: nowDate.getMonth() + 1,
				date: nowDate.getDate(),
			};
			const newmonth = date.month>10?date.month:'0'+date.month;
			const day = date.date>10?date.date:'0'+date.date;
			this.queryDate = date.year + '-' + newmonth + '-' + day;
			this.itemData = JSON.parse(decodeURIComponent(option.item));
		},
		methods: {
			handleTab(tabIndex) {
				if (this.currentIndex === tabIndex) return;
				this.currentIndex = tabIndex;
			},
			DateChange(e) {
				this.queryDate = e.detail.value
			},
			getItemData(obj) {
				if (obj) {
					this.itemData = obj;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.statistic-page{
	width: 100%;
	// height: 100%;
	overflow-y: scroll;
	overflow-x: hidden;
	&__item-card{
		margin-bottom: 58rpx;
	}
	&__scroll{
		width: 100%;
		height: calc(100% - 185rpx);
		margin: 0 24rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 1;
	}
	&__content{
		width: calc(100% - 44rpx);
		height: auto;
		background: rgba(255, 255, 255, 0.98);
		border-radius: 30rpx;
		padding: 0 24rpx;
		margin-bottom: 24rpx;
		color: #333333;
		&__title{
			height: 100rpx;
			line-height: 100rpx;
			position: relative;
			&::before{
				content: '';
				position: absolute;
				left: -24rpx;
				top: 50%;
				margin-top: -21rpx;
				width: 10rpx;
				height: 42rpx;
				background: #477AE4;
				border-radius: 5rpx;
			}
			.label{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: bold;
			}
			.title{
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
			}
		}
		&__tab{
			.tab-bar{
				display: flex;
				justify-content: space-around;
				height: 68rpx;
				line-height: 68rpx;
				border-bottom: 1rpx solid #E8E8E8;
				position: relative;
				.tab-item{
					font-size: 28rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #333333;
					transition: all 0.3s;
					&.active{
						// font-weight: bold;
						color: #4478E4;
					}
				}
				&::after{
					content: '';
					position: absolute;
					margin-left: calc(-16.66% - 40rpx);
					bottom: 0;
					width: 80rpx;
					height: 6rpx;
					background: #4478E4;
					border-radius: 3rpx;
					transition: left 0.3s;
				}
				&.tab-bar-0{
					&::after{
						left: 33.33%;
					}
				}
				&.tab-bar-1{
					&::after{
						left: 66.66%;
					}
				}
				&.tab-bar-2{
					&::after{
						left: 99.99%;
					}
				}
			}
			.tab-box{
				padding: 16rpx 0 30rpx;
			}
		}
	}
}
</style>
