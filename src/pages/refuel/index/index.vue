<template>
	<view class="index-contail">
		<Header :show-bg="false" :showBack="isSecondaryPage" :isSecondaryPage="isSecondaryPage">
			<text slot="title">统计服务</text>
		</Header>
		<view class="mapclock">
			<view class="bottom-section">
				<!-- 公告 -->
				<view class="notice-frame flex align-center">
					<view class="notice-img cuIcon-notificationfill flex align-center justify-center"></view>
					<swiper class="notice-swiper" vertical="true" autoplay="true" circular="true" interval="4000">
						<swiper-item v-for="item in announce" :key="item.id" class="notice-swiperitem flex align-center" @click="navToheadlinedetail(item)">
							<view class="notice-tag">{{item.title}}</view>
						</swiper-item>
					</swiper>
					<view class="notice-btn flex align-center justify-center" @click="navToheadline">点击查看</view>
				</view>
				<!-- 选择地址 -->
				<view class="address-frame">
					<!-- 二级分类 -->
					<view class="type-section">
						<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft1">
							<view class="cu-item" :class="index==TabCur1?'nav-color':''" v-for="(item,index) in tabList1" :key="index" @tap="tabSelect1" :data-id="index">
								{{item.name}}
							</view>
						</scroll-view>
					</view>
					<view class="flex align-center padding-lr margin-stb">
						<view class="address-tag"><text>我的位置：</text>{{myaddress}}</view>
					</view>
					<view class="address-choose flex align-center margin-top" @click="navToaddress">
						<view class="cuIcon-title text-orange size36 margin-mright"></view>
						<view class="address-title" v-if="Object.keys(defaultAddress) <= 0">请选择您的服务地址</view>
						<view class="" v-else>{{defaultAddress.provinceName}}{{defaultAddress.cityName}}{{defaultAddress.countyName}}{{defaultAddress.detailInfo}}</view>
					</view>
				</view>
			</view>
			<view class="map-frame">
				<map :latitude="latitude" :longitude="longitude" class="map" id="clockmap" :scale="scale" show-location="" :markers="covers"
				@regionchange="onregionchange" />
			</view>
			<!-- <view class="top-section">
				<view class="top-bgframe">
					<image class="top-bg" :style="{ height:topbgHeight+'rpx'}" :src="topbg" mode=""></image>
				</view>
				<view class="status_bar" :style="{ height:statusBarHeight+'rpx'}"></view>
				<view class="flex align-center justify-center" style="height: 88upx;">五大员</view>
				<view class="top-frame flex align-center justify-between">
					<view class="flex align-center">
						<image style="box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);" class="top-img" :src="userData.avatar?userData.avatar:avater" mode="" @tap="showModal" data-target="DrawerModalL"></image>
						<view class="top-city">{{cityName}}<text class="cuIcon-unfold margin-sleft"></text></view>
					</view>
					<view class="cuIcon-comment" style="font-size: 50upx;" @click="navTomassage"></view>
				</view>
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
					<view class="cu-item" :class="index==TabCur?'nav-color cur':''" v-for="(item,index) in tabList" :key="index" @tap="tabSelect($event,item)" :data-id="index">
						{{item.name}}
					</view>
				</scroll-view>
			</view> -->
			
			
			
		</view>
	</view>
	
</template>

<script>
	import QQMapWX from "@/components/qqmap-wx-jssdk.js"
	var qqmapsdk;
	import {
	    mapState 
	} from 'vuex';
	export default {
		components: {
			
		},
	    data() {
	        return {
				avater: '/static/missing-face.png',
				postcard: '',
				upload: '',
				screen: 'show',
				imgList: [],
				// 一级
				tabList: [],
				TabCur: 0,
				// 二级
				tabList1: [],
				TabCur1: 0,
				// 二级菜单详情数据
				checkbox: [],
				distance: 100,
				title: 'map',
				latitude: '26.045772',//地图纬度
				longitude: '119.358279',//地图经度
				mylatitude: '26.046832',//我的位置纬度
				mylongitude: '119.358976',//我的位置经度
				// 定位回来的地址城市
				myaddress: '',
				scale: 17,
				nowscale: '',
				detail:{},
				points_:[],
				
				// 启动页图片
				image: '',
				// 服务商品底部图片
				images:"",
				content:"",
				posterUrl:"",

				scrollLeft: 0,
				scrollLeft1: 0,
				modalName: 'Modal',
				showdetail: false,
				
				// 省市区
				provinceName: '',
				cityName:"",
				countryName: "",
				
				// 用户数据
				userData: {},
				// 标题
				desc: {},
				
				GoodList: [],
				
				// 二级分类id
				categoryId: '',
				// 技工位置信息
				covers: [],
				newPropleCupon: '',
				isShowNewCupon: true,
				// 新人优惠劵金额
				typeMoney: '',
				
				// 公告滚动
				announce: [],
				
				// 选择地址对象
				defaultAddress: {},
				
				//缓存前保存对象
				descObj: {},
				
				remainingd: 5  ,//数据返回时间秒
				launchPageShow: true,
				show: true,
				timer: '',
				shop: true,
				packet: true,
				imageUrl: "",
				topbg:''
			}
		},
		onShareTimeline() {
			console.log(this.imageUrl)
			return {
				title: '五大员',
				query: '',
				imageUrl: this.imageUrl,
			}
		},

		onLoad(options){
			var that = this;
			qqmapsdk = new QQMapWX({
			    key: '6VOBZ-QURLV-FQVPZ-UXHN7-F4ORJ-Q2BRB'
			}); 
			
			uni.getLocation({//获取当前的位置坐标
				type: 'gcj02 ',
				success: function (res) {
					// 我的位置
					that.mylatitude = res.latitude;
					that.mylongitude = res.longitude;
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					
					that.getLocationMap(res.latitude,res.longitude);
				}
			});
			uni.removeStorageSync('defaultAddress')
			
			setInterval( () => {
				// this.getMechanicLocation()
			}, 5000)
			
		},
		onShow() {
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
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
				qqmapsdk.reverseGeocoder({
					location:{
						latitude: latitude,
						longitude: longitude            
					},
					success:function(res){
						// console.log(res)
						// 完整地址
						that.myaddress = res.result.address;
						// 省
						that.provinceName = res.result.address_component.province;
						// 城市
						that.cityName = res.result.address_component.city;
						// 地区
						that.countryName = res.result.address_component.district || res.result.address_component.city
						let detailLocation = {}
						detailLocation["provinceName"] = that.provinceName
						detailLocation["cityName"] = that.cityName
						detailLocation["countryName"] = that.countryName
						uni.setStorageSync('detailLocation',detailLocation)
						that.getAddress()
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
	.mapclock{
		height: 100vh;
		width: 100vw;
		overflow: hidden;
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
		background-color: #FFFFFF;
		width: 100%;
		border-radius: 0 0 20upx 20upx;
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
		position: relative;
		/* bottom: 0;
		left: 0; */
		width: 100%;
		z-index: 9;
		padding-bottom: 30upx;
		background: linear-gradient(#00000000 20%, #FFFFFF 80%);
	}
	/* 公告轮播 */
	.notice-frame{
		margin: 0 30upx;
		/* background-color: #E8EFFF; */
		background-color: #FFFFFF;
		border-radius: 16upx;
		height: 80upx;
		box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
	}
	.notice-img{
		height: 80upx;
		width: 80upx;
		background-color: #FFFFFF;
		border-radius: 16upx;
		font-size: 44upx;
		color: #4E8BFE;
	}
	.notice-swiper{
		width: 456upx;
		height: 66upx;
	}
	.notice-swiperitem{
		padding: 0 20upx;
		height: 66upx;
	}
	.notice-tag{
		color: #274A9B;
		font-size: 28upx;
		font-weight: 400;
		overflow: hidden; //超出隐藏
		white-space: nowrap; //
		text-overflow: ellipsis;
	}
	.notice-btn{
		border-radius: 16upx;
		border: 1upx solid #FB8919;
		color: #494C5B;
		font-size: 28upx;
		font-weight: 400;
		padding: 0 10upx;
		height: 50upx;
	}
	/* 地址选择 */
	.address-frame{
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin: 20upx 30upx 0;
		padding-bottom: 30upx;
		box-shadow: 1px 1px 2px 2px rgba(0, 0, 0, 0.1);
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
