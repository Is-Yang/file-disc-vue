<template>
    <div class="home-wrapper">
        <van-search placeholder="可查询文件名" v-model="search" background="#f5f5f9" @search="searchFile"/>
        <div class="main" v-if="!folder">
            <van-row type="flex" justify="space-between" align="center">
                <van-col>嘻嘻嘻嘻嘻嘻</van-col>
                <van-col class="opt-btn">
                    <a href="javascript:;">更换</a>
                    <a href="javascript:;">授权</a>
                </van-col>
            </van-row>

            <van-list class="list-wrap">
                <van-cell v-for="(item, index) in fileList" :key="index">
                    <van-row type="flex" justify="space-between" @click.native="linkFolder(item.folderId, item.fileName)">
                        <van-col class="flex">
                           <van-icon name="file" class="van-icon-set" />
                           <span>{{item.fileName}}</span>
                        </van-col>
                        <van-col>
                            <a href="javascript:;">授权</a>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>

        <div class="main" v-if="folder">
            <van-row type="flex" align="center" class="bread">
                <van-col @click="parentFile">公司</van-col>
                <van-col>文件名</van-col>
            </van-row>
            
            <van-list class="list-wrap">
                <van-cell class="flex" v-for="(item, index) in folderList" :key="index">
                    <van-icon name="pdf" class="van-icon-set" />
                    <span>{{item.fileName}}</span>
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
            search: '',
            fileList: [],
            folder: false,
            folderList: []
        }
    },
    created () {
        this.getList();  
    },
    methods: {
        // 查询当前用户有权限的所有文件夹
        getList() {
            let res = {
                "ret": 1,
                "data": [
                    {
                        "fileId": 2,
                        "fileName": "李四",
                        "folderId": "2",
                        "fileUrl": "222",
                        "dateCreate": null
                    },
                    {
                        "fileId": 1,
                        "fileName": "张三",
                        "folderId": "1",
                        "fileUrl": "111",
                        "dateCreate": null
                    }
                ],
                "msg": "SUCCESS"
            }
            // $.ajax(this.$host.http_api + '/tmyq-web/fcCommon/searchFolder.do', {
            //     crossDomain: true,
            //     success: ((res) => {
                    this.fileList = res.data;
            //     })
            // })
        },
        searchFile() {
            $.ajax(this.$host.http_api + '/tmyq-web/fcCommon/searchFile.do', {
                data: {
                    fileName: this.search
                },
                crossDomain: true,
                success: ((res) => {
                    console.log(res);
                })
            })
        },
        linkFolder(folderId, fileName) {
            $.ajax(this.$host.http_api + '/tmyq-web/fcCommon/searchFolderFile.do', {
                data: {
                    folderId: folderId
                },
                crossDomain: true,
                success: ((res) => {
                    let data = {
                        "ret": 1,
                        "data": [
                            {
                                "fileId": 1,
                                "fileName": "张三",
                                "folderId": "1",
                                "fileUrl": "111",
                                "dateCreate": null
                            }
                        ],
                        "msg": "SUCCESS"
                    }
                    this.folderList = data.data;
                    this.folder = true;
                    console.log(res);
                })
            })
        },
        // 父级文件
        parentFile() {

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

