<template>
  <div class="show">
    <Navi :title="title" :fixed="true" />

    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in hoplist" :key="index">
        <div class="img-all">
          <van-image fit="cover" :src="item.img" />
        </div>
      </swiper-slide>
    </swiper>
    <div class="Info">
      <h2>{{ hopInfo.nm }}</h2>
      <span>{{ hopInfo.desc }}</span>
    </div>
    <div class="movieTime">
      <van-tabs v-model="active">
        <van-tab v-for="(items, index) in hopInfo.shows" :title="items.showDate" :key="index">
          <van-cell-group>
            <van-cell v-for="(item, indexx) in items.plist" :key="indexx">
              <template #title>
                <span class="custom-title">{{ item.tm }}</span>
                <div class="content">
                  <p class="">
                    {{ item.tp + '/' + item.lang }}
                  </p>
                  <span class="room">{{ item.th }}</span>
                </div>
                <span class="price">{{ item.baseSellPrice + '元' }}</span>
                <van-button color="linear-gradient(to right, #ff6034, #ee0a24)" round @click="buy(hopInfo, item)">购买</van-button>
              </template>
            </van-cell>
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
let vm = null;
import Navi from "../components/Navi.vue";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "Show",
  data() {
    return {
      title: '影院',
      hoplist: [],
      hopInfo: [],
      swiperOption: {
        slidesPerView: 3,
        centeredSlides: true,
        coverflow: {
          rotate: 30,
          stretch: 10,
          depth: 60,
          modifier: 1,
          slideShadows: false
        },
        effect: "coverflow",
        on: {
          slideChange: function () {
            vm.index = this.activeIndex
            vm.sC()
          },
        },
      },
      cinemaId: 1,
      ci: 1,
      index: 0,
      active: 0,
    }
  },
  components: {
    Navi,
    Swiper,
    SwiperSlide,
  },
  created() {
    vm = this
    this.ci = this.$store.state.ci.id
    this.cinemaId = this.$route.params.cinemaId
    this.getCimeaShow()

  },

  methods: {
    buy(itemss, item) {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" })
      } else {
        let title = this.title
        this.$router.push({ name: "Screen", params: { itemss, item,title } })
      }

    },


    sC() {
      this.hopInfo = this.hoplist[this.index]
      // console.log(this.hopInfo)
    },

    getCimeaShow() {
      this.axios({
        method: 'get',
        url: '/cinema/shows?cinemaId=' + this.cinemaId + '&ci=' + this.ci + '&channelId=4'
      }).then(result => {

        if (result.status == 200) {
          // console.log(result.data.data.movies)
          this.title = result.data.data.cinemaName;
          this.hoplist = result.data.data.movies
          this.hopInfo = result.data.data.movies[0]

        }
      })
    }
  }
};
</script>

<style lang="less" scoped>
.show {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow-y: auto;

  /deep/.navi {
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__left {
      background: rgba(0, 0, 0, 0);
    }
  }

  .Info {
    width: 90%;
    text-align: center;
    margin-left: 5%;
    border-bottom: 1px solid rgba(187, 187, 187, 0.1);
    padding-bottom: 15px;

    h2 {
      margin-top: 5px;
      margin-bottom: 5px;
      text-align: center;
    }

  }

  .movieTime {
    /deep/.van-tabs__nav {
      background-color: rgba(255, 255, 255, 0);


      .van-tab {
        color: #fff;
      }
    }

    .van-cell-group {
      background-color: rgba(255, 255, 255, 0);

    }

    .van-cell {
      background-color: rgba(255, 255, 255, 0);

      span {
        color: #fff;
      }

      p {
        color: #fff;
        margin: 0;
      }

      .van-cell__title {
        padding-bottom: 10px;
      }

      .van-button {
        float: right;
        height: 30px;
        margin-top: 10px;
      }
    }

    .custom-title {
      font-size: 24px;
      float: left;
      margin-right: 20px;
      line-height: 50px;
    }

    .content {
      width: 150px;
      overflow: hidden;
      float: left;

      .room {
        color: rgb(190, 190, 190);
      }
    }

    .price {
      line-height: 50px;
    }
  }
}
</style>