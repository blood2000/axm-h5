<template>
	<view class="service-page">
		<view class="service-page__header">充值说明</view>
		
		<view class="service-page__content">
			<view v-if="companyName && companyName !== ''" style="text-indent: 0;">{{ companyName }}：</view>
			<view>您好！这是贵司充值运费的账号，必须使用与超好运注册账户一致的企业对公户进行充值，充值成功后在超好运货主端APP的个人中心即可显示充值的金额。</view>
		</view>
		
		<!-- <button class="service-page__button" type="default" size="mini" @click="copy">复制账号信息</button> -->

		<uni-table border emptyText="暂无数据">
		    <tbody>
				<uni-tr>
				   <uni-td>银行账号</uni-td>
				   <uni-td>{{ account ? account : '' }}</uni-td>
				</uni-tr>
				<uni-tr>
				   <uni-td>开户名称</uni-td>
				   <uni-td>福建大道成物流科技有限公司</uni-td>
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
		
		<!-- <view style="position: relative;">
			<input
			    id="table-inner-id"
			    :value="inputValue"
			    style="width: 100px;"
			>
			<div style="width: 100%; height: 100%; background: #fff; position: absolute; left: 0; top: 0" />
		</view> -->
		
		<view style="margin-bottom: 100rpx"></view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				companyName: null,
				account: null
			}
		},
		computed: {
		    inputValue() {
				return `银行账号：${this.account ? this.account : ''}; 开户名称：福建大道成物流科技有限公司; 开户行：浙江网商银行; 省份：浙江省; 城市：杭州市; 联行号：323331000001`;
		    }
		},
		async onLoad(options){
			await this.$onLaunched;
			this.getData(options);
		},
		methods: {
			getData(options) {
				this.companyName = options.companyName ? options.companyName : null;
				this.account = options.account ? options.account : null;
			},
			copy() {
				document.getElementById('table-inner-id').select();
				if (document.execCommand('copy')) {
					document.execCommand('copy');
					this.msgSuccess('复制成功!');
				} else {
					this.msgError('复制失败');
				}
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
	}
</style>
