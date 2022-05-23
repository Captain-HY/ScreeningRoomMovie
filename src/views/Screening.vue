<template>
  <div class="screen">
    <Navi :title="items.nm" :fixed="true" />
    <div class="such">
      <div class="seat-box">
        <i class="seat-bg bg1"></i><span class="buyed">可选</span>
      </div>
      <div class="seat-box">
        <i class="seat-bg bg2"></i><span class="buyed">已售</span>
      </div>
      <div class="seat-box">
        <i class="seat-bg bg3"></i><span class="buyed">不可选</span>
      </div>
      <div class="seat-box">
        <i class="seat-bg active"></i><span class="buyed">已选</span>
      </div>
    </div>
    <div class="tv">
      <van-image :src="items.img" />
    </div>


    <div class="selectSeat">
      <div class="rows" v-for="(items, indexs) in seats.rows" :key="indexs">
        <div class="tip">{{ indexs + 1 }}</div>
        <!-- 0无座 1 可选 3已售 4不可售 -->
        <div
          :class="item.seatStatus == 1 ? 'bg1' + ' seats' : item.seatStatus == 3 ? 'bg2' : item.seatStatus == 4 ? 'bg3' + ' seats' : 'bg0' + ' seats'"
          v-for="(item, index) in items.seats" :key="index">
          <div :class="item.seatType == 1 ? 'active' + ' selebox' : '' + 'selebox'" @click="select(item, index)"></div>
        </div>

      </div>
    </div>

    <div class="change">
      <p>{{ itemm.dt + ' ' + itemm.tm + ' ' + itemm.tp + '/' + itemm.lang }}</p>
      <div class="bits">
        <span class="bit" v-for="(item, index) in buyit" :key="index">{{ item.num }}</span>
      </div>

      <div class="footer">
        <van-button round color="linear-gradient(to right, #ff6034, #ee0a24)"
          @click="toTickets((buyit.length * itemm.baseSellPrice).toFixed(1))">
          {{ (buyit.length * itemm.baseSellPrice).toFixed(1) }}元 确认选座</van-button>
      </div>
    </div>
  </div>

</template>
<script>
import Navi from "../components/Navi.vue";
import seats from "../store/seat-m"
export default {
  name: "Screen",
  data() {
    return {
      items: [],
      itemm: [],
      buyit: [],
      seats,
      tits:'',
    };
  },
  components: {
    Navi,
  },
  created() {
    this.seats = this.seats.data.seat.regions[0]
    this.getmovieTime()
    this.getseat()

  },
  methods: {
    toTickets(price) {
      if (price == '0.0') {
        return
      }
      let itemm = this.itemm
      let items = this.items
      let buyit = this.buyit
      let title = this.tits
      // console.log(Ticks)
      this.$router.push({ name: "Tickets", params: { price, itemm, items, buyit,title } });
    },
    select(item, index) {
      if (item.seatStatus == 1) {
        if (item.seatType == 'N') {
          item.seatType = 1
          let seleit = {
            num: item.rowId + '排' + item.columnId + '座',
            id: item.columnId + '-' + item.rowId,
            rowId: item.rowId,
            index: index,
          }
          this.buyit.push(seleit)
        } else {
          item.seatType = "N"
          this.buyit.forEach((element, i) => {
            if (element.id == item.columnId + '-' + item.rowId) {
              this.buyit.splice(i, 1)
            }
          });
        }
        // console.log(this.buyit)
      }
      // console.log('item', item)
    },
    getseat() {
      // console.log('this.seats', this.seats);
      this.seats.rows.forEach(element => {
        element.seats.forEach(e => {
          if (e.seatStatus == 1) {
            e.seatType = "N"
          }
        })
      });
    },
    getmovieTime() {
      this.items = this.$route.params.itemss
      this.itemm = this.$route.params.item
      this.tits =this.$route.params.title
      // console.log('this.item', this.itemm)
    }
  }
};
</script>
<style lang="less" scoped>
.screen {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;

  /deep/.navi {
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__left {
      background: rgba(0, 0, 0, 0);
    }
  }

  .tv {
    width: 80%;
    margin-left: 10%;
    height: 88px;
    overflow: hidden;
    position: relative;
    box-shadow: 0px -10px 15px 2px #131940;

    .van-image {
      transform: rotateX(75deg);
      position: absolute;
      top: -170px;
      width: 100%;
    }
  }

  .such {
    width: 50%;
    display: flex;
    align-items: center;
    height: 25px;
    overflow: hidden;
    margin-bottom: 10px;
    margin-left: 25%;
    justify-content: space-around;

    .seat-box {
      float: left;
      line-height: 25px;
      display: flex;
      flex-direction: row;
      align-items: center;

      .seat-bg {
        display: block;
        width: 12px;
        height: 12px;
        float: left;
        margin-right: 5px;

        &.bg1 {
          background: url("../assets/bg1.png") no-repeat;
          background-size: 12px;
        }

        &.bg2 {
          background: url("../assets/bg2.png") no-repeat;
          background-size: 12px;
        }

        &.bg3 {
          background: url("../assets/bg3.png") no-repeat;
          background-size: 12px;
        }

        &.active {
          background: url("../assets/sele-bg.png") no-repeat;
          background-size: 12px;
        }
      }
    }
  }

  .selectSeat {
    width: 100%;
    height: 270px;
    margin-top: 10px;

    .rows {
      width: 100%;
      margin-bottom: 10px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      flex-direction: row;
      position: relative;

      .tip {
        position: absolute;
        right: 0;
        color: rgb(166, 166, 166);
        margin-right: 5px;
      }

      .seats {
        width: 20px;
        height: 20px;
        background-color: #fff;
        margin-right: 5px;
        float: left;

        .selebox {
          width: 100%;
          height: 100%;

          &.active {
            background: url("../assets/sele-bg.png") no-repeat;
            background-size: 20px;
          }
        }

        &.bg0 {
          background: none;

        }

        &.bg1 {
          background: url("../assets/bg1.png") no-repeat;
          background-size: 20px;
        }

        &.bg2 {
          background: url("../assets/bg2.png") no-repeat;
          background-size: 20px;
        }

        &.bg3 {
          background: url("../assets/bg3.png") no-repeat;
          background-size: 20px;
        }

        &.active {
          background: url("../assets/sele-bg.png") no-repeat;
          background-size: 20px;
        }
      }
    }

  }

  .change {
    p {
      text-align: center;
    }

    .bits {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }

    .bit {
      border-radius: 7px;
      border: 1px solid rgba(255, 255, 255, 0.5);
      padding: 5px 10px;
      position: relative;
      margin-left: 10px;


    }
  }

  .footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: space-around;

  }
}
</style>