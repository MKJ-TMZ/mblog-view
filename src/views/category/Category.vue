<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import 'assets/lib/prism/prism.js';
import BlogList from "@/components/blog/BlogList.vue";
import { SAVE_CURRENT_CATEGORY_PAGE_NUM, SAVE_CURRENT_HOME_PAGE_NUM } from "@/store/mutations-types";
import { getCategoryName } from "@/api/category";
import { getBlogList } from "@/api/home";
import { msgError } from "@/utils/message";
import { isNotEmpty } from "@/utils/func";

// 使Prism兼容ts
const Prism = (window as any).Prism;
const route = useRoute()
const store = useStore()

const blogList = ref<any[]>([])
const total = ref<number>(1)
const categoryName = ref<string>('');
const currentPageNum = computed(() => store.state.currentCategoryPageNum)

onBeforeMount(() => {
  initBlogList(currentPageNum.value)
  initCategory()
})

watch(
    () => route.params,
    () => {
      if (isNotEmpty(route.params.id as string) && route.name === 'tag') {
        initBlogList(currentPageNum.value)
        initCategory()
      }
    }
)
const initCategory = () => {
  if (route.params.id) {
    getCategoryName(route.params.id as string).then((res: any) => {
      if (res.code === 200) {
        const { data } = res
        categoryName.value = data;
      }
    }).catch((error: any) => {
      msgError('请求失败')
      console.log(error.msg)
    })
  }
}

const initBlogList = (pageNum: number) => {
  getBlogList(pageNum, { categoryId: route.params.id }).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      blogList.value = data.records
      total.value = data.total
      store.commit(SAVE_CURRENT_HOME_PAGE_NUM, data.current)
      nextTick(() => {
        // 解决异步高亮失效问题
        Prism.highlightAll()
      })
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })
}

const handlePageNumChange = (pageNum: number) => {
  store.commit(SAVE_CURRENT_CATEGORY_PAGE_NUM, pageNum)
}
</script>

<template>
  <div>
    <div class="ui top segment" style="text-align: center">
      <h2 class="m-text">分类 <span class="m-blue">{{ categoryName }}</span> 下的文章</h2>
    </div>
    <BlogList :getBlogList="initBlogList" :blogList="blogList" :total="total" :handlePageNumChange="handlePageNumChange" :currentPageNum="currentPageNum" />
  </div>
</template>

<style scoped>

</style>