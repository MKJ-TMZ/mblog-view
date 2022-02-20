<script lang="ts" setup>
import BlogItem from "@/components/blog/BlogItem.vue";

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
  }
})
</script>

<template>
  <div>
    <!--content-->
    <BlogItem :blogList="blogList" v-viewer/>
  </div>
</template>

<style lang="less" scoped>

</style>