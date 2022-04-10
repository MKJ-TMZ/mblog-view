<script lang="ts" setup>
import BlogItem from "@/components/blog/BlogItem.vue";
import Pagination from "@/components/blog/Pagination.vue";

const props = defineProps({
  getBlogList: {
    type: Function,
    required: true
  },
  blogList: {
    type: Array,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currentPageNum: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div>
    <!--content-->
    <BlogItem :blogList="blogList" v-viewer/>
    <!--分页-->
    <Pagination :getBlogList="getBlogList" :total="total" :currentPageNum="currentPageNum"/>
  </div>
</template>

<style lang="less" scoped>

</style>