<template>
    <div class="home-wrapper">
        <van-search placeholder="可查询文件名" v-model="search" background="#f5f5f9" />
        <div class="main">
            <van-row type="flex" justify="space-between" align="center">
                <van-col>嘻嘻嘻嘻嘻嘻</van-col>
                <van-col class="opt-btn">
                    <a href="javascript:;">更换</a>
                    <a href="javascript:;">授权</a>
                </van-col>
            </van-row>
            
            <van-list class="list-wrap" >
                <van-cell>
                    <van-row type="flex" @click.native="link(item.num_iid)">
                        <van-col class="left-full">
                           
                        </van-col>
                        <van-col class="right-full">
                            
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>
        <Footer />
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataLoading: false,
            finished: false,
            finishedText: '暂无数据',
            search: ''
        }
    },
    methods: {
        onLoad(params = {}) {
            
        }
    }
}
</script>

<style lang="less">
    .home-wrapper {
        @fontColor: #0079f3;
        .van-search .van-cell {
            background-color: #fff;
        }
        .main {
            padding-left: 1rem;
            background-color: #fff;
            font-size: 1.4rem;

            .opt-btn {
                a {
                    padding: 1rem;
                    color: @fontColor;
                }
            }
        }
    }
</style>

