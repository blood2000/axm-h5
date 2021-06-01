<template>
	<view>
		test：{{ text }}
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
			  headerInfo: state => state.header.headerInfo
			})
		},
		onLoad(){
			
		},
		mounted(){
			//console.log(this.headerInfo)
			this.text = JSON.stringify(this.headerInfo)
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
