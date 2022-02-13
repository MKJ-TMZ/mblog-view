<script setup lang="ts">
import Nav from "@/components/index/Nav.vue";
import Header from "@/components/index/Header.vue"
import { SAVE_CLIENT_SIZE, } from "@/store/mutations-types";
import { inject, onBeforeMount, onMounted, reactive, ref, watch } from "vue";
import { useStore } from "vuex";
import { getSite } from "@/api";
import { useRoute } from "vue-router";

const route = useRoute()
const store = useStore()

const categoryList =  reactive<object[]>([])
const siteInfo = ref<{ blogName: string }>({blogName: ''})

onBeforeMount(() => {
  initSite()
})

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

//路由改变时，页面滚动至顶部
watch(
  () => route.path,
  () => {inject('scrollToTop')}
)

const initSite = () => {
  // TODO
  const date = getSite()
  categoryList.push(...date.categoryList)
  siteInfo.value = date.siteInfo
}
</script>

<template>
  <div class="site">
    <!--顶部导航-->
    <Nav :blogName="siteInfo.blogName" :categoryList="categoryList"/>
    <!--首页大图-->
    <div class="m-mobile-hide">
      <Header :blogName="siteInfo.blogName" v-if="route.name==='home'"/>
    </div>

    <div class="main">
      <div class="m-padded-tb-big">
        <div class="ui container">
          <div class="ui stackable grid">
            <!--左侧-->
            <div class="three wide column m-mobile-hide">

            </div>
            <!--中间-->
            <div class="ten wide column">

            </div>
            <!--右侧-->
            <div class="three wide column m-mobile-hide">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site {
  display: flex;
  min-height: 100vh; /* 没有元素时，也把页面撑开至100% */
  flex-direction: column;
}

.main {
  margin-top: 40px;
  flex: 1;
}

.main .ui.container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}
</style>
