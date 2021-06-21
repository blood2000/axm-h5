<template>
	<view class="index-contail">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">加油</text>
		</Header>
		<view class="qrcode-frame">
			<image class="qrcode-code" src="" mode=""></image>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getRefuelInfo } from '@/config/service/refuel.js';
	export default {
		components: {
		},
	    data() {
	        return {
				queryParams:{
					car_no: "",
					foreign_driver_id: "",
					foreign_unique_id: "",
					fuel_no: "",
					lat: "",
					lng: "",
					mobile: "",
					money: "",
					name: "",
					si_id: "",
					user_code: ""
				}
			}
		},
		computed:{
			...mapState({
				headerInfo: state => state.header.headerInfo
			}),
		},
		async onLoad(options){
			await this.$onLaunched;
			const isSecondaryPage = options.isSecondaryPage;
			if (isSecondaryPage === '1') {
				this.isSecondaryPage = true;
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	.qrcode-code{
		height: 100upx;
		width: 100upx;
	}
</style>
