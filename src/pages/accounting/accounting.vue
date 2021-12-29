<template>
	<view class="register">
		<view class="root">
			<MenuWhiteHeader :showBack="true">
				<text slot="title">核算规则</text>
				<text slot="menu" @click="onClickAddAction()">新增</text>
			</MenuWhiteHeader>
			<view class="platformItemRoot" v-for="(sub, index) in accountingData" v-bind:key="index">
				<view class="platformTitleView">
					<view class="platformTitleItem">
						<view class="platformTitle">{{sub.name}}</view>
						<view v-if="sub.isDefault == 'Y'" class="platformStatus">默认</view>
					</view>
					<img class="closeButton" src="/static/icon_close.png" @click="onClickDeleteAction(sub)" />
				</view>
				<view class="freight">运费=装卸货最小数量*运费单价+增项-减项</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">扣费项目</view>
					<view :class="sub.showDecutionInfoMore ? 'deductionBgLarge' : 'deductionBgSmall'">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium; margin-left: 8upx;"
								@click="onDeductionClick(sub)">
								{{ sub.deductionSize }}
								<image
									:src="sub.showDecutionInfoMore ? '/static/icon_upArrow.png' : '/static/icon_downArrow.png'"
									class="downArrow" mode="widthFix" />
							</view>
							<view v-if="sub.showDecutionInfoMore" class="freightDetail">{{ sub.deduction }}</view>
						</view>
					</view>
				</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">补贴项目</view>
					<view :class="sub.showSubsidiesInfoMore ? 'deductionBgLarge' : 'deductionBgSmall'">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium; margin-left: 8upx;"
								@click="onSubsidiesClick(sub)">
								{{ sub.subsidiesSize }}
								<image
									:src="sub.showSubsidiesInfoMore ? '/static/icon_upArrow.png' : '/static/icon_downArrow.png'"
									class="downArrow" mode="widthFix" />
							</view>
							<view v-if="sub.showSubsidiesInfoMore" class="freightDetail">{{ sub.subsidies }}</view>
						</view>
					</view>
				</view>
				<hr class="line">
				<view class="bottom">
					<view class="setDefault" @click="onSetupDefaultClick(sub)">
						<image :src="sub.isDefault == 'Y' ? '/static/icon_checked.png' : '/static/icon_unChecked.png'"
							class="defaultIcon" mode="widthFix" />
						<view class="setUpDefault">设为默认</view>
					</view>
					<view class="detailAndModify">
						<view class="detail" @click="onViewDetailClick(sub)">详情</view>
						<view class="confirm" @click="onModifyClick(sub)">修改</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';
	import {
		mapState
	} from 'vuex';
	import {
		getAccountingList,
		deleteAccounting,
		updateAccountingIsDefault,
	} from '@/config/service/accounting.js';
	export default {
		props: {},

		components: {
			MenuWhiteHeader,
		},
		async mounted() {
			await this.$onLaunched
			uni.startPullDownRefresh();
		},
		computed: {
			...mapState({
				headerInfo: state => state.header.headerInfo
			}),
		},
		data() {
			return {
				phone: "",
				item: "1",
				password: "",
				rememberPws: false,
				radio1: "首页",
				checked: false,
				accountingData: [],
			};
		},
		onPullDownRefresh() {
			this.accountingData = []
			this.queryAccountingList()
			uni.stopPullDownRefresh(); //停止下拉刷新动画			
		},
		methods: {
			onDeductionClick(sub) {
				sub.showDecutionInfoMore = !sub.showDecutionInfoMore;
			},
			onSubsidiesClick(sub) {
				sub.showSubsidiesInfoMore = !sub.showSubsidiesInfoMore;
			},
			onDefaultStateChange(index, e) {
				console.log(e.detail);
			},
			onClickAddAction() {
				console.log("点击了添加");
				uni.navigateTo({
					url: '/pages/accounting/accountingDetail'
				});
			},
			onClickDeleteAction(sub) {
				uni.showModal({
					title: '提示',
					content: '确认删除这条规则吗？',
					success: function(res) {
						if (res.confirm) {
							deleteAccounting(sub.code, this.headerInfo).then(response => {
								if (response.code == 200) {
									this.accountingData.splice(this.accountingData.indexOf(sub), 1);
								}
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}.bind(this)
				});
			},
			onSetupDefaultClick(sub) { //设置默认
				updateAccountingIsDefault(sub.code, sub.isDefault == "Y" ? "N" : "Y", this.headerInfo).then(response => {
					if (response.code == 200) {
						sub.isDefault = sub.isDefault == "Y" ? "N" : "Y";
					}
				})
			},
			onModifyClick(sub) {
				console.log("点击了修改");
				uni.navigateTo({
					url: '/pages/accounting/accountingDetail?editCode='+sub.code
				});
			},
			onViewDetailClick(sub) {
				console.log("点击了查看详情");
				uni.navigateTo({
					url: '/pages/accounting/accountingDetail?editCode='+sub.code
				});
			},
			//获取项目列表
			queryAccountingList() {
				console.log("获取项目列表");
				getAccountingList(this.headerInfo).then(response => {
					response.data.list.map(item => {
						item.showDecutionInfoMore = false
						item.showSubsidiesInfoMore = false
						if (item.deductionSize == null) {
							item.deductionSize = 0
						}
						if (item.subsidiesSize == null) {
							item.subsidiesSize = 0
						}
					})
					this.accountingData = response.data.list;
					console.log(response.data.list)
				})
			},
		},
	};
</script>

<style scoped lang="scss">
	.register {
		background-color: #FFFFFF;
		height: 100vh;
	}

	.toolBar {
		background-color: white;
		height: 50upx;
		display: flex;
		margin-bottom: 6upx;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.back {
		max-height: 20upx;
		width: 12upx;
		padding-left: 12upx;
	}

	.line {
		background-color: #EEEEEE;
		border: none;
		margin-left: 24upx;
		margin-right: 24upx;
		margin-top: 28upx;
		margin-bottom: 10upx;
		height: 1upx;
	}

	.back {
		color: #4478e4;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14upx;
	}

	.platformItemRoot {
		background-color: white;
		border-radius: 16upx;
		display: flex;
		padding-bottom: 12upx;
		flex-direction: column;
		margin-right: 32upx;
		margin-left: 32upx;
		margin-bottom: 0upx;
		margin-top: 24upx;
		border: none;
	}

	.platformTitleView {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.platformTitleItem {
		background-color: white;
		border-radius: 8upx;
		display: flex;
		margin: 0upx;
		padding: 0upx;
		flex-direction: row;
		align-items: center;
		border: none;
	}

	.setDefault {
		display: flex;
		margin: 0upx;
		padding: 0upx;
		flex-direction: row;
		align-items: center;
		border: none;
	}
	
	.detailAndModify {
		display: flex;
		flex-direction: row;
		align-items: center;
		border: none;
		justify-content: space-between;
	}

	.platformTitleLeftDiv {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 12upx;
		justify-content: space-between;
	}

	.platformTitle {
		margin-left: 25upx;
		color: #333;
		font-weight: bold;
		margin-top: 12upx;
		font-size: 32upx;
	}

	.closeButton {
		width: 26upx;
		height: 26upx;
		border: none;
		margin-right: 12upx;
		display: flex;
		align-items: center;
		margin-top: 12upx;
	}

	.downArrow {
		margin-left: 24upx;
		width: 25upx;
		height: 25upx;
		padding-top: 3upx;
	}

	.defaultIcon {
		margin-left: 24upx;
		width: 34upx;
		height: 34upx;
		padding-top: 0upx;
	}

	.platformDeductionLayout {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-right: 12upx;
	}

	.platformDeduction {
		margin-left: 25upx;
		margin-top: 24upx;
		margin-right: 20upx;
		color: #333;
		font-family: PingFang Bold;
		white-space: nowrap;
		font-size: 28upx;
		font-weight: bold;
	}

	.deductionBgSmall {
		width: 100upx;
	}

	.deductionBgLarge {}

	.platformDeductionDetail {
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		border-radius: 8upx;
		margin-top: 12upx;
		margin-left: 4upx;
		padding: 10upx;
	}

	.platformStatus {
		margin-top: 12upx;
		height: 33upx;
		display: flex;
		align-items: center;
		margin-left: 8upx;
		border: 1upx solid #4478e4;
		color: #4478e4;
		padding-left: 11upx;
		padding-right: 11upx;
		padding-top: 6upx;
		padding-bottom: 6upx;
		border-radius: 4upx;
		font-size: 22upx;
	}

	.freight {
		font-size: 24upx;
		color: #878787;
		margin-left: 25upx;
		margin-top: 13upx;
		font-family: PingFang Bold;
	}

	.freightDetail {
		font-size: 24upx;
		margin-top: 6upx;
		color: #878787;
		font-family: PingFang Bold;
	}

	.group {
		display: flex;
		justify-content: space-around;
		border-radius: 4upx;
		border: 1upx solid #1bb2c7;
	}

	.radioItem>>>.el-radio-button__inner {
		border-radius: 0upx;
		border: none;
		border-left: none;
		color: #1bb2c7;
	}

	.el-radio-button.first-child.el-radio-button__inner {
		border: none;
	}

	/* 根div */
	.root {
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		height: 100%;
	}

	.divi {
		margin-left: 12upx;
		margin-right: 12upx;
		background-color: #eee;
		height: 1upx;
		margin-top: 12upx;
	}

	.bottom {
		display: flex;
		padding-top: 12upx;
		padding-bottom: 12upx;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.setUpDefault {
		color: #4478E4;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
		background-color: transparent;
		margin-left: 11upx;
	}

	::v-deep.uni-checkbox-input.uni-checkbox-input-checked {
		margin-right: 12upx;
		border-radius: 24upx;
		border-color: #999999;
	}

	::v-deep.uni-checkbox-input {
		margin-right: 12upx;
		border-radius: 24upx;
		border-color: #4478e4;
	}

	.detail {
		background-color: #4478e4;
		border-radius: 5upx;
		height: 56upx;
		width: 110upx;
		margin-right: 23upx;
		text-align: center;
		border: none;
		font-size: 28upx;
		color: white;
		padding-top: 8upx;
	}
	
	.confirm {
		background-color: #4478e4;
		border-radius: 5upx;
		height: 56upx;
		width: 110upx;
		margin-right: 23upx;
		text-align: center;
		border: none;
		font-size: 28upx;
		color: white;
		padding-top: 8upx;
	}
	
	.detail {
		background-color: #4478e4;
		border-radius: 5upx;
		height: 56upx;
		width: 110upx;
		margin-right: 23upx;
		text-align: center;
		border: none;
		font-size: 28upx;
		color: white;
		padding-top: 8upx;
	}
</style>
