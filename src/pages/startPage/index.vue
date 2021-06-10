<template>
	<view>
		<view class="cu-load load-modal">
			<view class="gray-text">加载中...</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getPageJump } from '@/config/service/startPage.js';
	export default {
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				
			}
		},
		async onLoad(options) {
			await this.$onLaunched;
			this.getData(options);
		},
		methods: {
			getData(options){
				const { isSecondaryPage } = options;
				getPageJump(this.headerInfo).then(response => {
					const role = response.data;
					// uni.showToast({
					// 	title: '后端返回的数据: '+JSON.stringify(response),
					// 	icon: 'none',
					// 	duration: 5000
					// });
					
					// 判断是否有返回按钮
					const params = '';
					if (isSecondaryPage === '1') {
						params = '?isSecondaryPage=1'
					}
					// 1跳转司机统计 2跳转调度者统计 3跳转货主大宗统计 4跳转货主渣土统计
					if (role === 1) {
						uni.redirectTo({
						    url: '/pages/driver/index/index' + params
						});
					} else if (role === 2) {
						uni.redirectTo({
						    url: '/pages/team/index/index'
						});
					} else if (role === 3) {
						uni.redirectTo({
						    url: '/pages/shipment/index/index'
						});
					} else if (role === 4) {
						uni.redirectTo({
						    url: '/pages/finance/index/index'
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
