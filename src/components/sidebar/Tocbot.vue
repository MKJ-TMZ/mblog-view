<script lang="ts" setup>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useStore } from "vuex";
import 'tocbot/dist/tocbot.min'

const store = useStore()

const isBlogRenderComplete = computed(() => store.state.isBlogRenderComplete)

onMounted(() => {
  // 初始化initTocbot
  if (window.document.querySelector('.js-toc-content')) {
    initTocbot()
  }
})

onUnmounted(() => {
  tocbot.refresh()
})

watch(
    //文章渲染完成时，生成目录
    () => isBlogRenderComplete,
    () => {initTocbot()}
)

const initTocbot = () => {
  tocbot.init({
    // 放置目录的容器
    tocSelector: '.js-toc',
    // 正文内容所在位置
    contentSelector: '.js-toc-content',
    // 需要索引的标题级别
    headingSelector: 'h1,h2,h3,h4',
    // 固定目录位置
    positionFixedSelector: '.m-toc',
    // 开启平滑滚动
    scrollSmooth: true,
    // 滚动时间
    scrollSmoothDuration: 500,
    //到顶部导航条的距离
    scrollSmoothOffset: -55,
    // 标题偏移量
    headingsOffset: -18
  })
}
</script>

<template>
  <!--文章目录-->
  <div class="ui segments m-toc toc-wrapper m-box">
    <div class="ui secondary segment">
      <i class="list ul icon"></i>本文目录
    </div>
    <div class="ui yellow segment">
      <div class="content js-toc-content"></div>
      <div class="js-toc"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.m-toc {
  z-index: 10 !important;
}

.toc {
  overflow-y: auto
}

.toc > ul {
  overflow: hidden;
  position: relative
}

.toc > ul li {
  list-style: none
}

.toc-list {
  list-style-type: none;
  margin: 0;
  padding-left: 10px
}

.toc-list li a {
  display: block;
  padding: 4px 0;
  font-weight: 300;
}

.toc-list li a:hover {
  color: #fbbd08;
}

a.toc-link {
  color: currentColor;
  height: 100%
}

.is-collapsible {
  max-height: 1000px;
  overflow: hidden;
  transition: all 300ms ease-in-out
}

.is-collapsed {
  max-height: 0
}

.is-position-fixed {
  position: sticky !important;
  top: 60px
}

.is-active-link {
  font-weight: 700;
  color: #fbbd08 !important;
}

.toc-link::before {
  background-color: #EEE;
  content: ' ';
  display: inline-block;
  height: 0;
  left: 0;
  margin-top: -1px;
  position: absolute;
  width: 2px
}

.is-active-link::before {
  background-color: #54BC4B
}
</style>