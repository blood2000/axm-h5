<template>
	<view class="index-contail">
		<Header :show-bg="false" :showBack="isSecondaryPage" @close="closeInterval">
			<text slot="title">费用支付</text>
		</Header>
		<view class="qrcode-frame flex flex-direction align-center justify-center">
			<view class="refuel-title">{{oilingQuery.stationName}}</view>
			<view class="refuel-car">{{oilingQuery.car_no}}</view>
			<img v-if="img && !paySuccess.amount" class="qrcode-code" :src="img" mode=""></img>
			<view v-if="paySuccess.amount" class="pay-frame flex flex-direction align-center justify-center">
				<view class="">支付成功</view>
				<view class="margin-mtop">支付金额： <text class="pay-money">{{paySuccess.amount}}</text> 元</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getRefuelInfo, getLogByWaybillCode } from '@/config/service/refuel.js';
	export default {
		components: {
		},
	    data() {
	        return {
				isSecondaryPage: false,
				oilingQuery: {},
				payInfo: {},
				img: '',
				paySuccess: {},
				interval: null
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
			this.paySuccess = {};
			this.oilingQuery = JSON.parse(decodeURIComponent(options.oilingQuery));
			getRefuelInfo(this.oilingQuery, this.headerInfo).then(response => {
				let str = JSON.parse(response.data)
				this.payInfo = str.result;
				console.log(this.payInfo);
				this.img = this.payInfo.refuel_img_url + '\\';
				console.log(this.img);
				if(this.payInfo){
					this.interval = setInterval(this.getLog, 2000);
				}
			});
		},
		methods: {
			getLog(){
				getLogByWaybillCode(this.payInfo.unique_str, this.headerInfo).then(response => {
					console.log(response);
					if (response){
						this.paySuccess = response.data;
						this.closeInterval();
					}
				});
			},
			closeInterval(){
				clearInterval(this.interval);
			}
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
		padding: 30upx 30upx 0;
		font-size: 42upx;
		font-weight: bold;
	}
	.refuel-car{
		padding: 30upx;
		font-size: 32upx;
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
