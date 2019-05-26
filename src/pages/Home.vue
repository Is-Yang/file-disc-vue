<template>
    <div class="home-wrapper">
        <van-search placeholder="可查询文件名" v-model="search" background="#f5f5f9" />
        <div class="main" v-if="false">
            <van-row type="flex" justify="space-between" align="center">
                <van-col>嘻嘻嘻嘻嘻嘻</van-col>
                <van-col class="opt-btn">
                    <a href="javascript:;">更换</a>
                    <a href="javascript:;">授权</a>
                </van-col>
            </van-row>
            
            <van-list class="list-wrap">
                <van-cell>
                    <van-row type="flex" justify="space-between" @click.native="link(item.num_iid)">
                        <van-col class="flex">
                           <van-icon name="file" />
                           <span>我问问</span>
                        </van-col>
                        <van-col class="right-full">
                            <a href="javascript:;">授权</a>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>

        <div class="main" v-if="true">
            <van-row type="flex" align="center" class="bread">
                <van-col>公司</van-col>
                <van-col>文件名</van-col>
            </van-row>
            
            <van-list class="list-wrap">
                <div class="flex padding-10">
                    <van-icon name="pdf" />
                    <span>PNG文件</span>
                </div>
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
        .van-icon {
            width: 2rem;
            height: 2rem;
            background-size: contain;
            background-repeat: no-repeat;
            vertical-align: middle;
            display: inline-block;
            margin-right: 1rem;
        }
        .van-icon-file {
            background-image: url("../assets/image/icon_file.png");
        }
        .van-icon-png {
            // background-image: url("../assets/image/icon_png.png");
        }
        .van-icon-pdf {
            background-image: url("../assets/image/icon_pdf.png");
        }
        .van-icon-word {
            background-image: url("../assets/image/icon_word.png");
        }
        .bread {
            padding: 1rem;
            
            .van-col {
                font-size: 1.4rem;
                &::before {
                    content: "/";
                }

                &:first-child {
                    &::before {
                        content: "";
                    }
                }
            }
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

