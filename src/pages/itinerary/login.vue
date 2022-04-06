<!-- 安行码登录 -->
<template>
  <div class="home-page">
    <Header :show-bg="false" :showBack="false">
      <text slot="title">登录超好运安行码</text>
    </Header>
    <div class="main">
      <div class="title-bg"></div>
      <div class="login-box">
        <div class="login-box-line">
          <div class="input-icon account-icon"></div>
          <div class="input-split"></div>
          <input
            type="text"
            class="axm-input"
            placeholder="请输入账户"
            maxlength=11
            v-model="account"
          />
        </div>
        <div class="login-box-line">
          <div class="input-icon password-icon"></div>
          <div class="input-split"></div>
          <input
            v-if="!showPwd"
            type="password"
            class="axm-input"
            placeholder="请输入密码"
            maxlength=16
            v-model="password"
          />
          <input
            v-else
            type="text"
            class="axm-input"
            placeholder="请输入密码"
            maxlength=16
            v-model="password"
          />
          <div
            class="axm-eye"
            :class="showPwd ? 'axm-eye-1' : 'axm-eye-0'"
            @click="showPassword"
          ></div>
        </div>
        <div class="login-box-line">
          <div class="input-icon captcha-icon"></div>
          <div class="input-split"></div>
          <input
            type="text"
            class="axm-input"
            placeholder="请输入验证码"
            v-model="verificationCode"
            maxlength=4
          />
          <div class="captcha-box" @click="getCaptcha">
            <img :src="captchaUrl" alt=" " />
          </div>
        </div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/Header/WhiteHeader.vue";
import uniRequest from "../../config/axmRequest";
import urlConfig from "../../config/urlConfig";
import { parseTime } from "../../utils/ddc";
//getTourData
export default {
  data() {
    return {
      showPwd: false,
      account: "",
      password: "",
      verificationCode: "",
      baseUrl: "data:image/png;base64,",
      captchaUrl: "",
    };
  },

  components: { Header },

  computed: {
    ...mapState({
      headerInfo: (state) => state.native.headerInfo,
    }),
  },

  onLoad() {
    // this.captchaUrl = urlConfig.BASE_URL + '/tools-web/kaptcha'
    this.getCaptcha();
  },

  methods: {
    showPassword() {
      this.showPwd = !this.showPwd;
    },

    getCaptcha() {
      const config = {
        url: "getCaptcha",
        noToken: true,
      };
      uniRequest(config).then((res) => {
        console.log("获取验证码", res);
        this.captchaUrl = this.baseUrl + res.data;
      });
    },

    login() {
      // uni.navigateTo({
      //   url: "./query",
      // });
      // return;
      if (!this.account) {
        uni.showToast({
          title: "请输入账号",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      if (!this.password) {
        uni.showToast({
          title: "请输入密码",
          icon: "none",
          duration: 1500,
        });
        return false;
      }
      let mock = "13055213303";
      let reqData = {
        account: this.account,
        password: this.password,
        // account: mock,
        // password: mock,
        verificationCode: this.verificationCode,
      };
      uni.setStorageSync("account", mock);
      const config = {
        url: "login",
        method: "POST",
        account: this.account,
        data: reqData,
        noToken: true,
      };
      uniRequest(config).then((res) => {
        console.log("登录", res);
        if (res.code === 200) {
          uni.setStorageSync("token", res.data.token);
          uni.navigateTo({
            url: "./query",
          });
        } 
        setTimeout(() => {
          this.getCaptcha();
        }, 500);
        // uni.showModal({
        //   title: "提示",
        //   content: "登录成功",
        //   showCancel: false,
        //   success: (res) => {
        //     if (res.confirm) {
        //       //点击确认
        //       uni.navigateTo({
        //         url: "./query",
        //       });
        //     }
        //   },
        // });
      })
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
  img {
    width: 100%;
    height: 100%;
  }
}
</style>