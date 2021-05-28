<template>
	<view class="item-card">
		<view class="item-card__title" @click="handleItem()">
			<view class="title-box">
				<text class="label">项目：</text>
				<text class="title">{{ itemData.projectName }}</text>
			</view>
			<template v-if="place === 'home'">
				<text class="g-icon-arrow"></text>
			</template>
			<template v-if="place === 'statistic'">
				<view class="arrow-box">
					<text class="arrow-text">更改</text>
					<text class="g-icon-arrow blue"></text>
				</view>
			</template>
			<template v-if="place === 'change'">
				<text v-if="changed === itemData.projectCode" class="change-text">已选择</text>
				<button v-else type="default" class="change-button" @click="changeItem">选择</button>
			</template>
		</view>
		<view class="item-card__content">
			<view class="item-card__content__block">
				<text class="count">{{ itemData.todayFinishCount || 0 }}</text>
				<text class="label">今日完成量</text>
			</view>
			<view class="item-card__content__block">
				<text class="count">{{ itemData.todayApproachCount || 0 }}</text>
				<text class="label">今日进场量</text>
			</view>
			<view class="item-card__content__block">
				<text class="count">{{ itemData.cumulativeCount || 0 }}</text>
				<text class="label">累计完成量</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			itemData: {
				type: Object,
				default: () => {
					return {}
				}
			},
			place: {
				type: String,
				default: null
			},
			changed: {
				type: String,
				default: null
			}
		},
		data() {
			return {

			}
		},
		methods: {
			handleItem() {
				if(this.place === 'home'){
					uni.navigateTo({
						url: '/pages/statistic/index?item=' + encodeURIComponent(JSON.stringify(this.itemData))
					});
				}
				if(this.place === 'statistic'){
					uni.navigateTo({
						url: '/pages/itemChange/index?projectCode=' + this.itemData.projectCode
					});
				}
			},
			changeItem() {
				uni.redirectTo({
					url: '/pages/statistic/index?item=' + encodeURIComponent(JSON.stringify(this.itemData))
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.item-card{
	width: calc(100% - 44rpx);
	height: 259rpx;
	background: rgba(255, 255, 255, 0.98);
	border-radius: 30rpx;
	padding: 0 24rpx;
	margin-bottom: 24rpx;
	color: #333333;
	&__title{
		height: 100rpx;
		line-height: 100rpx;
		border-bottom: 2rpx solid #F2F2F2;
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
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
		>.title-box{
			width: 80%;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
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
		>.arrow-box{
			display: flex;
			align-items: center;
			.arrow-text{
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #4478E4;
			}
		}
		.change-button{
			width: 122rpx;
			height: 52rpx;
			line-height: 52rpx;
			background: #4478E4;
			border-radius: 10px;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #FFFFFF;
		}
		.change-text{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
		}
	}
	&__content{
		height: 158rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		&__block{
			.count{
				display: block;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 44rpx;
				text-align: center;
			}
			.label{
				display: block;
				font-size: 24rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #999999;
				line-height: 44rpx;
				text-align: center;
			}
		}
	}
}
</style>
