<template>
    <div class="cinema">
        <van-dropdown-menu active-color="red">
            <van-dropdown-item :title="title1" ref="item">
                <van-tree-select :items="items1" :active-id.sync="activeId1" :main-active-index.sync="activeIndex1"  v-show="items1"
                    @click-nav="doi(items1, activeIndex1)" @click-item="doit" />
            </van-dropdown-item>

            <van-dropdown-item title="品牌" v-model="value1" :options="items2" @change="radios2(value1)" />

            <van-dropdown-item class="items3" :title="title3" ref="item">
                <p class="title">特色功能</p>

                <van-radio-group v-model="radio1" direction="horizontal">
                    <van-radio checked-color="red" :name="index" shape="square" v-for="(item, index) in items3"
                        :key="index" @click="radios4(item)">
                        {{ item.name }}</van-radio>
                </van-radio-group>

                <p class="title">影厅类型</p>

                <van-radio-group v-model="radio2" direction="horizontal">
                    <van-radio checked-color="red" :name="index" shape="square" v-for="(item, index) in items4"
                        :key="index" @click="radios3(item)">
                        {{ item.name }}</van-radio>
                </van-radio-group>
                <div style="padding: 5px 16px;">
                    <van-button type="danger" block round @click="onConfirm">
                        确认
                    </van-button>
                </div>
            </van-dropdown-item>
        </van-dropdown-menu>

        <div class="cinemas">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"
                :immediate-check="false" v-show="changeData">
                <van-cell inset v-for="(item, index) in changeData" :key="index" :title="item.title" @click="toDetail(item.cinemaId)"
                    :value="item.price.n + item.price.q">
                    <template #label>
                        <p>{{ item.location }}</p>
                        <van-tag plain
                            :type="ite.code == 'allowRefund' ? 'success' : ite.code == 'endorse' ? 'success' : ite.code == 'snack' ? 'warning' : ite.code == 'vipTag' ? 'warning' : 'primary '"
                            v-for="(ite, inde) in item.services" :key="inde">{{ ite.text }}</van-tag>
                    </template>
                </van-cell>
            </van-list>
            <div class="" v-show="changeData.length < 1">
                暂无结果
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Cinema',
    data() {
        return {
            ci: 1,
            value1: 1,
            value2: 'a',
            title1: '商圈',
            title2: '品牌',
            title3: '服务',
            items1: [],
            items2: [],
            items3: [],
            items4: [],
            activeId1: 1,
            activeIndex1: 0,
            time: '',
            activeId2: 1,
            activeIndex2: 0,
            hallType: -1,
            brandId: -1,
            serviceId: -1,
            radio1: 0,
            radio2: 0,
            districtId: -1,
            changeData: [],
            offset: 0,
            loading: false,
            finished: false,
            areaId: -1,
        }
    },
    computed: {
        city() {
            this.ci = this.$store.state.ci.id
            return this.$store.state.ci
        }

    },
    created() {
        this.ci = this.$store.state.ci.id
        this.getCinemaData()
        this.gettime()
        this.getCinemasData()

    },
    methods: {
        radios1(e) {
            this.serviceId = e.id
        },
        radios2(e) {
            // console.log(e)
            this.brandId = e
            this.getCinemasData()
        },
        radios3(e) {
            this.hallType = e.id
        },
        radios4(e) {
            this.serviceId = e.id
        },
        onConfirm() {
            this.getCinemasData()
        },
        gettime() {
            var timestamp = new Date().getTime();
            var time = new Date(timestamp);
            var y = time.getFullYear();
            var m = time.getMonth() + 1;
            var d = time.getDate();
            this.time = y + "-" + m + "-" + d;
        },
        doi(data, index) {
            // console.log(data,index)
            let dataindex = data[index]
            // console.log(dataindex)
            this.districtId = dataindex.id
            if (this.districtId == '-1') {
                this.areaId = '-1'
            }
            this.getCinemasData()
        },
        doit(data) {
            // console.log('data', data)
            this.areaId = data.id


            this.getCinemasData()
        },

        getCinemaData() {
            this.axios({
                method: 'get',
                url: '/index/filterCinemas?ci=' + this.ci,
            }).then((result) => {

                if (result.status === 200) {
                    // console.log(result.data)
                    this.items1 = result.data.district.subItems
                    this.items2 = result.data.brand.subItems
                    this.items3 = result.data.service.subItems
                    this.items4 = result.data.hallType.subItems
                    // console.log(this.items3)
                    this.items1.forEach(element => {
                        element.text = element.name + ' (' + element.count + ')'
                        element.children = element.subItems
                        element.children.forEach(e => {
                            e.text = e.name + ' (' + e.count + ')'
                        })
                    });

                    this.items2.forEach(element => {
                        element.text = element.name + ' (' + element.count + ')'
                        element.value = element.id

                    });
                }
            })
        },
        getCinemasData() {
            this.axios({
                method: 'get',
                url: '/index/moreCinemas?day=' + this.time + '&offset=' + this.offset + '&limit=20&districtId=' + this.districtId + '&lineId=-1&hallType=' + this.hallType + '&brandId=' + this.brandId + '&serviceId=' + this.serviceId + '&areaId=' + this.areaId + '&stationId=-1&item&updateShowDay=true&reqId=1636710166221&cityId=' + this.ci
            }).then(result => {
                // console.log(result)
                if (result.status === 200) {
                    this.changeData = result.data
                    // console.log(result)
                }
            })
        },
        onLoad() {
            this.offset += 20
            this.axios({
                method: 'get',
                url: '/index/moreCinemas?day=' + this.time + '&offset=' + this.offset + '&limit=20&districtId=' + this.districtId + '&lineId=-1&hallType=' + this.hallType + '&brandId=' + this.brandId + '&serviceId=' + this.serviceId + '&areaId=' + this.areaId + '&stationId=-1&item&updateShowDay=true&reqId=1636710166221&cityId=' + this.ci
            }).then(result => {

                if (result.status === 200) {

                    // console.log(result)
                    result.data.forEach(ele => {
                        this.changeData.push(ele)
                    })
                    // console.log(this.changeData)


                }


            })
            if (this.changeData.length <= this.offset) {
                this.loading = false;

                this.finished = true;

            }
        },
        toDetail(cinemaId) {
            // console.log(id)
            this.$router.push({ name: "Show", params: { cinemaId } });
        },
    }
}
</script>
<style lang="less" scoped>
.cinema {
    position: fixed;
    top: 24px;
    left: 0;
    right: 0;
    bottom: 50px;
    overflow-y: auto;

    .van-ellipsis {
        color: #000;
    }

    .van-tree-select__item--active {
        color: red;
    }

    .items3 {

        /deep/.van-popup {
            width: 90%;
            padding: 0 5%;

            p {
                color: #000;
                overflow: hidden;
                width: 100%;
            }

            .van-radio-group {
                overflow: hidden;
            }

            .van-radio {
                // float: left;
                margin: 0 10px 5px 0;
            }

        }
    }

    .cinemas {
        width: 100%;
        height: 500px;
        background: #fff;
        color: #000;

        .van-list {
            .van-cell {
                .van-cell__title {
                    flex: 4;

                    .van-cell__label {
                        .van-tag {
                            margin-right: 5px;
                            margin-bottom: 5px;
                        }
                    }
                }

                .van-cell__value {
                    color: #f03d37;
                }
            }
        }
    }
}
</style>