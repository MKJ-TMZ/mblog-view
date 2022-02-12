<script setup lang="ts">
import Nav from "@/components/index/Nav.vue";
import {
  SAVE_CLIENT_SIZE,
} from "@/store/mutations-types";
import { onBeforeMount, onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
import { getSite } from "@/api";

const store = useStore()

let categoryList =  reactive<object[]>([])
let siteInfo = ref<{ blogName: string }>({blogName: ''})

onBeforeMount(() => {
  initSite()
})

const initSite = () => {
  // TODO
  const date = getSite()
  categoryList.push(...date.categoryList)
  siteInfo.value = date.siteInfo
}

onMounted(() => {
  // 保存当前窗口大小
  store.commit(SAVE_CLIENT_SIZE, {
    clientHeight: document.body.clientHeight,
    clientWidth: document.body.clientWidth
  })
  window.onresize = () => {
    store.commit(SAVE_CLIENT_SIZE, {
      clientHeight: document.body.clientHeight,
      clientWidth: document.body.clientWidth
    })
  }
})
</script>

<template>
  <div class="site">
    <!--顶部导航-->
    <Nav :blogName="siteInfo.blogName" :categoryList="categoryList"/>

    <div class="main" style="height: 2500px">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.site {
  display: flex;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
  flex-direction: column;
}
</style>
