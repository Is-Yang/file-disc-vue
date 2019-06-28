<template>
    <div class="user-index">
        <h2 class="txt-center">个人信息</h2>
        <van-cell-group class="user-info">
            <van-field
                :value="companyName"
                label="公司名"
                disabled
            />
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
        <van-button type="primary" class="logout" plain @click="logout">退出登陆</van-button>
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
            this.companyName = userInfo.companyName;
            this.username = userInfo.users.userName;
            this.mobile = userInfo.users.phone;
            this.userId = userInfo.users.userId;
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('userInfo');
            this.$router.push('/login')
        },
        updateUsers(){
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/updateUsers.do', {
                data: {
                    userName: this.username,
                    userId: this.userId,
                    phone: this.mobile
                },
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg == 'ERROR' && res.data) {
                        this.$toast(res.data);
                    } else {
                        this.$toast('修改成功');
                    }
                    this.$set(this, 'inputUserName', false);
                    this.$set(this, 'inputMobile', false);
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

    .logout {
        width: 100%;
        margin-top: 10%;
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