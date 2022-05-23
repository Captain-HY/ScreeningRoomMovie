<template>
  <div class="hot">
    <!-- <MySwiper/> -->
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="(item, index) in hoplist" :key="index">
        <div class="img-all">
          <van-image width="7rem" height="10rem" fit="cover" :src="item.img" @click="toDetail(item.id)" />
          <span class="sc" v-show="item.sc">{{ item.sc }}<span class="litsc">猫眼评分</span>
          </span>
        </div>

        <p>{{ item.nm }}</p>
        <span class="star">{{ item.star }}</span>
      </swiper-slide>
    </swiper>
  </div>
</template>


<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
export default {
  name: "hot",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      hoplist: [],
      swiperOption: {
        spaceBetween: 30,
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        effect: "flip",
      },
    };
  },

  created() {
    this.getHotData();
    
  },
  methods: {

    getHotData() {
      this.axios({
        method: "get",
        url: "/index/movieOnInfoList",
      }).then((result) => {
        // console.log(result)
        if (result.status == "200") {
          this.hoplist = result.data.movieList;
          // console.log("hoplist", this.hoplist);
          this.hoplist.forEach((element) => {
            if (element.star) {
              element.star = element.star.split(",").join(" / ");
            }
          });
        }
      });
    },
    toDetail(id) {
      // console.log(id)
      this.$router.push({ name: "Detail", params: { id } });
    },
  },
};
</script>

<style lang="less" scoped>
.hot {
  position: fixed;
  top: 165px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;

  .swiper {
    height: 100%;
    width: 100%;
    // border: 1px transparent solid;

    .swiper-slide {
      // display: flex;
      // justify-content: center;
      align-items: center;
      text-align: center;
      font-weight: bold;
      font-size: 14px;
      // background-color: rgb(98, 168, 200);
    }
  }

  .my-swipe .van-swipe-item {
    color: #fff;
    text-align: center;
  }

  .img-all {
    position: relative;
    overflow: hidden;

    .van-image {
      overflow: hidden;
      border-radius: 10px;
      overflow: hidden;
    }

    .sc {
      position: absolute;
      width: 90px;
      height: 30px;
      background: rgba(125, 125, 125, 0.5);
      font-size: 20px;
      line-height: 30px;
      left: 56px;
      bottom: 3px;
      border-radius: 0 20px 0 10px;

      .litsc {
        font-size: 10px;
      }
    }
  }

  .star {
    font-size: 10px;
    color: rgb(152, 152, 152);
  }
}
</style>