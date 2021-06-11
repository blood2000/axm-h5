<template>
	<view class="shipment-index">
		<Header :showBack="true" :showBg="false">
			<text slot="title">项目报表</text>
		</Header>
		<view v-for="(item, index) in projectList" :key="index" class="c-app-container" style="padding-bottom: 15rpx;">
			<view class="c-title-box ly-flex-pack-justify ly-flex-align-center">
				<text class="text">宝安COON</text>
			</view>
			<view class="c-app-container" style="margin: 0; border-radius: 0;">
				<view class="ly-flex-pack-around">
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(cont.unpaidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(cont.unpaidSum) }}个</text>
						</view>
						<view class="label">货源</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(cont.unpaidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(cont.unpaidSum) }}单</text>
						</view>
						<view class="label">运单</view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(cont.unpaidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(cont.unpaidSum) }}元</text>
						</view>
						<view class="label">运单</text></view>
					</view>
					<view class="c-count-box">
						<view class="count">
							<text class="num">{{ numberFormat(cont.unpaidSum) }}</text>
							<text class="unit">{{ numberFormatUnit(cont.unpaidSum) }}元</text>
						</view>
						<view class="label">开票</text></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 弹框加载 -->
		<view class="cu-load load-modal" v-if="loadModal">
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '@/components/Header/Header.vue';
	import { getProjectReport } from '@/config/service/shipment.js';
	export default {
		components: {
			Header
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				projectList: [],
				loadModal: false,
				// queryParams: {
				// 	pageNum: 1,
				// 	pageSize: 10
				// },
			}
		},
		onLoad(options) {
			this.loadModal = true;
			this.getReport();
		},
		methods: {
			getReport() {
				console.log('测试')
				this.loadModal = true;
				getProjectReport(this.headerInfo).then(response => {
					console.log('测试')
					this.loadModal = false;
					this.projectList = response.data;
				}).catch(() => {
					this.loadModal = false;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
.shipment-index{
	font-family: PingFang SC;
	.order-title{
		font-size: 28rpx;
		font-weight: 500;
		color: #333333;
	}
	.chart-box{
		width: 100%;
		height: 450rpx;
	}
}
</style>
