<script setup lang="ts">
import Nav from "@/components/index/Nav.vue";
import Header from "@/components/index/Header.vue"
import { SAVE_CLIENT_SIZE, SAVE_PROFILE_SETTING, SAVE_BASE_SETTING, SAVE_FOOTER_SETTING } from "@/store/mutations-types";
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getBaseSetting, getFooterSetting, getHitokoto, getProfileSetting, getSite } from "@/api";
import { useRoute } from "vue-router";
import Profile from "@/components/sidebar/Profile.vue";
import Recommend from "@/components/sidebar/Recommend.vue";
import Tags from "@/components/sidebar/Tags.vue";
import Tocbot from "@/components/sidebar/Tocbot.vue";
import Footer from "@/components/index/Footer.vue";
import { msgError } from "@/utils/message";
import { getCategoryList } from "@/api/category";
import { getTagList } from "@/api/tag";
import { getRecommendList } from "@/api/blog";

const route = useRoute()
const store = useStore()

const categoryList =  ref<any[]>([])
const recommendBlogList = ref<any[]>([])
const focusMode = computed(() => store.state.focusMode)
const tagList = ref<any[]>([])
const hitokoto = ref<any>({})

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

const initSite = () => {
  // 获取基础设置
  getBaseSetting().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      store.commit(SAVE_BASE_SETTING, data)
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // 获取个人档案设置
  getProfileSetting().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      store.commit(SAVE_PROFILE_SETTING, data)
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // 获取页脚设置
  getFooterSetting().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      store.commit(SAVE_FOOTER_SETTING, data)
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // 获取所有分类
  getCategoryList().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      categoryList.value = data
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // 获取所有标签
  getTagList().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      tagList.value = data
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // 获取推荐
  getRecommendList().then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      recommendBlogList.value = data
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })

  // TODO
  const data = getSite()
}

  //获取一言
  getHitokoto().then(res => {
    hitokoto.value = res
  })
</script>

<template>
  <div class="site">
    <!--顶部导航-->
    <Nav :categoryList="categoryList"/>
    <!--首页大图-->
    <div class="m-mobile-hide">
      <Header v-if="route.name==='home'"/>
    </div>

    <!--主体部分-->
    <div class="main">
      <div class="m-padded-tb-big">
        <div class="ui container">
          <div class="ui stackable grid">
            <!--左侧-->
            <div class="three wide column m-mobile-hide">
              <Profile :class="{'m-display-none': focusMode}"/>
            </div>
            <!--主体-->
            <div class="ten wide column">
              <router-view/>
            </div>
            <!--右侧-->
            <div class="three wide column m-mobile-hide">
              <el-affix v-if="route.name==='blog'" target=".main" :offset="68">
                <Recommend :recommendBlogList="recommendBlogList" :class="{'m-display-none': focusMode}"/>
                <Tags :tagList="tagList" :class="{'m-display-none':focusMode}"/>
                <Tocbot/>
              </el-affix>
              <div v-else>
                <Recommend :recommendBlogList="recommendBlogList" :class="{'m-display-none': focusMode}"/>
                <Tags :tagList="tagList" :class="{'m-display-none':focusMode}"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--回到顶部-->
    <el-backtop class="m-mobile-hide" style="box-shadow: none; background: none;">
      <span title="回到顶部" class="iconfont icon-backtop" style="font-size: 40px; color: #66CCFF;"/>
    </el-backtop>

    <!--底部-->
    <Footer :hitokoto="hitokoto"/>
  </div>
</template>

<style lang="less" scoped>
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
