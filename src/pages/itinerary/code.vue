<!-- 安行系统车辆行程二维码 -->
<template>
  <div class="content">
    <!-- <HeaderBar :title="title" :barStyle="barStyle"></HeaderBar> -->
    <Header :show-bg="false" :showBack="true">
      <text slot="title">超好运安行码</text>
    </Header>
    <div class="header">
      <div class="header-bg"></div>
    </div>
    <div class="main">
      <div class="code-box">
        <div class="code-box-bg code-bg-green"></div>
        <div class="code-content">
          <div class="title1">{{ carNo }}</div>
          <!-- <div class="title-line">
            <div
              class="code-eye"
              :class="openEye ? 'eye1' : 'eye0'"
              @click="toggleEye"
            ></div>
            <div>{{ desName }}</div>
            <div>{{ desNum }}</div>
          </div> -->
          <div class="splite-line"></div>
          <div class="title2">{{ today }}</div>
          <div class="code-img">
            <div class="code">
              <div class="code-icon"></div>
              <uqrcode
                v-if="showCode"
                ref="uQRCode"
                :text="codeParams.text"
                :size="codeParams.size"
                :foregroundColor="codeParams.foregroundColor"
              />
            </div>
          </div>
          <div
            class="code-status"
            :class="'status-' + this.curLevel"
            v-if="showCode"
          >
            {{ curDesc }}
          </div>
          <div class="code-status" v-else>二维码正在努力生成中...</div>
        </div>
      </div>
      <div class="code-box position-title">
        <div class="title0">最新位置</div>
        <div class="title3">{{ curAddress }}</div>
        <!-- <div class="title3">{{ pathRecord[0][0].address || '无' }}</div> -->
      </div>
      <div class="code-box position-recode">
        <div class="title0">近14天途径城市</div>
        <!-- <div class="show-path" @click="showPath">查看轨迹</div> -->
        <div class="remark-title">
          注:风险标识为途径当日相关城市的全国风险评级，每日途径地点以最近到达优先展示
        </div>
        <div class="record-box">
          <div class="path-record">
            <!-- <div class="title3" v-if="pathRecord.length === 0">无行程记录</div> -->
            <div
              class="path-item"
              v-for="(item, index) in pathRecord"
              :key="index"
            >
              <div
                class="path-first-line"
                v-if="loadingStatus[index] && item.length > 0"
              >
                <div
                  class="path-status"
                  :class="'bg-status-' + levelStatus[index]"
                  v-if="item.length > 0"
                >
                  {{ levelDesc[index] }}
                </div>
                <div
                  :class="index === 0 ? 'current-mark' : 'first-line-mark'"
                ></div>
                <div class="title3">{{ dateList[index] }}</div>
                <div v-if="index === 0" class="today-mark">今日</div>
              </div>
              <div
                class="path-record-content"
                v-if="loadingStatus[index] && item.length > 0"
              >
                <!-- <div
                  class="no-data"
                  v-if="loadingStatus[index] && item.length === 0"
                >
                  <div class="no-data-icon"></div>
                  <div>暂无数据</div>
                </div> -->
                <div v-if="!loadingStatus[index]" class="loding-data">
                  <div class="loading-data-icon"></div>
                  <div>大数据检索中...</div>
                </div>
                <div class="title4" v-else>
                  <span
                    v-for="(e, i) in item"
                    :key="i"
                    :class="'status-' + e.level"
                  >
                    {{ e.provinceName || "" }}{{ e.cityName || "" }}
                    <text v-if="e.provinceName && i < item.length - 1">,</text>
                  </span>
                </div>
              </div>
              <!-- <div
              class="path-status"
              :class="'bg-status-' + levelStatus[index].level"
            >
              {{ item.desc }}
            </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import HeaderBar from "@/components/Header/HeaderBar.vue";
import Header from "@/components/Header/CodeHeader.vue";
import { parseTime } from "../../utils/ddc";
//getTourData
import uniRequest from "../../config/axmRequest.js";
export default {
  data() {
    return {
      loading: false,
      loadError: false,
      isSecondaryPage: true,
      barStyle: {
        background: "#4163FE",
        color: "#fff",
      },
      title: "超好运安行码",
      carNo: "",
      account: "",
      codeParams: {
        size: 186,
        text: "",
        // foreground: "#53A26B",
        foregroundColor: "#53A26B",
      },
      showCode: false,
      isDanger: false,
      pathRecord: [],
      loadingStatus: [], //每天记录加载状态
      levelStatus: [], //每天行程的风险等级
      dateList: [], //日期
      tourAddress: [], //每天省市列表
      today: "",
      curLevel: 3, //当前风险评级
      isEmpty: false,
      curDesc: "绿码:健康状态为低风险", //当前风险描述
      curAddress: "", //当前地址
      statusOptions: [
        { label: "低风险", level: 3, desc: "安行码评估:低风险" },
        { label: "中风险", level: 2, desc: "安行码评估:中风险" },
        { label: "高风险", level: 1, desc: "安行码评估:高风险" },
      ],
      levelDesc: [""],
    };
  },

  components: { Header },

  computed: {
    ...mapState({
      headerInfo: (state) => state.native.headerInfo,
    }),

    // showCode() {
    //   if (this.isDanger) {
    //     console.log("计算属性监听成功");
    //     return true;
    //   } else {
    //     let leap = true;
    //     this.loadingStatus.map((item, index) => {
    //       leap && (leap = item);
    //     });
    //     return leap;
    //   }
    // },
    // curLevel() {

    //   let level = 3;
    //   this.levelStatus.map((item) => {
    //     if (item < level) {
    //       level = item;
    //     }
    //   });
    //   // console.log('计算属性curLevel', level);
    //   return level;
    // },
  },

  watch: {
    levelStatus: {
      // 需要注意，因为对象引用的原因， newValue和oldValue的值一直相等
      handler(newValue, oldValue) {
        // 在这里标记页面编辑状态
        let level = 3;
        newValue.map((item) => {
          if (item < level) {
            level = item;
          }
        });
        // console.log("监听属性curLevel", level);
        this.curLevel = level;
      },
      // 通过指定deep属性为true, watch会监听对象里面每一个值的变化
      deep: true,
    },
    loadingStatus: {
      handler(newValue, oldValue) {
        if (this.isDanger) {
          console.log("计算属性监听成功");
          this.showCode = true;
          return;
        }
        let leap = true;
        newValue.map((item, index) => {
          leap && (leap = item);
        });
        this.showCode = leap;
        // console.log("showCode", leap);
      },
      // 通过指定deep属性为true, watch会监听对象里面每一个值的变化
      deep: true,
    },
    curLevel(val) {
      //二维码风险等级颜色;
      switch (val) {
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

      this.statusOptions.map((e) => {
        if (e.level === val) {
          this.curDesc = e.desc;
        }
      });
    },
    showCode(val) {
      if (val) {
        let leap = true;
        this.pathRecord.map((item) => {
          leap && (leap = item.length === 0);
        });
        this.isEmpty = leap;
        if (this.isEmpty) {
          this.codeParams.foregroundColor = "#dadada";
        }
        // if (this.pathRecord[0].length > 0) {
        //   this.curAddress = this.pathRecord[0][0].address || '无';
        // } else {
        //   this.curAddress = '无'
        // }
      }
      // console.log(val);
    },
  },

  onLoad() {
    console.log("安行系统页面1");
    this.account = uni.getStorageSync("account");
    this.carNo = uni.getStorageSync("carNo");

    this.today = parseTime(new Date(), "{y}-{m}-{d} {h}:{i}:{s}");
    this.getList();
  },

  onShow() {},

  methods: {
    getList() {
      this.codeParams.text = this.carNo;
      let curDate = new Date().getTime();

      for (let i = 0; i < 14; i++) {
        this.loadingStatus[i] = false;
        this.levelStatus[i] = 3;
        this.tourAddress[i] = "";
        this.pathRecord[i] = [];
        this.levelDesc[i] = "";

        let intraday = curDate - 3600 * 24 * i * 1000;
        let time = parseTime(new Date(intraday), "{y}-{m}-{d}");
        // obj.carNo = this.carNo;
        let obj = {
          carNo: this.carNo,
          // carNo: "冀J5F355",
          time: time,
        };

        this.dateList[i] = time;
        // console.log(obj)
        this.getTourList(obj, i);
      }
    },

    //获取行程
    getTourList(obj, i) {
      const config = {
        url: "searchByCar",
        account: this.account,
        querys: obj,
      };
      uniRequest(config).then((res) => {
        console.log(obj.time + "行程记录", res);



        this.$set(this.loadingStatus, i, true);
        this.$set(this.pathRecord, i, res.data.data);

        let level = 3;
        let addressObj = {};
        this.pathRecord[i].map((item) => {
          //拼接地址
          // let addressStr = "";
          // if (item.provinceName) {
          //   addressStr += item.provinceName;
          // }
          // if (item.cityName) {
          //   addressStr += item.cityName;
          // }

          // addressObj.address = addressStr;
          //判断当前等级，取level最低值
          if (item.level !== 0 && item.level < level) {
            level = item.level;
          }
          if (item.level === 1) {
            //风险一旦有高危，显示二维码二维码红码
            this.isDanger = true;
          }
          // this.$set(this.levelStatus, i, level); //各记录的风险等级
          //装入各行程风险等级描述
          // this.statusOptions.map((e) => {
          //   if (e.level === item.level) {
          //     this.$set(item, "desc", e.label);
          //     this.$set(this.pathRecord, i, item);
          //   }
          // });
          addressObj.level = level;
          this.$set(this.tourAddress, i, addressObj); //各记录的省市

          // item.passDate = parseTime(new Date(item.passDate), "{y}-{m}-{d}");
          // //判断是否为今日
          // if (item.passDate === this.today) {
          //   this.$set(item, "isToday", true);
          // } else {
          //   this.$set(item, "isToday", false);
          // }
        });

        this.$set(this.levelStatus, i, level); //各记录的风险等级
        //获取当前风险评级描述
        this.statusOptions.map((e) => {
          if (e.level === level) {
            this.$set(this.levelDesc, i, e.label); //各记录的风险等级
          }
        });
        // console.log("各记录风险等级", this.levelStatus);
        this.$set(this.pathRecord, i, this.pathRecord[i]);
        // this.curLevel = level; //风险等级

        // this.curAddress = this.pathRecord[0].address; //地址
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.content {
  // padding-top: 44rpx;
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
    background: url("../../static/code/logo.png") no-repeat center;
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
  color: #dadada;
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

.record-box {
  display: flex;
  justify-content: flex-end;
}

.path-record {
  width: 74%;
  padding: 30rpx 0 0;
}

.path-item {
  position: relative;
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

.no-data,
.loding-data {
  box-sizing: border-box;
  padding: 0 20rpx;
  height: 98rpx;
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(241, 241, 241, 0.4) 100%
  );
  // opacity: 0.4;
  border-radius: 4px;
  display: flex;
  align-items: center;
  color: #999;
  font-size: 24rpx;
}

.no-data-icon {
  margin-right: 20rpx;
  width: 72rpx;
  height: 72rpx;
  background: url("../../static/code/no_data.png") no-repeat center;
  background-size: 100% 100%;
}

.loading-data-icon {
  margin-right: 20rpx;
  width: 72rpx;
  height: 72rpx;
  background: url("../../static/code/search.webp") no-repeat center;
  background-size: 100% 100%;
}
.path-status {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: -130rpx;
  width: 104rpx;
  height: 40rpx;
  border-radius: 4rpx;
  text-align: center;
  line-height: 40rpx;
  font-weight: bold;
  font-size: 24rpx;
}
</style>