<template>
	<view class="container">
		<MenuWhiteHeader :showBack="true">
			<text slot="title">{{title}}</text>
			<text slot="menu">保存</text>
		</MenuWhiteHeader>
		<SimplePopup ref="simple" :list="categories" key="goodsName" value="goodsValue" :toggle="simpleToggle">
		</SimplePopup>
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
					<picker class="rowValue " selector-type="selector" :range="categories" rangeKey="dictLabel"
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
					<view style="display: flex; flex-direction: row; ">
						<text class="rowLabel">路耗规则</text>
						<image type="icon" class="required" style="width: 32upx; height: 32upx; "
							src="@/static/ic_required.png" />
					</view>
					<view class="roleLoss">
						<picker class="ruleInput " selector-type="selector" :range="caleFormula" rangeKey="dictLabel"
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
									v-for="(item, index) in scheme" :key="item.dictLabel">
									<view style="display: flex;">
										<radio :value="item.dictValue" :checked="index === currentsSheme" />
										<view style="margin-left: 24upx; text-align: center;">{{item.dictLabel}}</view>
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
			<view v-if="calePathLoss == false"
				style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view style="display: flex; flex-direction: column; margin-top: 28upx;">
				<view class="cardRow">
					<text class="rowLabel">扣费项目</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_accounting_plus.png" @click="onDeductionPlusClick" />
				</view>
				<view v-if="currentDeductionProject.length > 0" class="projectRoot">
					<view v-for="(item,index) in currentDeductionProject" class="projectItem"
						style="margin-top: 28upx;">
						<view class="showTypeInput ly-flex-align-center  ly-flex-pack-justify">
							<text style="width: 30%; text-align: start;">{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify" style="width: 70%;">
								<view v-if="item.showType == 1" class="showTypeInputView">
									<input class="ruleInput" />
									<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
										src="@/static/ic_accounting_delete.png" @click="onDeductionPlusClick" />
								</view>
								<view v-if="item.showType == 2">

								</view>
								<view v-if="item.showType == 3" class="showTypeInputView">
									
								</view>
								<view v-if="item.showType == 4">

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="currentDeductionProject.length == 0"
				style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view style="display: flex; flex-direction: column; margin-top: 28upx;">
				<view class="cardRow">
					<text class="rowLabel">补贴项目</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_accounting_plus.png" @click="onSubsidiesPlusClick" />
				</view>
				<view v-if="currentSubsidiesProject.length > 0" class="projectRoot">
					<view v-for="(item,index) in currentSubsidiesProject" style="margin-top: 28upx;">
						<view class="showTypeInput ly-flex-align-center  ly-flex-pack-justify">
							<text>{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify">
								<view v-if="item.showType == 1" class="showTypeInputView">
									<input class="ruleInput"> </input>
									<image type="icon" class="required"
										style="width: 39upx; height: 39upx; margin-left: 24upx; "
										src="@/static/ic_accounting_delete.png" @click="onDeductionPlusClick" />
								</view>
								<view v-if="item.showType == 2" class="showTypeInputView">

								</view>
								<view v-if="item.showType == 3" class="showTypeInputView">
								</view>
								<view v-if="item.showType == 4" class="showTypeInputView">

								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<uni-popup ref="popup">
			<view class="projectDialog">
				<checkbox-group style="width: 100%; padding-top: 4upx; padding-bottom: 4upx;" @change="projectChange">
					<label style="width: 100%;" v-for="(item, index) in projectList" :key="item.cnName"
						:value="item.code">
						<view class="popupProjectItem">
							<view>{{item.cnName}}</view>
							<view>
								<checkbox style="transform: scale(0.7)" :value="item.code"
									:checked="popupTypeIsDeduction == 'true'?currentDeductionProject.includes(item):currentSubsidiesProject.includes(item)"
									:disabled="popupTypeIsDeduction == 'true'?currentSubsidiesProject.includes(item):currentDeductionProject.includes(item)" />
							</view>
						</view>
						<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 18upx;" />
					</label>
				</checkbox-group>
				<view style="display: flex; margin-top: 18upx;">
					<button class="projectCancel" @click="close">取消</button>
					<button class="projectConfirm" @click="onProjectSelected">确定</button>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="popup">
			<view class="projectDialog">
				<checkbox-group style="width: 100%; padding-top: 4upx; padding-bottom: 4upx;" @change="projectChange">
					<label style="width: 100%;" v-for="(item, index) in projectList" :key="item.cnName"
						:value="item.code">
						<view class="popupProjectItem">
							<view>{{item.cnName}}</view>
							<view>
								<checkbox style="transform: scale(0.7)" :value="item.code"
									:checked="popupTypeIsDeduction == 'true'?currentDeductionProject.includes(item):currentSubsidiesProject.includes(item)"
									:disabled="popupTypeIsDeduction == 'true'?currentSubsidiesProject.includes(item):currentDeductionProject.includes(item)" />
							</view>
						</view>
						<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 18upx;" />
					</label>
				</checkbox-group>
				<view style="display: flex; margin-top: 18upx;">
					<button class="projectCancel" @click="close">取消</button>
					<button class="projectConfirm" @click="onProjectSelected">确定</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';
	import SimplePopup from '@/components/picker/SimplePopup.vue';
	import {
		mapState
	} from 'vuex';
	import {
		getAccountingProjectList,
		getDict
	} from '@/config/service/accounting.js';

	export default {
		components: {
			MenuWhiteHeader,
			SimplePopup,
		},
		async mounted() {
			await this.$onLaunched
			this.queryProjectList(0)
			this.queryDict("ruleFormula")
			this.queryDict("lossRule")
			this.queryDict("lossPlan")
			this.queryDict("M0")
		},
		computed: {
			...mapState({
				headerInfo: state => state.header.headerInfo
			}),
		},
		data() {
			return {
				title: "新增核算规则",
				accountingSelectName: "请选择计算公式",
				accountingSelectCode: "",
				accountingSelected: false,
				categories: [],
				defaultRule: false,
				calePathLoss: true,
				calePathLossFlag: "cale",
				formulaSelectName: "请选择路耗规则",
				formulaSelectCode: "",
				formulaSelected: false,
				caleFormula: [],
				scheme: [],
				schemeUnit: [{
					schemeUnitName: "kg/m³",
				}, {
					schemeUnitName: "%",
				}],
				defaultSchemeMin: "5.00",
				defaultSchemeMax: "5.00",
				currentsUnitSheme: 0,
				currentsSheme: 0,
				projectList: [],
				currentDeductionProject: [],
				currentSubsidiesProject: [],
				tempDeductionProject: [],
				tempSubsidiesProject: [],
				rules: [{
					ruleType: "0"
				}, {
					ruleType: "1",
				}],
				deductionUI: [],
				subsidiesUI: [],
				popupTypeIsDeduction: "false",
				simpleToggle: false,
				m0Rule:[],
			}
		},
		methods: {
			// 选择了计算公式
			onAccountingSelect(e) {
				const index = e.detail.value
				this.accountingSelectName = this.categories[index].dictLabel
				this.accountingSelectCode = this.categories[index].dictValue
				this.accountingSelected = true
			},
			// 计算路耗开关
			calePathLossToggle(e) {
				this.calePathLoss = e.detail.value.includes(this.calePathLossFlag)
				this.showSimplePopup(this.projectList)
			},
			// 选择了路耗规则
			onFormulaSelect(e) {
				const index = e.detail.value
				console.log(index)
				this.formulaSelectName = this.caleFormula[index].dictLabel
				this.formulaSelectCode = this.caleFormula[index].dictValue
				this.formulaSelected = true
			},
			// 选择了亏吨方案
			onSchemeSelect(e) {
				const dictValue = e.detail.value
				for (var i = 0; i < this.scheme.length; i++) {
					if (this.scheme[i].dictValue == dictValue) {
						this.currentsUnitSheme = i
					}
				}
				if (this.currentsUnitSheme == 0) {
					this.defaultSchemeMin = "5.00"
				} else {
					this.defaultSchemeMin = "0.3"
				}
			},
			//点击添加扣费项目
			onDeductionPlusClick() {
				this.open("true")
			},
			//点击添加补贴项目
			onSubsidiesPlusClick() {
				this.open("false")
			},
			//展示项目选择popup
			open(isDeduction) {
				this.popupTypeIsDeduction = isDeduction
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			//选择了添加扣费或项目
			projectChange(e) {
				var tempSelectProject = []
				// 1.文本框 2.区域 3.下拉框 4.radio
				for (let i = 0; i < this.projectList.length; i++) {
					if (e.detail.value.includes(this.projectList[i].code)) {
						tempSelectProject.push(this.projectList[i]);
					}
				}
				if (this.popupTypeIsDeduction == "true") {
					this.tempDeductionProject = tempSelectProject
				} else {
					this.tempSubsidiesProject = tempSelectProject
				}
			},
			//点击popup的确定按钮
			onProjectSelected(e) {
				if (this.popupTypeIsDeduction == "true") {
					//扣费项目
					this.currentDeductionProject = this.tempDeductionProject
				} else {
					//补贴项目
					this.currentSubsidiesProject = this.tempSubsidiesProject
				}
				this.close()
			},

			//显示通用popup
			showSimplePopup(list) {
				this.$refs.simple.open('center')
				this.$refs.simple.setList(list)
			},

			//获取项目列表
			queryProjectList(param) {
				getAccountingProjectList(param, this.headerInfo).then(response => {
					// 项目
					this.projectList = response.data.list
					this.projectList.map(item => {
						item.key = item.cnName
					})
				})
			},
			//获取字典数据
			queryDict(dictType) {
				getDict(dictType, 0, this.headerInfo).then(response => {
					if (dictType == "ruleFormula") {
						//计算公式
						this.categories = response.data
					} else if (dictType == "lossRule") {
						//路耗规则
						this.caleFormula = response.data
						this.caleFormula.map(item => {
							item.key = item.dictValue
						})
					} else if (dictType == "lossPlan") {
						//定额定率
						this.scheme = response.data
					} else if (dictType == "M0") {
						//抹零规则
						this.m0Rule = response.data
					}
				})
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
		font-size: 26upx;
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

	.roleLoss {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: end;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
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
		padding-bottom: 24upx;
		background-color: #FFFFFF;
		width: calc(80vw);
		border-radius: 20upx;
		text-align: center;
	}

	.popupProjectItem {
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

	.projectCancel {
		border-radius: 10upx;
		border-width: 2upx;
		color: #999999;
		background-color: #FFFFFF;
		min-width: 245upx;
		max-height: 78upx;
		font-size: 26upx;
	}

	.projectConfirm {
		border-radius: 10upx;
		border-width: 3upx;
		color: #FFFFFF;
		background-color: #4478E4;
		min-width: 245upx;
		max-height: 78upx;
		font-size: 26upx;
	}

	.projectRoot {
		background-color: #F2F7FF;
		display: flex;
		flex-direction: column;
		margin-top: 24upx;
		padding-left: 24upx;
		padding-right: 24upx;
		padding-bottom: 28upx;
		border-radius: 14upx;
	}

	.projectItem {
		display: flex;
		flex-direction: row;
		align-items: center;
		text-align: right;
	}

	.showTypeInput {
		width: 100%;
	}

	.showTypeInputView {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
	}

	.projectItemSpinner {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}
</style>
