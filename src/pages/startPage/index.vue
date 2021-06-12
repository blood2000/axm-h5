<template>
	<view class="start-page-index">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">统计服务</text>
		</Header>
		<view v-if="loading" class="cu-load load-modal">
			<view class="gray-text">加载中...</view>
		</view>
		<!-- 加载失败 -->
		<NonePage v-if="loadError"></NonePage>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getPageJump } from '@/config/service/startPage.js';
	import Header from '@/components/Header/Header.vue';
	import NonePage from '@/components/NonePage/NonePage.vue';
	export default {
		components: {
			Header,
			NonePage
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				loading: false,
				loadError: false,
				isSecondaryPage: false
			}
		},
		async onLoad(options) {
			await this.$onLaunched;
			this.getData(options);
		},
		methods: {
			getData(options){
				this.loading = true;
				const isSecondaryPage = options.isSecondaryPage;
				// 判断是否有返回按钮
				let params = '';
				if (isSecondaryPage === '1') {
					params = '?isSecondaryPage=1';
					this.isSecondaryPage = true;
				}
				getPageJump(this.headerInfo).then(response => {
					this.loading = false;
					const role = response.data;
					// 1跳转调度者统计 2跳转司机统计 3跳转货主大宗统计 4跳转货主渣土统计
					if (role === 1) {
						uni.redirectTo({
						    url: '/pages/team/index/index'
						});
					} else if (role === 2) {
						uni.redirectTo({
						    url: '/pages/driver/index/index' + params
						});
					} else if (role === 3) {
						uni.redirectTo({
						    url: '/pages/shipment/index/index'
						});
					} else if (role === 4) {
						uni.redirectTo({
						    url: '/pages/finance/index/index'
						});
					} else {
						// 加载失败
						this.loadError = true;
					}
				}).catch(() => {
					// 加载失败
					this.loading = false;
					this.loadError = true;
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.start-page-index{
	position: relative;
	height: 100%;
}
</style>
