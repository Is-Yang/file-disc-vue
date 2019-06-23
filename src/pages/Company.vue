<template>
  <div class="company-wrapper">
    <!-- <van-search placeholder="可查询公司名" v-model="search" show-action background="#f5f5f9" @search="searchFile">
        <div slot="action" @click="searchFile">搜索</div>
    </van-search> -->
    <van-list class="list-wrap">
      <van-cell>
          <van-row type="flex" justify="space-between" v-for="(item, index) in companyList" :key="index">
              <van-col class="flex">
                  <span>{{item.companyName}}</span>
              </van-col>
              <van-col>
                  <a href="javascript:;" class="a-link" @click="updateCompany(item.companyId)">换到此公司</a>
              </van-col>
          </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      companyList: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.$eventHub.$emit('loading', true);
        $.ajax(this.$host.http_api + '/fcCommon/searchCompany.do', {
            crossDomain: true,
            // xhrFields: { 
            //     withCredentials: true //允许带上凭据
            // },
            // dataType: 'jsonp',
            success: ((res) => {
                this.$eventHub.$emit('loading', false);
                if (res.msg == 'SUCCESS' && res.data) {
                    this.companyList = res.data;
                }
            })
        })
    },
    updateCompany(companyId) {
      this.$eventHub.$emit('loading', true);
        $.ajax(this.$host.http_api + '/fcCommon/updateLoginCompany.do', {
            data: {
                companyId: companyId
            },
            crossDomain: true,
            // xhrFields: { 
            //     withCredentials: true //允许带上凭据
            // },
            // dataType: 'jsonp',
            success: ((res) => {
                this.$eventHub.$emit('loading', false);
                if (res.msg == 'SUCCESS') {
                    this.$toast("操作成功～");
                    this.init();
                }
            })
        })
    }
  },
}
</script>

<style lang="less">
    .company-wrapper {
      padding: 1rem 0;
        @fontColor: #0079f3;
        .van-search .van-cell {
            background-color: #fff;
        }
        a.a-link {
            padding: 0 1rem;
            color: @fontColor;
        }
    }
</style>

