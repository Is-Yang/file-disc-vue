<template>
    <div class="impower-handle">

        <div style="padding-bottom: 30px;">
            <div class="form-item">
                <div class="tit">基本信息</div>
                <van-cell-group>
                    <van-field
                        v-model="username"
                        label="用户名"
                        placeholder="请输入用户名"
                    />
                    <van-field
                        v-model="phone"
                        label="手机号"
                        placeholder="请输入手机号"
                    />
                </van-cell-group>
            </div>

            <div class="form-item">
                <div class="tit">嘻嘻嘻嘻嘻</div>
                <van-list class="list-wrap">
                    <van-cell v-for="(item, index) in fileList" :key="index">
                        <van-row type="flex" justify="space-between">
                            <van-col  span="21" class="flex">
                            <van-icon name="folder" class="van-icon-set" />
                            <span class="flex1 text-over">{{item.folderName}}</span>
                            </van-col>
                            <van-col span="3" class="txt-right">
                                <van-checkbox :name="item" ref="folderCheckbox" v-model="item.granted" @click="toggle('folderCheckbox', index)" />
                            </van-col>
                        </van-row>

                        <van-list>
                            <van-cell class="flex" v-for="(file, i) in item.files" :key="i">
                                <van-row type="flex" justify="space-between">
                                    <van-col span="21">
                                        <a :href="file.fileUrl" class="flex flex-align-center">
                                            <van-icon class="van-icon-set" :name="file.fileType" />
                                            <span class="flex1 text-over">{{file.fileName}}</span>
                                        </a>
                                    </van-col>
                                    <van-col span="3" class="txt-right">
                                        <van-checkbox :name="file" :ref="'fileCheckbox' + index" v-model="file.granted" @change="toggle('fileCheckbox', index)" />
                                    </van-col>
                                </van-row>
                            </van-cell>
                        </van-list>
                    </van-cell>
                </van-list>
            </div>
        </div>

        <van-button class="handle-btn-fixed" square type="primary" @click="handleImpower">提交</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            phone: '',
            fileList: [],
            userId: '',
            companyName: '',
            checkedAll: [],
            checked: [],
            count: 0,
            fileId: [],
            folderId: [],
            userInfo: {}
        }
    },
    created () {
        this.init();
        this.getList();
    },
    methods: {
        init() {
            let route = this.$route;
            this.userId = route.query && route.query.userId;
            this.username = route.query && route.query.username;
            this.phone = route.query && route.query.phone;

            let userInfo = localStorage.getItem('userInfo') && JSON.parse(localStorage.getItem('userInfo'));
            this.userInfo = userInfo;
        },
        toggle(type, index) {
            this.$nextTick(() => {
                // 文件夹下面的文件全选
                if (type == 'folderCheckbox') {
                    for (const key in this.$refs) {
                        if (this.$refs.hasOwnProperty(key)) {
                            if (key == 'fileCheckbox' + index) {
                                this.$refs[key].forEach((item, i) => {
                                    if (this.$refs.folderCheckbox[index].checked == true) {
                                        this.$refs[key][i].checked = false;
                                    } else {
                                        this.$refs[key][i].checked = true;
                                    }
                                });
                            }
                        }
                    }
                } else  {  // 判断勾选子文件时是否需选中文件夹
                    this.count = 0;
                    for (const key in this.$refs) {
                        if (this.$refs.hasOwnProperty(key)) {
                            if (key == 'fileCheckbox' + index) {
                                this.$refs[key].forEach((item, i) => {
                                    if (item.checked == true) {
                                        this.count++;
                                    }
                                });
                                if (this.$refs[key].length == this.count) {
                                    this.$refs.folderCheckbox[index].checked = true;
                                } else {
                                    this.$refs.folderCheckbox[index].checked = false;
                                }
                            }
                        }
                    }

                }
               
            })
            
        },
        handleImpower() {
            if (this.username == '') {
                this.$toast("用户名不能为空");
                return;
            };
            if (this.phone == '') {
                this.$toast("手机号不能为空");
                return;
            };
            let reg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!reg.test(this.phone)) {
                this.$toast("请输入有效的手机号");
                return;
            }; 

            if (this.userId) {  // 编辑
                $.ajax(this.$host.http_api + '/fcCommon//updateUsers.do', {
                    data: {
                        userName: this.username,
                        phone: this.phone,
                        userId: this.userId
                    },
                    crossDomain: true,
                    success: ((res) => {
                        if (res.msg == 'ERROR') {
                            this.$toast(res.data);
                        } else {
                            this.impowerFolder();
                        }
                    })
                })
            } else {  // 新增
                $.ajax(this.$host.http_api + '/fcCommon/addUser.do', {
                    data: {
                        userName: this.username,
                        phone: this.phone,
                        userLevel: 'A'
                    },
                    crossDomain: true,
                    success: ((res) => {
                        if (res.msg == 'ERROR') {
                            this.$toast(res.data);
                        } else {
                        this.impowerFolder();
                        }
                    })
                })
            }
        },
        // 数组去重
        unique(arr){
            if (!Array.isArray(arr)) {
                return;
            }
            return [...new Set(arr)]
        },
        impowerFolder() {
            let params = {};
            this.folderId = [];
            this.fileId = [];

            for (const key in this.$refs) {
                if (this.$refs.hasOwnProperty(key)) {
                    this.$refs[key].forEach((item, i) => {
                        if (item.checked == true && item.name) {
                            // 所选中的文件夹
                            if (key == 'folderCheckbox' && item.name.files) {
                                this.folderId.push(Number(item.name.folderId));
                            } else if (item.name.fileId) {  // 所选的子文件
                                this.folderId.push(Number(item.name.folderId));
                                this.fileId.push(Number(item.name.fileId));
                            }
                        }
                    });
                }
            }
            if (this.folderId.length > 0) {
                params.folderId = this.unique(this.folderId).join(',')
            }
            if (this.fileId.length > 0) {
                params.fileId = this.fileId.join(',');
            }

            params.phone = this.phone;
            $.ajax(this.$host.http_api + '/fcCommon/batchGrant.do', {
                data: params,
                crossDomain: true,
                success: ((res) => {
                    if (res.msg == 'ERROR') {
                        this.$toast(res.data);
                    } else {
                        this.$toast('新增成功');
                        this.$router.push({
                            path:'/impower',
                            query: {
                                compayId: this.userInfo.users.currenCompanyId
                            }
                        })
                    }
                })
            })
        },
        // 查询用户拥有权限的文件
        getList() {
            let currenCompanyId = this.userInfo.users.currenCompanyId;
            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/searchAllFould.do', {
                data: {
                    companyId: currenCompanyId,
                    userId: this.userId ? this.userId : 0,
                },
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.data) {
                        this.companyName = res.data.companyName;
                        this.fileList = res.data.folders;
                    }
                }),
                error: ((err) => {
                   this.$eventHub.$emit('loading', false);
                   this.$router.push('/login');
                })
            })
        },
    }
}
</script>


<style lang="less" scoped>
.impower-handle {
    padding: 1.5rem 1.2rem;
    .form-item {
        margin-bottom: 1.4rem;
    }
    .tit{
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }
    .list-wrap  {
        .van-cell {
            padding-right: 0;
        }
        .van-row {
            font-size: 1.4rem;
        }
    }
}
</style>
