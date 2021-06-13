<script>
	import { mapState } from 'vuex'
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		computed: {
			...mapState({
			  headerInfo: state => state.header.headerInfo
			})
		},
		watch: {
			headerInfo: {
				handler(value) {
					// 模拟拦截
					if(value && JSON.stringify(value) !== '{}') {
						this.$isResolve();
					}
				},
				deep: true,
				immediate: true
			}
		}
	}
</script>

<style lang='scss'>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/*每个页面公共css */
	uni-page-wrapper{
		background: #F3F3F3;
	}
	uni-page-body {
		width: 100%;
		height: 100%;
		/* overflow: hidden; */
	}
</style>
