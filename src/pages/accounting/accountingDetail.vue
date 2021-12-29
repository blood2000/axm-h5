<template>
	<form class="container" @submit="formSubmit">
		<MenuWhiteHeader :showBack="true">
			<text slot="title" style="font-weight: bold;">{{title}}</text>
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
					placeholder="请输入规则名称" :value="defauleName" />
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
						<checkbox style="transform:scale(0.7)" :checked="isDefault" value="true"></checkbox>
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
			<view v-if="calePathLoss === false"
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
							<text style="width: 30%; text-align: start; font-weight: bold;">{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify" style="width: 70%;">
								<view v-if="item.showType === 1" class="showTypeInputView">
									<input class="ruleInput" name="typpInput" type="digit" :value="item.ruleValue"
										@input="(e)=>onDeductionInput(e,item,false)" />
									<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
										src="@/static/ic_accounting_delete.png"
										@click="()=>deleteProject(currentDeductionProject,index)" />
								</view>
								<view v-if="item.showType === 2">
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
												@click="()=>deleteProject(currentDeductionProject,index)" />
										</view>
									</view>
								</view>
								<view v-if="item.showType === 3">
									<view class="showTypeInputView">
										<picker selector-type="selector" :range="dictMap[item.dictCode]"
											rangeKey="dictLabel" @change="(e)=>onProjectSpinnerSelect(e,item,true)"
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
								<view v-if="item.showType === 4">
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
			<view v-if="currentDeductionProject.length === 0"
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
							<text style="width: 30%; text-align: start; font-weight: bold;">{{item.cnName}}</text>
							<!-- 1.文本框 2.区域 3.下拉框 4.radio -->
							<view class="ly-flex ly-flex-v ly-flex-pack-justify" style="width: 70%;">
								<view v-if="item.showType === 1" class="showTypeInputView">
									<input class="ruleInput" @input="(e)=>onSubsidiesInput(e,item,false)"
										:value="item.ruleValue" />
									<image type="icon" style="width: 39upx; height: 39upx; margin-left: 24upx;"
										src="@/static/ic_accounting_delete.png"
										@click="()=>deleteProject(currentSubsidiesProject,index)" />
								</view>
								<view v-if="item.showType === 2">
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
								<view v-if="item.showType === 3">
									<view class="showTypeInputView">
										<picker selector-type="selector" :range="dictMap[item.dictCode]"
											rangeKey="dictLabel" @change="(e)=>onProjectSpinnerSelect(e, item,false)">
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
								<view v-if="item.showType === 4">
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
									:checked="initProjectChecked(item)" :disabled="initProjectDisable(item)" />
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
		addAccounting,
		updateAccounting,
		accountingDetail
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
				editCode: null,
				title: "核算规则",
				accountingSelectName: "请选择计算公式",
				accountingSelectCode: "",
				accountingSelected: false,
				accountingM0SelectName: "请选择抹零规则",
				accountingM0SelectCode: "",
				accountingM0Selected: false,
				categories: [],
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
				popupTypeIsDeduction: "null",
				simpleToggle: false,
				M0Rule: [],
				dictMap: {},
				detailList: [],
				lossRegularCode: null,
				lossPlanCode: null,
				lossValueCode: null,

				defauleName: null,
				isDefault: null,
			}
		},

		async mounted() {
			await this.$onLaunched
			this.queryDict("ruleFormula")
			this.queryDict("lossRule")
			this.queryDict("lossPlan")
			this.queryProjectList(0)
			this.queryProjectList(1)
		},
		async onLoad(option) {
			await this.$onLaunched;
			this.editCode = option.editCode;
		},
		methods: {
			//获取字典数据
			queryDict(dictType) {
				getDict(dictType, 0, this.headerInfo).then(response => {
					response.data.map(item => {
						item.key = item.dictValue
					})
					this.dictMap[dictType] = response.data
					if (dictType === "ruleFormula") {
						//计算公式
						this.categories = response.data
					} else if (dictType === "lossRule") {
						//路耗规则
						this.caleFormula = response.data
						this.caleFormula.map(item => {
							item.key = item.dictValue
						})
					} else if (dictType === "lossPlan") {
						//定额定率
						this.scheme = response.data
					} else if (dictType === "M0") {
						//抹零规则
						this.M0Rule = response.data
					}
				})
			},
			//核算详情
			queryAccountingDetail(code) {
				uni.showLoading({
					title: ""
				})
				accountingDetail(code, this.headerInfo).then(response => {
					uni.hideLoading()
					this.defauleName = response.data.ruleInfo.name //规则名称
					this.isDefault = response.data.ruleInfo.isDefault === "Y" ? true : false //是否默认规则
					this.defauleFormula = response.data.ruleInfo.ruleDictValue //计算公式
					for (var i = 0; i < this.categories.length; i++) {
						if (this.categories[i].dictValue === this.defauleFormula)
							this.accountingSelectName = this.categories[i].dictLabel
						this.accountingSelectCode = this.categories[i].dictValue
						this.accountingSelected = true
					}
					let lossList = response.data.lossList
					for (var i = 0; i < lossList.length; i++) {
						//路耗规则
						if (lossList[i].dictCode === "lossRule") {
							let dictValue = lossList[i].ruleValue
							for (var j = 0; j < this.caleFormula.length; j++) {
								if (this.caleFormula[j].dictValue === dictValue) {
									this.formulaSelectName = this.caleFormula[j].dictLabel
									this.formulaSelectCode = this.caleFormula[j].dictValue
									this.formulaSelected = true
								}
							}
						} else if (lossList[i].dictCode === "lossPlan") {
							//路耗 亏吨方案
							let dictValue = lossList[i].ruleValue
							for (var j = 0; j < this.scheme.length; j++) {
								if (this.scheme[j].dictValue === dictValue) {
									this.currentsSheme = j
								}
							}
						} else if (lossList[i].enName === "LOSS_TOLERANCE") {
							//路耗容忍值
							let ruleValue = JSON.parse(lossList[i].ruleValue)
							this.defaultSchemeMin = Math.abs(ruleValue[0])
							this.defaultSchemeMax = ruleValue[1]
						}
					}
					//扣费选项
					let detail = response.data.detailList
					for (var i = 0; i < detail.length; i++) {
						if (detail[i].type !== null || detail[i].type !== "") {
							if (detail[i].type === "2") {
								this.tempDeductionProject.push(detail[i])
								this.currentDeductionProject.push(detail[i])
								//dictValue用来存放输入(选中)的值
								if (detail[i].showType === 3) {
									this.dictMap[detail[i].dictCode].dictValue = detail[i].ruleValue
									let e = {
										detail: {
											value: null
										}
									}
									let dict = this.dictMap[detail[i].dictCode]
									for (var j = 0; j < dict.length; j++) {
										if (detail[i].ruleValue === dict[j].dictValue) {
											e.detail.value = j
										}
									}
									this.onProjectSpinnerSelect(e, detail[i], true)
								} else if (detail[i].showType === 1) {
									let e = {
										detail: {
											value: null
										}
									}
									e.detail.value = detail[i].ruleValue
									this.onDeductionInput(e, detail[i], true)
								}
							} else if (detail[i].type === "1") {
								this.tempSubsidiesProject.push(detail[i])
								this.currentSubsidiesProject.push(detail[i])
								//dictValue用来存放输入(选中)的值
								if (detail[i].showType === 3) {
									this.dictMap[detail[i].dictCode].dictValue = detail[i].ruleValue
									let e = {
										detail: {
											value: null
										}
									}
									let dict = this.dictMap[detail[i].dictCode]
									for (var j = 0; j < dict.length; j++) {
										if (detail[i].ruleValue === dict[j].dictValue) {
											e.detail.value = j
										}
									}
									this.onProjectSpinnerSelect(e, detail[i], false)
								} else if (detail[i].showType === 1) {
									let e = {
										detail: {
											value: null
										}
									}
									e.detail.value = detail[i].ruleValue
									this.onSubsidiesInput(e, detail[i], true)
								}
							}
						}
					}
				})
			},
			/**
			 * 选择了扣费/补贴下拉选择
			 * e.detail.value = 选择了第几个
			 * item = 项目实体
			 * isDeduction = 是否为扣费
			 * */
			onProjectSpinnerSelect(e, item, isDeduction) {
				const index = e.detail.value
				console.log('index --->', index)
				this.accountingM0SelectName = this.dictMap[item.dictCode]. [index].dictLabel
				this.accountingM0SelectCode = this.dictMap[item.dictCode]. [index].dictValue
				this.accountingM0Selected = true
				let tempDeduction = {}
				let code = null
				if (this.editCode !== undefined) {
					code = item.ruleItemCode === undefined ? item.code : item.ruleItemCode
				} else {
					code = item.code
				}
				tempDeduction.ruleItemCode = code
				tempDeduction.ruleValue = this.accountingM0SelectCode
				tempDeduction.type = isDeduction ? 2 : 1

				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode === code) {
						this.detailList.splice(i, 1)
					}
				}
				this.detailList.push(tempDeduction)
			},
			//扣费项目单个输入项
			onDeductionInput(input, item, isEdit) {
				let tempDeduction = {}

				let code = null
				if (this.editCode !== null) {
					code = item.ruleItemCode === undefined ? item.code : item.ruleItemCode
				} else {
					code = item.code
				}
				tempDeduction.ruleItemCode = code
				tempDeduction.ruleValue = input.detail.value
				tempDeduction.type = 2
				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode === code) {
						this.detailList.splice(i, 1)
					}
				}
				this.detailList.push(tempDeduction)
			},
			//补贴项目单个输入项
			onSubsidiesInput(input, item, isEdit) {
				let tempSubsidies = {}
				let code = null
				if (this.editCode !== null) {
					code = item.ruleItemCode === undefined ? item.code : item.ruleItemCode
				} else {
					code = item.code
				}
				tempSubsidies.ruleItemCode = code
				tempSubsidies.ruleValue = input.detail.value
				tempSubsidies.type = 1
				for (var i = 0; i < this.detailList.length; i++) {
					if (this.detailList[i].ruleItemCode === code) {
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
					if (this.scheme[i].dictValue === dictValue) {
						this.currentsUnitSheme = i
					}
				}
				if (this.currentsUnitSheme === 0) {
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
				if (this.popupTypeIsDeduction === "true") {
					for (var j = 0; j < this.tempDeductionProject.length; j++) {
						for (var i = 0; i < tempSelectProject.length; i++) {
							if ((tempSelectProject[i].cnName === this.tempDeductionProject[j].cnName) && this
								.tempDeductionProject[j].showType !== 3) {
								tempSelectProject[i].ruleValue = this.tempDeductionProject[j].ruleValue
							}
						}
					}
					this.tempDeductionProject = tempSelectProject
				} else {
					for (var j = 0; j < this.tempSubsidiesProject.length; j++) {
						for (var i = 0; i < tempSelectProject.length; i++) {
							if ((tempSelectProject[i].cnName === this.tempSubsidiesProject[j].cnName) && this
								.tempSubsidiesProject[j].showType !== 3) {
								tempSelectProject[i].ruleValue = this.tempSubsidiesProject[j].ruleValue
							}
						}
					}
					this.tempSubsidiesProject = tempSelectProject
				}
			},
			//点击popup的确定按钮
			onProjectSelected(e) {
				if (this.popupTypeIsDeduction === "true") {
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
					if (param === 0) {
						this.projectList = response.data.list
						this.projectList.map(item => {
							item.key = item.cnName
						})
						for (var i = 0; i < this.projectList.length; i++) {
							if (this.projectList[i].dictCode != null) {
								this.queryDict(this.projectList[i].dictCode)
							}
						}
						if (this.editCode !== undefined) {
							this.title = "编辑核算规则"
							this.queryAccountingDetail(this.editCode)
						} else {
							this.title = "新增核算规则"
						}
					} else if (param === 1) {
						let result = response.data.list
						//路耗的code
						for (var i = 0; i < result.length; i++) {
							if (result[i].enName === "LOSS_RULE") {
								//路耗规则的code
								this.lossRegularCode = result[i].code
							} else if (result[i].enName === "LOSS_PLAN") {
								//路耗亏吨方案规则的code
								this.lossPlanCode = result[i].code
							} else if (result[i].enName === "LOSS_TOLERANCE") {
								//路耗容忍值的code
								this.lossValueCode = result[i].code
							}
						}
					}
				})
			},
			//设置选中状态
			initProjectChecked(item) {
				if (this.popupTypeIsDeduction === "true") {
					for (var i = 0; i < this.currentDeductionProject.length; i++) {
						if (this.currentDeductionProject[i].enName === item.enName) {
							return true
						}
					}
				} else if (this.popupTypeIsDeduction === "false") {
					for (var i = 0; i < this.currentSubsidiesProject.length; i++) {
						if (this.currentSubsidiesProject[i].enName === item.enName) {
							return true
						}
					}
				}
				return false
			},
			//设置可选不可选
			initProjectDisable(item) {
				if (this.popupTypeIsDeduction === "true") {
					for (var i = 0; i < this.currentSubsidiesProject.length; i++) {
						if (this.currentSubsidiesProject[i].enName === item.enName) {
							return true
						}
					}
				} else if (this.popupTypeIsDeduction === "false") {
					if (item.enName === 'M0') {
						return true
					}
					for (var i = 0; i < this.currentDeductionProject.length; i++) {
						if (this.currentDeductionProject[i].enName === item.enName) {
							return true
						}
					}
				}
				return false
			},
			//表单提交
			formSubmit(e) {
				if (e.detail.value.name === null || e.detail.value.name === "") {
					this.toast("规则名称不能为空")
					return
				} else if (e.detail.value.ruleDictValue === null || e.detail.value.ruleDictValue === "") {
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
					tempRuleValue.ruleValue = "[-" + e.detail.value.ruleLossMin + "," + e.detail.value.ruleLossMax +
						"]"
					//赋值路耗亏吨方案
					tempRuleSelect.ruleItemCode = this.lossPlanCode
					tempRuleSelect.ruleValue = e.detail.value.ruleLoseType
					if (!this.formulaSelected) {
						this.toast("请选择路耗规则")
						return
					}
					if (e.detail.value.ruleLossMin === null || e.detail.value.ruleLossMin === "") {
						this.toast("请完善路耗容忍值")
						return
					}
					if (e.detail.value.ruleLossMax === null || e.detail.value.ruleLossMax === "") {
						this.toast("请完善路耗容忍值")
						return
					}
					//去重
					for (var i = 0; i < this.detailList.length; i++) {
						if (this.detailList[i].ruleItemCode === tempRuleRegular.ruleItemCode) {
							this.detailList.splice(i, 1)
						}
						if (this.detailList[i].ruleItemCode === tempRuleValue.ruleItemCode) {
							this.detailList.splice(i, 1)
						}
						if (this.detailList[i].ruleItemCode === tempRuleSelect.ruleItemCode) {
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
				saveParam.isDefault = (e.detail.value.isDefault.length === 1) === true ? "Y" : "N"
				saveParam.ruleDictValue = this.categories[e.detail.value.ruleDictValue].dictValue
				saveParam.platformType = 2
				uni.showLoading({
					title: ""
				})
				if (this.editCode === null || this.editCode === undefined) {
					addAccounting(saveParam, this.headerInfo).then(response => {
						uni.hideLoading()
						if (response.code === 200) {
							this.toast("新增成功")
							uni.navigateBack({
								delta: 1
							})
						}
					})
				} else {
					saveParam.code = this.editCode
					updateAccounting(saveParam, this.headerInfo).then(response => {
						uni.hideLoading()
						if (response.code === 200) {
							this.toast("编辑成功")
							uni.navigateBack({
								delta: 1
							})
						}
					})
				}
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
	.uni-botton:after {
		border: none;
	}

	.submit {
		border-radius: 0upx;
		background-color: #FFFFFF;
		font-size: 26upx;
		display: flex;
		font-weight: bold;
		color: #4478E4;
		outline-style: none;
		outline-width: 0upx;
		outline: none;
		border: none;
		border-radius: 0upx;
		border-color: #00000000;
		min-width: 110upx;
	}

	button::after {
		border: none
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
		font-weight: bold;
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
