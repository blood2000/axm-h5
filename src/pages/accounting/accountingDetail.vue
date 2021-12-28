<template>
	<form class="container" @submit="formSubmit">
		<MenuWhiteHeader :showBack="true">
			<text slot="title">{{title}}</text>
			<button class="submit" slot="menu" form-type="submit">保存</button>
		</MenuWhiteHeader>
		<SimplePopup ref="simple" :list="dictMap.ruleFormula" :toggle="simpleToggle" />
		<view class="cardView">
			<view class="cardRow">
				<view>
					<text class="rowLabel">规则名称</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<input class="rowInput" name="name" placeholder-class="placeholderStyle" maxlength="12" type="text"
					placeholder="请输入规则名称" />
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view>
					<text class="rowLabel">计算公式</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<view class="flex justify-center" style="align-items: center;">
					<picker class="rowValue " selector-type="selector" :range="categories" rangeKey="dictLabel"
						@change="onAccountingSelect" name="ruleDictValue">
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
					<checkbox-group class="checkBoxCircle" name="isDefault">
						<checkbox style="transform:scale(0.7)" :checked="defaultRule" value="true"></checkbox>
					</checkbox-group>
				</view>
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view style="display: flex; justify-content: center;align-items: center;">
					<text class="rowLabel">计算路耗</text>
					<checkbox-group class="checkBoxCircle" @change="calePathLossToggle" name="ruleLoseToggle">
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
						<picker class="ruleInput " selector-type="selector" :range="dictMap.lossRule"
							rangeKey="dictLabel" @change="onFormulaSelect" name="ruleLoseRegular">
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
							<radio-group @change="onSchemeSelect" class="radioGroup" name="ruleLoseType">
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
						<input type="digit" :value="defaultSchemeMin" style="font-size: 26upx;" placeholder="最小值"
							name="ruleLossMin" />
						<text style="color: #666666;">{{schemeUnit[currentsUnitSheme].schemeUnitName}}</text>
					</view>
					<view class="ruleFomelaView" style="margin-left: 24upx;margin-right: 24upx;">至</view>
					<view class="shemeInput">
						<input type="digit" :value="defaultSchemeMax" style="font-size: 26upx;" placeholder="最大值"
							name="ruleLossMax" />
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
					<view v-for="(item,index) in currentDeductionProject" class="projectItem" name="deduction"
						style="margin-top: 28upx;">
						<view class="showTypeInput ly-flex-align-center  ly-flex-pack-justify">
							<text style="width: 30%; text-align: start;">{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify" style="width: 70%;">
								<view v-if="item.showType == 1" class="showTypeInputView">
									<input class="ruleInput" name="typpInput" type="digit"
										@input="(e)=>onDeductionInput(e,item)" />
									<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
										src="@/static/ic_accounting_delete.png"
										@click="()=>deleteProject(currentDeductionProject,index)" />
								</view>
								<view v-if="item.showType == 2">
									<view class="projectItemArea">
										<view class="ruleFomelaView" style="margin-right: 12upx;">-</view>
										<view class="projectItemAreaInput">
											<input type="digit" style="font-size: 26upx;" name="typeAreaFont" />
										</view>
										<view class="ruleFomelaView" style="margin-left: 12upx;margin-right: 12upx;">至
										</view>
										<view class="projectItemAreaInput">
											<input type="digit" style="font-size: 26upx;" name="typeAreaAfter" />
										</view>
										<view class="ly-flex ly-flex-align-center">
											<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
												src="@/static/ic_accounting_delete.png"
												@click="()=>deleteProject(currentDeductionProject,index)" />
										</view>
									</view>
								</view>
								<view v-if="item.showType == 3">
									<view class="showTypeInputView">
										<picker selector-type="selector" :value="index" :range="dictMap[item.dictCode]"
											rangeKey="dictLabel" @change="(e)=>onM0Select(e,item,true)"
											name="typePicer">
											<view class="ruleInput"
												:style='{color:accountingM0Selected?"#333333":"#999999"}'>
												{{accountingM0SelectName}}
											</view>
										</picker>
										<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
											src="@/static/ic_accounting_delete.png"
											@click="()=>deleteProject(currentDeductionProject,index)" />
									</view>
								</view>
								<view v-if="item.showType == 4">
									<radio-group @change="onSchemeSelect" name="typeRadio"
										class="radioGroup ly-flex ly-flex-align-center ly-flex-pack-end">
										<label class="uni-list-cell uni-list-cell-pd radioButton"
											v-for="(item, index) in dictMap[item.dictCode]" :key="item.dictLabel">
											<view class="ly-flex ly-flex-align-center">
												<radio :value="item.dictValue" :checked="index === currentsSheme" />
												<view style="margin-left: 12upx; text-align: center;">{{item.dictLabel}}
												</view>
											</view>
										</label>
									</radio-group>
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
				<view v-if="currentSubsidiesProject.length > 0" class="projectRoot" name="project">
					<view v-for="(item,index) in currentSubsidiesProject" style="margin-top: 28upx;" name="subsidies">
						<view class="showTypeInput ly-flex-align-center  ly-flex-pack-justify">
							<text style="width: 30%; text-align: start;">{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify" style="width: 70%;">
								<view v-if="item.showType == 1" class="showTypeInputView">
									<input class="ruleInput" @input="(e)=>onSubsidiesInput(e,item)" />
									<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
										src="@/static/ic_accounting_delete.png"
										@click="()=>deleteProject(currentSubsidiesProject,index)" />
								</view>
								<view v-if="item.showType == 2">
									<view class="projectItemArea">
										<view class="ruleFomelaView" style="margin-right: 12upx;">-</view>
										<view class="projectItemAreaInput">
											<input type="digit" style="font-size: 26upx;" />
										</view>
										<view class="ruleFomelaView" style="margin-left: 12upx;margin-right: 12upx;">至
										</view>
										<view class="projectItemAreaInput">
											<input type="digit" style="font-size: 26upx;" />
										</view>
										<view class="ly-flex ly-flex-align-center">
											<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
												src="@/static/ic_accounting_delete.png"
												@click="()=>deleteProject(currentSubsidiesProject,index)" />
										</view>
									</view>
								</view>
								<view v-if="item.showType == 3">
									<view class="showTypeInputView">
										<picker selector-type="selector" :range="dictMap[item.dictCode]"
											rangeKey="dictLabel" @change="(e)=>onM0Select(e, item,false)">
											<view class="ruleInput"
												:style='{color:accountingM0Selected?"#333333":"#999999"}'>
												{{accountingM0SelectName}}
											</view>
										</picker>
										<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
											src="@/static/ic_accounting_delete.png"
											@click="()=>deleteProject(currentSubsidiesProject,index)" />
									</view>
								</view>
								<view v-if="item.showType == 4">
									<radio-group @change="onSchemeSelect"
										class="radioGroup ly-flex ly-flex-align-center ly-flex-pack-end">
										<label class="uni-list-cell uni-list-cell-pd radioButton"
											v-for="(item, index) in dictMap[item.dictCode]" :key="item.dictLabel">
											<view class="ly-flex ly-flex-align-center">
												<radio :value="item.dictValue" :checked="index === currentsSheme" />
												<view style="margin-left: 12upx; text-align: center;">{{item.dictLabel}}
												</view>
											</view>
										</label>
									</radio-group>
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
									:disabled="popupTypeIsDeduction == 'true'?currentSubsidiesProject.includes(item):currentDeductionProject.includes(item) || item.dictCode == 'M0'" />
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
	</form>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';
	import SimplePopup from '@/components/picker/SimplePopup.vue';
	import {
		ddc
	} from '@/utils/ddc.js'
	import {
		mapState
	} from 'vuex';
	import {
		getAccountingProjectList,
		getDict,
		addAccounting
	} from '@/config/service/accounting.js';

	export default {
		components: {
			MenuWhiteHeader,
			SimplePopup,
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
				accountingM0SelectName: "请选择抹零规则",
				accountingM0SelectCode: "",
				accountingM0Selected: false,
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
				M0Rule: [],
				dictMap: {},
				detailList: [],
				lossRegularCode: null,
				lossPlanCode: null,
				lossValueCode: null,
			}
		},

		async mounted() {
			await this.$onLaunched
			this.queryProjectList(0)
			this.queryProjectList(1)
			this.queryDict("ruleFormula")
			this.queryDict("lossRule")
			this.queryDict("lossPlan")
		},
		methods: {
			//获取字典数据
			queryDict(dictType) {
				getDict(dictType, 0, this.headerInfo).then(response => {
					response.data.map(item => {
						item.key = item.dictValue
					})
					this.dictMap[dictType] = response.data
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
						this.M0Rule = response.data
					}
				})
			},
			//扣费项目单个输入项
			onDeductionInput(input, item) {
				let tempDeduction = {}
				tempDeduction.ruleItemCode = item.code
				tempDeduction.ruleValue = input.detail.value
				tempDeduction.type = 2
				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode == item.code) {
						this.detailList.splice(i, 1)
					}
				}
				this.detailList.push(tempDeduction)
				console.log(this.detailList)
			},
			//补贴项目单个输入项
			onSubsidiesInput(input, item) {
				let tempSubsidies = {}
				tempSubsidies.ruleItemCode = item.code
				tempSubsidies.ruleValue = input.detail.value
				tempSubsidies.type = 1
				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode == item.code) {
						this.detailList.splice(i, 1)
					}
				}
				this.detailList.push(tempSubsidies)
			},
			// 选择了计算公式
			onAccountingSelect(e) {
				const index = e.detail.value
				this.accountingSelectName = this.categories[index].dictLabel
				this.accountingSelectCode = this.categories[index].dictValue
				this.accountingSelected = true
			},
			/**
			 * 选择了扣费/补贴下拉选择
			 * e.detail.value = 选择了第几个
			 * item = 项目实体
			 * isDeduction = 是否为扣费
			 * */
			onM0Select(e, item, isDeduction) {
				const index = e.detail.value
				this.accountingM0SelectName = this.dictMap[item.dictCode]. [index].dictLabel
				this.accountingM0SelectCode = this.dictMap[item.dictCode]. [index].dictValue
				this.accountingM0Selected = true
				let tempDeduction = {}
				tempDeduction.ruleItemCode = item.code
				tempDeduction.ruleValue = this.accountingM0SelectCode
				tempDeduction.type = isDeduction ? 2 : 1
				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode == item.code) {
						this.detailList.splice(i, 1)
					}
				}
				this.detailList.push(tempDeduction)
			},
			// 计算路耗开关
			calePathLossToggle(e) {
				this.calePathLoss = e.detail.value.includes(this.calePathLossFlag)
			},
			// 选择了路耗规则
			onFormulaSelect(e) {
				const index = e.detail.value
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
			//关闭项目选择的popup
			close() {
				this.$refs.popup.close()
			},
			//删除单个已选项目
			deleteProject(list, index) {
				list.splice(index, 1)
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
			//查询项目选项的子选项
			queryProjectItemSelect(dictCode) {

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
					if (param == 0) {
						this.projectList = response.data.list
						this.projectList.map(item => {
							item.key = item.cnName
						})
						for (var i = 0; i < this.projectList.length; i++) {
							if (this.projectList[i].dictCode != null) {
								this.queryDict(this.projectList[i].dictCode)
							}
						}
					} else if (param == 1) {
						let result = response.data.list
						//路耗的code
						for (var i = 0; i < result.length; i++) {
							if (result[i].enName == "LOSS_RULE") {
								//路耗规则的code
								this.lossRegularCode = result[i].code
							} else if (result[i].enName == "LOSS_PLAN") {
								//路耗亏吨方案规则的code
								this.lossPlanCode = result[i].code
							} else if (result[i].enName == "LOSS_TOLERANCE") {
								//路耗容忍值的code
								this.lossValueCode = result[i].code
							}

						}
					}
				})
			},
			//表单提交
			formSubmit(e) {
				if (e.detail.value.name == null || e.detail.value.name === "") {
					this.toast("规则名称不能为空")
					return
				} else if (e.detail.value.ruleDictValue == null || e.detail.value.ruleDictValue === "") {
					this.toast("请选择计算公式")
					return
				}
				//临时变量
				let validateRuleLoss
				let saveParam = {}
				let tempRuleRegular = {}
				let tempRuleValue = {}
				let tempRuleSelect = {}
				//处理路耗
				if (e.detail.value.ruleLoseToggle.includes("cale")) {
					let index = e.detail.value.ruleLoseRegular
					//赋值路耗规则
					tempRuleRegular.ruleItemCode = this.lossRegularCode
					tempRuleRegular.ruleValue = this.caleFormula[index].dictValue
					//赋值路耗容忍值
					tempRuleValue.ruleItemCode = this.lossValueCode
					tempRuleValue.ruleValue = "[-" + e.detail.value.ruleLossMin + "," + e.detail.value.ruleLossMax + "]"
					//赋值路耗亏吨方案
					tempRuleSelect.ruleItemCode = this.lossPlanCode
					tempRuleSelect.ruleValue = e.detail.value.ruleLoseType
					console.log(e.detail.value.ruleLoseRegular, ' - - - ', tempRuleRegular.ruleValue, ' - - - ',
						tempRuleValue.ruleValue, ' - - - ', tempRuleSelect.ruleValue)
					if (!this.formulaSelected) {
						this.toast("请选择路耗规则")
						return
					}
					if (e.detail.value.ruleLossMin == null || e.detail.value.ruleLossMin === "") {
						this.toast("请完善路耗容忍值")
						return
					}
					if (e.detail.value.ruleLossMax == null || e.detail.value.ruleLossMax === "") {
						this.toast("请完善路耗容忍值")
						return
					}
					//去重
					for (var i = 0; i < this.detailList.length; i++) {
						if (this.detailList[i].ruleItemCode == tempRuleRegular.ruleItemCode) {
							this.detailList.splice(i, 1)
						}
						if (this.detailList[i].ruleItemCode == tempRuleValue.ruleItemCode) {
							this.detailList.splice(i, 1)
						}
						if (this.detailList[i].ruleItemCode == tempRuleSelect.ruleItemCode) {
							this.detailList.splice(i, 1)
						}
					}
					this.detailList.push(tempRuleRegular)
					this.detailList.push(tempRuleValue)
					this.detailList.push(tempRuleSelect)
				}
				saveParam.detailList = this.detailList
				//其他参数
				saveParam.name = e.detail.value.name
				saveParam.isDefault = e.detail.value.isDefault == "true" ? "Y" : "N"
				saveParam.ruleDictValue = this.categories[e.detail.value.ruleDictValue].dictValue
				saveParam.platformType = 2
				// const notNullSaveParam = removePropertyOfNull(Object.assign(), saveParam)
				uni.showLoading({
					title: ""
				})
				addAccounting(saveParam, this.headerInfo).then(response => {
					uni.hideLoading()
					if (response.code == 200) {
						this.toast("新增成功")
						// uni.navigateBack({
						// 	delta: 1
						// })
					}
				})
			},

			toast(msg) {
				uni.showToast({
					title: msg,
					icon: 'none',
					duration: 2000
				});
			}
		},
	}
</script>

<style scoped>
	.submit {
		border-radius: 0upx;
		background-color: #FFFFFF;
		font-size: 26upx;
		display: flex;
		outline-style: none;
		outline-width: 0upx;
		outline: none;
		border: 0px;
		min-width: 110upx;
	}

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

	.projectItemArea {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
	}

	.projectItemAreaInput {
		font-size: 24upx;
		color: #333333;
		background-color: #FFFFFF;
		padding-right: 12upx;
		min-width: 140upx;
		align-items: center;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 200upx;
		padding-left: 12upx;
		min-height: 60upx;
	}
</style>
