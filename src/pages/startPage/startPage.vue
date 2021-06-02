<template>
	<view>
		<view>加载页</view>
		<view>test：{{ text }}</view>
		<view>isAndroid: {{ isAndroid }}</view>
		<view>isiOS: {{ isiOS }}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				text: '',
				timer: null
			}
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo,
			  isAndroid: state => state.header.isAndroid,
			  isiOS: state => state.header.isiOS
			})
		},
		onLoad(){
			this.text = JSON.stringify(this.headerInfo);
			//this.initData();
		},
		beforeDestroy() {
			if (this.timer) clearInterval(this.timer);
		},
		methods: {
			initData() {
				if (this.timer) clearInterval(this.timer);
				this.timer = setInterval(() => {
					if(this.headerInfo['Authorization'] && this.headerInfo['Authorization'].length > 10) {
						clearInterval(this.timer);
						uni.redirectTo({
						    url: '/pages/index/index'
						});
					}
				}, 100)
				setTimeout(() => {
					if (this.timer) clearInterval(this.timer);
				}, 10 * 1000);
			}
		}
	}
</script>

<style>

</style>
