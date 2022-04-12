<script lang="ts" setup>

import { onBeforeMount, ref } from "vue";
import { getAboutData } from "@/api/about";
import { msgError } from "@/utils/message";

const about = ref<any>({})

onBeforeMount(() => {
  getAbout()
})

const getAbout = () => {
  getAboutData().then((res: any) => {
    if (res.code === 200) {
      about.value = res.data
    }
  }).catch((error: any) => {
    msgError('获取')
    console.log(error)
  })
}
</script>

<template>
  <div>
    <div class="ui top attached segment m-padded-lr-big">
      <h2 class="m-text-500" style="text-align: center">{{ about.title }}</h2>
      <div class="typo content m-margin-top-large" v-viewer v-html="about.content"></div>
    </div>
    <!--评论-->
    <div class="ui bottom teal attached segment threaded comments">
      <h3 class="ui header">评论已关闭</h3>
    </div>
  </div>
</template>

<style scoped>
.content ul li {
  letter-spacing: 1px !important;
}
</style>