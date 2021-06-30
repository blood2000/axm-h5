<template>
	<view class="index-contail">
		<WhiteHeader :show-bg="false" :showBack="isSecondaryPage" @close="closeInterval">
			<text slot="title">费用支付</text>
		</WhiteHeader>
		<view class="qrcode-frame flex flex-direction align-center justify-center">
			<view class="refuel-title">{{oilingQuery.stationName}}</view>
			<view class="refuel-car">{{oilingQuery.car_no}}</view>
			<img v-if="payInfo.refuel_img_url && !paySuccess.amountPrice" class="qrcode-code" :src="img" mode=""></img>
		</view>
		<view class="cu-modal" :class="modalName=='success'?'show':''" @click="hideModal">
			<view class="cu-dialog">
				<view class="pay-frame flex flex-direction align-center justify-center">
					<image class="pay-img" src="../../../static/icon_pay.png" mode=""></image>
					<view class="pay-success">支付成功</view>
					<view class="pay-money">支付金额： {{paySuccess.amountPrice}} 元</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import { getRefuelInfo, getLogByWaybillCode } from '@/config/service/refuel.js';
	export default {
		components: {
			WhiteHeader
		},
	    data() {
	        return {
				isSecondaryPage: false,
				oilingQuery: {},
				payInfo: {},
				img: '',
				paySuccess: {},
				interval: null,
				modalName: null,
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
				var music = null;
				music = uni.createInnerAudioContext(); //创建播放器对象
				music.src = this.payInfo.audio_url;
				music.play(); //执行播放
				music.onEnded(() => {
					//播放结束
					music = null;
				});
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
						this.modalName = 'success';
						this.closeInterval();
					}
				});
			},
			closeInterval(){
				clearInterval(this.interval);
			},
			hideModal(e) {
				this.modalName = null
			}
		},
	}
</script>

<style>
	.qrcode-code{
		height: 400upx;
		width: 400upx;
	}
	.qrcode-frame{
		/* height: 800upx; */
		width: 100%;
	}
	.refuel-title{
		padding: 115upx 30upx 0;
		font-size: 32upx;
		font-weight: bold;
	}
	.refuel-car{
		padding: 40upx 0 80upx;
		font-size: 28upx;
		font-weight: 500;
	}
	.cu-dialog{
		width: auto;
	}
	.pay-frame{
		background-color: #FFFFFF;
		border-radius: 10upx;
		/* width: 500upx; */
		padding: 66upx 88upx;
	}
	.margin-mtop{
		margin-top: 20upx;
	}
	.pay-money{
		font-size: 24upx;
		font-family: PingFang SC;
		color: #999999;
	}
	.pay-success{
		margin: 60upx 0 30upx;
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #242424;
	}
	.pay-img{
		width: 322upx;
		height: 252upx;
	}
</style>
