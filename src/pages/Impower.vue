<template>
    <div class="impower-wrapper">
       <table>
           <thead>
               <tr>
                    <th>已授权用户/手机号</th>
                    <th>权限范围</th>
                    <th>操作</th>
               </tr>
           </thead>
           <tbody>
               <tr>
                   <td>李先生/13587896548</td>
                   <td>全公司权限</td>
                   <td>
                       <a href="javascript:;">修改</a>
                       <a href="javascript:;">删除</a>
                   </td>
               </tr>
               <tr>
                   <td>李先生/13587896548</td>
                   <td>部分</td>
                   <td>
                       <a href="javascript:;">修改</a>
                       <a href="javascript:;">删除</a>
                   </td>
               </tr>
           </tbody>
       </table>
       
       <van-button class="handle-btn-fixed-fixed" square type="primary">新增授权</van-button>
    </div>
</template>

<style lang="less" scoped>
.impower-wrapper {
    padding: 1rem;
    table {
        width: 100%;
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
