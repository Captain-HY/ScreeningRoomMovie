<template>
  <div class="detail">
    <Navi :fixed="true" />
    <!-- 电影图片 -->
    <!-- <div class="movie-top">
      <van-image
        v-show="movieInfo.img"
        fit="cover"
        width="100%"
        height="100%"
        :src="movieInfo.img"
      />
    </div> -->
    <div class="movie-bg">
      <van-image v-show="movieInfo.img" fit="cover" width="100%" height="100%" :src="movieInfo.img" />
    </div>

    <!-- 基本信息 -->
    <div class="info">
      <!-- 电影名称 -->
      <h2>{{ movieInfo.nm }}</h2>
      <!-- 电影标签 -->
      <p class="tips">
        <span v-show="movieInfo.src">{{ movieInfo.src }} / </span>
        <span v-show="movieInfo.episodeDur">{{ movieInfo.episodeDur }}分钟 /
        </span>
        <span v-show="movieInfo.cat">{{ movieInfo.cat }}</span>
      </p>
      <!-- 上映时间 -->
      <span class="uptime">{{ movieInfo.pubDesc }}</span>
      <!-- 影片类型例如 IMAX 3D -->
      <p>
        <span class="ver" v-for="(vi, index) in movieInfo.ver" :key="index">{{
            vi
        }}</span>
      </p>
      <div class="rank">
        <!-- 评分 -->
        <div class="ranks" v-show="movieInfo.sc">
          <p class="peo">{{ movieInfo.sc }}</p>
          <span class="tis">综合评分</span>
        </div>
        <!-- 观看人数 -->
        <div class="ranks" v-show="movieInfo.watched != 0">
          <p class="peo">{{ movieInfo.watched }}</p>
          <span class="tis">人已看</span>
        </div>
        <div class="ranks" v-show="(movieInfo.wish = 0)">
          <p class="peo">{{ movieInfo.wish }}</p>
          <span class="tis">人想看</span>
        </div>
        <!-- 评分人数 -->
        <div class="ranks" v-show="movieInfo.snum">
          <p class="peo">{{ movieInfo.snum }}</p>
          <span class="tis">人评分</span>
        </div>
      </div>

      <!-- 剧情简介 -->
      <div class="dras">
        <p class="tit">剧情简介</p>
        <div class="dra">{{ movieInfo.dra }}</div>
      </div>
    </div>
    <!-- 演职人员 -->
    <div class="acter">
      <div class="tits">
        <p class="tit">演职人员</p>
      </div>
      <div class="allacter">
        <div class="acterbox" :style="{ width: actor.length * 111 + 'px' }">
          <div class="acter-item" v-for="(item, index) in actor" :key="index">
            <van-image v-show="item.avatar" round fit="cover" width="1.5rem" height="1.5rem" :src="item.avatar" />
            <p class="name">
              {{ item.cnm }}
            </p>
            <span class="work">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 预告/剧照 -->
    <div class="vap" v-show="vap.length > 0">
      <div class="tits">
        <p class="tit">视频/剧照</p>
        <div class="allvap">
          <div class="vapbox" :style="{
            width: (vap.length + (movieInfo.videourl ? 1 : 0)) * 230 + 'px',
          }">
            <div class="videos" v-show="movieInfo.videourl">
              <video :src="movieInfo.videourl" :poster="movieInfo.videoImg" ref="myVideo"></video>
              <van-icon v-show="isplay" class="play" name="play-circle" @click="playV" color="#c84949" size="25px" />
              <van-icon v-show="!isplay" class="pause" name="pause-circle" @click="pauseV" color="#c84949"
                size="25px" />
            </div>
            <div class="vap-item" v-for="(item, index) in vap" :key="index">
              <van-image v-show="item" fit="cover" width="100%" height="100%" :src="vap[index]" @click="imgin(vap)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 热门评论 -->
    <div class="allfile" v-show="file != 0">
      <div class="tits">
        <p class="tit">热门评论</p>
      </div>
      <div class="file">
        <div class="file-item" v-for="(item, index) in file" v-show="index < 5" :key="index">
          <div class="file-head">
            <van-image v-show="item" round fit="cover" :src="item.avatarUrl" />
            <div class="nt">
              <p class="nickname">{{ item.nick }}</p>
              <span class="filetime">{{ item.time }}</span>
            </div>
            <div class="right">
              <span class="upcount">
                <van-icon name="good-job-o" /> {{ item.upCount }}
              </span>
            </div>
          </div>
          <p class="fileR">{{ item.content }}</p>
        </div>
      </div>
    </div>
    <!-- 购票按钮 -->
    <van-button v-show="Sale" class="buy" round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="toCinema">
      购票
    </van-button>
    <!-- 图片预览 -->
    <van-image-preview v-model="show" :images="vap" @change="onChange">
    </van-image-preview>
  </div>
</template>

<script>
import Navi from "../components/Navi.vue";
export default {
  name: "Detail",
  data() {
    return {
      movieId: "",
      Sale: false, //是否出售
      show: false,
      index: 0,
      count: 0,
      movieInfo: [], //电影详情
      actor: [], //演职人员
      vap: [], //视频和剧照
      file: [], //热门评论
      images: [], //图片展示
      isplay: true, // 视频播放状态
    };
  },
  components: {
    Navi,
  },
  created() {
    this.movieId = this.$route.params.id;
    this.getMovieDetail(this.movieId);
  },
  mounted() {
    this.$refs.myVideo.addEventListener("play", this.playV);
    this.$refs.myVideo.addEventListener("pause", this.pauseV);
  },
  methods: {
    toCinema() { this.$router.push({ name: "Cinema" }); },
    playV() {
      this.$refs.myVideo.play();
      this.$refs.myVideo.webkitRequestFullScreen();
      this.isplay = false;
    },
    pauseV() {
      this.$refs.myVideo.pause();

      this.isplay = true;
      0;
    },

    getMovieDetail(movieId) {
      this.axios({
        method: "get",
        url: "/movie/detail?",
        params: {
          movieId,
        },
      }).then((result) => {
        if (result.status == "200") {
          this.movieInfo = result.data.movie;
          this.images = this.movieInfo.img;
          this.actor = result.data.celebrities;
          this.vap = this.movieInfo.photos;
          this.file = result.data.comments.hotComments;
          this.Sale = this.movieInfo.onSale;
          // console.log("Sale", this.Sale);
          this.actor.forEach((e, i) => {
            e.avatar = this.actor[i].avatar.replace("w.h", "200.200");
          });

          this.vap.forEach((e, i) => {
            this.vap[i] = e.replace("w.h", "200.100");
          });
          this.file.forEach((element, index) => {
            element.time = this.timestampToTime(element.time);
          });
          if (this.movieInfo.cat) {
            this.movieInfo.cat = this.movieInfo.cat.split(",").join(" / ");
          }
          if (this.movieInfo.ver) {
            //   let ver =  []
            this.movieInfo.ver = this.movieInfo.ver.split("/");
            //   console.log("ver",this.movieInfo.ver)
          }
          if (this.movieInfo.watched > 9999) {
            this.movieInfo.watched =
              Math.floor(this.movieInfo.watched / 1000) / 10 + "万";
          }
          if (this.movieInfo.wish > 9999) {
            this.movieInfo.wish =
              Math.floor(this.movieInfo.wish / 1000) / 10 + "万";
          }
          if (this.movieInfo.snum > 9999) {
            this.movieInfo.snum =
              Math.floor(this.movieInfo.snum / 1000) / 10 + "万";
          }
        }
      });
    },
    imgin(vap) {
      this.images = [];
      vap.forEach((element) => {
        this.images.push(element);
      });
      this.show = true;
      //   console.log(this.images);
    },
    onChange(index) {
      this.index = index;
    },
    timestampToTime(timestamp) {
      timestamp = timestamp ? timestamp : null;
      let date = new Date(timestamp);
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      // let h =
      //   (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      // let m =
      //   (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      //   ":";
      // let s =
      //   date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D;
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  position: fixed;
  top: 24px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow-y: auto;
  padding-bottom: 30px;

  .movie-top {
    width: 100%;
    height: 250px;
  }

  .info {
    text-align: center;

    h2 {
      margin-top: 10px;
    }

    .tips,
    .uptime {
      color: rgb(168, 168, 168);
    }

    .ver {
      border: 1px solid rgb(113, 113, 113);
      padding: 2px;
      border-radius: 3px;
      color: rgb(114, 114, 114);
      margin-right: 3px;

      &:last-child {
        margin-right: 0;
      }
    }

    .rank {
      display: flex;
      margin: 35px 0;

      .ranks {
        float: left;
        flex: 1;
        align-content: center;
        border-right: 2px solid rgba(111, 111, 111, 0.2);

        &:last-child {
          border-right: none;
        }
      }

      .peo {
        font-size: 22px;
        margin: 0;
      }

      .tis {
        color: rgb(168, 168, 168);
      }
    }

    .dras {
      margin: 0 5%;
      width: 90%;
      border-top: 1px solid rgba(111, 111, 111, 0.2);

      .tit {
        color: rgb(114, 114, 114);
        font-size: 14px;
        float: left;
      }

      .dra {
        width: 100%;
        // margin: 0 5%;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;

        color: rgb(207, 207, 207);
        line-height: 22px;
      }
    }
  }

  .acter {
    width: 90%;
    margin: 20px 5%;
    overflow: hidden;
    border-top: 1px solid rgba(111, 111, 111, 0.2);

    .tits {
      margin: 5px 0;

      .tit {
        color: rgb(114, 114, 114);
        font-size: 14px;
      }
    }

    .allacter {
      width: 100%;
      height: 110px;
      overflow-x: auto;

      .acterbox {
        width: 1000px;

        .acter-item {
          width: 100px;
          height: 100px;
          float: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          .van-image {
            border: 3px solid rgb(129, 129, 129);
          }

          .name {
            margin: 10px 0 5px 0;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }

          .work {
            color: rgb(129, 129, 129);
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }
  }

  .vap {
    width: 90%;
    margin: 20px 5%;
    overflow: hidden;
    border-top: 1px solid rgba(111, 111, 111, 0.2);

    .tits {
      margin: 5px 0;

      .tit {
        color: rgb(114, 114, 114);
        font-size: 14px;
      }
    }

    .allvap {
      width: 100%;
      height: 110px;
      overflow-x: auto;

      .vapbox {
        width: 100%;

        .videos {
          width: 180px;
          height: 90px;
          float: left;
          overflow: hidden;
          position: relative;

          video {
            display: block;
            width: 100%;
            height: 100%;
            float: left;
          }

          /deep/.van-icon {
            position: absolute;
            width: 25px;
            height: 25px;
            top: 45%;
            left: 45%;
            opacity: 0.85;

            &.pause {
              opacity: 0;
              transition: all 0.4s;
            }
          }

          &:hover {
            .pause {
              opacity: 0.85;
            }
          }
        }

        .vap-item {
          width: 200px;
          height: 100px;
          float: left;
          margin-left: 5px;
        }
      }
    }
  }

  .allfile {
    width: 90%;
    margin: 20px 5%;
    overflow: hidden;
    border-top: 1px solid rgba(111, 111, 111, 0.2);

    .tits {
      margin: 5px 0;

      .tit {
        color: rgb(114, 114, 114);
        font-size: 14px;
      }
    }

    .file {
      .file-item {
        .file-head {
          width: 100%;
          overflow: hidden;

          .van-image {
            width: 40px;
            height: 40px;
            float: left;
          }

          .nt {
            float: left;
            display: flex;
            flex-direction: column;
            padding-left: 10px;
            width: 150px;
            overflow: hidden;

            .nickname {
              float: left;
              font-size: 14px;
              line-height: 26px;
              margin: 0;
            }

            .filetime {
              float: left;
              color: rgb(114, 114, 114);
            }
          }

          .right {
            overflow: hidden;
            float: right;
            font-size: 14px;

            line-height: 40px;
          }
        }

        .fileR {
          margin-top: 5px;
          font-size: 14px;
          color: rgb(210, 210, 210);
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 5;
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  .buy {
    position: fixed;
    bottom: 5px;
    left: 10%;
    width: 80%;
    height: 40px;
  }
}
</style>