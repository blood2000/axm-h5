<template>
	<view class="collection-page">
		<!-- <WhiteHeader :showBack="true">
			<text slot="title">代收协议</text>
		</WhiteHeader> -->
		<view class="collection-page__header">收款委托函</view>
		<view class="collection-page__before">致 福建大道成物流科技有限公司：</view>
		<view class="collection-page__content">
			本人<text class="underline">{{ form.driverName }}</text>(身份证号码:<text class="underline">{{ form.driverIdCard }}</text>，手机号码: <text class="underline">{{ form.driverPhone }}</text>)因自身原因，委托<text class="underline">{{ form.teamName }}</text>(身份证号码: <text class="underline">{{ form.teamIdCard }}</text>，手机号码:<text class="underline">{{ form.teamPhone }}</text>)作为本人在 <text class="underline">“福建大道成物流科技有限公司超好运网络货运平台”</text> 承接运单送货的收款人。收款范围：代表我与贵单位进行运费结算代收款事宜，有效期限<text class="underline">{{ form.validTimeStartFormat }}</text>至<text class="underline">{{ form.validTimeEndFormat }}</text>，代收过程中，代收人的一切行为均代表本人，与本人的行为具有同等法律效力。款项一经打入个人账户后，所发生的一切法律后果，均由本人负责承担。
		</view>
		<view class="collection-page__after">收款开户人姓名：</view>
		<view class="collection-page__after">收  款  账  号：</view>
		<view class="collection-page__after">开    户    行：</view>
		<view class="collection-page__after last">特此委托！</view>
		<view class="collection-page__sign">委托人（签字）：<text class="underline">{{ form.driver }}</text></view>
		<view class="collection-page__sign">日期：{{ form.createTimeFormat }}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getCollection } from '@/config/service/protocol.js';
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	export default {
		components: {
			WhiteHeader
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				form: {
					driverName: '',
					driverIdCard: '',
					driverPhone: '',
					teamName: '',
					teamIdCard: '',
					teamPhone: '',
					validTimeStartFormat: '',
					validTimeEndFormat: '',
					createTimeFormat: '',
					driver: ''
				}
			}
		},
		async onLoad(option){
			await this.$onLaunched;
			this.getData(option);
		},
		methods: {
			getData(option){
				getCollection(option, this.headerInfo).then(response => {
					this.form = { ...response.data }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.collection-page{
	height: 100%;
	padding: 0 60rpx;
	background: #fff;
	color: #444;
	overflow-y: auto;
	// padding-top: 130upx;
	&__header{
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		line-height: 100rpx;
		padding-top: 30rpx;
		color: #333;
	}
	&__before{
		font-size: 29rpx;
		font-weight: bold;
		margin-bottom: 26rpx;
	}
	&__content{
		font-size: 28rpx;
		text-indent: 2em;
		line-height: 40rpx;
		word-break: break-all;
		margin-bottom: 26rpx;
	}
	&__after{
		font-size: 28rpx;
		line-height: 40rpx;
		margin-bottom: 26rpx;
		&.last{
			margin-top: 80rpx;
		}
	}
	&__sign{
		font-size: 28rpx;
		text-align: right;
		line-height: 40rpx;
	}
	.underline{
		text-decoration: underline;
	}
}
</style>
