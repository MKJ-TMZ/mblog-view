<script lang="ts" setup>
import { onBeforeMount, ref, watch, computed, nextTick } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import 'assets/lib/prism/prism.js';
import BlogList from "@/components/blog/BlogList.vue";
import { SAVE_CURRENT_CATEGORY_PAGE_NUM } from "@/store/mutations-types";
import { getBlogListByCategoryName } from "@/api/category";

// 使Prism兼容ts
const Prism = (window as any).Prism;
const route = useRoute()
const store = useStore()

const blogList = ref<any[]>([])
const totalPage = ref<number>(1)
const currentPageNum = computed(() => store.state.currentCategoryPageNum)

onBeforeMount(() => {
  initBlogList(route.params.name, currentPageNum.value)
})


watch(
    () => route.params,
    () => {
      initBlogList(route.params.name, currentPageNum.value)
    }
)

const initBlogList = (categoryName: any, pageNum: number) => {
  const data = getBlogListByCategoryName(categoryName, pageNum)
  blogList.value = data.list
  totalPage.value = data.totalPage
  nextTick(() => {
    // 解决异步高亮失效问题
    Prism.highlightAll()
  })
}

const handlePageNumChange = (pageNum: number) => {
  store.commit(SAVE_CURRENT_CATEGORY_PAGE_NUM, pageNum)
}
</script>

<template>
  <div>
    <div class="ui top segment" style="text-align: center">
      <h2 class="m-text">分类 <span class="m-blue">{{ route.params.name }}</span> 下的文章</h2>
    </div>
    <BlogList :getBlogList="initBlogList" :blogList="blogList" :totalPage="totalPage" :handlePageNumChange="handlePageNumChange" :currentPageNum="currentPageNum" />
  </div>
</template>

<style scoped>

</style>