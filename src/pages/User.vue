<template>
    <div class="user-index">
        <h2 class="txt-center">个人信息</h2>
        <van-cell-group class="user-info">
            <van-cell v-if="!inputUserName" title="用户名" v-model="username" is-link @click="inputUserName = true" />
            <van-field v-if="inputUserName"
                v-model="username"
                label="用户名">
                <a href="javascript:;" slot="button" @click="updateUsers">保存</a>
            </van-field>

            <van-cell v-if="!inputMobile" title="手机号" v-model="mobile" is-link @click="inputMobile = true" />
             <van-field v-if="inputMobile"
                v-model="mobile"
                label="手机号">
                <a href="javascript:;" slot="button" @click="updateUsers">保存</a>
            </van-field>
        </van-cell-group>
        <p class="copyright">copyright 返晨</p>
        <Footer />
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            mobile: '',
            userId: '',
            inputUserName: false,
            inputMobile: false,
        }
    },
    created () {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            this.username = userInfo.userName;
            this.mobile = userInfo.phone;
            this.userId = userInfo.userId;
        }
    },
    methods: {
        updateUsers(){
            $.ajax(this.$host.http_api + '/tmyq-web/fcCommon/searchFile.do', {
                data: {
                    userName: this.username,
                    userId: this.userId,
                    phone: this.mobile
                },
                crossDomain: true,
                success: ((res) => {
                    if (res.msg == 'ERROR' && res.data) {
                        this.$toast(res.data);
                    } else {
                        this.$toast('修改成功');
                    }
                    this.inputUserName = false;
                    this.inputMobile = false;
                })
            })
        }
    }
}
</script>

<style lang="less">
.user-index {
    padding: 15% 1rem;

    .photo {
        width: 5rem;
        height: 5rem;
        border: 1px solid #ccc;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1rem;
        line-height: 5rem;
        font-size: 4rem;
        text-align: center;
    }

    .user-info {
        margin-top: 3rem;

        &::after {
            border: none;
        }
        a {
            color: #0079f3;
        }
    }

    .copyright {
        position: absolute;
        bottom: 80px;
        text-align: center;
        left: 0;
        right: 0;
        z-index: 1;
    }
}
</style>