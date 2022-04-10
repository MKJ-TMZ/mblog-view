<script lang="ts" setup>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import QrcodeVue from 'qrcode.vue'
import { onBeforeRouteUpdate } from "vue-router";

const store = useStore()
const props = defineProps({
  hitokoto: {
    type: Object,
    required: true
  }
})

const baseSetting = computed(() => store.state.baseSetting)
const footerSetting = computed(() => store.state.footerSetting)
const fullPath = ref<string>(window.location.href);

onBeforeRouteUpdate((to: any, from: any, next: any) => {
  fullPath.value = window.location.host + to.fullPath
  next()
})


const toBlog = (blog: any) => {
  store.dispatch('goBlogPage', blog)
}
</script>

<template>
  <footer class="ui inverted vertical segment m-padded-tb-large m-opacity">
    <div class="ui center aligned container">
      <div class="ui inverted divided stackable grid">

        <div class="three wide column m-mobile-hide">
          <div class="ui link list">
            <h4 class="ui inverted header m-text-thin m-text-spaced">手机看本站</h4>
            <div class="item">
              <qrcode-vue class="ui rounded image" :value="fullPath" :size="100" :margin="3" level="H" />
            </div>
          </div>
        </div>

        <div class="six wide column">
          <h4 class="ui inverted header m-text-thin m-text-spaced">最新博客</h4>
          <div class="ui inverted link list">
            <a href="javascript:"
               @click.prevent="toBlog(item)"
               v-for="item in footerSetting.newBlogList"
               :key="item.id" class="item m-text-thin m-padded-tb-small"
            >
              {{ item.title }}
            </a>
          </div>
        </div>

        <div class="seven wide column">
          <p id="hitokotoText" class="m-text-thin m-text-spaced m-opacity-mini">{{ hitokoto.hitokoto }}</p>
          <p id="hitokotoFrom" class="m-text-thin m-text-spaced m-opacity-mini" style="float: right" v-text="hitokoto.from?`——《${hitokoto.from}》`:''"></p>
        </div>
      </div>

      <div class="ui inverted section divider"></div>

      <p class="m-text-thin m-text-spaced m-opacity-tiny">
        <span style="margin-right: 10px" v-if="baseSetting.copyright">{{ baseSetting.copyright }}</span>
        <router-link to="/" style="color:#ffe500" v-if="baseSetting.copyright">{{ baseSetting.webTitleSuffix }}</router-link>
      </p>

      <div class="github-badge" v-for="(item, index) in footerSetting.badgeList" :key="index">
        <a rel="external nofollow noopener" :href="item.url" target="_blank" :title="item.title">
          <span class="badge-subject">{{ item.subject }}</span>
          <span class="badge-value" :class="`bg-${item.color}`">{{ item.content }}</span>
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="less" scoped>
@import ~"@/assets/less/badge.less";

.github-badge a {
  color: #fff;
}
</style>