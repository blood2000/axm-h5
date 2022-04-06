<template>
	<view class="service-page">
		<!-- <view class="service-page__header">充值说明</view> -->
		
		<view class="service-page__content" style="margin-top: 60rpx">
			<view v-if="companyName && companyName !== ''" style="text-indent: 0;">{{ companyName }}：</view>
			<view>您好！这是贵司充值运费的账号，必须使用与超好运注册账户一致的企业对公户进行充值，充值成功后在超好运货主端APP的个人中心即可显示充值的金额。</view>
		</view>
		
		<button class="service-page__button" type="default" size="mini" @click="copyText">复制账号信息</button>
		
		<!-- 网商显示 -->
		<uni-table border emptyText="暂无数据" v-if="form.paymentChannels === 'WSBK' || form.paymentChannels === 'SXWSBK'">
		    <tbody>
				<uni-tr>
				   <uni-td>银行卡号</uni-td>
				   <uni-td>{{ form.account ? form.account : '' }}</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>开户名称</uni-td>
				   <uni-td>{{ form.paymentChannels === 'WSBK' ? '福建大道成物流科技有限公司' : '山西道承信息技术有限公司' }}</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>开户行</uni-td>
				   <uni-td>浙江网商银行</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>省份</uni-td>
				   <uni-td>浙江省</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>城市</uni-td>
				   <uni-td>杭州市</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>联行号</uni-td>
				   <uni-td>323331000001</uni-td>
				</uni-tr>
		    </tbody>
		</uni-table>
		
		<!-- 民生显示 -->
		<uni-table border emptyText="暂无数据" v-if="form.paymentChannels === 'CMBC'">
		    <tbody>
				<uni-tr>
				   <uni-td>银行账号</uni-td>
				   <uni-td>{{ form.bankAcc ? form.bankAcc : '' }}</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>开户名称</uni-td>
				   <uni-td>{{ form.accName ? form.accName : '' }}</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>开户行</uni-td>
				   <uni-td>民生银行</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>当前绑定卡号（请使用当前绑定卡号充值，否则无法到账）</uni-td>
				   <uni-td>{{ form.atBindBankCard ? form.atBindBankCard : '' }}</uni-td>
				</uni-tr>
		    </tbody>
		</uni-table>
		
		<!-- 浦发银行 -->
		<template v-if="form.paymentChannels === 'SPDB'">
			<uni-table border emptyText="暂无数据">
				<tbody>
					<uni-tr>
					   <uni-td>开户名称</uni-td>
					   <uni-td>福建大道成物流科技有限公司</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>银行卡号</uni-td>
					   <uni-td>43060078801400001078</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>开户银行</uni-td>
					   <uni-td>上海浦东发展银行股份有限公司福州福清支行</uni-td>
					</uni-tr>
					<uni-tr>
					   <uni-td>行号</uni-td>
					   <uni-td>310391000045</uni-td>
					</uni-tr>
				</tbody>
			</uni-table>
			<view class="row-tip-text" style="margin-top: 20upx">注意：银行仅支持绑定一个对公账户，充值前应绑定贵司对公账户，需与充值对公账户一致。</view>
		</template>
		
		<view style="margin-bottom: 100rpx"></view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import { getUserWalletBank } from '@/config/service/protocol.js';
	export default {
		data(){
			return {
				companyName: '',
				form: {}
			}
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			}),
		    inputValue() {
				let result = '';
				if (this.form.paymentChannels === 'WSBK' || this.form.paymentChannels === 'SXWSBK') {
					result = `银行账号：${this.form.account ? this.form.account : ''}; 开户名称：${this.form.paymentChannels === 'WSBK' ? '福建大道成物流科技有限公司' : '山西道承信息技术有限公司'}; 开户行：浙江网商银行; 省份：浙江省; 城市：杭州市; 联行号：323331000001`;
				}
				if (this.form.paymentChannels === 'CMBC') {
					result = `银行账号：${this.form.bankAcc ? this.form.bankAcc : ''}; 开户名称：${this.form.accName ? this.form.accName : ''}; 开户行：民生银行; 当前绑定卡号（请使用当前绑定卡号充值，否则无法到账）：${this.form.atBindBankCard ? this.form.atBindBankCard : ''}`;
				}
				if (this.form.paymentChannels === 'SPDB') {
					result = `开户名称：福建大道成物流科技有限公司; 银行卡号：43060078801400001078; 开户银行：上海浦东发展银行股份有限公司福州福清支行; 行号：310391000045`;
				}
				return result;
			}
		},
		async onLoad(options){
			await this.$onLaunched;
			this.getData(options);
		},
		methods: {
			getData(options) {
				this.companyName = options.companyName ? options.companyName : '';
				getUserWalletBank(this.headerInfo).then(response => {
					this.form = response.data || {};
				});
			},
			copyText() {
				// #ifdef H5
				this.$copyText(this.inputValue).then(
					res => {
						uni.showToast({
							title: '复制成功'
						})
					}
				)
				// #endif
				// #ifndef H5
				uni.setClipboardData({
					data: this.inputValue,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.service-page{
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
		&__content{
			font-size: 28rpx;
			text-indent: 2em;
			line-height: 40rpx;
			word-break: break-all;
			margin-bottom: 40rpx;
		}
		&__button{
			margin: 0 0 20rpx;
		}
		.row-tip-text{
			font-size: 28rpx;
			text-indent: 2em;
			line-height: 40rpx;
			word-break: break-all;
			margin-bottom: 40rpx;
		}
	}
</style>
