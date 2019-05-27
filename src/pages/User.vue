<template>
    <div class="user-index">
        <div class="flex flex-align-center">
            <img src="" class="photo"/>
            <span>王先生</span>
        </div>
        <van-cell-group class="user-info">
            <van-field
                v-model="mobile"
                label="手机号"
            >
                <a href="javascript:;" slot="button">修改</a>
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
            mobile: ''
        }
    }
}
</script>

<style lang="less">
body {
    background-color: #fff !important;
}
.user-index {
    padding: 20% 2rem;

    .photo {
        width: 5rem;
        height: 5rem;
        border: 1px solid #eee;
        display: inline-block;
        border-radius: 50%;
        margin-right: 1rem;
    }

    .user-info {
        border-bottom: 1px solid #e8e8e8;
        margin-top: 3rem;

        &::after {
            border: none;
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