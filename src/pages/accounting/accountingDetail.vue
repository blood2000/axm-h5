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
			<view style="width: 100%; height: 2upx; background-color: #EBEBEB;margin-top: 28upx;" />
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
					<view class="shemeItem">
						<view style="display: flex; flex-direction: row;">
							<text class="rowLabel">路耗亏吨方案</text>
							<image type="icon" class="required" style="width: 32upx; height: 32upx; "
								src="@/static/ic_required.png" />
						</view>
						<view style="display: flex; flex-direction: column;">
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
				<view class="shemeItem">
					<view class="ruleFomelaView" style="margin-right: 24upx;">-</view>
					<view class="shemeInput">
						<input type="digit" :value="defaultSchemeMin" style="font-size: 26upx;" placeholder="最小值" />
						<text style="color: #666666;">{{schemeUnit[currentsUnitSheme].schemeUnitName}}</text>
					</view>
					<view class="ruleFomelaView" style="margin-left: 24upx;margin-right: 24upx;">至</view>
					<view class="shemeInput">
						<input type="digit" :value="defaultSchemeMax" style="font-size: 26upx;" placeholder="最大值" />
						<text style="color: #666666;">{{schemeUnit[currentsUnitSheme].schemeUnitName}}</text>
					</view>
				</view>
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<text class="rowLabel">扣费项目</text>
				<image type="icon" class="required" style="width: 32upx; height: 32upx; "
					src="@/static/ic_accounting_plus.png" @click="open" />
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<text class="rowLabel">补贴项目</text>
				<image type="icon" class="required" style="width: 32upx; height: 32upx; "
					src="@/static/ic_accounting_plus.png" @click="open" />
			</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="projectDialog">
				<radio-group style="width: 100%;">
					<label style="width: 100%;"
						v-for="(item, index) in projectList" :key="item.projectName">
						<view class="projectItem">
							<view>{{item.projectName}}</view>
							<view>
								<radio :value="item.projectName" :checked="index === currentProject" />
							</view>
						</view>
						<view v-if="index < projectList.length - 1" style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
					</label>
				</radio-group>
			</view>
		</uni-popup>
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
				isShowProject: false,
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
					schemeCode: "0",
				}, {
					schemeName: "定律",
					schemeCode: "1",
				}],
				schemeUnit: [{
					schemeUnitName: "kg/m³",
				}, {
					schemeUnitName: "%",
				}],
				defaultSchemeMin: "5.00",
				defaultSchemeMax: "5.00",
				currentsUnitSheme: 0,
				currentsSheme: 0,
				projectList: [{
					projectName: "抹零规则",
					projectCode: "0",
				}, {
					projectName: "油费",
					projectCode: "1",
				}, {
					projectName: "ETC费用",
					projectCode: "2",
				}, {
					projectName: "超时费",
					projectCode: "3",
				}, {
					projectName: "装车费",
					projectCode: "4",
				}, ],
				currentProject: 0,
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
				this.currentsUnitSheme = index
				if (this.currentsUnitSheme == 0) {
					this.defaultSchemeMin = "5.00"
				} else {
					this.defaultSchemeMin = "0.3"
				}
			},
			//点击添加扣费项目
			onDeductionPlusClick() {
				console.log("点击添加扣费项目")
				this.isShowProject = true
			},
			//点击添加补贴项目
			onSubsidiesPlusClick() {
				this.isShowProject = true
				console.log("点击添加补贴项目：", this.isShowProject)
			},
			//展示项目选择popup
			open() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open('top')
			}
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

	.ruleView {
		display: flex;
		flex-direction: r;
		justify-content: flex-end;
		align-items: center;
	}

	.ruleInput {
		font-size: 26upx;
		color: #333333;
		align-items: center;
		display: flex;
		background-color: #FFFFFF;
		padding-right: 12upx;
		justify-content: flex-end;
		min-width: 356upx;
		width: 356upx;
		padding-left: 12upx;
		min-height: 60upx;
		text-align: right;
	}

	.shemeItem {
		display: flex;
		margin-top: 28upx;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.shemeInput {
		font-size: 24upx;
		color: #333333;
		background-color: #FFFFFF;
		padding-right: 12upx;
		min-width: 200upx;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 200upx;
		padding-left: 12upx;
		min-height: 60upx;
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

	.projectDialog {
		background-color: #FFFFFF;
		width: calc(80vw);
		border-radius: 20upx;
		text-align: center;
	}

	.projectItem {
		display: flex;
		width: 100%;
		flex-direction: row;
		font-size: 36upx;
		transform: scale(0.7);
		margin-top: 28upx;
		margin-bottom: 28upx;
		justify-content: space-between;
		align-items: center;
	}
</style>
