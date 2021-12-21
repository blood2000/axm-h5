<template>
	<view class="container">
		<MenuWhiteHeader :showBack="true">
			<text slot="title">{{title}}</text>
			<text slot="menu">保存</text>
		</MenuWhiteHeader>
		<view class="cardView">
			<view class="cardRow">
				<view>
					<text class="rowLabel">规则名称</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<input class="rowInput" placeholder-class="placeholderStyle" maxlength="12" type="text"
					placeholder="请输入规则名称" />
			</view>
			<view style="width: 100%; height: 1upx; background-color: #EBEBEB;margin-top: 28upx;" />
			<view class="cardRow" style="margin-top: 28upx;">
				<view>
					<text class="rowLabel">计算公式</text>
					<image type="icon" class="required" style="width: 32upx; height: 32upx; "
						src="@/static/ic_required.png" />
				</view>
				<view class="uni-list-cell-db">
					<picker class="rowValue " selector-type="selector" :range="categories" rangeKey="goodsName"
						@change="onaccountingSelect">
						<view class="uni-input flex row" :style='{color:accountingSelected?"#333333":"#999999"}'>
							{{accountingSelectName}}
						</view>
					</picker>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import MenuWhiteHeader from '@/components/Header/MenuWhiteHeader.vue';

	export default {
		components: {
			MenuWhiteHeader,
		},
		data() {
			return {
				title: "新增核算规则",
				accountingSelectName: "请选择计算公式",
				accountingSelectCode: "",
				accountingSelected: false,
				categories: [{
					goodsName: "默认核算规则",
					goodsCode: "10001",
					goodsValue: "10000",
				}, {
					goodsName: "测试用的核算规则",
					goodsCode: "20001",
					goodsValue: "30000",
				}]
			}
		},
		methods: {
			onaccountingSelect(e) {
				const index = e.detail.value
				this.accountingSelectName = this.categories[index].goodsName
				this.accountingSelectCode = this.categories[index].goodsCode
				this.accountingSelected = true
			}
		}
	}
</script>

<style scoped>
	.cardView {
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin: 16upx;
		padding: 12px;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.cardRow {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.rowLabel {
		font-size: 30upx;
		font-family: bold;
		font-style: bold;
		color: #333333;
	}

	.rowValue {
		font-size: 26upx;
		align-items: center;
		display: flex;
		justify-content: flex-end;
		min-width: 150upx;
		min-height: 50upx;
	}

	.rowInput {
		font-size: 26upx;
		color: #333333;
		align-items: center;
		display: flex;
		min-height: 0upx;
		min-width: 0upx;
		text-align: end;
	}

	.placeholderStyle {
		color: #999999;
		font-size: 26upx;
	}

	.required {
		text-align: center;
	}
</style>
