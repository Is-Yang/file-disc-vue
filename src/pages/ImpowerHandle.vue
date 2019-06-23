<template>
    <div class="impower-handle">
        <div class="form-item">
            <div class="tit">基本信息</div>
            <van-cell-group>
                <van-field
                    v-model="username"
                    label="姓名"
                    placeholder="请输入姓名"
                />
                <van-field
                    v-model="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                />
            </van-cell-group>
        </div>
        <div class="form-item">
            <div class="tit">文件权限</div>
            <van-radio-group v-model="radio">
                <van-radio name="1">全公司</van-radio>
                <van-radio name="2">部分权限</van-radio>
            </van-radio-group>
        </div>

        <div class="form-item" v-if="radio == '2'">
            <div class="tit">嘻嘻嘻嘻嘻</div>
            <van-list class="list-wrap">
                <van-cell v-for="(item, index) in fileList" :key="index">
                    <van-row type="flex" justify="space-between" @click.native="impowerFolder">
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

        <van-button class="handle-btn-fixed" square type="primary" @click="handleImpower">确定</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            phone: '',
            radio: '1',
            fileList: []
        }
    },
    created () {
        this.getList();
    },
    methods: {
        handleImpower() {
            $.ajax(this.$host.http_api + '/fcCommon/addUser.do', {
                data: {
                    userName: this.username,
                    phone: this.phone
                },
                crossDomain: true,
                success: ((res) => {
                    if (res.msg == 'ERROR' && res.data) {
                        this.$toast(res.data);
                    }
                })
            })
        },
        impowerFolder() {

        },
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
            // $.ajax(this.$host.http_api + '/fcCommon/searchFolder.do', {
            //     crossDomain: true,
            //     success: ((res) => {
                    this.fileList = res.data;
            //     })
            // })
        },
    }
}
</script>


<style lang="less" scoped>
.impower-handle {
    padding: 2rem;
    .form-item {
        margin-bottom: 1.5rem;
        .van-radio-group {
            display: flex;
            .van-radio {
                padding-left: 1.2rem;
                font-size: 1.4rem;
            }
        }
    }
    .tit{
        font-size: 1.4rem;
        margin-bottom: 1rem;
    }
}
</style>
