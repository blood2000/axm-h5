<template>
	<view>
		test：{{ text }}
		<view>isAndroid: {{ isAndroid }}</view>
		<view>isiOS: {{ isiOS }}</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		data() {
			return {
				text: ''
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
			
		},
		mounted(){
			//console.log(this.headerInfo)
			this.text = JSON.stringify(this.headerInfo);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
