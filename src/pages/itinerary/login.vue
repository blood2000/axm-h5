<!-- 安行码登录 -->
<template>
  <div class="home-page">
    <Header :show-bg="false" :showBack="true">
      <text slot="title">登录超好运安行码</text>
    </Header>
    <div class="main">
      <div class="title-bg"></div>
      <div class="login-box">
        <div class="login-box-line">
          <div class="input-icon account-icon"></div>
          <div class="input-split"></div>
          <input type="text" class="axm-input" placeholder="请输入账户" />
        </div>
        <div class="login-box-line">
          <div class="input-icon password-icon"></div>
          <div class="input-split"></div>
          <input type="text" class="axm-input" placeholder="请输入密码" />
          <div
            class="axm-eye"
            :class="showPwd ? 'axm-eye-1' : 'axm-eye-0'"
            @click="showPassword"
          ></div>
        </div>
        <div class="login-box-line">
          <div class="input-icon captcha-icon"></div>
          <div class="input-split"></div>
          <input type="text" class="axm-input" placeholder="请输入验证码" />
          <div class="captcha-box"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPageJump } from "@/config/service/startPage.js";
import Header from "@/components/Header/WhiteHeader.vue";
import { parseTime } from "../../utils/ddc";
//getTourData
import { getTourData, getDriverInfo } from "@/config/service/itinerary.js";
export default {
  data() {
    return {
      showPwd: false,
    };
  },

  components: { Header },

  computed: {
    ...mapState({
      headerInfo: (state) => state.header.headerInfo,
    }),
  },

  methods: {
    showPassword() {
      this.showPwd = !this.showPwd;
    },
  },
};
</script>
<style lang='scss' scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
}
.main {
  flex: 1;
  box-sizing: border-box;
  padding: 78rpx 0 20rpx;
  overflow: hidden;
}

.title-bg {
  margin: 0 auto;
  width: 536rpx;
  height: 176rpx;
  background: url("../../static/code/bg_title.png") no-repeat center;
  background-size: 100% 100%;
}

.login-box {
  padding: 78rpx 54rpx;
  &-line {
    position: relative;
    box-sizing: border-box;
    padding: 25rpx 26rpx;
    height: 96rpx;
    background: #f8f8f8;
    border-radius: 10rpx;
    margin-top: 20rpx;
    display: flex;
    align-items: center;
  }
}

.input-icon {
  width: 44rpx;
  height: 44rpx;
}

.account-icon {
  background: url("../../static/code/account.png") no-repeat center;
  background-size: 100% 100%;
}

.password-icon {
  background: url("../../static/code/password.png") no-repeat center;
  background-size: 100% 100%;
}

.captcha-icon {
  background: url("../../static/code/captcha.png") no-repeat center;
  background-size: 100% 100%;
}

.input-split {
  margin: 0 20rpx;
  width: 2rpx;
  height: 29rpx;
  background: #b7b7b9;
}

.axm-input {
  height: 45rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 45rpx;
  color: #b7b7b9;
}

.axm-eye {
  position: absolute;
  width: 36rpx;
  height: 24rpx;
  top: 50%;
  right: 30rpx;
  transform: translateY(-50%);
}

.axm-eye-0 {
  background: url("../../static/code/axm_eye_0.png") no-repeat center;
  background-size: 100% 100%;
}
.axm-eye-1 {
  background: url("../../static/code/axm_eye_1.png") no-repeat center;
  background-size: 100% 100%;
}

.captcha-box {
  position: absolute;
  width: 264rpx;
  height: 80rpx;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  background: #ffffff;
  border: 6rpx solid #f8f8f8;
  border-radius: 10rpx;
}
</style>