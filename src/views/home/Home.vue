<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref } from "vue";
import { getBlogList } from "@/api/home";
import 'assets/lib/prism/prism.js';
import { useStore } from "vuex";
import BlogList from "@/components/blog/BlogList.vue";
import { SAVE_CURRENT_HOME_PAGE_NUM } from "@/store/mutations-types";
import { msgError } from "@/utils/message";

// 使Prism兼容ts
const Prism = (window as any).Prism;
const store = useStore()

const blogList = ref<any[]>([])
const total = ref<number>(1)
const currentPageNum = computed(() => store.state.currentHomePageNum)

onBeforeMount(() => {
  initBlogList(currentPageNum.value)
})

// TODO
const initBlogList = (pageNum: number) => {
  getBlogList(pageNum).then((res: any) => {
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
</script>

<template>
  <div>
    <BlogList :getBlogList="initBlogList" :blogList="blogList" :total="total" :currentPageNum="currentPageNum" />
  </div>
</template>

<style lang="less" scoped>

</style>
