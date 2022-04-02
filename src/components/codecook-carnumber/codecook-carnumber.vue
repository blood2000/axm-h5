<template>
  <view class="car-number">
    <!-- <view class="new-energy">新能源</view> -->
    <view class="wrap" @tap="focusHandler">
      <view
        :class="[
          'cell',
          { last: !isDisabled && index === length - 1 },
          {
            'no-border':
              (!isDisabled && index === length - 1) || index === length - 2,
          },
          { active: !isDisabled && index === current },
        ]"
        v-for="(val, index) in fill"
        :key="index"
        @tap.stop="focusHandler(index)"
      >
        <view class="val" :class="index == 7 && !val ? 'grays' : ''">{{
          index == 7 && !val ? "新" : val
        }}</view>
        <view class="border"></view>
      </view>
    </view>

    <key-board
      v-if="focus"
      :type="kType"
      @on-delete="keyDeleteHandler"
      @on-input="keyInputHandler"
      @on-hide="keyHideHandler"
    ></key-board>
  </view>
</template>

<script>
import KeyBoard from "../codecook-keyboard/codecook-keyboard.vue";

export default {
  name: "CarNumber",
  components: {
    KeyBoard,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    length: {
      type: Number,
      default: 8,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: Boolean,
      default: false,
    },
    current: {
      type: Number,
      default: -1,
    },
  },
  data() {
    return {
      fill: new Array(this.length).fill(""),
    };
  },
  computed: {
    kType() {
      return this.current === 0 || this.current === null
        ? "provinces"
        : "areas";
    },
  },
  watch: {
    fill(val) {
      // console.log("fill val", val);
      this.$emit("input", val.join(""));
      this.$emit("change", val);
    },
    value(v) {
      // console.log("v", v);
      if (!v) {
        this.fill = ["", "", "", "", "", "", "", ""];
      } else if (v.length >= 7) {
        for (let i = 0; i < v.length; i++) {
          this.$set(this.fill, i, v[i]);
        }
      }
    },
  },
  methods: {
    focusHandler(index = 0) {
      if (this.isDisabled) return;
      console.log("focusHandler");

      // this.focus = true;
      this.$emit("changeFocus", true);
      this.$emit("changeCurrent", index);
      // this.current = index;
      console.log(this.current);
    },
    keyDeleteHandler() {
      console.log("keyDeleteHandler");

      this.$set(this.fill, this.current, "");

      if (this.current <= 0) {
        return;
      }

      this.$emit("changeCurrentDel");
      // this.current -= 1;
    },
    keyInputHandler(key) {
      if (this.isDisabled) return;
      this.$set(this.fill, this.current, key);

      if (this.current >= this.length - 1) {
        return;
      }
      this.$emit("changeCurrentAdd");
      // this.current += 1;
    },
    keyHideHandler() {
      // this.focus = false;
      this.$emit("changeFocus", false);
    },
  },
  beforeMount() {
    console.log("beforeMount");
    if (this.value) {
      this.value.split("").forEach((key, index) => {
        if (index >= this.length) {
          return;
        }
        this.$set(this.fill, index, key);
      });
      this.$emit("changeCurrent", Math.min(this.value.length, this.length - 1));

      // this.current = Math.min(this.value.length, this.length - 1);
    }
  },
};
</script>

<style lang="scss" scoped>
.car-number {
  position: relative;
  width: 100%;

  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    box-sizing: border-box;
    border-radius: 8rpx;
    padding: 15rpx 0;
  }

  .new-energy {
    font-size: 24rpx;
    color: #333232;
    margin-bottom: 13rpx;
    display: flex;
    flex-direction: row-reverse;
    padding-right: 5rpx;
  }

  .cell {
    box-sizing: border-box;
    color: #666666;
    font-size: 34rpx;
    background: #ffffff;
    text-align: center;
    border: 4rpx solid transparent;
    align-items: center;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    position: relative;
    border-radius: 13rpx;
    height: 70rpx;
    width: 70rpx;
    box-shadow: 0px 8px 7px 0px rgba(152, 152, 152, 0.1);
    .val {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &.active {
      border-color: #9fbaf2;
    }
  }
}
.grays {
  color: rgb(152, 152, 152);
}
</style>
