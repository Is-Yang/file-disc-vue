<template>
    <div class="login-wrapper">
        <div class="position-center">
            <h2 class="title">请先绑定你的手机</h2>
            <van-cell-group>
                <van-field
                    v-model="mobile"
                    clearable
                    label="手机号"
                    placeholder="请输入手机号"
                />
                <van-field
                    v-model="code"
                    center
                    clearable
                    label="验证码"
                    placeholder="请输入短信验证码">
                    <van-button slot="button" size="small" type="primary">获取验证码</van-button>
                </van-field>
            </van-cell-group>
            <van-button type="primary" class="ensure">确定</van-button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            mobile: '',
            code: ''
        }
    }
}
</script>


<style lang="less" scoped>
    .login-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9;
        background-color: #fff;

        .title {
            margin-bottom: 15%;
        }

        .ensure {
            width: 80%;
            margin-top: 10%;
        }

        .position-center {
            width: 100%;
            position: absolute;
            top: 30%;
            transform: translateY(-30%);
            z-index: 9;
            text-align: center;
        }
    }
</style>
