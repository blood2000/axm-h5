<template>
	<view class="container">
		<MenuWhiteHeader :showBack="true">
			<text slot="title">{{title}}</text>
			<text slot="menu">保存</text>
		</MenuWhiteHeader>
		<view class="cardView">
			<view class="cardRow">
				<view>
					<text class="rowLabel">规则名称</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<input class="rowInput" placeholder-class="placeholderStyle" maxlength="12" type="text"
					placeholder="请输入规则名称" />
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view>
					<text class="rowLabel">计算公式</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<view class="uni-list-cell-db flex justify-center" style="align-items: center;">
					<picker class="rowValue " selector-type="selector" :range="categories" rangeKey="goodsName"
						@change="onAccountingSelect">
						<view class="uni-input flex row" :style='{color:accountingSelected?"#333333":"#999999"}'>
							{{accountingSelectName}}
						</view>
					</picker>
					<image style="margin-left:12upx;width: 18upx; height: 10upx;"
						src="@/static/ic_weighing_arrow_down.png" />
				</view>
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view style="display: flex; justify-content: center;align-items: center;">
					<text class="rowLabel">默认规则</text>
					<checkbox-group class="checkBoxCircle">
						<checkbox style="transform:scale(0.7)" :checked="defaultRule"></checkbox>
					</checkbox-group>
				</view>
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view style="display: flex; justify-content: center;align-items: center;">
					<text class="rowLabel">计算路耗</text>
					<checkbox-group class="checkBoxCircle" @change="calePathLossToggle">
						<checkbox style="transform:scale(0.7)" :value="calePathLossFlag" :checked="calePathLoss">
						</checkbox>
					</checkbox-group>
				</view>
			</view>
			<view class="roleLossView" v-if="calePathLoss">
				<view class="roleLossItem">
					<view style="display: flex; flex-direction: row;">
						<text class="rowLabel">路耗规则</text>
						<image type="icon" class="required" style="width: 32upx; height: 32upx; "
							src="@/static/ic_required.png" />
					</view>
					<view style="display: flex;justify-content: center; align-items: center; text-align: end;">
						<picker class="ruleInput " selector-type="selector" :range="caleFormula" rangeKey="formulaName"
							@change="onFormulaSelect">
							<view class="ruleFomelaView" :style='{color:formulaSelected?"#333333":"#999999"}'>
								<text>{{formulaSelectName}}</text>
								<image style="margin-left:12upx;width: 18upx; height: 10upx;"
									src="@/static/ic_weighing_arrow_down.png" />
							</view>
						</picker>
					</view>
				</view>
				<view class="roleLossItem" style="margin-top: 28upx;">
					<view style="display: flex; align-items: center; margin-top: ;">
						<view style="display: flex; flex-direction: row;">
							<text class="rowLabel">路耗亏吨方案</text>
							<image type="icon" class="required" style="width: 32upx; height: 32upx; "
								src="@/static/ic_required.png" />
						</view>
						<view>
							<radio-group @change="onSchemeSelect" class="radioGroup">
								<label class="uni-list-cell uni-list-cell-pd radioButton"
									v-for="(item, index) in scheme" :key="item.schemeName">
									<view style="display: flex;">
										<radio :value="item.schemeCode" :checked="index === currentsSheme" />
										<view style="margin-left: 24upx; text-align: center;">{{item.schemeName}}</view>
									</view>

								</label>
							</radio-group>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';

	export default {
		components: {
			MenuWhiteHeader,
		},
		data() {
			return {
				title: "新增核算规则",
				accountingSelectName: "请选择计算公式",
				accountingSelectCode: "",
				accountingSelected: false,
				categories: [{
					goodsName: "默认核算规则",
					goodsCode: "10001",
					goodsValue: "10000",
				}, {
					goodsName: "测试用的核算规则",
					goodsCode: "20001",
					goodsValue: "30000",
				}],
				defaultRule: false,
				calePathLoss: true,
				calePathLossFlag: "cale",

				formulaSelectName: "请选择路耗规则",
				formulaSelectCode: "",
				formulaSelected: false,
				caleFormula: [{
					formulaName: "重量差*货物单价",
					formulaCode: "1",
				}, {
					formulaName: "(重量差-容忍值) *货物单价",
					formulaCode: "2",
				}],
				scheme: [{
					schemeName: "定额",
					schemeCode: "1",
				}, {
					schemeName: "定律",
					schemeCode: "2",
				}],
				currentsSheme: 0,
			}
		},
		methods: {
			// 选择了计算公式
			onAccountingSelect(e) {
				const index = e.detail.value
				this.accountingSelectName = this.categories[index].goodsName
				this.accountingSelectCode = this.categories[index].goodsCode
				this.accountingSelected = true
			},
			// 计算路耗开关
			calePathLossToggle(e) {
				this.calePathLoss = e.detail.value.includes(this.calePathLossFlag)
			},
			// 选择了路耗规则
			onFormulaSelect(e) {
				const index = e.detail.value
				this.formulaSelectName = this.caleFormula[index].formulaName
				this.formulaSelectCode = this.caleFormula[index].formulaCode
				this.formulaSelected = true
			},
			// 选择了亏吨方案
			onSchemeSelect(e) {
				const index = e.detail.value
				console.log("选择亏吨方案:", index)
			},
		}
	}
</script>

<style scoped>
	.cardView {
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin: 16upx;
		padding: 12px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.cardRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.rowLabel {
		font-size: 30upx;
		font-family: bold;
		font-style: bold;
		color: #333333;
	}

	.rowValue {
		font-size: 26upx;
		align-items: center;
		display: flex;
		justify-content: flex-end;
		min-width: 150upx;
		min-height: 50upx;
	}

	.rowInput {
		font-size: 26upx;
		color: #333333;
		align-items: center;
		display: flex;
		min-height: 0upx;
		min-width: 0upx;
		text-align: end;
	}

	.placeholderStyle {
		color: #999999;
		font-size: 26upx;
	}

	.required {
		text-align: center;
	}

	.checkBoxCircle {
		margin-left: 12upx;
	}

	.roleLossView {
		margin-top: 24upx;
		padding: 24upx;
		background-color: #F2F7FF;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		border-radius: 14upx;
	}

	.roleLossItem {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.ruleFomelaView {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		text-align: right;
	}

	.ruleInput {
		font-size: 26upx;
		color: #333333;
		align-items: center;
		display: flex;
		background-color: #FFFFFF;
		padding-right: 12upx;
		justify-content: flex-end;
		min-width: 400upx;
		width: 400upx;
		padding-left: 12upx;
		min-height: 60upx;
		text-align: right;
	}

	.radioGroup {
		display: flex;
		flex-direction: row;
		align-items: center;
		transform: scale(0.7)
	}

	.radioButton {
		margin-left: 36upx;
		display: flex;
		text-align: center;
		align-items: center;
		justify-content: center;
		font-size: 36upx;

	}
</style>
