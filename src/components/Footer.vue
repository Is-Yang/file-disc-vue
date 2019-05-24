<template>
    <van-tabbar v-model="current" active-color="#07c160">
        <van-tabbar-item icon="wap-home" :to="{ path: '/home' }">查看报告</van-tabbar-item>
        <van-tabbar-item icon="underway-o" :to="{ path: '/user'}">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    data() {
        return {
            current: 0,
        }
    },
    watch:{
        "$route" (to,from){
           this.init();
        }
    },
    created () {
       this.init();
    },
    methods: {
        init() {
            if (this.$route) {
                this.current = this.$route.path == '/home' ? 0 : 1
            }
        }
    }
}
</script>

