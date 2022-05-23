<template>
  <div class="tickets">
    <Navi title="电影票" :fixed="true" />
    <div class="box">
      <div class="head">
        <van-image radius="10px" width="2.5rem" height="3rem" fit="cover" :src="items.img" />
        <div class="head-info">
          <p class="moviename">{{ items.nm }}</p>
          <p>{{ time }}</p>
          <p><span class="num" v-for="item in buyit" :key="item.id">{{ item.num }}</span></p>
        </div>
      </div>
      <div class="line">
        <div class="left-circle"></div>
        <div class="right-circle"></div>
        <div class="order-line"></div>
      </div>
      <div class="content">
        <div class="">
          <p class="cn">{{ title }}</p>
          <span>观影厅：{{ itemm.th }}</span>
        </div>
        <div class="imgbox">
          <img src="../assets/erweima.jpg" alt="" />
        </div>
        <span>取票码：1345125</span>
        <div class="ma">验证码: 123221</div>
      </div>
      <div class="line">
        <div class="left-circle"></div>
        <div class="right-circle"></div>
        <div class="order-line"></div>
      </div>
      <div class="info">
        <p class="tit">实付金额 {{ price }}</p>
        <p>电影单号: 37592837195183</p>
        <p>购买时间: {{ time }}</p>
      </div>
      <div class="flower"></div>
    </div>
  </div>
</template>
<script>
import Navi from "../components/Navi.vue";
export default {
  name: "Tickets",
  data() {
    return {
      time: "",
      price: 0,
      itemm: [],
      items: [],
      buyit: [],
      title: '',
    };
  },
  components: {
    Navi,
  },
  created() {
    this.newTime();
  },
  methods: {
    newTime() {
      var timestamp = new Date().getTime();
      var time = new Date(timestamp);
      var y = time.getFullYear();
      var m = time.getMonth() + 1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      this.time = y + "-" + m + "-" + d + "  " + h + ":" + mm + ":" + s;

      this.price = this.$route.params.price;
      this.itemm = this.$route.params.itemm
      this.items = this.$route.params.items
      this.buyit = this.$route.params.buyit
      this.title = this.$route.params.title
      // console.log(this.buyit);
      let Ticks = {
        price: this.price,
        time: this.time,
        name: this.items.nm,
        buyit: this.buyit,
        room: this.itemm.th,
        img: this.items.img,
        title: this.title,
      }
      // console.log('Ticks',Ticks)
      //items.nm    buyit  itemm.th 
      this.$store.commit('Ticks', Ticks)
    },
  },
};
</script>
<style lang="less" scoped>
.tickets {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;

  /deep/.navi {
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__left {
      background: rgba(0, 0, 0, 0);
    }
  }

  .box {
    width: 90%;
    height: 90%;
    margin: 0 5%;
    overflow: hidden;
    // background-color: #ffffff;
  }

  .head {
    margin-top: 20px;
    width: 100%;
    height: 100px;
    background-color: #fff;
    border-radius: 10px 10px 0 0;
    position: relative;

    .van-image {
      position: absolute;
      top: -20px;
      left: 20px;
    }

    .head-info {
      color: #000;
      width: 50%;
      position: absolute;
      left: 40%;

      p {
        margin: 5px 0;
      }

      span {
        margin-right: 5px;
      }

      .moviename {
        font-size: 16px;
        font-weight: 800;
        margin: 10px 0;
      }
    }
  }

  // bg为有圆角的白布
  .line {
    width: 100%;
    height: 20px;
    background-color: #ffffff;

    position: relative;
    overflow: hidden;
  }

  // 用页面背景色的两个圆形直接定位到bg画布上 一左一右实现凹圆角
  .left-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(22, 22, 68);
    position: absolute;
    left: -10px;
  }

  .right-circle {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: rgb(22, 22, 68);
    position: absolute;
    right: -10px;
  }

  // 圆形距top的高度+圆形半径就是虚线所在的位置了
  .order-line {
    border: 1px dashed rgb(22, 22, 68);
    position: absolute;
    top: 50%;
    z-index: 99;
    width: 100%;
  }

  .content {
    width: 100%;
    height: 250px;
    background-color: #fff;
    color: #000;
    display: flex;
    align-items: center;
    flex-direction: column;
    text-align: center;

    p {
      font-size: 16px;
      font-weight: 800;
      margin: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      -o-text-overflow: ellipsis;
    }

    .imgbox {
      width: 100%;
      height: 150px;
      overflow: hidden;
      display: flex;
      align-items: center;
      flex-direction: column;

      img {
        width: 150px;
        height: 150px;
      }
    }

    .ma {
      margin-top: 10px;
      padding: 10px;
      border: 1px solid #000;
      border-radius: 30px;
      width: 100px;
      font-size: 14px;
      text-align: center;


    }
  }

  .info {
    height: 100px;
    background-color: #fff;
    color: #000;
    padding: 10px 10px 0 10px;

    p {
      margin: 5px 0;
    }

    .tit {
      font-size: 16px;
      font-weight: 800;
    }
  }

  .flower {
    width: 100%;
    height: 5px;
    background-color: #c84949;
    background-image: linear-gradient(90deg, #c84949 0%, #9a1f1f 100%);
  }
}
</style>