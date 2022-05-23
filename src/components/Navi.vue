<template>
  <div class="navi">
    <van-nav-bar
      :title="title"
      :right-text="rightText"
      :fixed="fixed"
      left-arrow
      @click-left="back"
    />
  </div>
</template>

<script>
export default {
  name: "Navi",
  props: {
    title: {
      type: String,
      default: "",
    },
    rightText: {
      type: String,
      default: "",
    },
    fixed: {
      type: Boolean,
      default: "",
    },
  },

  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.navi {

.van-hairline--bottom::after{
    border: none;
}
.van-nav-bar{
    margin-top: 24px;
    background-color: rgba(255, 255, 255, 0);
}
/deep/.van-nav-bar__left{
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    margin: 5px 0 0 5px;
    padding: 0 7px;
    height: 35px;
}
  /deep/ .van-nav-bar .van-icon {
    color: #fff;
  }
}
</style>