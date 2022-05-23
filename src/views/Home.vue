<template>
  <div class="home">
    <div class="topseach">
      <div class="topleft" @click="tocity"><i class="icon"></i><span>{{ city.nm }}</span></div>
      <van-search shape="round" background="#00000000" v-model="value" placeholder="请输入搜索关键词" left-icon="none"
        @search="onSearch" />
    </div>
    <p class="titlee">{{ activeTit }}</p>
    <van-tabs v-model="activeName" color="#00000000" line-width="100px" title-active-color="#fff" route
      @click="changes()">
      <van-tab v-for="(item, index) in tabs" :key="index" :title="item.title" :to="{ name: item.routeName }"
        :name="item.routeName" :replace="true">
        <router-view />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      value: "",
      activeName: "hot",
      activeTit: "The Big Hits",
      show: true,
      tabs: [
        {
          title: "正在热映",
          routeName: "hot",
        },
        {
          title: "即将上映",
          routeName: "comming",
        },
      ],

      lat: '',
      lng: '',

    };
  },
  created() {
    this.nochange();
    this.changes();

  },
  computed: {
    city() {
      return this.$store.state.ci
    }
  },

  mounted() {
    this.getLocation()
  },
  methods: {
    getLocation() {
      let geolocation = new window.qq.maps.Geolocation("X42BZ-B6F66-GLMSF-MOFJ4-V75NT-7EFDV", "movieapp");

      geolocation.getLocation(this.showPosition, this.errorPosition);

    },
    showPosition(position) {
      // console.log(position);
      this.lng = (position.lng).toFixed(1);
      this.lat = (position.lat).toFixed(1);
      let location = { lng: this.lng, lat: this.lat }
      this.$store.commit('lnglat', location)
    },
    errorPosition() {
      // console.log('定位失败');
      //继续定位
      this.getLocation();
    },
    getPosition() {//点击一次获取一次
      this.getLocation()
    },
    tocity() {
      this.$router.push({ name: "Citys" });

    },
    onSearch(val) {
      this.$router.push({ name: 'Result', params: { val } })
    },
    changes() {
      if (this.activeName == "hot") {
        this.activeTit = "The Big Hits";
      } else if (this.activeName == "comming") {
        this.activeTit = "Comming Soon";
      } else {
        this.activeTit = "The Big Hits";
      }
    },
    nochange() {
      var cur_path = this.$route.path; //获取当前路由
      var activeChange = cur_path.split("/home/")[1];

      this.activeName = activeChange;
    },
    //点击按钮获取地理位置信息
    geo() {
      navigator.geolocation.getCurrentPosition(function (position) {
        this.lng = position.coords.longitude.toFixed(1);
        this.lat = position.coords.latitude.toFixed(1);
      })
    }
  },
};
</script>
<style lang="less" scoped>
.home {
  position: fixed;
  top: 24px;
  bottom: 50px;
  left: 20px;
  right: 20px;

  .titlee {
    margin: 10px 0 0 0;
    font-size: 28px;
  }
}

.topseach {
  overflow: hidden;

  .topleft {
    width: 25%;
    height: 34px;
    float: left;
    border-radius: 17px;
    background-color: rgba(255, 255, 255, 0.2);
    margin-top: 10px;
    // margin-left: 15px;
    color: rgb(215, 215, 215);

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    span {
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }

    .icon {
      display: block;
      width: 20px;
      height: 20px;
      float: left;
      margin-left: 10px;
      background-image: url(../assets/here.png);
      background-size: 20px;
      margin-right: 3px;
    }
  }
}

.van-search {
  width: 73%;
  float: right;
  padding-left: 0px;
  padding-right: 0px;

  .van-search__content {
    background-color: rgba(255, 255, 255, 0.2);
  }

  /deep/.van-field__body {
    input {
      color: #fff;
    }
  }
}

/deep/.van-tabs__nav {
  background-color: rgba(255, 255, 255, 0);
}
</style>