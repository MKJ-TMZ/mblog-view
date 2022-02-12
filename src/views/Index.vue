<script setup lang="ts">
import Nav from "@/components/index/Nav.vue";
import {
  SAVE_CLIENT_SIZE,
} from "@/store/mutations-types";
import { onMounted, reactive } from "vue";
import { useStore } from "vuex";

const store = useStore()

const siteInfo =  reactive({
  blogName: `MTCode's blog`
})
const categoryList = reactive([
  {name: '菜单1'},
  {name: '菜单2'},
  {name: '菜单3'},
  {name: '菜单4'},
])

onMounted(() => {
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

    <div class="main">
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
