<template>
	<view class="contract-page">
		<view class="contract-page__header">（司机）福建大道成物流科技有限公司无车承运平台运输电子合同</view>
		
		<view class="contract-page__header-right">
			<view class="text">合同编号：<text class="underline">{{ form.contractNo }}</text></view>
			<view class="text">签约时间：<text class="underline">{{ form.createTime }}</text></view>
		</view>
	
		<view class="contract-page__header-left">
			<view>甲方：<text class="underline">{{ form.branchName }}</text></view>
			<view>统一社会信用代码：<text class="underline">{{ form.branchOrganizationCodeNo }}</text></view>
			<view>联系电话：<text class="underline">{{ form.branchPhone }}</text></view>
		</view>
		
		<view class="contract-page__header-left">
			<view>乙方：<text class="underline">{{ form.driverName }}</text></view>
			<view>车牌号码：<text class="underline">{{ form.licenseNumber }}</text></view>
			<view>驾驶证号码(选填)：<text class="underline">{{ form.driverLicense }}</text></view>
			<view>身份证号码：<text class="underline">{{ form.driverIdentificationNumber }}</text></view>
			<view>联系电话：<text class="underline">{{ form.driverPhone }}</text></view>
		</view>
		
		<view class="contract-page__content">本合同适用于福建大道成物流科技有限公司超好运网络货运平台（以下简称“超好运平台”）所有注册认证的司机会员。甲乙双方达成交易，由甲方委托乙方完成货物运输。双方就货物运输事宜达成以下协议以资共守。</view>
		
		<view class="contract-page__title">一、 本批货物内容、运输要求及支付方式见超好运平台上由甲方发布并由乙方确认接受的运单。具体内容如下：</view>
		
		<view class="contract-page__title">二、在本次运单所含运费总额未完全支付完毕之前，由于订单内容发生变化，甲、乙双方可协商变更未支付运费部分的现金部分的数额，具体变更情况由双方另行 签署补充协议确定。</view>
		
		<view class="contract-page__title">三、乙方应按照运单约定，在约定的时限内，将货物送达到甲方指定的送达地。</view>
		
		<view class="contract-page__title">四、乙方按运单约定核对清点并接收待运输的货物后，视为运输义务的开始、保管责任的转移。乙方将货物送至运单指定地点，收货人未对货物数量提出异议，在“超好运”APP上卸货确认的，视为乙方已经按照运输单证的记载和要求交付货物，交付应视为运输义务的终止、保管责任的转移。</view>
		
		<view class="contract-page__title">五、乙方应保证承运车辆技术状况良好，并能满足所运货物重量的要求。使用的车辆、容器应做到外观整洁，车体、容器内干净无污染物、残留物。</view>
		
		<view class="contract-page__title">六、如遇车辆发生意外导致货物的灭失、短少、损坏、变质、污染等问题，乙方必须第一时间通知甲方，并应尽一切努力减少货物损失。</view>
		
		<view class="contract-page__title">七、乙方自行承担车辆运营需缴纳的各类费用（包括但不限于承担在运输过程中发生的费用包括燃油费用、驾驶人员工资福利、车辆通行费用、车辆维修费用、交通违章罚款、交通事故赔偿费用等），以及交强险和商业保险，自行承担运输期间发生的交通事故、车辆盗抢、货物差损等责任。在接受承运货物时，乙方有责任核对所承运的货物与订单信息是否相符，若不相符的，应及时向托运方和甲方反映；若发现有违禁物品的，应该拒绝承运；乙方在承接业务时应自行审查所承运的货物的资质等要求是否与乙方的条件相匹配，若发现无法匹配的，应该停止接单或终止承运。</view>
		
		<view class="contract-page__title">八、若乙方在运输过程中使用的移动设备由甲方提供，则乙方在运输工程中负责该设备的保管。若运输途中设备遗失，则乙方原价赔偿。</view>
		
		<view class="contract-page__title">九、乙方授权甲方及超好运平台从以下两方面获取该运单项下车辆位置数据：1. 通过超好运软件基于GPS和移动网络获取；2.通过第三方机构获取当前位置、轨迹跟踪等定位信息。</view>
		
		<view class="contract-page__title">十、乙方依照本协议约定完成运单后（以托运方在超好运APP上确认卸货为准），甲方应按本协议第一条约定的运费及支付方式委托第三方通过“超好运”平台支付运费（现金）至乙方“超好运”平台账号。</view>
		
		<view class="contract-page__title">
			十一、每单货物的实际运费以卸货时收货人测算的运输单位（每/件/每吨/每千克或其它运单约定的运输单位）数量为计算运费的依据，具体计算规则以乙方所使用的“超好运”平台上的页面展示为准。若因收货人在收货时输入错误或计算错误导致支付到司机平台账号中的运费比实际应该支付给司机的运费少，则乙方司机可以先和发货方物流企业沟通申请补款。发货方物流企业向甲方承运公司提出申请，待甲方承运公司审核情况属实之后，委托第三方通过“超好运”平台将运费差额补充支付到乙方司机的“超好运”平台账号中。同时发货方应将与本次运费差额补充支付相关的线上服务费按照发货方与甲方之间的约定支付给甲方。在乙方将货物交付收货人之前，因托运人要求乙方中止运输、返还货物、变更到达地或将货物交给其他收货人，因此增加的费用由乙方与托运方自行协商确认，增加的费用由乙方直接与托运方结算收款。
		</view>
		
		<view class="contract-page__title">十二、违约责任</view>
		<view class="contract-page__content">
			<view>1.运输过程中出现任何货物的灭失、短少、损坏、变质、污染等货物价值减少、灭失等情形，由乙方承担货物毁损、灭失的损害赔偿责任，甲方有权停止支付按照本协议第一条约定本应支付给乙方的运费，该等运费仍不足以补偿乙方需承担的前述损害赔偿责任的，乙方需继续补偿。但乙方证明货物的毁损、灭失是因不可抗力、货物本身的自然性质或者合理损耗等原因造成的，乙方不承担损害赔偿责任。</view>
			<view>2.乙方没有按时将货物在指定地点交给收货人的，每逾期一天，按当次运单约定运费百分之二的标准向甲方支付违约金。</view>
			<view>3.乙方如将货物错运到货地点或接货人，应无偿运至合同规定的到货地点或接货人。如果货物逾期到达，乙方应偿付逾期交货的违约金。</view>
			<view>4.本条约定的乙方应付的损害赔偿及违约金等款项，甲乙双方同意委托“超好运” 平台在应付乙方的其他运费中代扣，具体扣款金额甲乙双方另行协商确定。</view>
		</view>
		
		<view class="contract-page__title">十三、通知与送达</view>
		<view class="contract-page__content">本协议履行过程中，乙方有任何疑问应通过“超好运”平台或超好运指定客服电话联系甲方解决，甲方应通过本协议约定的联系电话以短信方式通知或通过“超好运”平台通知乙方。甲方的通知自发出之日起第三日视为对乙方送达成功及乙方对内容的默认，因此请乙方提供本人有效的联系电话。乙方需要变更联系电话的，应第一时间通过“超好运”平台操作变更，否则由此产生的不利后果由乙方自行承担。</view>
		
		<view class="contract-page__title">十四、本合同未尽事宜，双方可另行协商补充约定。</view>
		
		<view class="contract-page__title">十五、本合同在履行过程中发生争议，由双方协商解决，协商不成的，甲乙双方同意由甲方住所地的人民法院管辖审理双方的纠纷或争议。</view>
		
		<view class="contract-page__title">十六、本电子协议内容为甲乙双方真实意愿表示，在乙方确认后自动生效，双方均知晓并同意以上协议内容。</view>
	
		<view class="contract-page__after">
			<view class="contract-page__after__box">
				<view class="text">甲方签字：<text class="underline">{{ form.branchName }}</text></view>
				<view class="text">(签章)</view>
				<view class="text">时间：</view>
			</view>
			<view class="contract-page__after__box">
				<view class="text">乙方签字：<text class="underline">{{ form.driverName }}</text></view>
				<view class="text">(签章)</view>
				<view class="text">时间：</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import { getCollection } from '@/config/service/protocol.js';
	export default {
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				queryParams: {},
				form: {
					contractNo: 'DADAOCHENG2106041543464202',
					createTime: '2021-06-04 15:43:45',
					branchName: '福建大道成物流科技有限公司',
					branchOrganizationCodeNo: '913713000673687316',
					branchPhone: '4008270535',
					driverName: '测试陈司机',
					licenseNumber: '闽A059ED',
					driverLicense: '1101011990',
					driverIdentificationNumber: '11010119900307619X',
					driverPhone: '139591090551'
				}
			}
		},
		async onLoad(){
			await this.$onLaunched;
			this.getData();
		},
		methods: {
			getData(){
				
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
}
</style>
