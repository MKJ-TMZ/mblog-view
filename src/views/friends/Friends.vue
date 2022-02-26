<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { addViewsByNickname, getFriendsData } from "@/api/friends";

const friendList = ref<any[]>([])
const info = ref<any>({})
const bgColor = [
  '#1abc9c',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#ee5a24',
  '#9980fa',
  '#8c7ae6',
  '#f79f1f'
]

onBeforeMount(() => {
  getFriends()
})

const getFriends = () => {
  const data = getFriendsData()
  friendList.value = data.friendList
  info.value = data.friendInfo
}

const addViews = (nickName: string) => {
  addViewsByNickname(nickName)
}

const randomRGB = () => {
  const index = Math.floor((Math.random() * bgColor.length))
  return { backgroundColor: bgColor[index] }
}
</script>

<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text">小伙伴们</h2>
    </div>
    <div class="ui attached segment">
      <div class="ui link three doubling cards">
        <a :href="item.website" target="_blank" rel="external nofollow noopener" class="card" :style="randomRGB()"
           v-for="(item, index) in friendList" :key="index" @click="addViews(item.nickname)">
          <div class="image">
            <img :src="item.avatar" onerror="this.src='/img/error.png'">
          </div>
          <div class="content">
            <div class="header">{{ item.nickname }}</div>
            <div class="description">{{ item.description }}</div>
          </div>
        </a>
      </div>
    </div>
    <!--页面描述-->
    <div class="ui teal attached segment">
      <div class="typo content" v-viewer v-html="info.content"></div>
    </div>
    <!--评论-->
    <div class="ui bottom teal attached segment threaded comments">
      <h3 class="ui header">评论已关闭</h3>
    </div>
  </div>
</template>

<style scoped>
.card .image {
  width: 70px !important;
  margin: 10px auto 0;
  background: unset !important;
}

.card .image img {
  border-radius: 100% !important;
}

.card .content {
  text-align: center;
  padding: 10px 14px !important;
  border-top: 0 !important;
}

.card .content * {
  color: #fff !important;
}

.card .content .header {
  font-size: 16px !important;
}

.card .content .description {
  font-size: 12px !important;
}

.card .content .description {
  margin-top: 5px !important;
  margin-bottom: 7px;
}
</style>