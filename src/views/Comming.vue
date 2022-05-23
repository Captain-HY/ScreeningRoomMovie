<template>
  <div class="comming">
    <div class="want">
      <div class="want-list">
        <div class="wan-item" v-for="(witem, indexx) in want" :key="indexx">
          <div class="imgs">
            <van-image radius="10px" width="3rem" height="4rem" fit="cover" :src="witem.img"
              @click="toDetail(witem.id)" />
            <span>{{ witem.wish }}人想看</span>
          </div>
          <p class="wnm">{{ witem.nm }}</p>
          <p class="comingTitle">{{ witem.comingTitle }}</p>
        </div>
      </div>
    </div>
    <div class="coon"></div>
    <div class="list">
      <div class="list-list">
        <div class="list-item" v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
          <van-image radius="10px" width="3rem" height="4rem" fit="cover" :src="item.img" />
          <div class="xinxi">
            <p class="name">{{ item.nm }}</p>
            <p class="stars">{{ item.star }}</p>
            <p class="rt">{{ item.rt }}</p>
            <span class="wish">{{ item.wish }}人想看</span>
          </div>
          <van-button round color="linear-gradient(to right, #c84949, #9a1f1f)">
            想看
          </van-button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "comming",
  data() {
    return {
      want: [],
      list: [],
    };
  },
  created() {
    this.getWantData();
    this.getListData();
  },
  methods: {
    toDetail(id) {
      // console.log(id)
      this.$router.push({ name: "Detail", params: { id } });
    },
    getWantData() {
      this.axios({
        method: "get",
        url: "/index/mostExpected",
      }).then((result) => {
        if (result.status == 200) {
          // console.log("result", result);
          this.want = result.data.coming;
        }
      });
    },
    getListData() {
      this.axios({
        method: "get",
        url: "/index/comingList?ci=1&limit=10",
      }).then((result) => {
        // console.log(result);
        if (result.status == 200) {
          // console.log("result", result);
          this.list = result.data.coming;
          this.list.forEach((element) => {
            if (element.star) {
              element.star = element.star.split(",").join(" / ");
            }
          });
        }
      });
    },

  },
};
</script>

<style lang="less" scoped>
.comming {
  position: fixed;
  top: 165px;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;

  .want {
    overflow-x: auto;
    width: calc(100% -15px);
    padding-left: 15px;

    .want-list {
      width: 1240px;

      .wan-item {
        float: left;
        margin: 5px 5px;
        overflow: hidden;

        .imgs {
          position: relative;
          border-radius: 10px;
          overflow: hidden;

          span {
            width: 100%;
            text-align: center;
            background-color: rgba(0, 0, 0, 0.527);
            position: absolute;
            bottom: 3px;
            left: 0;
          }
        }

        .wnm {
          width: 110px;
          margin-bottom: 5px;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }

        .comingTitle {
          color: #a4a4a4;
          margin-top: 5px;
          text-align: center;
        }
      }
    }
  }

  .coon {
    margin: 0 5%;
    width: 90%;
    height: 1px;
    background: #6a6a6a80;
  }

  .list-list {
    overflow: hidden;

    // height: 180px;
    .list-item {
      margin-top: 20px;
      background-color: rgba(158, 157, 157, 0.1);
      position: relative;
      border-radius: 10px;
      width: 90%;
      margin-left: 20px;
      height: 150px;

      .van-image {
        position: absolute;
        top: -10px;
        left: 20px;
      }

      .xinxi {
        width: 58%;
        position: absolute;
        top: 0;
        right: 0;

        .name {
          font-size: 20px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
        }

        .stars {
          color: rgb(145, 145, 145);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          // margin-bottom: 40px;
        }

        .rt {
          color: rgb(145, 145, 145);
        }

        .wish {
          color: #c84949;
          margin-bottom: 0;
        }
      }

      .van-button {
        position: absolute;
        width: 60px;
        height: 30px;
        bottom: 10px;
        right: 10px;
      }
    }
  }
}
</style>