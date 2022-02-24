<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref } from "vue";
import { getBlogList } from "@/api/home";
import 'assets/lib/prism/prism.js';
import { useStore } from "vuex";
import BlogList from "@/components/blog/BlogList.vue";
import { SAVE_CURRENT_HOME_PAGE_NUM } from "@/store/mutations-types";

// 使Prism兼容ts
const Prism = (window as any).Prism;
const store = useStore()

const blogList = ref<any[]>([])
const totalPage = ref<number>(1)
const currentPageNum = computed(() => store.state.currentHomePageNum)

onBeforeMount(() => {
  initBlogList(currentPageNum.value)
})

// TODO
const initBlogList = (pageNum: number) => {
  const data = getBlogList(pageNum)
  blogList.value = data.list
  totalPage.value = data.totalPage
  nextTick(() => {
    // 解决异步高亮失效问题
    Prism.highlightAll()
  })
}

const handlePageNumChange = (pageNum: number) => {
  store.commit(SAVE_CURRENT_HOME_PAGE_NUM, pageNum)
}
</script>

<template>
  <div>
    <BlogList :getBlogList="initBlogList" :blogList="blogList" :totalPage="totalPage" :handlePageNumChange="handlePageNumChange" :currentPageNum="currentPageNum" />
  </div>
</template>

<style lang="less" scoped>

</style>
