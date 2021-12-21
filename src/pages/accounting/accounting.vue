<template>
	<view class="register">
		<view class="root">
			<MenuWhiteHeader :showBack="true">
				<text slot="title">核算规则</text>
				<text slot="menu">详情</text>
			</MenuWhiteHeader>
			<view class="platformItemRoot" v-for="(sub, index) in accountingData" v-bind:key="index">
				<view class="platformTitleLeftview">
					<view class="platformTitleItem">
						<view class="platformTitle">平台默认规则</view>
						<view class="platformStatus">{{ sub.stateName }}</view>
					</view>
					<view>
						<i class="el-icon-close" />
					</view>
				</view>
				<view class="freight">运费=装卸货最小数量*运费单价+增项-减项</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">扣费项目</view>

					<view style="width: calc(80vw)">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium" @click="onDeductionClick(sub.decutionCount)">
								{{ sub.decutionCount }}
								<i class="el-icon-arrow-down"></i>
							</view>
							<view class="freightDetail">{{ sub.decutionInfo }}</view>
						</view>
					</view>
				</view>
				<view class="platformDeductionLayout">
					<view class="platformDeduction">补贴项目</view>
					<view style="width: calc(80vw)">
						<view class="platformDeductionDetail">
							<view style="color: #333; font-family: medium; width: calc(20vw)">
								{{ sub.subsidiesCount }}
								<i class="el-icon-arrow-down"></i>
							</view>
							<view class="freightDetail">{{ sub.subsidiesInfo }}</view>
						</view>
					</view>
				</view>
				<view class="bottom">
					<checkbox-group @change="(e)=>onDefaultStateChange(index,e)">
						<label style="display: flex; flex-direction: row; justify-content: center;">
							<checkbox class="setUpDefault" :value="()=>{{sub.isDefault}}"
								:checked="()=>{{sub.isDefault}}">设为默认
							</checkbox>
						</label>
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
						decutionCount: 1,
						decutionInfo: "抹零规则【角】抹零。油费500，其他费用100，ETC费231",
						subsidiesCount: 3,
						isDefault: true,
						subsidiesInfo: "食宿补贴415，高温补贴200，节假日补贴500",
					},
					{
						stateName: "默认",
						decutionCount: 0,
						decutionInfo: "",
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
			onDeductionClick(subsidiesCount) {
				console.log(subsidiesCount)
			},
			onDefaultStateChange(index, e) {
				console.log(e.detail)
			},
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
		height: 50px;
		display: flex;
		margin-bottom: 6px;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.back {
		max-height: 20px;
		width: 12px;
		padding-left: 12px;
	}

	.detail {
		color: #4478e4;
		height: 100%;
		display: flex;
		margin-right: 12px;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}

	.back {
		color: #4478e4;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
	}

	.platformItemRoot {
		background-color: white;
		border-radius: 8px;
		display: flex;
		padding-bottom: 12px;
		flex-direction: column;
		margin-right: 12px;
		margin-left: 12px;
		margin-bottom: 6px;
		margin-top: 6px;
		border: none;
	}

	.platformTitleItem {
		background-color: white;
		border-radius: 8px;
		display: flex;
		margin: 0px;
		padding: 0px;
		flex-direction: row;
		align-items: center;
		border: none;
	}

	.platformTitleLeftDiv {
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-right: 12px;
		justify-content: space-between;
	}

	.platformTitle {
		margin-left: 12px;
		color: #333;
		font-family: PingFang Bold;
		margin-top: 12px;
		font-size: 16px;
	}

	.platformDeductionLayout {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-right: 12px;
	}

	.platformDeduction {
		margin-left: 12px;
		margin-top: 24px;
		color: #333;
		font-family: PingFang Bold;
		width: calc(22vw);
		font-size: 14px;
	}

	.platformDeductionDetail {
		background-color: #f4f4f4;
		display: flex;
		flex-direction: column;
		border-radius: 4px;
		margin-top: 12px;
		margin-left: 4px;
		padding: 10px;
	}

	.platformStatus {
		height: 33px;
		margin-top: 12px;
		height: 17px;
		display: flex;
		align-items: center;
		margin-left: 8px;
		border: 1px solid #4478e4;
		color: #4478e4;
		padding-left: 3px;
		padding-right: 3px;
		border-radius: 2px;
		font-size: 10px;
	}

	.freight {
		font-size: 12px;
		color: #878787;
		margin-left: 12px;
		margin-top: 13px;
		font-family: PingFang Bold;
	}

	.freightDetail {
		font-size: 12px;
		margin-top: 6px;
		color: #878787;
		font-family: PingFang Bold;
	}

	.group {
		display: flex;
		justify-content: space-around;
		border-radius: 4px;
		border: 1px solid #1bb2c7;
	}

	.radioItem>>>.el-radio-button__inner {
		border-radius: 0px;
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
		margin-left: 12px;
		margin-right: 12px;
		background-color: #eee;
		height: 1px;
		margin-top: 12px;
	}

	.bottom {
		display: flex;
		padding-top: 12px;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	.setUpDefault {
		border-radius: 20px;
		color: #999;
		font-size: 18px;
		display: flex;
		justify-content: space-between;
		background-color: transparent;
		transform: scale(0.7);

	}

	/deep/.uni-checkbox-input.uni-checkbox-input-checked {
		margin-right: 12px;
		border-radius: 24px;
		border-color: #999999;

	}

	/deep/.uni-checkbox-input {
		margin-right: 12px;
		border-radius: 24px;
		border-color: #4478e4;
	}

	.confirm {
		background-color: #4478e4;
		border-radius: 5px;
		height: 28px;
		width: 55px;
		margin-right: 12px;
		display: flex;
		align-items: center;
		border: none;
		font-size: 13px;
		color: white;
	}
</style>
