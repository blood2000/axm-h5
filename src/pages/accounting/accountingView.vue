<template>
	<view class="container">
		<WhiteHeader :showBack="true" :isSecondaryPage="false">
			<text slot="title" style="font-weight: bold;">核算规则详情</text>
		</WhiteHeader>

		<view class="root ly-flex ly-flex-v">
			<view class="item ly-flex ly-flex-pack-justify ly-flex-align-center">
				<text class="label">货物类型</text>
				<text class="value">{{response.ruleInfo.name}}</text>
			</view>
			<view style="background-color: #EDEDED; height: 2rpx; width: 100%;" />
			<view class="item ly-flex ly-flex-pack-justify ly-flex-align-center">
				<text class="label">计算公式</text>
				<text class="value">{{response.ruleInfo.ruleFormula}}</text>
			</view>
			<view style="background-color: #EDEDED; height: 2rpx; width: 100%;" />
			<view v-if="response.ruleInfo.isDefault === 'Y'" class="item ly-flex ly-flex-align-center">
				<text class="label">默认规则</text>
			</view>
			<view v-if="response.ruleInfo.isDefault === 'Y'"
				style="background-color: #EDEDED; height: 2rpx; width: 100%;" />
			<view v-if="calePathLoss">
				<view class="item ly-flex ly-flex-align-center">
					<text class="label">计算路耗</text>
				</view>
				<view class="ruleLossView">
					<view class="secondItem ly-flex ly-flex-pack-justify ly-flex-align-center">
						<text class="secondLabel">路耗规则</text>
						<text class="secondValue">{{roadLossRule}}</text>
					</view>
					<view class="secondItem ly-flex ly-flex-pack-justify ly-flex-align-center">
						<text class="secondLabel">路耗亏吨方案</text>
						<text class="secondValue">{{ruleLossPlan}}</text>
					</view>
					<view class="secondItem ly-flex ly-flex-align-center ly-flex-pack-end"
						style="width: 100%; justify-content: flex-end;">
						<text class="ruleLossValueFont">{{defaultSchemeMin}}</text>
						<text style="font-size: 26rpx;">至</text>
						<text class="ruleLossValueAfter">{{defaultSchemeMax}}</text>
					</view>
				</view>
			</view>
			<view v-if="deductionProject.length > 0" class="projectRoot ly-flex ly-flex-v">
				<text class="label" style="margin-bottom: 24rpx; margin-left: 16rpx;">扣费项目</text>
				<view class="ly-flex ly-flex-v ly-flex-pack-star projectItem">
					<view v-for="(item, index) in deductionProject">
						<view class="ly-flex ly-flex-pack-justify ly-flex-align-center"
							style="margin: 12rpx; padding-left: 18rpx;">
							<text class="secondLabel">{{item.cnName}}</text>
							<text class="value projectValue">{{item.ruleValue}}</text>
						</view>
					</view>
				</view>
			</view>
			<view v-if="subsidiesProject.length > 0" class="projectRoot ly-flex ly-flex-v">
				<text class="label" style="margin-bottom: 24rpx;">补贴项目</text>
				<view class="ly-flex ly-flex-v ly-flex-pack-start projectItem">
					<view v-for="(item, index) in subsidiesProject">
						<view class="ly-flex ly-flex-pack-justify ly-flex-align-center"
							style="margin: 12rpx; padding-left: 18rpx;">
							<text class="secondLabel">{{item.cnName}}</text>
							<text class="value projectValue">{{item.ruleValue}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import {
		accountingDetail
	} from '@/config/service/accounting.js';
	import {
		mapState
	} from 'vuex';
	export default {
		components: {
			WhiteHeader,
		},
		computed: {
			...mapState({
				headerInfo: state => state.header.headerInfo
			}),
		},
		data() {
			return {
				viewCode: null,
				response: {
					name: "货物类型",
					formula: "计算公式",
					ruleLossName: "路耗规则",
					ruleLossPlan: "定额",
					detailList: [],
					ruleInfo: {}
				},
				deductionProject: [],
				subsidiesProject: [],
				defaultSchemeMin: null,
				defaultSchemeMax: null,
				roadLossRule: null,
				ruleLossPlan: null,
				calePathLoss: true
			}
		},
		async mounted() {
			await this.$onLaunched
			this.queryAccountingDetail(this.viewCode)
		},

		async onLoad(option) {
			await this.$onLaunched;
			this.viewCode = option.viewCode;
		},
		methods: {
			//核算详情
			queryAccountingDetail(code) {
				uni.showLoading({
					title: ""
				})
				accountingDetail(code, this.headerInfo).then(response => {
					uni.hideLoading()
					this.response = response.data
					this.defauleName = response.data.ruleInfo.name //规则名称
					this.isDefault = response.data.ruleInfo.isDefault === "Y" ? true : false //是否默认规则
					this.defauleFormula = response.data.ruleInfo.ruleDictValue //计算公式
					
					let lossList = response.data.lossList
					this.calePathLoss = lossList.length > 0 ? true : false
					for (var i = 0; i < this.response.detailList.length; i++) {
						let item = this.response.detailList[i]
						if (item.type === "1") {
							//补贴
							if (item.showType === 3) {
								//下拉选择的
								let option = item.dictList
								for (var j = 0; j < option.length; j++) {
									if (option[j].dictValue === item.ruleValue) {
										item.ruleValue = option[j].dictLabel
									}
								}
							}
							this.subsidiesProject.push(item)
						} else if (item.type === "2") {
							//扣费
							if (item.showType === 3) {
								//下拉选择的
								let option = item.dictList
								for (var j = 0; j < option.length; j++) {
									if (option[j].dictValue === item.ruleValue) {
										item.ruleValue = option[j].dictLabel
									}
								}
							}
							this.deductionProject.push(item)
						} else if (item.dictCode === "lossPlan") {
							//路耗 亏吨方案
							let option = item.dictList
							for (var j = 0; j < option.length; j++) {
								if (option[j].dictValue === item.ruleValue) {
									this.ruleLossPlan = option[j].dictLabel
								}
							}

						} else if (item.enName === "LOSS_TOLERANCE") {
							//路耗容忍值
							let ruleValue = JSON.parse(item.ruleValue)
							this.defaultSchemeMin = Math.abs(ruleValue[0])
							this.defaultSchemeMax = ruleValue[1]
						} else if (item.dictCode === "lossRule") {
							//路耗规则
							let option = item.dictList
							for (var j = 0; j < option.length; j++) {
								if (option[j].dictValue === item.ruleValue) {
									this.roadLossRule = option[j].dictLabel
								}
							}
						}
					}
				})
			},
		}
	}
</script>

<style>
	.root {
		padding-left: 24rpx;
		padding-right: 24rpx;
		background-color: #FFFFFF;
		border-radius: 20rpx;
		margin: 24rpx;
		padding-bottom: 24rpx;
	}

	.item {
		margin-bottom: 24rpx;
		padding-top: 32rpx;
		padding-bottom: 8rpx;
		padding-left: 12rpx;
		padding-right: 12rpx;
	}

	.label {
		font-weight: bold;
		font-size: 32rpx;
		color: #333333;
	}

	.value {
		color: #333333;
		font-size: 28rpx;
		font-weight: 500;
	}

	.checkBox {
		margin-left: 24rpx;
		height: 28rpx;
		width: 28rpx;
	}

	.secondItem {
		margin-bottom: 16rpx;
		padding-top: 18rpx;
		padding-left: 6rpx;
		padding-right: 6rpx;
	}

	.secondLabel {
		font-weight: bold;
		font-size: 30rpx;
		color: #333333;
	}

	.secondValue {
		color: #333333;
		font-size: 28rpx;
		font-weight: 500;
	}

	.ruleLossView {
		margin-top: 24rpx;
		padding-left: 24rpx;
		padding-right: 24rpx;
		padding-bottom: 8rpx;
		background-color: #F2F7FF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 14rpx;
	}

	.ruleLossValueFont {
		background-color: #FFFFFF;
		border-color: #999999;
		border-width: 2rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		padding-right: 24rpx;
		text-align: end;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		min-width: 160rpx;
		min-height: 60rpx;
	}

	.ruleLossValueAfter {
		background-color: #FFFFFF;
		border-color: #999999;
		border-width: 2rpx;
		margin-left: 20rpx;
		font-size: 28rpx;
		padding-right: 24rpx;
		text-align: end;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		min-width: 160rpx;
		min-height: 60rpx;
	}

	.projectItem {
		background-color: #F2F7FF;
		border-radius: 14rpx;
		padding-top: 12rpx;
		padding-bottom: 12rpx;
	}

	.projectRoot {
		margin-top: 20rpx;
	}

	.projectValue {
		background-color: #FFFFFF;
		border-color: #999999;
		border-width: 2rpx;
		margin-right: 20rpx;
		font-size: 28rpx;
		padding-right: 24rpx;
		text-align: end;
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
		min-width: 300rpx;
		min-height: 60rpx;
	}
</style>
