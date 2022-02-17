<script setup lang="ts">
import Nav from "@/components/index/Nav.vue";
import Header from "@/components/index/Header.vue"
import { SAVE_CLIENT_SIZE, SAVE_INTRODUCTION, } from "@/store/mutations-types";
import { inject, onBeforeMount, onMounted, reactive, ref, watch, computed } from "vue";
import { useStore } from "vuex";
import { getSite } from "@/api";
import { useRoute } from "vue-router";
import Introduction from "@/components/index/Introduction.vue";
import RandomBlog from "@/components/sidebar/RandomBlog.vue";
import Tags from "@/components/sidebar/Tags.vue";
import Tocbot from "@/components/sidebar/Tocbot.vue";

const route = useRoute()
const store = useStore()

const categoryList =  reactive<object[]>([])
const siteInfo = ref<{ blogName: string }>({blogName: ''})
const randomBlogList = ref<any[]>([])
const focusMode = computed(() => store.state.focusMode)
const tagList = ref<any[]>([])

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
  const data = getSite()
  categoryList.push(...data.categoryList)
  siteInfo.value = data.siteInfo
  randomBlogList.value = data.randomBlogList
  store.commit(SAVE_INTRODUCTION, data.introduction)
  tagList.value = data.tagList
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
              <Introduction :class="{'m-display-none': focusMode}"/>
            </div>
            <!--中间-->
            <div class="ten wide column">
              <router-view v-slot="{ Component }">
                <keep-alive include="Home">
                  <component :is="Component"/>
                </keep-alive>
              </router-view>
            </div>
            <!--右侧-->
            <div class="three wide column m-mobile-hide">
              <RandomBlog :randomBlogList="randomBlogList" :class="{'m-display-none': focusMode}"/>
              <Tags :tagList="tagList" :class="{'m-display-none':focusMode}"/>
              <!--只在文章页面显示目录-->
              <Tocbot v-if="route.name==='blog'"/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--回到顶部-->
    <el-backtop style="box-shadow: none; background: none;">
      <span title="回到顶部" class="iconfont icon-backtop" style="font-size: 40px"/>
    </el-backtop>
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

.ui.grid .three.column {
  padding: 0;
}

.ui.grid .ten.column {
  padding-top: 0;
}

.m-display-none {
  display: none !important;
}
</style>
