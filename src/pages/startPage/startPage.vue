<template>
	<view>
		启动页占位，在这里处理一些数据
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		onLoad(){
			
		},
		mounted(){
			//console.log(this.headerInfo)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
