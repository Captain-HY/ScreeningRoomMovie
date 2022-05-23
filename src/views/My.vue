<template>
  <div class="my">
    <div class="Info">
      <div class="imgbox">
        <p class="nick">{{ Info.nickname }}</p>
        <van-image round width="2.5rem" height="2.5rem" :src="require('../assets/default.jpg')" @click="doi" />
      </div>
      <div class="allbuy">
        <div class="nums" @click="getTick">
          <p class="num">{{ buyit.length }}</p>
          <span>电影票</span>
        </div>
        <div class="nums" @click="getCard">
          <p class="num">{{ actionsCard.length }}</p>
          <span>会员卡</span>
        </div>
        <div class="nums" @click="getBuy">
          <p class="num">{{ actionsBuy.length }}</p>
          <span>卖品</span>
        </div>
        <div class="nums" @click="getTip">
          <p class="num">{{ actionsTip.length }}</p>
          <span>优惠券</span>
        </div>
      </div>
      <div class="setting">
        <van-cell title="设置" icon="setting-o" is-link @click="showtoExit" />
      </div>

    </div>
    <van-action-sheet v-model="showTick" title="电影票">
      <div class="list">
        <div class="list-item" v-for="(items, indexs) in buyit" :key="indexs">
          <p class="ite">{{ items.title }}</p>
          <div class="list-info">
            <van-image width="2rem" height="2.5rem" :src="items.img" />
            <div class="vright">
              <div class="itn">
                <span class="name">{{ items.name }}</span>
                <span class="leng">{{ items.buyit.length }}张</span>
              </div>

              <div class="binfo">
                <p class="">{{ items.time }}</p>
                <p>{{ items.room }}</p>
                <span class="" v-for="(item, index) in items.buyit" :key="index">{{ item.num }}</span>
                <p class="price">总价：{{ items.price }}</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </van-action-sheet>
    <van-action-sheet title="优惠券" v-model="showTip" :actions="actionsTip" @select="getTip" />
    <van-action-sheet title="会员卡" v-model="showCard" :actions="actionsCard" @select="getCard" />
  </div>

</template>

<script>
import { Dialog } from 'vant';
export default {
  name: "My",
  data() {
    return {
      Info: {
        nickname: '点击👆头像登录',
      },
      buyit: [

      ],
      actionsTip: [],
      actionsCard: [],
      actionsBuy: [],
      showTick: false,
      showTip: false,
      showCard: false,
      showBuy: false,
    };
  },
  components: {
    [Dialog.Component.name]: Dialog.Component,
  },

  computed: {
    islogin() {
      return this.$store.state.Logining
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    showtoExit() {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" });
        return
      }
      Dialog.confirm({
        title: '确定要退出登录吗？',
        message: '确定要退出登录吗？',
      }).then(() => {
        this.$store.state.Logining = false;
        this.$router.push({ name: "Login" });
      })
        .catch(() => {
          return
        });
    },
    getTick() {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" });
        return
      }
      if (this.buyit.length > 0) {
        this.showTick = true
      } else {
        Dialog.alert({
          title: '请先购买票哦！',
          message: '请先购买票哦！',
        }).then(() => {
          // on close
        });
      }

    },
    getTip() {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" });
        return
      }

      this.showTip = true
    },
    getBuy() {
      Dialog.alert({
        title: '暂无卖品',
        message: '暂无卖品',
      }).then(() => {
        // on close
      });
    },
    getTip() {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" });
        return
      }

      this.showTip = true
    },
    getCard() {
      if (!this.$store.state.Logining) {
        this.$router.push({ name: "Login" });
        return
      }

      this.showCard = true
    },
    doi() {
      if (this.$store.state.Logining) {
        return
      }
      this.$router.push({ name: "Login" });
    },

    getInfo() {
      if (!this.$store.state.Logining) {
        return
      }
      this.Info = JSON.parse(localStorage.getItem("saveUserInfo"));
      this.buyit = this.$store.state.Ticks;
      this.actionsTip = [{ name: '10元优惠券 - 2张' }, { name: '8折优惠券 - 1张' }];
      this.actionsCard = [{ name: '黄金会员卡' },];
    }
  }
};
</script>

<style lang="less" scoped>
.my {
  position: fixed;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 50px;

  background-color: #101012;
  background-image: linear-gradient(0deg, #101012 50%, #c71e1e 100%);


  .imgbox {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 100%;
    height: 200px;

    .van-image {
      border: 3px solid rgb(190, 190, 190);
    }

    .nick {
      font-size: 18px;
      font-weight: 700;
    }
  }

  .allbuy {
    width: 90%;
    padding: 10px 0;
    background-color: #77777720;
    display: flex;
    margin: 0 5%;
    align-items: center;
    border-radius: 10px;

    .nums {
      float: left;
      flex: 1;
      align-content: center;

      text-align: center;
      line-height: 40px;


      .num {
        font-size: 24px;
        margin: 0;
      }
    }
  }

  .setting {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    .van-cell {
      width: 90%;

      background: #10101200;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);

    }



    .van-cell__title {
      color: #fff;
      margin-left: 10px;
    }

    .van-icon-setting-o {
      color: #c05d5d;
    }
  }

  .list {
    margin: 0 5% 10px 5%;

    .list-item {
      overflow: hidden;
    }

    .ite {
      border-bottom: 1px solid rgba(131, 131, 131, 0.2);
      padding: 10px 0;
    }

    .list-info {

      .van-image {
        float: left;
      }

      .vright {
        float: left;
        margin-left: 10px;
        width: 200px;
        display: flex;
        flex-direction: column;

        .itn {
          overflow: hidden;
        }

        .name {
          float: left;
          font-size: 14px;
        }

        .leng {
          float: left;
          font-size: 14px;
          margin-left: 10px;
        }

        .binfo {
          margin-top: 10px;
          overflow: hidden;

          p {
            margin: 0;
          }
        }
      }
    }
  }

  .van-popup--bottom {
    bottom: 50px;
  }

  .van-action-sheet__content {
    margin-bottom: 10px;
  }
}
</style>