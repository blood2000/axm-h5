<template>
	<view class="index-contail">
		<WhiteHeader :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">加油</text>
		</WhiteHeader>
		<view class="top-section shadow shadow-lg bg-white">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @blur="changeValue" :adjust-position="false" type="text" placeholder="请输入加油站名称、高速、地区搜索油站" confirm-type="search" />
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round" @click="search">搜索</button>
				</view>
			</view>
			<view class="top-screen flex align-center justify-around">
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion" @cancel="cancelRegion">
					<view class="">{{ district || '地区' }}<text class="cuIcon-unfold text-gray" /></view>
				</pick-regions>
				<view class="flex align-center" @tap="showModal" data-target="ChooseModal">
					<view class="top-screen-title">{{ queryParams.fuelName || '油类' }}</view>
					<text class="cuIcon-unfold text-gray" />
				</view>
				<picker @change="PickerChange" @cancel="cancelBrand" :value="index" :range="picker">
					<view class="flex align-center">
						<view class="top-screen-title">{{ queryParams.brandName || '品牌' }}</view>
						<text class="cuIcon-unfold text-gray" />
					</view>
				</picker>
				<view :class="queryParams.distance ? 'top-screen-cont':''" @click="screenDistance">
					距离最近
					<text  :class="queryParams.distance ? 'cuIcon-order':'cuIcon-order text-gray'" />
				</view>
			</view>
		</view>
		<!-- 油类多选 -->
		<view class="cu-modal bottom-modal" :class="modalName=='ChooseModal'?'show':''" @tap="hideModal">
			<view class="cu-dialog" @tap.stop="">
				<view class="cu-bar bg-white">
					<view class="action text-grey text-lg" @tap="hideModal">取消</view>
					<view class="action text-blue text-lg" @tap="fuelNameSearch">完成</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in fuelName" class="padding-xs" :key="index">
						<button class="cu-btn blue lg block" :class="item.check?'bg-blue':'line-blue'" @tap="ChooseCheckbox"
						 :data-value="item.oils"> {{item.oils}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="mapclock">
			<view v-if="gasStationList.length !== 0" class="bottom-section">
				<!-- 加油站列表 -->
				<view v-for="(item, index) in gasStationList" :key="index" class="refuel-frame">
					<view class="refuel-info">
						<view class="flex align-center justify-between">
							<view class="flex flex-direction">
								<view class="refuel-title">{{item.stationName}}</view>
								<view class="">营业时间：{{item.openTime}}</view>
							</view>
							<button class="cu-btn bg-blue" @click="navToPay(item)">加油</button>
						</view>
						<view class="flex align-center" style="margin: 20upx 0;" v-if="item.hids.length>0">
							<view v-for="(hids, index) in item.hids" :key="index" class='cu-tag light bg-orange round' style="margin-right: 10upx;">{{ hids }}</view>
						</view>
						<view class="refuel-oil flex align-center justify-between" v-for="(oilsVos, index) in item.oilsVos" :key="index">
							<view class="refuel-oil-name">{{ oilsVos.oilsName }}</view>
							<view class="refuel-oil-price">{{ oilsVos.oilsPrice }} <text class="refuel-oil-unit">元/升</text></view>
						</view>
						<view class="refuel-tag">本价格仅供参考，以实际站内挂牌价为准</view>
					</view>
					
					<view class="refuel-address flex align-center justify-between">
						<view style="width: 85%;">
							<view class="flex align-center">
								<view class="cuIcon-location"></view>
								<view style="margin-left: 10upx;">距我</view>
								<view class="refuel-address-dis">{{ item.distance }}km</view>
							</view>
							<view class="refuel-address-info">{{ item.address }}</view>
						</view>
						<view class="refuel-address-imgframe" @click="openLocation(item)">
							<image class="refuel-address-img" src="../../../static/icon_address.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<!-- 地图 -->
			<view class="map-frame">
				<map id="clockmap" class="map" :latitude="latitude" :longitude="longitude" :scale="scale" show-location :markers="covers"
				@regionchange="onregionchange" />
			</view>
			<!-- 弹框加载 -->
			<view class="cu-load load-modal" v-if="loadModal">
				<view class="gray-text">加载中...</view>
			</view>
		</view>
		<!-- 选择车辆 -->
		<view class="cu-modal" :class="modalName=='vehicleModel'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">请选择需要加油的车辆</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<radio-group class="block" @change="RadioChange">
					<view class="cu-list menu text-left">
						<view class="cu-item" v-for="(item,index) in vehiclelist" :key="index">
							<label class="flex justify-between align-center flex-sub">
								<view class="flex-sub">{{ item.licenseNumber }}</view>
								<radio class="blue radio" :class="radio== item.licenseNumber ?'checked':''" :checked="radio== item.licenseNumber ?true:false"
								 :value="item.licenseNumber"></radio>
							</label>
						</view>
					</view>
				</radio-group>
				<view class="cu-bar bg-white">
					<view class="action margin-0 flex-sub text-green solid-left" @tap="hideModal">取消</view>
					<view class="action margin-0 flex-sub  solid-left" @tap="getQrCode">确定</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	import WhiteHeader from '@/components/Header/WhiteHeader.vue';
	import QQMapWX from "@/components/qqmap-wx-jssdk.js"
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import { getGasStationList, getBrandList, getOilsList, getDriver, getVehicleList, getRefuelInfo } from '@/config/service/refuel.js';
	export default {
		components: {
			WhiteHeader,
			pickRegions 
		},
		computed: {
			/** 获取当前设备的系统 Android 还是 IOS */
			u() {
				return navigator.userAgent;
			},
			isAndroid() {
				return this.u.indexOf("Android") > -1 || this.u.indexOf("Adr") > -1;
			},
			isiOS() {
				return !!this.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			}
		},
	    data() {
	        return {
				modalName: 'Modal',
				loadModal: false,
				screen: 'show',
				// 地图相关
				qqmapsdk: new QQMapWX({key: '6VOBZ-QURLV-FQVPZ-UXHN7-F4ORJ-Q2BRB',vm: this}),
				scale: 17,
				nowscale: '',
				covers: [],// 加油站位置信息
				latitude: '',//地图纬度26.045772
				longitude: '',//地图经度119.358279
				// mylatitude: '',//我的位置纬度26.046832
				// mylongitude: '',//我的位置经度119.358976
				// 定位回来的地址城市
				myaddress: '',
				// 省市区
				region:[],
				district:'',
				defaultRegionCode:'350103',
				// 司机信息
				driverInfo: {},
				// 加油站列表
				gasStationList:[],
				// 是否没了
				isEnd: false,
				// 车辆列表
				vehiclelist: [],
				radio: '',
				// 付款信息
				payInfo: {},
				queryParams: {
					pageNum: 1,
					pageSize: 10,
					areaCode: '',
					fuelName: '',
					brandName: '',
					distance: undefined,
					searchCriteria: '',
					lat: 0,
					lng: 0,
				},
				oilingQuery: {
					car_no: "",
					foreign_driver_id: "",
					lat: "",
					lng: "",
					mobile: "",
					name: "",
					si_id: "",
					user_code: "",
					money: '',
					stationName: ''
				},
				// 选择
				index: -1,
				picker: [],
				fuelName: [],
				isSecondaryPage: false
			}
		},
		computed:{
			...mapState({
			  headerInfo: state => state.header.headerInfo
			}),
			regionName(){
				// 转为字符串
				return this.region.map(item=>item.name).join(' ')
			}
		},
		async onLoad(options){
			await this.$onLaunched;
			const isSecondaryPage = options.isSecondaryPage;
			if (isSecondaryPage === '1') {
				this.isSecondaryPage = true;
			}
			// 获取品牌列表
			getBrandList(this.headerInfo).then(response => {
				this.picker = response.data;
			});
			// 获取油类列表
			getOilsList(this.headerInfo).then(response => {
				this.fuelName = response.data;
			});
			// 获取司机信息
			// options.usercode = '3b280e3f93c648468d59866f6fa05fd0'
			getDriver(options.usercode, this.headerInfo).then(response => {
				console.log(response);
				this.driverInfo = response.data;
				this.oilingQuery = {
					...this.oilingQuery,
					// car_no: response.data.licenseNumber,
					foreign_driver_id: response.data.code,
					mobile: response.data.telphone,
					name: response.data.name,
					user_code: response.data.identificationNumber
				}
				// 获取车辆列表
				getVehicleList(this.driverInfo.code, this.headerInfo).then(response => {
					console.log(response);
					this.vehiclelist = response.rows;
					this.oilingQuery.car_no = this.vehiclelist[0].licenseNumber;
					this.radio = this.vehiclelist[0].licenseNumber;
				});
			});
			// options.latitude = 26.045788;
			// options.longitude = 119.358258;
			this.latitude = options.latitude;
			this.longitude = options.longitude;
			this.queryParams.lat = options.latitude;
			this.queryParams.lng = options.longitude;
			this.getLocationMap(options.latitude,options.longitude);
			// this.loadModal = true;
			// var that = this;
			// uni.getLocation({//获取当前的位置坐标
			// 	type: 'gcj02',
			// 	success: function (res) {
			// 		console.log(res);
			// 		// 我的位置
			// 		that.mylatitude = res.latitude;
			// 		that.mylongitude = res.longitude;
			// 		that.latitude = res.latitude;
			// 		that.longitude = res.longitude;
			// 		that.queryParams.lat = res.latitude;
			// 		that.queryParams.lng = res.longitude;
			// 		that.getLocationMap(res.latitude,res.longitude);
			// 	}
			// });
		},
		onPullDownRefresh() {
			this.gasStationList = []
			this.queryParams.pageNum = 1
			this.getList()
			uni.stopPullDownRefresh();  //停止下拉刷新动画
		},
		// 触底加载
		onReachBottom() {
			// console.log("触底")
			if(!this.isEnd) {
				this.queryParams.pageNum++
				this.getList()
			}
		},
		methods: {
			// 重置列表
			clearQuery(){
				this.gasStationList = [];
				this.queryParams.pageNum = 1;
				this.isEnd = false;
				this.getStationLocation();
			},
			// 获取选择的地区
			handleGetRegion(region){
				console.log(region);
				this.region = region;
				this.district = region[2].name;
				this.queryParams.areaCode = region[2].code;
				console.log(this.district);
				this.clearQuery();
				this.getList();
			},
			cancelRegion(){
				this.queryParams.areaCode = undefined;
				this.district = '';
				this.clearQuery();
				this.getList();
			},
			// 品牌筛选
			PickerChange(e) {
				this.queryParams.brandName = this.picker[e.detail.value];
				this.index = e.detail.value;
				console.log(this.queryParams);
				this.clearQuery();
				this.getList();
			},
			cancelBrand(){
				this.queryParams.brandName = undefined;
				this.clearQuery();
				this.getList();
			},
			// 油类型筛选
			ChooseCheckbox(e) {
				let items = this.fuelName;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].oils == values) {
						items[i].check = !items[i].check;
						break
					}
				}
			},
			// 油类型选择
			fuelNameSearch(){
				let oils = [];
				this.fuelName.forEach(item=> {
					if (item.check === true){
						oils.push(item.oils);
					}
				});
				this.queryParams.fuelName = oils.join(',');
				this.modalName = null;
				this.clearQuery();
				this.getList();
			},
			// 距离筛选
			screenDistance(){
				this.clearQuery();
				if (this.queryParams.distance){
					this.queryParams.distance = undefined;
					this.getList();
				} else {
					this.queryParams.distance = 300000;
					this.getList();
				}
			},
			changeValue(e){
				console.log(e);
				this.queryParams.searchCriteria = e.detail.value;
			},
			// 搜索
			search(){
				this.clearQuery();
				this.getList();
			},
			// 车辆选择
			RadioChange(e) {
				this.radio = e.detail.value;
				this.oilingQuery.car_no = e.detail.value;
			},
			// 加油按钮点击
			navToPay(item){
				this.oilingQuery.stationName = item.stationName;
				this.oilingQuery.si_id = item.stationId;
				this.oilingQuery.lat = item.lat;
				this.oilingQuery.lng = item.lng;
				console.log(this.oilingQuery);
				if(this.vehiclelist.length > 1){
					this.modalName = 'vehicleModel'
				}else{
					this.getQrCode();
				}
			},
			// 生成加油二维码
			getQrCode(){
				uni.navigateTo({
					url: '/pages/refuel/oiling/index?oilingQuery=' + encodeURIComponent(JSON.stringify(this.oilingQuery))
				})
			},
			getLocationMap(latitude,longitude){
				var that = this;
				that.qqmapsdk.reverseGeocoder({
					location:{
						latitude: latitude,
						longitude: longitude
					},
					success:function(res){
						console.log(res);
						that.defaultRegionCode = res.result.ad_info.adcode;
						that.queryParams.areaCode = res.result.ad_info.adcode;
						// 完整地址
						that.myaddress = res.result.address;
						// 省
						// that.defaultRegion[0] = res.result.address_component.province;
						// 城市
						// that.defaultRegion[1] = res.result.address_component.city;
						// 地区
						that.district = res.result.address_component.district || res.result.address_component.city
						// 存储到缓存
						let detailLocation = {}
						detailLocation["provinceName"] = that.provinceName
						detailLocation["cityName"] = that.cityName
						detailLocation["countryName"] = that.countryName
						uni.setStorageSync('detailLocation',detailLocation)
						that.loadModal = false;
						that.getList();
						//that.formSubmit(latitude+","+longitude,'24.604625,118.041341');
					}
				})
			},
			getList() {
				getGasStationList(this.queryParams, this.headerInfo).then(response => {
					if(response.data.length === 0) {
						this.isEnd = true;
						return
					}
					this.gasStationList = [...this.gasStationList,...response.data]
					this.getStationLocation();
				});
			},
			// 地图上标记油站
			getStationLocation() {
				this.covers = this.gasStationList.map(res => {
					return {
						latitude: res.lat,
						longitude: res.lng,
						stationName: res.stationName
					}
				});
				this.covers.forEach(item => {
					// this.$set(item, "latitude", item.lat)
					// this.$set(item, "longitude", item.lng)
					this.$set(item, 'iconPath', '/static/icon_station.png')
					this.$set(item, 'width', '26')
					this.$set(item, 'height', '30')
					this.$set(item, "callout", {
						content : item.stationName,
						color: "#FFFFFF",
						bgColor: "#494C5B",
						fontSize:5,
						borderRadius:5,
						padding: 5,
						display:'ALWAYS',
					})
				})
				const point = this.gasStationList.map(res => {
					return {
						longitude: res.lng,
						latitude: res.lat
					}
				});
				const that = this;
				// 缩放显示全部标记点
				uni.createMapContext("clockmap", that).includePoints ({
					points: [
						...point,
						{
						longitude: that.longitude,
						latitude: that.latitude
						}
					],
					padding:[50,50,50,50]
				});
			},
			openLocation(item){
				if (this.isAndroid) {
					window.Android.pushMapNavi(item);
					// 数据处理 xxx
				} else if (this.isiOS) {
					window.webkit.messageHandlers.pushMapNavi.postMessage(item);
				}
				// window.location.href = `http://apis.map.qq.com/uri/v1/marker?marker=coord:${item.lat},${item.lng}`
				// uni.openLocation({
				// 	latitude: item.lat,
				// 	longitude: item.lng,
				// 	success: function () {
				// 		console.log('success');
				// 	}
				// });
			},
			// 点击标记点事件
			onmarkertap(){
				this.screen = 'show'
			},
			// 点击标记点气泡事件
			oncallouttap(){
				
			},
			onregionchange(){
				var that = this;
				uni.createMapContext("clockmap", that).getScale({
					success: function (res) {
						that.nowscale = res.scale;
						// console.log(res);
					}
				});
			},
			hideModal(e) {
				this.modalName = null
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			}
		},
	}
</script>

<style>
	.index-contail{
		color: #333333;
	}
	.mapclock{
		/* height: 100vh; */
		width: 100vw;
	}
	.map-frame{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
	}
	.map{
		width: 750upx;
		height: 100vh;
	}
	::v-deep .bg-height{
		/* height: 0 !important; */
	}
	/* 打卡弹窗 */
	.top-section{
		position: fixed;
		/* top: 0; */
		left: 0;
		z-index: 10;
		width: 100%;
		border-radius: 0 0 20upx 20upx;
	}
	.top-screen{
		padding: 30upx 10upx;
	}
	.top-screen-title{
		max-width: 160upx;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	.top-screen-cont{
		color: #0081FF;
	}
	
	/* 底部模块 */
	.bottom-section{
		min-height: 800upx;
		position: relative;
		margin-top: 900upx;
		padding-bottom: 20upx;
		width: 100%;
		z-index: 9;
		background: linear-gradient(#00000000 5%, #FFFFFF 10%);
	}
	.refuel-frame{
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin: 20upx 20upx 0;
		box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
	}
	.refuel-info{
		padding: 30upx 30upx 20upx;
	}
	.refuel-title{
		max-width: 520upx;
		font-size: 36upx;
		font-weight: bold;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	.refuel-oil{
		padding: 20upx 30upx;
		background-color: #F9FBFA;
		border-radius: 8upx;
		margin-top: 10upx;
	}
	.refuel-oil-name{
		font-size: 30upx;
	}
	.refuel-oil-price{
		font-size: 32upx;
		font-weight: bold;
	}
	.refuel-oil-unit{
		margin-left: 10upx;
		font-size: 24upx;
		font-weight: 400;
	}
	.refuel-address{
		padding: 20upx 30upx 30upx;
		border-top: 1upx solid #EDEDED;
	}
	.refuel-address-dis{
		font-weight: bold;
	}
	.refuel-address-info{
		color: #666666;
	}
	.refuel-address-imgframe{
		width: 15%;
		height: 100%;
		text-align: center;
		border-left: 1upx solid #EDEDED;
	}
	.refuel-address-img{
		height: 60upx;
		width: 60upx;
	}
	.refuel-tag{
		margin-top: 10upx;
		color: #999999;
		font-size: 18upx;
	}
	.address-img{
		height: 80upx;
		width: 80upx;
	}
</style>
