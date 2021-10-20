<template>
	<view class="download-page">
		<view class="content">
			<view class="content_top">
				<view v-if="role === 0" class="content_top_img driver"></view>
				<view v-if="role === 1" class="content_top_img shipment"></view>
				<view v-if="role === 2" class="content_top_img kyd"></view>
				<view v-if="role === 3" class="content_top_img zt"></view>
				<view v-if="role === 4" class="content_top_img zjz1"></view>
				<view class="content_top_text">{{ formData.appCnName }}</view>
			</view>
			<view class="content_center">
				<a class="button" :href="formData.version.apk_url" download='超好运'>安全下载</a>
				<!-- ly-flex-pack-around -->
				<view class="box ly-flex-pack-around">
					<view class="box_left">无病毒</view>
					<!-- <view class="box_right">免广告骚乱</view> -->
				</view>
			</view>
			<view class="content_bottom">
				<view>开发者：至简至一信息科技有限公司</view>
				<view>版本：{{ formData.version.version }}</view>
			</view>
		</view>
		
		<view class="mark" v-if="isMark" @click="closeMark">
			<view class="mark_box">
				<view class="mark_box_img"></view>
				<view class="mark_box_text text1">
					<text class="index">1</text>
					点击右上角的
					<image class="img" src="/static/download/mark_2.png"></image>
					按钮
				</view>
				<view class="mark_box_text text2">
					<text class="index">2</text>
					选择
					<image class="img" src="/static/download/mark_3.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isMark: false,
				formData: {
					version: {
						version: '2.0'
					}
				},
				role: 0 // 0司机 1货主 2凯意达 3渣土 4至简管车
			}
		},
		created(){
			this.getMsg(this.$route.query.role);
		},
		mounted(){
			this.showMark();
		},
		methods: {
			getMsg(role){
				let info = {};
				if(role === '0'){ //司机
					info = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Produce-Code': '776ca8e240574192b6e0f69b417163df',
						'App-Code': '80bb50e40895928e2dc0d101350a25d0',
						'App-Type': '1',
						'App-Version': '2.0',
						'Terminal-Type': 'app',
						'Terminal-OS': 'android'
					}
					this.role = 0;
				} else if(role === '1') { //货主
					info = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Produce-Code': '776ca8e240574192b6e0f69b417163df',
						'App-Code': '9d3017728cb34eac947ba350c4e997be',
						'App-Type': '1',
						'App-Version': '2.0',
						'Terminal-Type': 'app',
						'Terminal-OS': 'android'
					}
					this.role = 1;
				} else if(role === 'kydsz') { //凯意达
					info = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Produce-Code': 'd0a5b72f0dc44855b6894b00b3280572',
						'App-Code': '35226a363c3e4793a79dbbb8e74549fb',
						'App-Type': '1',
						'App-Version': '1.0',
						'Terminal-Type': 'app',
						'Terminal-OS': 'android'
					}
					this.role = 2;
				} else if(role === 'chyzt') { //渣土超好运
					info = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Produce-Code': '776ca8e240574192b6e0f69b417163df',
						'App-Code': '1970a1697da64471b79764397e295184',
						'App-Type': '1',
						'App-Version': '2.0',
						'Terminal-Type': 'app',
						'Terminal-OS': 'android'
					}
					this.role = 3;
				} else if(role === 'zjz1') { //至简管车
					info = {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Produce-Code': '1c3646219beb4c7b978b4600965b2c9f',
						'App-Code': '4bff446cdd7543a3a65694ae0a8277c5',
						'App-Type': '1',
						'App-Version': '1.0.0',
						'Terminal-Type': 'app',
						'Terminal-OS': 'android'
					}
					this.role = 4;
				}
				uni.request({
				    url: process.env.VUE_APP_BASE_API + '/system/application/info',
					method: 'GET',
					header: info,
					success: (res) => {
						this.formData = res.data.data;
					}
				})
			},
			showMark(){
				var ua = navigator.userAgent.toLowerCase();
				var isWeixin = ua.indexOf('micromessenger') != -1;
				if (isWeixin) {
					this.isMark = true;
				}else{
					this.isMark = false;
				}
			},
			closeMark(){
				this.isMark = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
.download-page{
	height: 100%;
	padding: 0;
	background: #fff;
	color: #333;
	overflow-y: auto;
	.content{
		&_top{
			&_img{
				width: 153rpx;
				height: 153rpx;
				margin: 250rpx auto 30rpx;
				&.driver{
					background: url('/static/download/driver.png') no-repeat;
					background-size: 100% 100%;
				}
				&.shipment{
					background: url('/static/download/shipment.png') no-repeat;
					background-size: 100% 100%;
				}
				&.kyd{
					background: url('/static/download/kyd.png') no-repeat;
					background-size: 100% 100%;
				}
				&.zt{
					background: url('/static/download/finance.png') no-repeat;
					background-size: 100% 100%;
				}
				&.zjz1{
					background: url('/static/download/zjz1.png') no-repeat;
					background-size: 100% 100%;
				}
			}
			&_text{
				font-size: 40rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}
		}
		&_center{
			>.button{
				display: block;
				width: 77%;
				height: 93rpx;
				line-height: 93rpx;
				background: #1C82FF;
				border-radius: 10rpx;
				margin: 0 auto;
				font-size: 36rpx;
				font-family: PingFang SC;
				font-weight: bold;
				color: #FFFFFF;
				text-align: center;
				margin-top: 300rpx;
				text-decoration: none;
			}
			>.box{
				color: rgba(51, 51, 51, 0.95);
				line-height: 40rpx;
				margin: 32rpx 80rpx 0 100rpx;
				.box_left{
					padding-left: 32rpx;
					background: url('/static/download/icon_save.png') no-repeat 0 4rpx;
					background-size: 24rpx 29rpx;
				}
				.box_right{
					padding-left: 40rpx;
					background: url('/static/download/icon_ad.png') no-repeat 0 4rpx;
					background-size: 31rpx 31rpx;
				}
			}
		}
		&_bottom{
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #999999;
			text-align: center;
			line-height: 46rpx;
			margin-top: 240rpx;
		}
	}
	
	.mark{
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(36, 36, 36, 0.7);
		overflow: hidden;
		&_box{
			float: right;
			margin: 32rpx 32rpx 0 0;
			padding-top: 225rpx;
			position: relative;
			&_img{
				position: absolute;
				top: 0;
				right: 0;
				width: 276rpx;
				height: 225rpx;
				background: url('/static/download/mark_1.png') no-repeat;
				background-size: 100% 100%;
			}
			&_text{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #FFFFFF;
				margin-top: 18rpx;
				.index{
					display: inline-block;
					width: 43rpx;
					height: 43rpx;
					line-height: 40rpx;
					text-align: center;
					background: #4478E4;
					border-radius: 50%;
					margin-right: 10rpx;
				}
				&.text1{
					.img{
						width: 34rpx;
						height: 68rpx;
						vertical-align: middle;
						margin: 0 8rpx;
					}
				}
				&.text2{
					.img{
						width: 211rpx;
						height: 48rpx;
						vertical-align: middle;
						margin-left: 8rpx;
					}
				}
			}
		}
	}
}
</style>
