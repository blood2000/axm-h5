<template>
	<view class="container">
		<WhiteHeader :showBack="true">
			<text slot="title">车辆明细</text>
		</WhiteHeader>
		<view class="top-bar flex align-center justify-between bg-white">
			<picker mode="date" :value="queryDate" start="2000-01-01" end="2200-01-01" @change="DateChange">
				<view class="picker">
					<uni-dateformat :date="queryDate" format="yyyy/MM/dd"></uni-dateformat>
					<text class="g-icon-arrow"></text>
				</view>
			</picker>
			<view @tap="showGroudModal" data-target="RadioGroudModal">班次:{{ groudLabel }} <text class="cuIcon-unfold text-gray marginleft" /></view>
			<view @tap="showModal" data-target="RadioModal">车辆:{{ info.licenseNumber }} <text class="cuIcon-unfold text-gray marginleft" /></view>
		</view>
		<view style="height: 100upx;"></view>
		<view class="cont-frame">
			<view class="cont-title flex align-center justify-around">
				<view class="cont-id">编号</view>
				<view class="cont-unloadaddress">卸货地</view>
				<view class="cont-loadtime">装货时间</view>
				<view class="cont-man">经手人</view>
			</view>
			<view v-for="(item, index) in cardetaillist" :key="index" class="cont-cont flex align-center justify-around" @click="openDetail(item.waybillCode)">
				<view class="cont-id">{{ index +1 }}</view>
				<view class="cont-unloadaddress">{{ item.unloadAddress }}</view>
				<view class="cont-loadtime">{{ item.loadTime }}</view>
				<view class="cont-man">{{ item.noteTaker }}</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in vehiclelist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{ item.licenseNumber }}</view>
								<radio class="blue radio" :class="radio== item.vehicleCode ?'checked':''" :checked="radio== item.vehicleCode ?true:false"
								 :value="item.vehicleCode"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="bottom-btn flex align-center justify-around">
					<button class="btn-cancel" type="default" @tap="hideModal">取消</button>
					<button class="btn-primary" type="default" @tap="primary">确认</button>
				</view>
			</view>
		</view>
		<view class="cu-modal" :class="modalName=='RadioGroudModal'?'show':''" @tap="hideGroudModal">
			<view class="cu-dialog" @tap.stop="">
				<radio-group class="block" @change="RadioGroudChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in groudList" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{ item.label }}</view>
								<radio class="blue radio" :class="groudActive == item.code ?'checked':''" :checked="groudActive== item.code ?true:false"
								 :value="item.code"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="bottom-btn flex align-center justify-around">
					<button class="btn-cancel" type="default" @tap="hideGroudModal">取消</button>
					<button class="btn-primary" type="default" @tap="GroudPrimary">确认</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex';
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import { ListVechicleDetails, ProjectDetails } from '@/config/service/statistic.js';
	export default {
		components: {
			WhiteHeader
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo,
			  isAndroid: state => state.header.isAndroid,
			  isiOS: state => state.header.isiOS
			})
		},
		watch: {
			queryDate(val) {
				if (val && this.flag) {
					this.vehicleQuery.queryDate = this.queryDate;
					this.getData();
				}
			}
		},
		data() {
			return {
				modalName: null,
				radio: '',
				info: {},
				queryDate: '',
				vehicleQuery: {
					pageNum: 1,
					pageSize: 10,
					projectCode: '',
					queryDate: '',
					vechicleCode: '',
					waybillClasses: ''
				},
				vehiclelist: [],
				cardetaillist: [],
				groudActive: '2',
				groudLabel: '所有',
				groudList: [
					{label: '所有', code: '2'},
					{label: '白班', code: '0'},
					{label: '晚班', code: '1'}
				],
				flag: false
			};
		},
		async onLoad(option) {
			await this.$onLaunched;
			this.info = JSON.parse(decodeURIComponent(option.item))
			this.vehicleQuery.projectCode = this.info.projectCode;
			this.vehicleQuery.queryDate = this.info.queryDate;
			this.vehicleQuery.vechicleCode = this.info.vehicleCode;
			this.vehicleQuery.waybillClasses = (this.info.groudActive === '2' ? '' : this.info.groudActive);
			this.groudActive = this.info.groudActive;
			this.queryDate = this.info.queryDate;
			this.radio = this.info.vehicleCode;
			this.getCar();
		},
		methods: {
			// 获取列表信息
			getData(){
				ListVechicleDetails(this.vehicleQuery, this.headerInfo).then(response => {
					this.cardetaillist = response.data || [];
				});
				const car = this.vehiclelist.find(response => {
					return response.vehicleCode === this.info.vehicleCode;
				});
				this.info.licenseNumber = car.licenseNumber;
				const groud = this.groudList.find(response => {
					return response.code === this.groudActive;
				});
				this.groudLabel = groud.label;
				this.flag = true;
			},
			// 获取车辆列表
			getCar(){
				ProjectDetails({
					projectCode: this.info.projectCode,
					queryDate: this.info.queryDate
				}, this.headerInfo).then(response => {
					if(response.data.vehicleCounts){
						this.vehiclelist = response.data.vehicleCounts;
						this.getData();
					}else{
						this.vehiclelist = [];
						this.getData();
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			showGroudModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			hideGroudModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.vehicleQuery.vechicleCode = e.detail.value;
				this.info.vehicleCode = e.detail.value;
			},
			RadioGroudChange(e) {
				this.groudActive = e.detail.value;
			},
			primary(){
				this.getData();
				this.modalName = null
			},
			GroudPrimary() {
				this.vehicleQuery.waybillClasses = (this.groudActive === '2' ? '' : this.groudActive);
				this.getData();
				this.modalName = null
			},
			DateChange(e) {
				this.queryDate = e.detail.value
			},
			openDetail(waybillCode) {
				const obj = {
					waybillCode: waybillCode
				}
				if (this.isAndroid) {
					if(window.Android !== null && typeof(window.Android) !== 'undefined') {
						window.Android.pushWaybillDetail(JSON.stringify(obj));
					}
				} else if (this.isiOS) {
					this.$WebViewJavascriptBridge.callHandler('pushWaybillDetail', JSON.stringify(obj));
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	height: 100vh;
	overflow-y: scroll;
	// padding-bottom: 24upx;
	font-size: 28upx;
	font-weight: 500;
	color: #333333;
	.top-bar{
		position: fixed;
		// top: 130upx;
		left: 0;
		width: 100%;
		padding: 30upx 30upx;
		border-top: 1upx solid #F3F3F3;
	}
	.cont-frame{
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin: 24upx 24upx 120upx;
		padding: 0 18upx;
		.cont-title{
			font-size: 32upx;
			font-weight: bold;
			text-align: center;
			padding: 40upx 0 24upx;
		}
		.cont-cont{
			border-top: 1upx solid #F3F3F3;
			text-align: center;
			padding: 30upx 0;
		}
	}
}
.marginleft{
	margin-left: 10upx;
}
.cont-id{
	width: 15%;
}
.cont-unloadaddress{
	width: 35%;
}
.cont-loadtime{
	width: 20%;
}
.cont-man{
	width: 30%;
}
.bottom-btn{
	border-top: 1upx solid #EDEDED;
	background-color: #FFFFFF;
	padding: 30upx 0;
	.btn-cancel{
		width: 246upx;
		height: 78upx;
		background: #FFFFFF;
		border: 2upx solid #999999;
		border-radius: 10upx;
		color: #999999;
		font-size: 32upx;
	}
	.btn-primary{
		width: 246upx;
		height: 78upx;
		background: #4478E4;
		border-radius: 10upx;
		color: #FFFFFF;
		font-size: 32upx;
	}
}
</style>
