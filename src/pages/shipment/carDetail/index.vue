<template>
	<view class="container">
		<WhiteHeader>
			<text slot="title">更改项目</text>
		</WhiteHeader>
		<view class="top-bar flex align-center justify-between bg-white">
			<uni-dateformat :date="info.queryDate" format="yyyy/MM/dd"></uni-dateformat>
			<view  @tap="showModal" data-target="RadioModal">车辆:{{ info.licenseNumber }} <text class="cuIcon-unfold text-gray marginleft" /></view>
		</view>
		<view style="height: 220upx;"></view>
		<view class="cont-frame">
			<view class="cont-title flex align-center justify-around">
				<view class="cont-id">编号</view>
				<view class="cont-unloadaddress">卸货地</view>
				<view class="cont-loadtime">装货时间</view>
				<view class="cont-man">经手人</view>
			</view>
			<view v-for="(item, index) in cardetaillist" :key="index" class="cont-cont flex align-center justify-around">
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
			  headerInfo: state => state.header.headerInfo
			})
		},
		data() {
			return {
				modalName: null,
				radio: '',
				info: {},
				vehicleQuery: {
					pageNum: 1,
					pageSize: 10,
					projectCode: '',
					queryDate: '',
					vechicleCode: '',
				},
				vehiclelist: [],
				cardetaillist: []
			};
		},
		async onLoad(option) {
			await this.$onLaunched;
			this.info = JSON.parse(decodeURIComponent(option.item))
			this.vehicleQuery.projectCode = this.info.projectCode;
			this.vehicleQuery.queryDate = this.info.queryDate;
			this.vehicleQuery.vechicleCode = this.info.vehicleCode;
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
			},
			// 获取车辆列表
			getCar(){
				ProjectDetails({
					projectCode: this.info.projectCode,
					queryDate: this.info.queryDate
				}).then(response => {
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
			hideModal(e) {
				this.modalName = null
			},
			RadioChange(e) {
				this.radio = e.detail.value;
				this.vehicleQuery.vechicleCode = e.detail.value;
				this.info.vehicleCode = e.detail.value;
			},
			primary(){
				this.getData();
				this.modalName = null
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
		top: 120upx;
		left: 0;
		width: 100%;
		padding: 30upx 90upx;
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
