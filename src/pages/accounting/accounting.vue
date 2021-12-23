<template>
	<view class="register">
		<view class="root">
			<MenuWhiteHeader :showBack="true">
				<text slot="title">核算规则</text>
				<text slot="menu">新增</text>
			</MenuWhiteHeader>
			<view class="platformItemRoot" v-for="(sub, index) in accountingData" v-bind:key="index">
				<view class="platformTitleView">
					<view class="platformTitleItem">
						<view class="platformTitle">平台默认规则</view>
						<view class="platformStatus">{{ sub.stateName }}</view>
					</view>
					<img class="closeButton" src="/static/icon_close.png" @click="onClickDeleteAction()" />
				</view>
				<view class="freight">运费=装卸货最小数量*运费单价+增项-减项</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">扣费项目</view>

					<view style="width: calc(80vw)">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium; margin-left: 8upx;"  @click="onDeductionClick(sub)">
								{{ sub.decutionCount }}
								<image :src="sub.showDecutionInfoMore ? '/static/icon_upArrow.png' : '/static/icon_downArrow.png'" class="downArrow" mode="widthFix" />
							</view>
							<view v-if="sub.showDecutionInfoMore" class="freightDetail">{{ sub.decutionInfo }}</view>
						</view>
					</view>
				</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">补贴项目</view>
					<view style="width: calc(80vw)">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium; margin-left: 8upx;" @click="onSubsidiesClick(sub)">
								{{ sub.subsidiesCount }}
								<image :src="sub.showSubsidiesInfoMore ? '/static/icon_upArrow.png' : '/static/icon_downArrow.png'" class="downArrow" mode="widthFix" />
							</view>
							<view v-if="sub.showSubsidiesInfoMore" class="freightDetail">{{ sub.subsidiesInfo }}</view>
						</view>
					</view>
				</view>
				<hr class="line">
				<view class="bottom">
					<checkbox-group @change="(e)=>onDefaultStateChange(index,e)">
						<view style="display: flex; flex-direction: row; justify-content: center;">
							<checkbox class="setUpDefault" :value="()=>{{sub.isDefault}}"
								:checked="()=>{{sub.isDefault}}">设为默认
							</checkbox>
						</view>
					</checkbox-group>
					<label>
						<button class="confirm">修改</button>
					</label>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';
	export default {
		props: {},

		components: {
			MenuWhiteHeader,
		},
		data() {
			return {
				phone: "",
				accountingData: [{
						stateName: "默认",
						showDecutionInfoMore: false,
						decutionCount: 4,
						decutionInfo: "抹零规则【角】抹零。油费500，其他费用100，ETC费231,抹零规则【角】抹零。油费500，其他费用100，ETC费231",
						showSubsidiesInfoMore: false,
						subsidiesCount: 3,
						isDefault: true,
						subsidiesInfo: "食宿补贴415，高温补贴200，节假日补贴500",
					},
					{
						stateName: "默认",
						showDecutionInfoMore: false,
						decutionCount: 4,
						decutionInfo: "抹零规则【元】抹零。油费500，其他费用100，ETC费231",
						showSubsidiesInfoMore: false,
						subsidiesCount: 3,
						isDefault: false,
						subsidiesInfo: "食宿补贴640，高温补贴400，节假日补贴500",
					},
				],
				item: "1",
				password: "",
				rememberPws: false,
				radio1: "首页",
				checked: false,
			};
		},
		methods: {
			onDeductionClick(sub) {
				sub.showDecutionInfoMore = !sub.showDecutionInfoMore;
			},
			onSubsidiesClick(sub) {
				sub.showSubsidiesInfoMore = !sub.showSubsidiesInfoMore;
			},
			onDefaultStateChange(index, e) {
				console.log(e.detail)
			},
			onClickDeleteAction() {
				console.log(点击了删除)
			}
		},
	};
</script>

<style scoped lang="scss">
	.register {
		background-color: #FFFFFF;
		height: 100vh;
	}

	.toolBar {
		background-color: white;
		height: 50upx;
		display: flex;
		margin-bottom: 6upx;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.back {
		max-height: 20upx;
		width: 12upx;
		padding-left: 12upx;
	}
	
	.line {
		background-color: #EEEEEE;
		border: none;
		margin-left: 24upx;
		margin-right: 24upx;
		margin-top: 28upx;
		margin-bottom: 10upx;
		height: 1upx;
	}

	.detail {
		color: #4478e4;
		height: 100%;
		display: flex;
		margin-right: 12upx;
		justify-content: center;
		align-items: center;
		font-size: 14upx;
	}

	.back {
		color: #4478e4;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14upx;
	}

	.platformItemRoot {
		background-color: white;
		border-radius: 8upx;
		display: flex;
		padding-bottom: 12upx;
		flex-direction: column;
		margin-right: 12upx;
		margin-left: 12upx;
		margin-bottom: 6upx;
		margin-top: 6upx;
		border: none;
	}

	.platformTitleView {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}

	.platformTitleItem {
		background-color: white;
		border-radius: 8upx;
		display: flex;
		margin: 0upx;
		padding: 0upx;
		flex-direction: row;
		align-items: center;
		border: none;
	}

	.platformTitleLeftDiv {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 12upx;
		justify-content: space-between;
	}

	.platformTitle {
		margin-left: 25upx;
		color: #333;
		font-weight: bold;
		margin-top: 12upx;
		font-size: 32upx;
	}

	.closeButton {
		width: 26upx;
		height: 26upx;
		border: none;
		margin-right: 12upx;
		display: flex;
		align-items: center;
		margin-top: 12upx;
	}
	
	.downArrow {
		 margin-left: 24upx;
		 width: 25upx;
		 height: 25upx;
		 padding-top: 3upx;
	}
	
	.platformDeductionLayout {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-right: 12upx;
	}

	.platformDeduction {
		margin-left: 25upx;
		margin-top: 24upx;
		color: #333;
		font-family: PingFang Bold;
		width: calc(22vw);
		font-size: 28upx;
		font-weight: bold;
	}

	.platformDeductionDetail {
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		border-radius: 8upx;
		margin-top: 12upx;
		margin-left: 4upx;
		padding: 10upx;
	}

	.platformStatus {
		margin-top: 12upx;
		height: 33upx;
		display: flex;
		align-items: center;
		margin-left: 8upx;
		border: 1upx solid #4478e4;
		color: #4478e4;
		padding-left: 11upx;
		padding-right: 11upx;
		padding-top: 6upx;
		padding-bottom: 6upx;
		border-radius: 4upx;
		font-size: 22upx;
	}

	.freight {
		font-size: 24upx;
		color: #878787;
		margin-left: 25upx;
		margin-top: 13upx;
		font-family: PingFang Bold;
	}

	.freightDetail {
		font-size: 24upx;
		margin-top: 6upx;
		color: #878787;
		font-family: PingFang Bold;
	}

	.group {
		display: flex;
		justify-content: space-around;
		border-radius: 4upx;
		border: 1upx solid #1bb2c7;
	}

	.radioItem>>>.el-radio-button__inner {
		border-radius: 0upx;
		border: none;
		border-left: none;
		color: #1bb2c7;
	}

	.el-radio-button.first-child.el-radio-button__inner {
		border: none;
	}

	/* 根div */
	.root {
		display: flex;
		flex-direction: column;
		background-color: #f5f5f5;
		height: 100%;
	}

	.divi {
		margin-left: 12upx;
		margin-right: 12upx;
		background-color: #eee;
		height: 1upx;
		margin-top: 12upx;
	}

	.bottom {
		display: flex;
		padding-top: 12upx;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.setUpDefault {
		border-radius: 20upx;
		color: #999;
		font-size: 28upx;
		display: flex;
		justify-content: space-between;
		background-color: transparent;
		margin-left: 29upx;
	}

	::v-deep.uni-checkbox-input.uni-checkbox-input-checked {
		margin-right: 12upx;
		border-radius: 24upx;
		border-color: #999999;

	}

	::v-deep.uni-checkbox-input {
		margin-right: 12upx;
		border-radius: 24upx;
		border-color: #4478e4;
	}

	.confirm {
		background-color: #4478e4;
		border-radius: 5upx;
		height: 56upx;
		width: 110upx;
		margin-right: 23upx;
		text-align: center;
		border: none;
		font-size: 28upx;
		color: white;
		line-height: 43px;
	}
</style>
