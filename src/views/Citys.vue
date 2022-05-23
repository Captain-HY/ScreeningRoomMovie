<template>
  <div class="citys">
    <Navi title="选择城市" :fixed="true" />
    <van-index-bar :index-list="indexList">
      <div class="" v-for="(items, indexs) in allcity" :key="indexs">
        <van-index-anchor :index="items.Title" />
        <div class="cellbox">
          <van-cell v-for="(item, index) in items.List" :key="index" :value="item.nm" @click="updataCity(item)" />
        </div>
      </div>
    </van-index-bar>
  </div>
</template>
<script>
import Navi from "../components/Navi.vue";
import cities from "../store/cities";
export default {
  name: "Citys",
  data() {
    return {
      cities,
      indexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z",
      ],
      allcity: [],
    };
  },
  components: {
    Navi,
  },
  created() {
    this.cities.cts = this.cities.cts.sort(this.sortCityList("py"));
    this.formatList(this.cities.cts, "py");
  },

  methods: {
    updataCity(params) {
      this.$store.commit('updataCity', params)
      this.$router.back();
    },
    sortCityList(propertyName) {
      return function sortList(object1, object2) {
        const value1 = object1[propertyName];
        const value2 = object2[propertyName];
        if (value2 < value1) {
          return 1;
        }
        if (value2 > value1) {
          return -1;
        }
        return 0;
      };
    },
    formatList(arr, keyword) {
      let newArr1 = [];
      let tempArr = [];
      let reg = /\b(\w)|\s(\w)/g;
      let k = 0;
      let firstWord = arr[0][keyword].charAt(0).toUpperCase(); //获取第一个分类字母
      arr.map((v) => {
        v[keyword] = v[keyword].replace(reg, (m) => m.toUpperCase()); //首字母大写
        if (firstWord == v[keyword].charAt(0)) {
          tempArr.push(v);
          newArr1[k] = {
            Title: firstWord,
            List: tempArr,
          };
        } else {
          //这里循环到这表示已经第二个字母了
          firstWord = v[keyword].charAt(0); //设置第二字母
          tempArr = []; //把之前的清除掉
          tempArr.push(v); //添加第一个
          newArr1[++k] = {
            //自增
            Title: firstWord,
            List: tempArr,
          };
        }
      });
      // console.log("newArr1", newArr1);
      this.allcity = newArr1;
    },
  },
};
</script>
<style lang="less" scoped>
.citys {
  position: fixed;
  top: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: auto;

  /deep/.navi {
    .van-nav-bar__title {
      color: #fff;
    }

    .van-nav-bar__left {
      background: rgba(0, 0, 0, 0);
    }
  }

  /deep/.van-index-anchor {
    color: rgb(185, 185, 185);
  }

  /deep/.van-index-anchor--sticky {
    background-color: rgb(25 24 87);
    color: #9a1f1f;
  }

  .cellbox {
    overflow: hidden;
    border-bottom: 1px solid #6a6a97;
  }
}

.van-cell {
  background-color: rgba(0, 0, 0, 0);
  overflow: hidden;
  width: 25%;
  float: left;

  .van-cell__value {
    text-align: center;
    color: #fff;
  }

  &::after {
    border-bottom: none;
  }
}

.van-index-anchor {
  width: 100%;
}
</style>