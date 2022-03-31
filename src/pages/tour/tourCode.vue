<!-- 车辆行程二维码 -->
<template>
  <div class="home-page">
    <Header
      :show-bg="false"
      :showBack="true"
    >
      <text slot="title">车辆健康码</text>
    </Header>
    <div class="header">
      <div class="header-bg"></div>
    </div>
    <div class="main">
      <div class="code-box">
        <div class="code-box-bg code-bg-green"></div>
        <div class="code-content">
          <div class="title1">{{ this.driverInfo.licenseNumber }}</div>
          <div class="title-line">
            <div
              class="code-eye"
              :class="openEye ? 'eye1' : 'eye0'"
              @click="toggleEye"
            ></div>
            <div>{{ desName }}</div>
            <div>{{ desNum }}</div>
          </div>
          <div class="splite-line"></div>
          <div class="title2">{{ tourReqData.passDateEnd }}</div>
          <div class="code-img">
            <div class="code" v-show="showCode">
              <div class="code-icon"></div>
              <uqrcode
                ref="uQRCode"
                :text="codeParams.text"
                :size="codeParams.size"
                :foregroundColor="codeParams.foregroundColor"
              />
              <!-- <tki-qrcode
                ref="qrcode"
                :size="codeParams.size"
                :val="codeParams.val"
                :foreground="codeParams.foreground"
                :showLoading="true"
                :unit="codeParams.unit"
                :icon="codeParams.icon"
                :show="true"
              ></tki-qrcode> -->
            </div>
          </div>
          <div class="code-status" :class="'status-' + this.curLevel">
            {{ curDesc }}
          </div>
        </div>
      </div>
      <div class="code-box position-title">
        <div class="title0">最新位置</div>
        <div class="title3">{{ curAddress }}</div>
      </div>
      <div class="code-box position-recode">
        <div class="title0">近14天途径城市</div>
        <!-- <div class="show-path" @click="showPath">查看轨迹</div> -->
        <div class="remark-title">
          注:风险标识为途径当日相关城市的全国风险评级
        </div>
        <div class="path-record">
          <div class="title3" v-if="pathRecord.length === 0">无行程记录</div>
          <div
            class="path-item"
            v-for="(item, index) in pathRecord"
            :key="index"
          >
            <div class="path-first-line">
              <div
                :class="index === 0 ? 'current-mark' : 'first-line-mark'"
              ></div>
              <div class="title3">{{ item.passDate }}</div>
              <div v-if="item.isToday" class="today-mark">今日</div>
            </div>
            <div class="path-record-content">
              <div class="title4">{{ item.address }}</div>
              <div class="path-status" :class="'bg-status-' + item.level">
                {{ item.desc }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getPageJump } from "@/config/service/startPage.js";
import Header from "@/components/Header/CodeHeader.vue";
import { parseTime } from "../../utils/ddc";
//getTourData
import { getTourData, getDriverInfo } from "@/config/service/driver.js";
import tkiQrcode from "@/components/tki-qrcode/tki-qrcode.vue";
export default {
  data() {
    return {
      loading: false,
      loadError: false,
      isSecondaryPage: true,
      openEye: false,
      driverInfo: {},
      codeParams: {
        size: 186,
        text: "",
        // foreground: "#53A26B",
        foregroundColor: "#53A26B",
      },
      showCode: false,
      pathRecord: [],
      today: "",
      curLevel: 3, //当前风险评级
      curDesc: "", //当前风险描述
      curAddress: "", //当前地址
      statusOptions: [
        { label: "低风险", level: 3, desc: "绿码:健康状态为低风险" },
        { label: "中风险", level: 2, desc: "黄码:健康状态为中风险" },
        { label: "高风险", level: 1, desc: "红码:健康状态为高风险" },
      ],
      levelDes: [""],
      tourReqData: {
        carNo: "",
        passDateEnd: "",
        passDateStart: "",
      },
    };
  },

  components: { Header, tkiQrcode },

  computed: {
    ...mapState({
      headerInfo: (state) => state.header.headerInfo,
    }),
    desName() {
      if (this.openEye) {
        return this.driverInfo.driverName;
      } else {
        return this.driverInfo.desensitizationDriverName;
      }
    },
    desNum() {
      if (this.openEye) {
        return this.driverInfo.identificationNumber;
      } else {
        return this.driverInfo.desensitizationIdentificationNumber;
      }
    },
  },

  onLoad() {
    uni.showLoading();
    getDriverInfo(this.headerInfo).then((res) => {
      console.log("获取司机信息", res);
      this.driverInfo = res.data;
      let curDate = new Date().getTime();
      // let endDate = parseTime(new Date(curDate), "{y}-{m}-{d} {h}:{i}:{s}");
      let startDate = curDate - 3600 * 24 * 14 * 1000;
      this.tourReqData.passDateEnd = parseTime(
        new Date(curDate),
        "{y}-{m}-{d} {h}:{i}:{s}"
      );
      this.tourReqData.passDateStart = parseTime(
        new Date(startDate),
        "{y}-{m}-{d} 00:00:00"
      );
      this.tourReqData.carNo = this.driverInfo.licenseNumber;
      // this.tourReqData.carNo = "冀J5F355";
      let that = this;
      uni.request({
        url: process.env.VUE_APP_BASE_API + "/schedule/epidemic/searchByCar",
        method: "post",
        data: that.tourReqData,
        header: Object.assign(
          { "Content-Type": "application/json;charset=utf-8" },
          this.headerInfo
        ),
        success: (res) => {
          console.log("行程记录", res);
          uni.hideLoading();
          if (res.data.code === 200) {
            that.showCode = true;
            that.codeParams.text = that.driverInfo.licenseNumber;
            this.pathRecord = res.data.data;
            if (this.pathRecord.length === 0) return;
            this.today = parseTime(new Date(), "{y}-{m}-{d}");
            let level = 3;
            this.pathRecord.map((item) => {
              //判断当前等级，取level最低值
              if (item.level < level) {
                level = item.level;
              }
              item.passDate = parseTime(new Date(item.passDate), "{y}-{m}-{d}")
              //判断是否为今日
              if (item.passDate === this.today) {
                this.$set(item, "isToday", true);
              } else {
                this.$set(item, "isToday", false);
              }
              
              //装入各行程风险等级描述
              this.statusOptions.map((e) => {
                if (e.level === item.level) {
                  this.$set(item, "desc", e.label);
                }
              });
            });
            this.curLevel = level; //风险等级
            this.curAddress = this.pathRecord[0].address; //地址
            //二维码风险等级颜色
            switch (this.curLevel) {
              case 1:
                this.codeParams.foregroundColor = "#e55e50";
                break;
              case 2:
                this.codeParams.foregroundColor = "#ffa136";
                break;
              case 3:
                this.codeParams.foregroundColor = "#53A26B";
                break;
            }
            //获取当前风险评级描述
            this.statusOptions.map((e) => {
              if (e.level === this.curLevel) {
                this.curDesc = e.desc;
              }
            });
          }
        },
        fail: () => {
          uni.hideLoading();
        },
      });
      // getTourData(this.tourReqData, this.headerInfo).then(res => {
      //   console.log('行程记录', res)
      // })
    });

    // console.log(curDate, startDate,this.tourReqData)
  },

  methods: {
    desensitization(str, start, end) {
      end = end || str.length;
      let result = "";
      let firstStr = str.slice(0, start);
      let lastStr = str.slice(end);
      result += firstStr;
      for (let i = start; i < end; i++) {
        result += "*";
      }
      result += lastStr;
      return result;
    },
    toggleEye() {
      this.openEye = !this.openEye;
    },
  },
};
</script>
<style lang='scss' scoped>
.home-page {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.header {
  position: absolute;
  width: 100%;
  padding-top: 200rpx;
  top: 0;
  left: 0;
  background: #4163fe;
  z-index: 1;
  &-bg {
    height: 300rpx;
    background: linear-gradient(180deg, #4163fe 0%, #f3f3f3 100%);
  }
}

.main {
  position: relative;
  box-sizing: border-box;
  padding: 20rpx 0 40rpx;
  z-index: 2;
  flex: 1;
  overflow-y: auto;
}

.code-box {
  box-sizing: border-box;
  position: relative;
  margin: 0 auto 30rpx;
  width: 686rpx;
  // height: 762rpx;
  background: #ffffff;
  opacity: 1;
  border-radius: 20rpx;

  &-bg {
    position: absolute;
    width: 100%;
    height: 255rpx;
    opacity: 0.72;
    z-index: 1;
  }
  .code-content {
    position: relative;
    z-index: 2;
    padding: 20rpx 30rpx;
  }
}

.code-bg-3 {
  background: linear-gradient(
    180deg,
    rgba(3, 197, 131, 0.23) 0%,
    rgba(3, 197, 131, 0) 100%
  );
}

.code-bg-2 {
  background: linear-gradient(
    180deg,
    rgba(255, 161, 54, 0.23) 0%,
    rgba(255, 161, 54, 0) 100%
  );
}
.code-bg-1 {
  background: linear-gradient(
    180deg,
    rgba(229, 94, 80, 0.23) 0%,
    rgba(229, 94, 80, 0) 100%
  );
}

.title0 {
  font-size: 36rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
  padding-bottom: 10rpx;
}

.title1 {
  font-size: 40rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #333333;
}

.title2 {
  font-size: 48rpx;
  font-family: Bahnschrift;
  font-weight: bold;
  line-height: 60rpx;
  color: #333333;
  text-align: center;
}

.title3 {
  font-size: 28rpx;
  color: #333;
}

.title4 {
  font-size: 32rpx;
  color: #333;
  font-weight: bold;
}

.remark-title {
  font-size: 28rpx;
  color: #999;
}

.title-line {
  display: flex;
  align-items: center;
  font-size: 28rpx;
  color: #333;
  padding: 10rpx 0 20rpx;
  > div {
    padding-left: 20rpx;
  }
}

.code-eye {
  box-sizing: border-box;
  width: 34rpx;
  height: 24rpx;
}

.eye0 {
  background: url("../../static/code/tour_eye_0.png") no-repeat center;
  background-size: 34rpx 24rpx;
  background-position: left center;
}
.eye1 {
  background: url("../../static/code/tour_eye_1.png") no-repeat center;
  background-size: 34rpx 24rpx;
  background-position: left center;
}

.splite-line {
  margin: 0 -30rpx 26rpx;
  height: 1px;
  background-image: linear-gradient(to bottom, #ddd, transparent);
  transform: scaleY(0.5);
}

.code-img {
  margin: 10rpx auto 0;
  width: 411rpx;
  height: 411rpx;
  // border-radius: 22px;
  background: url("../../static/code/tour_code.gif") no-repeat center;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .code {
    position: relative;
    width: 186px;
    height: 186px;
    // background: green;
  }
  .code-icon {
    position: absolute;
    // border: 10rpx solid #333;
    // border-radius: 10rpx;
    width: 80rpx;
    height: 80rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: url("../../static/download/driver.png") no-repeat center;
    background-size: 100% 100%;
    z-index: 100;
  }
}

.code-status {
  margin-top: 20rpx;
  font-size: 44rpx;
  font-family: PingFang SC;
  font-weight: bold;
  line-height: 60rpx;
  text-align: center;
}

.status-3 {
  color: #53a26b;
}
.status-1 {
  color: #e55e50;
}
.status-2 {
  color: #ffa136;
}

.bg-status-3 {
  background: #edf6f0;
  color: #53a26b;
}
.bg-status-1 {
  background: #fdeeed;
  color: #e55e50;
}
.bg-status-2 {
  background: #fff5ea;
  color: #ffa136;
}

.position-title {
  padding: 30rpx;
  margin-bottom: 2rpx;
  border-bottom-left-radius: 12rpx;
  border-bottom-right-radius: 12rpx;
}

.position-recode {
  padding: 30rpx;
  border-top-left-radius: 12rpx;
  border-top-right-radius: 12rpx;
}

.show-path {
  position: absolute;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #3a65ff;
  top: 34rpx;
  right: 30rpx;
}

.path-record {
  padding: 30rpx 0 0;
}

.path-first-line {
  position: relative;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding-left: 48rpx;
  height: 40rpx;
}

.first-line-mark {
  position: absolute;
  top: 8rpx;
  left: 6rpx;
  width: 20rpx;
  height: 20rpx;
  background: #ffffff;
  border: 2rpx solid rgba(178, 183, 203, 0.32156862745098036);
  border-radius: 50%;
}

.first-line-mark::after {
  content: "";
  position: absolute;
  top: 4rpx;
  left: 4rpx;
  width: 12rpx;
  height: 12rpx;
  background: #b2b7cb;
  border-radius: 50%;
}

.current-mark {
  position: absolute;
  top: 4rpx;
  left: 0;
  width: 32rpx;
  height: 32rpx;
  border-radius: 50%;
  background: #ffffff;
  border: 2rpx solid #afc8fa;
}

.current-mark::after {
  content: "";
  position: absolute;
  top: 8rpx;
  left: 8rpx;
  border-radius: 50%;
  width: 16rpx;
  height: 16rpx;
  background: #2366f2;
  box-shadow: 0px 3rpx 6rpx #d4dcf5;
}

.today-mark {
  padding: 6rpx 12rpx;
  background: rgba(58, 101, 255, 0.1);
  border-radius: 2px;
  text-align: center;

  font-weight: bold;
  color: #3a65ff;
  font-size: 20rpx;
  margin-left: 20rpx;
}

.path-record-content {
  box-sizing: border-box;
  padding: 0 28rpx 20rpx;
  margin: 16rpx 0 10rpx 16rpx;
  border-left: 4rpx dotted #ddd;
}

.path-item:last-child .path-record-content {
  border-left: none;
}

.path-status {
  width: 104rpx;
  height: 40rpx;
  margin-top: 12rpx;
  border-radius: 2rpx;
  text-align: center;
  line-height: 40rpx;
  font-weight: bold;
  font-size: 24rpx;
}
</style>