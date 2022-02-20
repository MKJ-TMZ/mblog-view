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
  totalPage: {
    type: Number,
    required: true
  },
  currentPageNum: {
    type: Number,
    required: true
  },
  handlePageNumChange: {
    type: Function,
    required: true
  },
})
</script>

<template>
  <div>
    <!--content-->
    <BlogItem :blogList="blogList" v-viewer/>
    <!--分页-->
    <Pagination :getBlogList="getBlogList" :totalPage="totalPage" :handlePageNumChange="handlePageNumChange" :currentPageNum="currentPageNum"/>
  </div>
</template>

<style lang="less" scoped>

</style>