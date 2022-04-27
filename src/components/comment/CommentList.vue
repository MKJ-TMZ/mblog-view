<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { isEmpty } from "@/utils/func";
import { getPageData } from "@/api/comment";
import * as moment from "moment";
import CommentForm from "@/components/comment/CommentForm.vue";

const commentList = ref<any[]>([])
const currentCommentId = ref<string>('-1')

onBeforeMount(() => {
  getPage()
})

const getPage = () => {
  const data = getPageData('1')
  commentList.value = data.commentList
}

const setCurrentCommentId = (id: string) => {
  currentCommentId.value = id
}
</script>

<template>
  <CommentForm
      v-if="currentCommentId === '-1'"
      :setCurrentCommentId="setCurrentCommentId"
      :currentCommentId="currentCommentId"
  />
  <h3 class="ui dividing header">Comments | {{ commentList.length }} 条评论</h3>
  <h3 class="ui header" v-if="commentList.length === 0">快来抢沙发！</h3>
  <div class="comment" v-for="comment in commentList" :key="comment.id">
    <span class="anchor" :id="`comment-${comment.id}`"/>
    <a class="ui circular image avatar">
      <img :alt="comment.nickname" :src="comment.avatar">
    </a>
    <div class="content">
      <a class="nickname"
         :href="isEmpty(comment.website) ? comment.website : null"
         target="_blank"
         rel="external nofollow noopener"
      >
        {{ comment.nickname }}
      </a>
      <div class="metadata">
        <strong class="date">{{ moment(comment.createTime).format('YYYY-MM-DD') }}</strong>
      </div>
      <a class="reply" style="margin-left: 10px" @click="setCurrentCommentId(comment.id)">回复</a>
      <div class="text" v-html="comment.content"/>
    </div>
    <div class="comments" v-if="comment.replyComments.length > 0">
      <div class="comment" v-for="reply in comment.replyComments" :key="reply.id">
        <span class="anchor" :id="`comment-${reply.id}`"/>
        <a class="ui circular image avatar">
          <img :alt="comment.nickname" :src="reply.avatar">
        </a>
        <div class="content">
          <a class="nickname"
             :href="isEmpty(reply.website) ? reply.website : null"
             target="_blank"
             rel="external nofollow noopener"
          >
            {{ reply.nickname }}
          </a>
          <div class="metadata">
            <strong class="date">{{ moment(reply.createTime).format('YYYY-MM-DD') }}</strong>
          </div>
          <div class="text">
            <a :href="`#comment-${reply.parentId}`">@{{ reply.replyNickname }}</a>
            <div v-html="reply.content"/>
          </div>
          <div class="actions">
            <a class="reply" @click="setCurrentCommentId(reply.id)">回复</a>
          </div>
        </div>
<!--        <CommentForm v-if="currentCommentId === reply.id"/>-->
      </div>
    </div>
    <div class="border"></div>
<!--    <CommentForm v-if="currentCommentId === comment.id"/>-->
  </div>
</template>

<style scoped>
.comments + .border {
  position: absolute;
  left: 34px;
  top: 47px;
  bottom: 0;
  border-style: solid;
  border-width: 0 0 0 1px;
  border-color: #e0e0e0;
}

.ui.threaded.comments .comment .comments {
  box-shadow: none;
  margin-top: -2em;
}

.comment {
  padding-right: 2em !important;
  padding-left: 1em !important;
}

.nickname {
  font-weight: bolder;
  color: #000;
}

.comment .el-button {
  margin-left: 5px;
  padding: 4px 5px;
}

.comment > .anchor {
  position: absolute;
  left: 0;
  top: -48px;
}

.comment .comments .comment > .anchor {
  top: -55px;
}

.ui.comments .comment .avatar {
  width: 40px !important;
  margin: 0;
}

.ui.comments .comment .text {
  white-space: pre-wrap !important;
  margin-top: 7px;
  line-height: 1.5;
}

.ui.comments .comment .text a {
  cursor: pointer;
  margin-right: 8px;
  font-weight: bolder;
  color: rgba(0, 0, 0, .87);
}

.ui.comments .comment .text div {
  display: inline;
}

.label {
  cursor: default;
  padding: 4px 6px !important;
  font-weight: 500 !important;
}

.comment .form {
  margin-top: 20px;
}

.reply {
  color: #66CCFF !important;
  cursor: pointer;
}
</style>