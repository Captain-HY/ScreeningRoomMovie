<template>
  <div id="app">
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
  name: "app",
  data: () => ({
    include: [],
  }),
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    },
  },
}
</script>
<style lang="less">
html {
  height: 100%;
}

body {
  height: calc(100% -24px);
  background-color: #1a1962;
  background-image: linear-gradient(180deg, #1a1962 0%, #101012 100%);
  color: #fff;
  margin-top: 24px;
}
</style>
