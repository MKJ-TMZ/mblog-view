<script lang="ts" setup>
import { computed, nextTick, onMounted, ref } from "vue";
import { getBlogList } from "@/api/home";
import 'assets/lib/prism/prism.js';
import { useStore } from "vuex";
import { SAVE_HOME_TOTAL_PAGE } from "@/store/mutations-types";
import BlogList from "@/components/blog/BlogList.vue";

// 使Prism兼容ts
const Prism = (window as any).Prism;
const store = useStore()

const blogList = ref<any[]>([])
const totalPage: any = computed(() => store.state.homeTotalPage)

onMounted(() => {
  initBlogList(totalPage)
})

// TODO
const initBlogList = (pageNum: number) => {
  const data = getBlogList(pageNum)
  blogList.value = data.list
  store.commit(SAVE_HOME_TOTAL_PAGE, data.totalPage || 1)
  nextTick(() => {
    // 解决异步高亮失效问题
    Prism.highlightAll()
  })
}
</script>

<template>
  <div>
    <BlogList :getBlogList="initBlogList" :blogList="blogList" :totalPage="totalPage"/>
  </div>
</template>

<style lang="less" scoped>

</style>
