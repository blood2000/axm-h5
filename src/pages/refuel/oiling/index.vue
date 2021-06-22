<template>
	<view class="index-contail">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">费用支付</text>
		</Header>
		<view class="qrcode-frame flex flex-direction align-center justify-center">
			<view class="refuel-title">{{payInfo.stationName || '福建至简至一加油站'}}</view>
			<image class="qrcode-code" src="/static/erweima.jpg" mode=""></image>
			<view class="pay-frame flex flex-direction align-center justify-center">
				<view class="">支付成功</view>
				<view class="margin-mtop">支付金额： <text class="pay-money">666.66</text> 元</view>
			</view>
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
				isSecondaryPage: false,
				payInfo: {}
			}
		},
		computed:{
			...mapState({
				headerInfo: state => state.header.headerInfo
			}),
		},
		async onLoad(options){
			await this.$onLaunched;
			this.isSecondaryPage = true;
			this.payInfo = JSON.parse(decodeURIComponent(options.payInfo));
		},
		methods: {
			
		},
	}
</script>

<style>
	.qrcode-code{
		height: 500upx;
		width: 500upx;
	}
	.qrcode-frame{
		/* height: 800upx; */
		width: 100%;
	}
	.refuel-title{
		padding: 50upx;
		font-size: 42upx;
		font-weight: bold;
	}
	.pay-frame{
		margin-top: 100upx;
		background-color: #0081FF50;
		border-radius: 10upx;
		height: 200upx;
		width: 500upx;
	}
	.margin-mtop{
		margin-top: 20upx;
	}
	.pay-money{
		font-size: 36upx;
		font-weight: bold;
	}
</style>
