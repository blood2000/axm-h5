<template>
	<view class="contract-page">
		<!-- <WhiteHeader :showBack="true">
			<text slot="title">电子合同</text>
		</WhiteHeader> -->
		
		<view class="contract-page__header">福建大道成物流科技有限公司无车承运平台运输电子合同</view>
		
		<view class="contract-page__header-right">
			<view class="text">合同编号：<text class="underline blue">{{ form.contractNo }}</text></view>
			<view class="text">签约时间：<text class="underline blue">{{ form.createTime }}</text></view>
		</view>
	
		<view class="contract-page__header-left">
			<view class="blue">托运方(简称甲方)：<text>{{ form.shipmentCompanyName }}</text></view>
			<view class="blue">统一社会信用代码：<text>{{ form.shipmentOrganizationCodeNo }}</text></view>
			<view class="blue">住所：<text>{{ form.shipmentArea }}</text></view>
			<view class="blue">法定代表人：<text>{{ form.shipmentName }}</text></view>
		</view>
		
		<view class="contract-page__header-left">
			<view>承运方(简称乙方)：<text>{{ form.branchName }}</text></view>
			<view>统一社会信用代码：<text>{{ form.branchOrganizationCodeNo }}</text></view>
			<view>住所：<text>{{ form.branchArea }}</text></view>
			<view>法定代表人：<text>{{ form.branchArtificialName }}</text></view>
		</view>
		
		<view class="contract-page__content">根据《中华人民共和国合同法》及有关法律、法规的规定，为保证双方的合法权益，经甲乙双方协商一致，甲乙双方在自愿、平等、诚信的基础上签订本合同，以便双方共同遵守，本合同适用于福建大道成物流科技有限公司超好运网络货运平台（以下简称“超好运平台”）所有注册认证的货主会员。</view>
		
		<view class="contract-page__title">一、 乙方同意接受甲方委托，提供货物运输服务。货物信息表如下：</view>
		<view class="contract-page__table">
			<uni-table border emptyText="暂无数据">
			    <tbody>
					<uni-tr>
					   <uni-td><b>起运地</b></uni-td>
					   <uni-td class="blue">{{ form.startAddress }}</uni-td>
					   <uni-td><b>发货人</b></uni-td>
					   <uni-td class="blue">{{ form.consignor }}</uni-td>
					   <uni-td><b>手机</b></uni-td>
					   <uni-td class="blue">{{ form.consignorPhone }}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td><b>目的地</b></uni-td>
						<uni-td class="blue">{{ form.endAddress }}</uni-td>
						<uni-td><b>收货人</b></uni-td>
						<uni-td class="blue">{{ form.consignee }}</uni-td>
						<uni-td><b>手机</b></uni-td>
						<uni-td class="blue">{{ form.consigneePhone }}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td><b>实际承运方</b></uni-td>
						<uni-td class="blue">{{ form.driverName }}</uni-td>
						<uni-td><b>联系电话</b></uni-td>
						<uni-td class="blue">{{ form.driverPhone }}</uni-td>
						<uni-td><b>货物名称</b></uni-td>
						<uni-td class="blue">{{ form.goodsTypeName || form.goodsBigTypeName }}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td><b>计划数量</b></uni-td>
						<uni-td class="blue">
							{{ form.loadWeight }}
							{{ form.stowageStatus == '0' ? '吨' : (form.stowageStatus == '1'? '立方': '车') }}
						</uni-td>
						<uni-td><b>货物描述</b></uni-td>
						<uni-td class="blue">{{ form.goodsName }}</uni-td>
						<uni-td><b>货值（元）</b></uni-td>
						<uni-td class="blue">￥{{ form.shipperCopeFee }}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td><b>运费金额（元）</b></uni-td>
						<uni-td class="blue">￥{{ form.shipperCopeFee }}</uni-td>
						<uni-td><b>合同签订时间</b></uni-td>
						<uni-td class="blue">{{ form.createTime }}</uni-td>
						<uni-td><b>货物装车截止时间</b></uni-td>
						<uni-td class="blue">{{ form.loadTime }}</uni-td>
					</uni-tr>
					<uni-tr>
						<uni-td><b>是否开票</b></uni-td>
						<uni-td class="blue">{{ '是' }}</uni-td>
						<uni-td><b>备注</b></uni-td>
						<uni-td colspan="3" class="blue">{{ form.orderRemark }}</uni-td>
					</uni-tr>
			    </tbody>
			</uni-table>
		</view>
		
		<view class="contract-page__title">二、运输方式：汽车公路运输。</view>
		
		<view class="contract-page__title">三、货物包装：甲方指定发货人须按照国家相关规定的标准进行包装；没有统一规定包装标准的，应根据保证货物运输安全的原则进行包装，不得在包装内私自夹带危险品和国家有关规定明令禁止托运的货物，以及与所发布货运信息不相符的货物，甲方保证所托运的货物不属于国家违禁品。</view>
		
		<view class="contract-page__title">四、运输期限：乙方应当在运单约定期限内将货物安全运输到约定地点。</view>
		
		<view class="contract-page__title red">五、运费支付：甲方同意最迟不晚于发布运单之前，先向超好运平台指定的账户缴存不少于本单运费的预付运费和预付服务费。甲方在确认运单完成后，乙方委托超好运平台按照运单约定将甲方已预先缴纳的运费及服务费支付给乙方，乙方每笔运单收取甲方该笔运单运费的%作为服务费。具体的操作流程及操作规则以超好运平台规定的流程为准。</view>
		
		<view class="contract-page__title">六、发票</view>
		<view class="contract-page__content">
			<view>1.甲方支付运费及服务费后，乙方需向甲方提供等额的税率为9%的运输费增值税专用发票和等额的税率为6%的服务费增值税专用发票。若税务部门调整税率标准，乙方另行通知甲方调整后的税率。</view>
			<view>2.乙方每月10日前与甲方对上月已完结的运单进行对账，核对无误后，乙方根据甲方的要求以运单为核算单位开具增值税专用发票。</view>
			<view>3.乙方只能按照国家规定在运单符合开具增值税专用发票条件下开具，若由于甲方原因导致运单不符合开具增值税专用发票要求的，乙方有权拒绝开具相应的发票。</view>
		</view>
		
		<view class="contract-page__title">七、运输义务与保管责任：甲方将待运输的货物装载到运输车辆上，乙方按运单约定核对清点货物数量并接收，视为运输义务的开始、保管责任的转移。乙方将货物送至运单指定地点，收货人未对货物数量提出异议，在超好运APP上做卸货确认，视为乙方已经按照运输单证的记载和要求交付货物，交付应视为运输义务的终止、保管责任的转移。乙方不承担在装货、卸货过程中的货物运输、货物安全、场地安全等一切责任。</view>
		
		<view class="contract-page__title">八、双方权利义务</view>
		<view class="contract-page__content">
			<view>1.甲方需自行在“超好运”平台上发布运单，乙方将根据甲方发布的运单信息组织司机前往运单指定的装货地。甲方应遵守"超好运"平台规则，不得在未告知“超好运”平台的前提下，以任何形式代替司机或以司机的名义进行平台操作。</view>
			<view>2.甲方发货人员应当在发货地货物装载之前配合乙方确认货物的数量及价值，完成货物及单据凭证的交接工作。</view>
			<view>3.乙方应按照运单约定，按时将货物送达至甲方指定的收货地。</view>
			<view>4.乙方应根据承运货物的需要，按货物的不同特性，提供具备合法营运资格的，技术状况良好、经济适用的车辆，并能满足所运货物贸易的要求。</view>
			<view>5.除了按照合同支付运费及服务费外，甲方不承担在运输过程中发生的费用包括燃油费用、驾驶人员工资福利、车辆通行费用、车辆维修费用、交通违章罚款、交通事故赔偿费用等。</view>
			<view>6.在乙方将货物交付收货人之前，甲方可要求乙方中止运输、返还货物、变更到达地或将货物交给其他收货人，因此增加的费用由甲方与司机自行协商确认，无法达成一致意见的，按照实际产生的费用及造成的损失进行结算。</view>
			<view>7.为确保承运货物安全，乙方已向保险公司投保货运保险，若因意外事件造成货物损失由保险公司直接向甲方理赔，若由于刑事犯罪行为造成甲方货物损失的，由乙方协助报案处理，乙方不承担赔偿责任。</view>
			<view>8.甲方应当按照本合同约定标准和时间向乙方支付运费和服务费。</view>
			<view>9.乙方有权根据国家相关政策的变化调整上述条款中的服务费比例，但应当提前五个工作日以书面形式告知甲方。甲方若有异议应当在收到书面通知后的三个工作日内(下称"反馈期间”)给予乙方反馈，不反馈或逾期反馈则视为甲方同意该调整。自双方签署补充合同之日起或反馈期间届满之日起，甲乙双方间执行调整后的服务费比例。</view>
			<view>10.在装货、卸货、交货等过程中发生的任何货损均与乙方无关，由甲方自行承担或向责任人追责。</view>
			<view>11.甲方在超好运平台发布非公开货源或虽发布为公开货源但实际上为非公开货源，包括但不限于甲方自己或通过信息部及其他渠道推荐、指定实际承运人的，在运输过程中若因实际承运人资质存在瑕疵、车辆超载、超限、超速、车辆发生事故、货物毁损、灭失、短少等产生的任何纠纷及损失，皆由甲方负责处理井承担相应的法律责任，乙方仅提供必要的协助。</view>
		</view>
		
		<view class="contract-page__title">九、违约责任</view>
		<view class="contract-page__content">
			<view>1.乙方通过"超好运"平台接收甲方所发布的运单，若甲方发布虚假、错误运单，导致乙方无法履行本合同项下义务的，乙方不承担违约责任。因甲方发布虚假、错误运单，导致乙方受有损失的，甲方应承担赔偿责任。</view>
			<view>2.乙方没有按时将货物在指定地点交给收货人的，每逾期一天，按当次运单约定运费万分之二的标准向甲方支付违约金，因自然灾害等不可抗力导致的迟延交货和非乙方及实际承运人（司机）原因导致的交通事故致使乙方延期交货的情况除外。同时，甲乙双方协商一致确认，若乙方在实际运输过程中遭遇临时性的、突发性的交通堵塞，经乙方提交相关证据证明后，甲方同意放弃向乙方追究迟延交货的违约责任和上述违约金条款约定的求偿权。</view>
			<view>3.乙方如将货物错运到货地点或接货人，应无偿运至合同规定的到货地点或接货 人。如果货物因前述乙方过错逾期到达，乙方应偿付逾期交货的违约金。</view>
			<view>4.甲方应严格遵守道路安全相关的法律、法规及规章，不得指使、强令要求实际承运人超载、超限运输，对于实际承运人要求超载、超限运输的应当拒绝，否则由此产生的相关纠纷由甲方自行解决，相应的法律责任由甲方自行承担，与乙方无关，乙方仅提供必要的协助。若因此给乙方造成经济损失的，甲方应承担全部赔偿责任。</view>
			<view>5.甲方托运的货物到达目的地后，甲方应当按照超好运平台操作流程与操作规则及时在超好运平台上确认或签收运单，若自实际承运人已实际卸货签到或乙方有充分理由认为运输已完成之日起24个小时内，甲方未能完成确认或签收的，应视为相应运输己完成，甲方应按本合同约定及时向乙方支付运费及服务费(如有)，乙方亦有权直接扣划相应的运费及服务费。若甲方在经乙方催告后48个小时内仍未完成确认或签收，则视为甲方逾期，每逾期一天，甲方应自实际承运人已实际卸货签到或乙方有充分理由认为运输已完成之日起按相应运单约定运费的日万分之二的标准向乙方支付违约金，逾期超过30日的，乙方有权单方解除本合同并要求甲方按照相应运单约定运费总额的20%承担相应违约责任。</view>
		</view>
		
		<view class="contract-page__title">十、通知</view>
		<view class="contract-page__content">甲乙双方按照本合同记载的住所地通过EMS或顺丰快递方式邮寄发出书面通知第三日即视为送达对方，或按照双方留存的联系人手机号码发出短信通知即视为已送达对方。若联系信息发生变更，一方需及时以书面形式告知另一方。</view>
		
		<view class="contract-page__title">十一、其他</view>
		<view class="contract-page__content">
			<view>1.本电子合同一式两份，甲、乙双方各持一份，具有同等法律效力。</view>
			<view>1.本电子合同一式两份，甲、乙双方各持一份，具有同等法律效力。</view>
			<view>3.执行合同发生争议时，甲、乙双方应尽可能通过协商解决，协商解决不成的，双方同意由乙方住所地的人民法院管辖审理双方的争议或纠纷。</view>
			<view>4.本合同未尽事宜，双方可另行协商补充约定。补充合同是本合同的附件，与本合同具有同等法律效力。</view>
		</view>
		
		<view class="contract-page__after">
			<view class="contract-page__after__box">
				<view class="text">甲方：<text class="blue">{{ form.shipmentCompanyName }}</text></view>
				<view class="text">法定代表人或授权代表(签名)：</view>
				<view class="text">甲方(盖章)：</view>
			</view>
			<view class="contract-page__after__box">
				<view class="text">乙方：<text>{{ form.branchName }}</text></view>
				<view class="text">法定代表人或授权代表(签名)：</view>
				<view class="text">乙方(盖章)：</view>
			</view>
		</view>
	
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getContractByCode } from '@/config/service/protocol.js';
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
					contractNo: 'DADAOCHENG202104151516270905',
					createTime: '2021-04-15 15:16:28',
					shipmentCompanyName: '晨星company',
					shipmentOrganizationCodeNo: '12345678',
					shipmentArea: '福建省福州市晋安区福建省福州市晋安区王庄街道',
					shipmentName: '小周',
					branchName: '福建大道成物流科技有限公司',
					branchOrganizationCodeNo: '913713000673687316',
					branchArea: '福建省福州市福清市万达 写字楼A2-901',
					branchArtificialName: '施联文',
					startAddress: '福建省福州市福清市',
					consignor: '小周',
					consignorPhone: '17850830479',
					endAddress: '福建省福州市晋安区',
					consignee: '西西',
					consigneePhone: '15912455689',
					driverName: '小余',
					driverPhone: '15880147817',
					goodsTypeName: '机械、设备、电器',
					goodsBigTypeName: '机械、设备、电器',
					loadWeight: '31.25',
					stowageStatus: 0,
					goodsName: '机械、设备、电器',
					shipperCopeFee: '0',
					loadTime: '2021-04-16 15:06:00',
					orderRemark: ''
				}
			}
		},
		async onLoad(option){
			await this.$onLaunched;
			//this.getData(option.code);
		},
		methods: {
			getData(code){
				getContractByCode(code, this.headerInfo).then(response => {
					this.form = { ...response.data }
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
.contract-page{
	height: 100%;
	padding: 0 40rpx;
	background: #fff;
	color: #444;
	overflow-y: auto;
	// padding-top: 130upx;
	&__header{
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
		padding: 30rpx 0;
		color: #333;
	}
	&__header-right{
		text-align: right;
		font-size: 26rpx;
		margin-bottom: 40rpx;
		line-height: 40rpx;
		.text{
			margin-bottom: 10rpx;
		}
	}
	&__header-left{
		font-size: 28rpx;
		margin-bottom: 30rpx;
		line-height: 40rpx;
	}
	&__content{
		font-size: 26rpx;
		text-indent: 2em;
		line-height: 40rpx;
		margin: 30rpx 0;
	}
	&__table{
		font-size: 26rpx;
		font-weight: normal;
		line-height: 40rpx;
		margin: 30rpx 0;
		.table--border, .uni-table-td{
			border-color: #606266;
		}
		.uni-table-td{
			min-width: 100rpx;
			padding: 10rpx 12rpx;
			text-align: center !important;
			word-break: break-all;
		}
	}
	&__title{
		font-size: 28rpx;
		font-weight: 700;
		margin: 30rpx 0;
	}
	&__after{
		display: flex;
		justify-content: space-between;
		margin: 80rpx 0 0;
		font-size: 26rpx;
		line-height: 40rpx;
		flex-wrap: wrap;
		&__box{
			width: 100%;
			margin-bottom: 30rpx;
			.text{
				margin-bottom: 15rpx;
			}
		}
	}
	
	.underline{
		text-decoration: underline;
	}
	.blue{
		color: #0188fb;
	}
	.red{
		color: red;
	}
}
</style>
