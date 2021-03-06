<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, ref, watch } from "vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from "vue-router";
import { SAVE_FOCUS_MODE, SAVE_IS_BLOG_RENDER_COMPLETE } from "@/store/mutations-types";
import 'tocbot/dist/tocbot.min'
import 'assets/lib/prism/prism.js';
import { getBlogById } from "@/api/blog";
import * as moment from "moment";
import { isNotEmpty } from "@/utils/func";
import { msgError } from "@/utils/message";
import Comment from "@/components/comment/Comment.vue";

// 使tocbot兼容ts
const tocbot = (window as any).tocbot;
// 使Prism兼容ts
const Prism = (window as any).Prism;
const store = useStore()
const route = useRoute()

const baseSetting = computed(() => store.state.baseSetting)
const focusMode = computed(() => store.state.focusMode)
const blogData = ref<any>({})

onBeforeMount(() => {
  getBlog(route.params.blogId)
})

watch(
  () => route.params.blogId,
  () => {
    const blogId = route.params.blogId
    if (isNotEmpty(blogId as string)) {
      getBlog(route.params.blogId)
    }
  }
)

onBeforeRouteLeave((to: any, from: any, next: any) => {
  store.commit(SAVE_IS_BLOG_RENDER_COMPLETE, false)
  tocbot.destroy()
  next()
})

onBeforeRouteUpdate((to: any, from: any, next: any) => {
  if (to.path !== from.path) {
    store.commit(SAVE_IS_BLOG_RENDER_COMPLETE, false)
    tocbot.destroy()
    next()
  }
})

const getBlog = (blogId: any) => {
  getBlogById(blogId).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      blogData.value = data
      document.title = blogData.value.title + ' - ' + baseSetting.value.webTitleSuffix
      nextTick(() => {
        // 解决异步高亮失效问题
        Prism.highlightAll()
        store.commit(SAVE_IS_BLOG_RENDER_COMPLETE, true)
      })
    }
  }).catch((error: any) => {
    msgError('获取详情失败')
    console.log(error.msg)
  })
}

const changeFocusMode = () => {
  store.commit(SAVE_FOCUS_MODE, !focusMode.value)
}
</script>

<template>
  <div>
    <div class="ui padded attached segment m-padded-tb-large">
      <div class="ui large red right corner label" v-if="blogData.isTop">
        <i class="arrow alternate circle up icon"></i>
      </div>
      <div class="ui middle aligned mobile reversed stackable">
        <div class="ui grid m-margin-lr">
          <!--标题-->
          <div class="row m-padded-tb-small">
            <h2 class="ui header m-center" v-html="blogData.title"/>
          </div>
          <!--文章简要信息-->
          <div class="row m-padded-tb-small">
            <div class="ui horizontal link list m-center">
              <div class="item m-blue">
                <i class="small calendar icon"></i><span>{{ moment(blogData.createTime).format('YYYY-MM-DD') }}</span>
              </div>
              <div class="item m-views">
                <i class="small eye icon"></i><span>{{ blogData.viewCount }}</span>
              </div>
              <div class="item m-common-black">
                <i class="small pencil alternate icon"></i><span>字数≈{{ blogData.wordsCount }}字</span>
              </div>
              <div class="item m-common-black">
                <i class="small clock icon"></i><span>阅读时长≈{{ blogData.readTime }}分</span>
              </div>
              <a class="item m-common-black" @click.prevent="changeFocusMode">
                <div data-inverted="" data-tooltip="专注模式" data-position="top center">
                  <i class="book icon"></i>
                </div>
              </a>
            </div>
          </div>
          <!--分类-->
          <router-link
              :to="`/category/${blogData.categoryId}`"
              class="ui orange large ribbon label"
              v-if="blogData.categoryId"
          >
            <i class="small folder open icon"/><span class="m-text">{{ blogData.categoryName }}</span>
          </router-link>
          <!--文章Markdown正文-->
          <div
              class="typo js-toc-content m-padded-tb-small line-numbers match-braces rainbow-braces"
              v-viewer
              v-html="blogData.content"
          />
          <!--赞赏-->
          <div style="margin: 2em auto">
            <el-popover placement="top" width="220" trigger="click" v-if="blogData.isAppreciation">
              <template #reference>
                <span>
                  <el-button color="#f2711c" style="color: white;" round>赞赏</el-button>
                </span>
              </template>
              <div class="ui orange basic label" style="width: 100%; max-width: 300px">
                <div class="image">
                  <img
                      :src="baseSetting.rewardUrl"
                      alt=""
                      class="ui rounded bordered image"
                      style="width: 100%"
                  />
                </div>
              </div>
            </el-popover>
          </div>
          <!--横线-->
          <el-divider/>
          <!--标签-->
          <div class="row m-padded-tb-no">
            <div class="column m-padding-left-no">
              <router-link
                  :to="`/tag/${tag.name}`"
                  class="ui tag label m-text-500 m-margin-small"
                  :class="tag.color"
                  v-for="tag in blogData.tagList"
                  :key="tag.id"
              >
                {{ tag.name }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--博客信息-->
    <div class="ui attached positive message">
      <ul class="list">
        <li>作者：{{ store.state.profileSetting.nickname }}
          <router-link to="/about">（联系作者）</router-link>
        </li>
        <li>发表时间：{{ moment(blogData.createTime).format('YYYY-MM-DD') }}</li>
        <li>最后修改：{{ moment(blogData.updateTime).format('YYYY-MM-DD') }}</li>
        <li>本站点采用<a href="https://creativecommons.org/licenses/by/4.0/" target="_blank"> 署名 4.0 国际 (CC BY 4.0) </a>创作共享协议。可自由转载、引用，并且允许商业性使用。但需署名作者且注明文章出处。</li>
      </ul>
    </div>
    <!--评论-->
    <div class="ui bottom teal attached segment threaded comments">
<!--      <Comment :page="0" :blogId="blogId" v-if="blogData.isCommentEnabled"/>-->
<!--      <h3 class="ui header" v-else>评论已关闭</h3>-->
    </div>
  </div>
</template>

<style lang="less" scoped>
.el-divider {
  margin: 1rem 0 !important;
}
</style>