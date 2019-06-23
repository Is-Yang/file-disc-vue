<template>
    <div v-if="loading">
        <div class="mask"></div>
        <div class="loading">
            <van-loading type="spinner" color="white" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'loading',
    data() {
        return {
            loading: false
        }
    },
    created() {
        this.$eventHub.$on('loading', (data)=> {
            this.loading = !!data;
        })
    }
}
</script>

