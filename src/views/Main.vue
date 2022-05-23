<template>
  <div class="main">
    <router-view />

    <van-tabbar v-model="activeIndex" route>
      <van-tabbar-item
        v-for="(item, index) in tabbarData"
        :key="index"
        :to="{ name: item.routeName }"
      >
        <span>{{ item.title }}</span>
        <template #icon="props">
          <img :src="props.active ? item.activeIcon : item.inactiveIcon" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Main",
  data() {
    return {
      activeIndex: 0,
      tabbarData: [
        {
          routeName: "Home",
          activeIcon: require("../assets/home-a.png"),
          inactiveIcon: require("../assets/home.png"),
        },
        {
          routeName: "Cinema",
          activeIcon: require("../assets/cate-a.png"),
          inactiveIcon: require("../assets/cate.png"),
        },
        {
          routeName: "My",
          activeIcon: require("../assets/my-a.png"),
          inactiveIcon: require("../assets/my.png"),
        },
      ],
    };
  },
};
</script>

<style lang="less" >
body {
  .main {
    height: 100%;
  }
}
.van-tabbar {
  background-color: #101012;
  .van-tabbar-item--active {
    background-color: #101012;
  }
  .van-tabbar-item__icon {
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.van-hairline--top-bottom::after,
.van-hairline-unset--top-bottom::after {
  border: none;
}
</style>