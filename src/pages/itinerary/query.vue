<!-- 司机查询 -->
<template>
  <div class="home-page">
    <Header :show-bg="false" :showBack="true" >
      <text slot="title">输入车辆信息</text>
    </Header>
    <div class="main">
      <div class="title-bg"></div>
      <div class="title1">请输入车牌号查询</div>
      <div class="license-box">
        <CarNumber
          v-model="carNumber"
          :focus="focus"
          :current="current"
          @changeFocus="changeFocus"
          @changeCurrent="changeCurrent"
          @changeCurrentDel="changeCurrentDel"
          @changeCurrentAdd="changeCurrentAdd"
        />
      </div>
      <div class="login-btn" @click="query">查询</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header/WhiteHeader.vue";
import uniRequest from "../../config/axmRequest";
import CarNumber from "@/components/codecook-carnumber/codecook-carnumber.vue";
import { parseTime } from "../../utils/ddc";
export default {
  data() {
    return {
      carNumber: "",
      focus: false, //车牌是否聚焦
      current: -1, //车牌当前选择
      vehicleTypeList: [], //车型列表
      vehicleTypeIndex: -1, //车型下标
      curDate: "",
    };
  },

  components: { Header, CarNumber },

  computed: {},

  methods: {
    changeFocus(val) {
      // console.log("changeFocus", val);
      this.focus = val;
    },
    // 当前值改变
    changeCurrent(val) {
      // console.log("changeCurrent", val);
      this.current = val;
      // console.log("this.current", this.current);
    },
    // 删除单选
    changeCurrentDel() {
      console.log("changeCurrentDel");
      this.current--;
    },
    // 前进
    changeCurrentAdd() {
      console.log("changeCurrentAdd");
      this.current++;
    },
    // 聚焦
    inputFocus() {
      console.log("inputFocus");
      this.focus = false;
    },
    query() {
      console.log(this.carNumber);
      if (!this.carNumber) {
        uni.showToast({
          title: "请输入车牌",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (this.carNumber.length < 7) {
        uni.showToast({
          title: "请输入正确车牌",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      // let curDate = parseTime(new Date(), "{y}-{m}-{d}");
      uni.setStorageSync("carNo", this.carNumber);
      uni.navigateTo({
        url: "code",
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.main {
  flex: 1;
  box-sizing: border-box;
  padding: 78rpx 0 20rpx;
  overflow: hidden;
}
.title1 {
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #2f3034;
  text-align: center;
  margin: 60rpx 0 45rpx;
}

.license-box {
  height: 88rpx;
  padding: 0 60rpx;
  margin-bottom: 100rpx;
}
</style>