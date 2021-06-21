<template>
	<view class="index-contail">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">加油</text>
		</Header>
		<view class="top-section shadow shadow-lg bg-white">
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入加油站名称、高速、地区搜索油站" confirm-type="search" />
				</view>
				<view class="action">
					<button class="cu-btn bg-blue shadow-blur round">搜索</button>
				</view>
			</view>
			<view class="top-screen flex align-center justify-around">
				<pick-regions :defaultRegion="defaultRegionCode" @getRegion="handleGetRegion">
					<view class="">{{ district || '地区' }}<text class="cuIcon-unfold text-gray" /></view>
				</pick-regions>
				<view class="flex align-center" @tap="showModal" data-target="ChooseModal">
					<view class="top-screen-title">{{ queryParams.oilType || '油类' }}</view>
					<text class="cuIcon-unfold text-gray" />
				</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="flex align-center">
						<view class="top-screen-title">{{ queryParams.brand || '品牌' }}</view>
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
					<view class="action text-blue text-lg" @tap="oilTypeSearch">完成</view>
				</view>
				<view class="grid col-3 padding-sm">
					<view v-for="(item,index) in oilType" class="padding-xs" :key="index">
						<button class="cu-btn blue lg block" :class="item.check?'bg-blue':'line-blue'" @tap="ChooseCheckbox"
						 :data-value="item.oils"> {{item.oils}}</button>
					</view>
				</view>
			</view>
		</view>
		<view class="mapclock">
			<view class="bottom-section">
				<!-- 加油站列表 -->
				<view v-for="(item, index) in 10" :key="index" class="refuel-frame">
					<view class="refuel-info">
						<view class="flex align-center justify-between">
							<view class="flex flex-direction">
								<view class="refuel-title">连江服务区中石化加油站</view>
								<view class="">营业时间：00:00-23:59</view>
							</view>
							<button class="cu-btn bg-blue" @click="navToPay(item)">加油</button>
						</view>
						<view class='cu-tag light bg-orange round' style="margin: 20upx 0;">G18荣乌高速</view>
						<view class="refuel-oil flex align-center justify-between">
							<view class="refuel-oil-name">-20#柴油</view>
							<view class="refuel-oil-price">5.50 <text class="refuel-oil-unit">元/升</text></view>
						</view>
						<view class="refuel-tag">本价格仅供参考，以实际站内挂牌价为准</view>
					</view>
					
					<view class="refuel-address flex align-center justify-between">
						<view style="width: 85%;">
							<view class="flex align-center">
								<view class="cuIcon-location"></view>
								<view style="margin-left: 10upx;">距我</view>
								<view class="refuel-address-dis">29.09km</view>
							</view>
							<view class="refuel-address-info">福建省福州市连江县东湖镇连江服务区</view>
						</view>
						<view class="refuel-address-imgframe">
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
	</view>
	
</template>

<script>
	import { mapState } from 'vuex'
	import Header from '@/components/Header/Header.vue';
	import QQMapWX from "@/components/qqmap-wx-jssdk.js"
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import { getBrandList, getOilsList, getDriver } from '@/config/service/refuel.js';
	export default {
		components: {
			Header,
			pickRegions 
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
				mylatitude: '',//我的位置纬度26.046832
				mylongitude: '',//我的位置经度119.358976
				// 定位回来的地址城市
				myaddress: '',
				// 省市区
				region:[],
				district:'',
				defaultRegionCode:'350103',
				// 司机信息
				driverInfo: {},
				queryParams: {
					oilType: '',
					brand: '',
					distance: false
				},
				oilingQuery: {
					car_no: "",
					foreign_driver_id: "",
					lat: "",
					lng: "",
					mobile: "",
					name: "",
					si_id: "",
					user_code: ""
				},
				// 选择
				index: -1,
				picker: [],
				oilType: [],
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
				this.oilType = response.data;
			});
			// 获取司机信息
			const driverCode = '3b280e3f93c648468d59866f6fa05fd0'
			getDriver(driverCode, this.headerInfo).then(response => {
				console.log(response);
				this.driverInfo = response.data;
				this.oilingQuery = {
					...this.oilingQuery,
					car_no: response.data.licenseNumber,
					foreign_driver_id: driverCode,
					mobile: response.data.telphone,
					name: response.data.name,
					user_code: response.data.identificationNumber
				}
				console.log(this.oilingQuery);
			});
			// this.loadModal = true;
			var that = this;
			uni.getLocation({//获取当前的位置坐标
				type: 'gcj02 ',
				success: function (res) {
					console.log(res);
					// 我的位置
					that.mylatitude = res.latitude;
					that.mylongitude = res.longitude;
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					
					that.getLocationMap(res.latitude,res.longitude);
				}
			});
		},
		methods: {
			// 获取选择的地区
			handleGetRegion(region){
				console.log(region);
				this.region = region;
				this.district = region[2].name;
				console.log(this.district);
			},
			// 品牌筛选
			PickerChange(e) {
				this.queryParams.brand = this.picker[e.detail.value];
				this.index = e.detail.value;
				console.log(this.queryParams);
			},
			// 油类型筛选
			ChooseCheckbox(e) {
				let items = this.oilType;
				let values = e.currentTarget.dataset.value;
				for (let i = 0, lenI = items.length; i < lenI; ++i) {
					if (items[i].oils == values) {
						items[i].check = !items[i].check;
						break
					}
				}
			},
			// 油类型选择
			oilTypeSearch(){
				let oils = [];
				this.oilType.forEach(item=> {
					if (item.check === true){
						oils.push(item.oils);
					}
				});
				this.queryParams.oilType = oils.join(',');
				this.modalName = null;
				console.log(this.queryParams);
			},
			screenDistance(){
				this.queryParams.distance = !this.queryParams.distance;
			},
			navToPay(e){
				
			},
			getAddress() {
				this.get(api.categoryUrl,{id: this.TabCur,provinceName: this.provinceName, cityName:this.cityName,countryName:this.countryName})
				.then(res => {
					// console.log(res)
					if(res.data.errno === 0) {
						this.tabList = res.data.data
						// console.log(this.tabList)
						this.tabList1 = this.tabList[0].level2 //默认第一个
						this.categoryId = this.tabList[0].level2[this.TabCur1].id
						this.getMechanicLocation()
					}else {
						this.$api.msg(res.data.errmsg)
					}
				})
			},
			getMechanicLocation() {
				this.get(api.mechanicUrl,{categoryId: this.categoryId,provinceName: this.provinceName, cityName: this.cityName, countryName: this.countryName})
				.then(res => {
					// console.log(res)
					if(res.data.errno === 0) {
						this.covers = res.data.data
						this.covers.forEach(item => {
							this.$set(item, "latitude", item.lat)
							this.$set(item, "longitude", item.lon)
							this.$set(item, 'iconPath', '/static/location.png')
							this.$set(item, 'width', '30')
							this.$set(item, 'height', '30')
							this.$set(item, "callout", {
								content : item.nickname,
								color: "#FFFFFF",
								bgColor: "#494C5B",
								fontSize:14,
								borderRadius:5,
								padding: 5,
								display:'ALWAYS',
							})
						})
						// console.log(this.covers)
					}
					
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
						// that.getAddress()
						//that.formSubmit(latitude+","+longitude,'24.604625,118.041341');
					}
				})
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
			// 点击控件事件
			oncontroltap(control){
				var that = this;
				that.screen = '';
				uni.createMapContext("clockmap", that).includePoints ({
					points: [{
						longitude: that.circles[0].longitude,
						latitude: that.circles[0].latitude,
					},{
						longitude: that.mylongitude,
						latitude: that.mylatitude,
					}],
					padding:[50,50,50,50]
				});
			},
			tabSelect(e,item) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				this.tabList1 = this.tabList[this.TabCur].level2
				
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
		height: 100vh;
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
	.agree-title{
		height: 80upx;
		width: 100%;
		border-top: 1upx solid #DDDDDD;
		color: #999999;
		font-size: 26upx;
		font-weight: 400;
	}
	/* 打卡弹窗 */
	.top-section{
		position: fixed;
		top: 0;
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
	.top-frame{
		height: 80upx;
		padding: 0 30upx;
	}
	.top-img{
		margin-right: 20upx;
		height: 60upx;
		width: 60upx;
		border-radius: 50%;
	}
	.top-bgframe{
		position: relative;
		height: 0;
		top: 0upx;
		left: 0upx;
		z-index: -1;
	}
	.top-bg{
		width: 100%;
	}
	.top-city{
		font-size: 26upx;
		color: #333333;
		font-weight: 400;
	}
	.nav .cu-item {
		margin: 0 30rpx !important;
		padding: 0 !important;
		font-size: 32upx !important;
	}
	.nav-color{
		color: #EC6F34;
		font-weight: bold !important;
	}
	
	
	/* 底部模块 */
	.bottom-section{
		min-height: 100vh;
		position: relative;
		margin-top: 740upx;
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
		font-size: 36upx;
		font-weight: bold;
	}
	.refuel-oil{
		padding: 20upx 30upx;
		background-color: #F9FBFA;
		border-radius: 8upx;
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
	.address-tag{
		color: #6E6A8E;
		font-size: 28upx;
		font-weight: 400;
	}
	.address-choose{
		background-color: #F8F8F8;
		border-radius: 16upx;
		padding: 30upx;
		margin: 0 30upx;
	}
	.address-title{
		color: #494C5B;
		font-size: 36upx;
		font-weight: bold;
	}
</style>
