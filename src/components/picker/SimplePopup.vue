<!--  -->
<template>
	<uni-popup ref="simplePopup">
		<view class="popupDialog">
			<checkbox-group style="width: 100%; padding-top: 4upx; padding-bottom: 4upx;" @change="popupDialogChange">
				<label style="width: 100%;" v-for="(item, index) in list" :key="index" :value="value">
					<view class="popupDialogItem">
						<view>{{item.key}}</view>
						<view>
							<checkbox style="transform: scale(0.7)" :value="value" />
						</view>
					</view>
					<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 18upx;" />
				</label>
			</checkbox-group>
			<view style="display: flex; margin-top: 18upx;">
				<button class="cancel" @click="close">取消</button>
				<button class="confirm" @click="onProjectSelected">确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		mounted() {},
		data() {
			return {
				list: [],
				key: "",
				value: "", 
				toggle: false,
			}
		},
		methods: {
			close() {
				this.$refs.simplePopup.close()
			},
			open() {
				this.$refs.simplePopup.open('center')
			},
			setList(list) {
				this.list = list
			},
			setKey(key) {
				this.key = key
			},
			popupDialogChange() {

			},
			//点击popup的确定按钮
			onProjectSelected(e) {
				this.close()
			},

		},
	}
</script>

<style scoped>
	.popupDialog {
		padding-bottom: 24upx;
		background-color: #FFFFFF;
		width: calc(80vw);
		border-radius: 20upx;
		text-align: center;
	}

	.popupDialogItem {
		display: flex;
		width: 100%;
		flex-direction: row;
		font-size: 36upx;
		transform: scale(0.7);
		margin-top: 28upx;
		margin-bottom: 28upx;
		justify-content: space-between;
		align-items: center;
	}
	
	.cancel {
		border-radius: 10upx;
		border-width: 2upx;
		color: #999999;
		background-color: #FFFFFF;
		min-width: 245upx;
		max-height: 78upx;
		font-size: 26upx;
	}
	
	.confirm {
		border-radius: 10upx;
		border-width: 3upx;
		color: #FFFFFF;
		background-color: #4478E4;
		min-width: 245upx;
		max-height: 78upx;
		font-size: 26upx;
	}
</style>
