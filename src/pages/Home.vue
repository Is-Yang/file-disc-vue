<template>
    <div class="home-wrapper">
        <van-search v-if="file" placeholder="可查询文件名" v-model="search" show-action background="#f5f5f9" @search="searchFile">
            <div slot="action" @click="searchFile">搜索</div>
        </van-search>
        <div class="main" v-if="!file">
            <van-row type="flex" v-if="companyName" justify="space-between" align="center" style="padding-top: 10px;">
                <van-col>{{companyName}}</van-col>
                <van-col class="opt-btn">
                    <a href="javascript:;" @click="linkCompany">更换</a>
                    <!-- <a href="javascript:;" v-if="userLevel !== 3">授权</a> --> 
                </van-col>
            </van-row>

            <!-- 文件夹 -->
            <van-list class="list-wrap">
                <van-cell v-for="(item, index) in folderList" :key="index">
                    <van-row type="flex" justify="space-between">
                        <van-col span="21" class="flex" @click.native="linkFolder(item.folderId, item.folderName)">
                           <van-icon name="file" class="van-icon-set" />
                           <span>{{item.folderName}}</span>
                        </van-col>
                        <van-col span="3">
                            <a href="javascript:;" v-if="userLevel !== 3" class="a-link" @click.native="linkImpower()">授权</a>
                        </van-col>
                    </van-row>
                </van-cell>
            </van-list>
        </div>

        <!-- 子文件 -->
        <div class="main" v-if="file">
            <van-row type="flex" align="center" class="bread" v-if="breadInfo.companyName">
                <van-col @click.native="parentFile">{{breadInfo.companyName}}</van-col>
                <van-col>{{breadInfo.folderName}}</van-col>
            </van-row>
            
            <van-list class="list-wrap">
                <van-cell class="flex" v-for="(item, index) in fileList" :key="index">
                    <a :href="item.fileUrl">
                        <van-icon class="van-icon-set" :class="'van-icon-' + item.fileType" />
                        <span>{{item.fileName}}</span>
                    </a>
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
            file: false,
            folderList: [],
            userLevel: '',
            companyName: '',
            breadInfo: {}
        }
    },
    watch: {
        '$route' (to, from) {
            this.routeType();
        }
    },
    created () {
        this.routeType();
        this.init();
    },
    methods: {
        routeType() {
            let route = this.$route;
            if (route.query && route.query.folder) {
                this.file = true;
                this.getFileList(route.query.folder);
            } else {
                this.file = false;
                this.getList();
            }
        },
        init() {
            let userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.userLevel) {
                if (userInfo.userLevel == 'supAdmin') {   // 超级管理员
                    this.userLevel = 1;
                } else if (userInfo.userLevel == 'comAdmin') {   // 普通管理员
                    this.userLevel = 2;
                } else { // 普通员工
                    this.userLevel = 3;
                }
            }
        },
        // 查询当前用户有权限的所有文件夹
        getList() {
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/searchFolder.do', {
                crossDomain: true,
                // xhrFields: { 
                //     withCredentials: true //允许带上凭据
                // },
                // dataType: 'jsonp',
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg == 'SUCCESS' && res.data) {
                        this.companyName = res.data.companyName; 
                        this.folderList = res.data.folders;
                    }
                })
            })
        },
        searchFile() {
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/searchFile.do', {
                data: {
                    fileName: this.search
                },
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg == 'SUCCESS' && res.data) {
                        this.fileList = res.data;
                    }
                })
            })
        },
        getFileList(folderId) {
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/searchFolderFile.do', {
                data: {
                    folderId: folderId
                },
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg == 'SUCCESS' && res.data) {
                        this.breadInfo = {
                            companyName: res.data.companyName,
                            folderName: res.data.folderName
                        }
                        this.fileList = res.data.seachFile;
                    }
                    
                })
            })
        },
        linkFolder(folderId, fileName) {
            this.$router.push({
                path: '/home',
                query: {
                    folder: folderId
                }
            })
        },
        linkCompany() {
            this.$router.push({
                path: '/company'
            })
        },
        linkImpower() {
            this.$router.push({
                path: '/impower'
            })
        },
        // 父级文件
        parentFile() {
            this.$router.go(-1);
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
                    content: " / ";
                    
                }

                &:first-child {
                    color: #1889f9;
                    &::before {
                        content: "";
                    }
                }
            }
        }
        a.a-link {
            color: @fontColor;
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

