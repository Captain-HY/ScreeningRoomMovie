<template>
    <div class="result">
        <Navi title="搜索结果" :fixed="true" />
        <div class="content">


            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="item" v-for="(item, index) in resultData" :key="index">
                    <van-image fit="cover" radius="10px" width="3rem" height="4rem" :src="item.poster || item.img"
                        @click="toDetail(item.id)" />
                    <div class="info">
                        <p class="name">
                            {{ item.name || item.nm }}
                        </p>
                        <p class="nname">
                            {{ item.ename || item.enm }}
                        </p>
                        <p class="cate">
                            {{ item.catogary }}
                        </p>
                        <p class="stars" v-show="item.score">
                            {{ item.score }}分
                        </p>
                        <p class="times">
                            {{ item.release || item.rt }}
                        </p>
                        <p class="wish" v-show="item.wish">
                            {{ item.wish }}人想看
                        </p>
                    </div>
                </div>
            </van-list>

        </div>
    </div>
</template>
<script>
import Navi from "../components/Navi.vue";
export default {
    name: 'Result',
    data() {
        return {
            keyword: '',
            ci: 1,
            offset: 0,
            resultData: [],
            loading: false,
            finished: false,


        }
    },
    computed: {
        city() {
            this.ci = this.$store.state.ci
            return this.$store.state.ci
        }
    },
    components: {
        Navi,
    },
    created() {
        this.keyword = this.$route.params.val
    },
    methods: {
        onLoad() {
            this.loading = true
            setTimeout(() => {

                this.axios({
                    method: 'get',
                    url: '/search/movies?keyword=' + this.keyword + '&ci=' + this.ci + '&offset=' + this.offset,

                }).then((result) => {
                    // console.log(result)
                    if (result.status === 200) {
                        // console.log(result.data.movies)
                        if (!result.data.movies) {
                            result.data.forEach(e => {
                                this.resultData.push(e)
                            })
                            this.offset += 20;

                        } else {
                            result.data.movies.forEach(e => {
                                this.resultData.push(e)
                            })
                            this.offset += 20;

                        }
                        // 加载状态结束
                        this.loading = false;

                        // 数据全部加载完成
                        if (this.resultData.length < this.offset) {
                            this.finished = true;
                        }
                    }

                }).catch(err => {
                    // console.log(err)
                })


            }, 1000);
        },

        toDetail(id) {
            // console.log(id)
            this.$router.push({ name: "Detail", params: { id } });
        },
    }


}
</script>
<style lang="less" scoped>
.result {
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

    .content {
        width: 90%;
        margin-left: 5%;

        .item {
            margin-top: 20px;
            width: 100%;
            height: 150px;
            background-color: rgba(158, 157, 157, 0.1);
            border-radius: 10px;
            position: relative;

            .van-image {
                position: absolute;
                top: -10px;
                left: 20px;
            }

            .info {
                width: 50%;
                position: absolute;
                left: 42%;
                top: 0;

                P {
                    margin: 5px 0;
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    -o-text-overflow: ellipsis;
                }

                .name {
                    font-size: 16px;
                    margin: 10px 0;
                    font-weight: 800;
                }

                .stars,
                .wish {
                    color: #c84949;
                }
            }
        }
    }
}
</style>