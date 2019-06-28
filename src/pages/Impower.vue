<template>
    <div class="impower-wrapper">
       <table>
           <thead>
               <tr>
                    <th>已授权用户</th>
                    <th>手机号</th>
                    <!-- <th>权限范围</th> -->
                    <th>操作</th>
               </tr>
           </thead>
           <tbody>
               <tr v-for="(item, index) in dataList" :key="index">
                   <td>{{item.userName}}</td>
                   <td>{{item.phone}}</td>
                   <!-- <td>全公司权限</td> -->
                   <td>
                       <a href="javascript:;" @click="impowerHandle(item)">修改</a>
                       <a href="javascript:;" @click="delUser(item.userId)">删除</a>
                   </td>
               </tr>
           </tbody>
       </table>
       
       <van-button class="handle-btn-fixed" square type="primary" @click="impowerHandle()">新增授权</van-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dataList: []
        }
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            let route = this.$route;

            this.$eventHub.$emit('loading', true);
            $.ajax(this.$host.http_api + '/fcCommon/searchComUsers.do', {
                data: route.query,
                crossDomain: true,
                success: ((res) => {
                    this.$eventHub.$emit('loading', false);
                    if (res.msg == 'SUCCESS' && res.data) {
                        this.dataList = res.data;
                    }
                })
            })
        },
        impowerHandle(data) {
            if (data) {  // 修改
                this.$router.push({
                    path: '/impower/handle',
                    query: {
                        userId: data.userId,
                        username: data.userName,
                        phone: data.phone
                    }
                })
            } else {  // 添加
                this.$router.push({
                    path: '/impower/handle'
                })
            }
        },
        delUser(userId) {
            this.$dialog.confirm({
                title: '提示',
                message: '确定删除此授权用户？'
            }).then(() => {
                // on confirm
                this.$eventHub.$emit('loading', true);
                $.ajax(this.$host.http_api + '/fcCommon/deleteUsers.do', {
                    data: {
                        userId: userId
                    },
                    crossDomain: true,
                    success: ((res) => {
                        this.$eventHub.$emit('loading', false);
                        if (res.msg == 'SUCCESS') {
                            this.$toast("删除成功");
                            this.init();
                        } else {
                            this.$toast(res.msg);
                        }
                    }),
                    error: ((err) => {
                        this.$eventHub.$emit('loading', false);
                        this.$router.push('/login');
                    })
                })
            }).catch(() => {
                // on cancel
            });
        }
    }
}
</script>


<style lang="less" scoped>
.impower-wrapper {
    padding: 1rem;
    table {
        width: 100%;
        padding-bottom: 44px;
        font-size: 1.4rem;
        th, td {
            padding: 1rem 0;
            border-bottom: 1px solid #eee;
            text-align: left;

            a {
                color: #0079f3;
                margin-right: 0.5rem;
                &:last-child {
                    margin-right: 0;
                }
            }
        }
       
    }
}
</style>
