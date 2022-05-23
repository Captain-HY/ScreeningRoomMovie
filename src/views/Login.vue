<template>
    <div class="login">
        <Navi title="登录注册" :fixed="true" />

        <div class="isLogin" v-show="isOpenLogin">
            <van-form @submit="login">
                <van-field v-model="loginUserInfo.phone" name="phone" placeholder="手机号码"
                    :rules="[{ validator, message: '请填写手机号码' }]" />
                <van-field v-model="loginUserInfo.password" type="password" name="password" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
                <div style="margin: 16px;">
                    <van-button round block color="linear-gradient(to right, #c84949, #9a1f1f)" type="info"
                        native-type="submit">登录</van-button>
                </div>
            </van-form>
            <van-button class="res" round color="linear-gradient(to right, #4158D0, #C850C0)" @click="tores">注册
            </van-button>
        </div>
        <div class="isRegister" v-show="!isOpenLogin">
            <van-form @submit="register">
                <van-field v-model="registerUserInfo.username" name="用户名" placeholder="用户名"
                    :rules="[{ pattern, message: '请填写正确的用户名' }]" />
                <van-field v-model="registerUserInfo.phone" name="phone" placeholder="手机号码"
                    :rules="[{ validator, message: '请填写正确的手机号码' }]" />
                <van-field v-model="registerUserInfo.password" type="password" name="password" placeholder="密码"
                    :rules="[{ required: true, message: '请填写正确的密码' }]" />
                <div style="margin: 16px;">
                    <van-button round block color="linear-gradient(to right, #c84949, #9a1f1f)" type="info"
                        native-type="submit">注册</van-button>
                </div>
            </van-form>
        </div>

    </div>
</template>

<script>
import Navi from "../components/Navi.vue";
import { Toast } from "vant";
export default {
    name: "Login",
    data() {
        return {
            loginUserInfo: {
                phone: "",
                password: "",
            },
            registerUserInfo: {
                phone: "",
                password: "",
                nickName: "",
            },
            pattern: /^([a-zA-Z0-9_\u4e00-\u9fa5]{3,16})$/,
            //查看登录/注册
            isOpenLogin: true,

        };
    },
    components: {
        Navi,
    },
    methods: {
        login() {
            let lastUserInfo = JSON.parse(localStorage.getItem("saveUserInfo"));

            if (this.loginUserInfo.phone != lastUserInfo.phone) {
                Toast.fail("请正确填写手机号");
                return;
            } else if (this.loginUserInfo.password != lastUserInfo.password) {
                Toast.fail("请正确填写密码");
                return;
            } else {
                setTimeout(() => {
                    this.$store.commit('Logining', true)
                    this.$router.back();

                }, 1000);
            }
        },
        register() {
            // console.log('submit', values);
            let userInfo = {
                phone: this.registerUserInfo.phone,
                password: this.registerUserInfo.password,
                nickname: this.registerUserInfo.username,
            };
            localStorage.setItem("saveUserInfo", JSON.stringify(userInfo));
            Toast.success("注册成功");
            this.isOpenLogin = !this.isOpenLogin;
        },
        validator(val) {
            return /^1([38][0-9]|5[0-35-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(val);
        },
        tores() {
            this.isOpenLogin = false;
        },

    }
};
</script>

<style lang="less" scoped>
.login {
    position: fixed;
    top: 24px;
    left: 0;
    bottom: 0;
    right: 0;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 600px;
        height: 300px;
        background: transparent url(../assets/loginbg.jpg) center center no-repeat;
        filter: blur(8px);
        z-index: -1;
        background-size: cover;
    }

    /deep/.navi {
        width: 100%;
        height: 46px;
        overflow: hidden;

        .van-nav-bar__title {
            color: #fff;
        }

        .van-nav-bar__left {
            background: rgba(0, 0, 0, 0);
        }
    }

    .isLogin {
        display: flex;
        overflow: hidden;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;

        .van-cell {
            background-color: rgba(255, 255, 255, 0);
            margin-bottom: 50px;

            /deep/.van-field__control {
                color: #fff;
            }
        }

        .res {
            width: 50%;
            margin-left: 25%;
        }
    }

    .isRegister {
        display: flex;
        overflow: hidden;
        width: 100%;
        height: 100%;
        flex-direction: column;
        justify-content: space-around;

        .van-cell {
            background-color: rgba(255, 255, 255, 0);
            margin-bottom: 50px;

            /deep/.van-field__control {
                color: #fff;
            }
        }

        .res {
            width: 50%;
            margin-left: 25%;
        }
    }

}
</style>