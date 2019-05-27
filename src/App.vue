<template>
  <div id="app">
    <router-view v-if="isView"/>
    <Loading />
  </div>
</template>

<script>
import Loading from '@/components/Loading';
export default {
  name: 'app',
  components: {
      Loading
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isView: true
    }
  },
  methods: {
    reload () {
      this.isView = false;
      this.$nextTick(() => {
        this.isView = true;
      })
    }
  }
}
</script>

