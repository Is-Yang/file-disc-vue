<template>
  <div class="company-wrapper">
    <van-search placeholder="可查询文件名" v-model="search" background="#f5f5f9" />
    <van-list class="list-wrap">
      <van-cell>
          <van-row type="flex" justify="space-between" @click.native="link(item.num_iid)">
              <van-col class="flex">
                  <span>我问问</span>
              </van-col>
              <van-col>
                  <a href="javascript:;">换到此公司</a>
              </van-col>
          </van-row>
      </van-cell>
    </van-list>
  </div>
</template>