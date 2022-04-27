<script lang="ts" setup>
import { checkEmail } from "@/utils/reg";
import { nextTick, reactive, ref } from "vue";
// @ts-ignore
import aruMapper from "@/utils/emoji/aruMapper.json"
// @ts-ignore
import paopaoMapper from "@/utils/emoji/paopaoMapper.json"
// @ts-ignore
import tvMapper from "@/utils/emoji/tvMapper.json"

const props = defineProps({
  setCurrentCommentId: {
    type: Function,
    required: true
  },
  currentCommentId: {
    type: String,
    required: true
  }
})

const commentForm = reactive<any>({
  content: '',
  qq: ''
})
const formRef = ref<any>()
const textareaRef = ref<any>()
const qqInputRef = ref<any>()
const nicknamePopoverRef = ref<any>()
const formRules = {
  nickname: {
    required: true,
    message: '请输入评论昵称',
    trigger: 'blur'
  },
}
const isShowEmoji = ref<boolean>(false)
const activeEmojiTab = ref<number>(0)

const getEmojiName = (activeEmojiTab: number) => {
  switch (activeEmojiTab) {
    case 0:
      return '小电视'
    case 1:
      return '阿鲁'
    case 2:
      return '贴吧'
  }
}

const handleShowEmoji = () => {
  isShowEmoji.value = !isShowEmoji.value
}

const handleInsertEmoji = (name: string) => {
  const start = textareaRef.value.$refs.textarea.selectionStart
  const end = textareaRef.value.$refs.textarea.selectionEnd
  commentForm.content = commentForm.content.substring(0, start) + name + commentForm.content.substring(end)
  textareaRef.value.focus()
  const selection = start + name.length
  nextTick(() => {
    textareaRef.value.$refs.textarea.setSelectionRange(selection, selection)
  })
}
</script>

<template>
  <div class="form">
    <h3>
      发表评论
      <el-button
          class="m-small"
          size="mini"
          type="primary"
          @click="setCurrentCommentId('-1')"
          v-show="currentCommentId !== '-1'"
      >
        取消回复
      </el-button>
    </h3>
    <!--    <el-form :inline="true" :model="commentForm" :rules="formRules" ref="formRef">-->
    <!--      <el-input class="textarea"-->
    <!--                type="textarea"-->
    <!--                ref="textareaRef"-->
    <!--                :rows="5"-->
    <!--                v-model="commentForm.content"-->
    <!--                placeholder="评论千万条，友善第一条"-->
    <!--                maxlength="250"-->
    <!--                show-word-limit-->
    <!--                :validate-event="false"/>-->
    <!--      <div class="el-form-item el-form-item&#45;&#45;small emoji">-->
    <!--        <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png" alt="选择表情" @click="handleShowEmoji">-->
    <!--        <div class="mask" v-show="isShowEmoji" @click="handleShowEmoji"/>-->
    <!--        <div class="emoji-box" v-show="isShowEmoji">-->
    <!--          <div class="emoji-title">-->
    <!--            <span>{{ getEmojiName(activeEmojiTab) }}</span>-->
    <!--          </div>-->
    <!--          <div class="emoji-wrap" v-show="activeEmojiTab === 0">-->
    <!--            <div class="emoji-list"-->
    <!--                 v-for="(img,index) in tvMapper"-->
    <!--                 :key="index"-->
    <!--                 @click="handleInsertEmoji(img.name)"-->
    <!--            >-->
    <!--              <img :alt="img.name" :src="img.src" :title="img.name">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="emoji-wrap" v-show="activeEmojiTab === 1">-->
    <!--            <div class="emoji-list"-->
    <!--                 v-for="(img,index) in aruMapper"-->
    <!--                 :key="index"-->
    <!--                 @click="handleInsertEmoji(img.name)"-->
    <!--            >-->
    <!--              <img :alt="img.name" :src="img.src" :title="img.name">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="emoji-wrap" v-show="activeEmojiTab === 2">-->
    <!--            <div class="emoji-list"-->
    <!--                 v-for="(img,index) in paopaoMapper"-->
    <!--                 :key="index"-->
    <!--                 @click="handleInsertEmoji(img.name)"-->
    <!--            >-->
    <!--              <img :alt="img.name" :src="img.src" :title="img.name">-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="emoji-tabs">-->
    <!--            <a class="tab-link" :class="{'m-active':activeEmojiTab === 0}" @click="activeEmojiTab = 0">-->
    <!--              <img alt="小电视" :src="tvMapper[0].src">-->
    <!--            </a>-->
    <!--            <a class="tab-link" :class="{'m-active':activeEmojiTab === 1}" @click="activeEmojiTab = 1">-->
    <!--              <img alt="阿鲁" :src="aruMapper[0].src">-->
    <!--            </a>-->
    <!--            <a class="tab-link" :class="{'m-active':activeEmojiTab === 2}" @click="activeEmojiTab = 2">-->
    <!--              <img alt="贴吧" :src="paopaoMapper[0].src">-->
    <!--            </a>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--      <el-form-item prop="nickname">-->
    <!--        <el-popover ref="nicknamePopoverRef" :virtual-ref="qqInputRef" placement="bottom" trigger="focus" content="输入QQ号将自动获取昵称和头像"/>-->
    <!--        <el-input v-model="commentForm.nickname" placeholder="昵称（必填）"/>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item>-->
    <!--        <el-input v-model="commentForm.qq" ref="qqInputRef" placeholder="输入QQ号将自动获取头像"/>-->
    <!--      </el-form-item>-->
    <!--      <el-form-item>-->
    <!--        <el-button type="primary">发表评论</el-button>-->
    <!--      </el-form-item>-->
    <!--    </el-form>-->
    <n-form
        ref="formRef"
        :inline="true"
        :label-width="80"
        :model="commentForm"
        :rules="formRules"
        size="medium"
    >
<!--      <n-input-->
<!--          v-model:value="commentForm.content"-->
<!--          type="textarea"-->
<!--          placeholder="评论千万条，友善第一条"-->
<!--          :maxlength="250"-->
<!--          :autosize="{-->
<!--            minRows: 3,-->
<!--            maxRows: 5-->
<!--          }"-->
<!--      />-->
      <div class="el-form-item el-form-item--small emoji">
        <img src="https://cdn.jsdelivr.net/gh/Naccl/blog-resource/img/paopao/1.png" alt="选择表情" @click="handleShowEmoji">
        <div class="mask" v-show="isShowEmoji" @click="handleShowEmoji"/>
        <div class="emoji-box" v-show="isShowEmoji">
          <div class="emoji-title">
            <span>{{ getEmojiName(activeEmojiTab) }}</span>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 0">
            <div class="emoji-list"
                 v-for="(img,index) in tvMapper"
                 :key="index"
                 @click="handleInsertEmoji(img.name)"
            >
              <img :alt="img.name" :src="img.src" :title="img.name">
            </div>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 1">
            <div class="emoji-list"
                 v-for="(img,index) in aruMapper"
                 :key="index"
                 @click="handleInsertEmoji(img.name)"
            >
              <img :alt="img.name" :src="img.src" :title="img.name">
            </div>
          </div>
          <div class="emoji-wrap" v-show="activeEmojiTab === 2">
            <div class="emoji-list"
                 v-for="(img,index) in paopaoMapper"
                 :key="index"
                 @click="handleInsertEmoji(img.name)"
            >
              <img :alt="img.name" :src="img.src" :title="img.name">
            </div>
          </div>
          <div class="emoji-tabs">
            <a class="tab-link" :class="{'m-active':activeEmojiTab === 0}" @click="activeEmojiTab = 0">
              <img alt="小电视" :src="tvMapper[0].src">
            </a>
            <a class="tab-link" :class="{'m-active':activeEmojiTab === 1}" @click="activeEmojiTab = 1">
              <img alt="阿鲁" :src="aruMapper[0].src">
            </a>
            <a class="tab-link" :class="{'m-active':activeEmojiTab === 2}" @click="activeEmojiTab = 2">
              <img alt="贴吧" :src="paopaoMapper[0].src">
            </a>
          </div>
        </div>
      </div>
    </n-form>
  </div>
</template>

<style scoped>
.form {
  background: #fff;
  position: relative;
}

.form h3 {
  margin: 5px;
  font-weight: 500 !important;
}

.form .m-small {
  margin-left: 5px;
  padding: 4px 5px;
}

.el-form .textarea {
  margin-top: 5px;
  margin-bottom: 15px;
}

.el-form textarea {
  padding: 6px 8px;
}

.el-form textarea, .el-form input {
  color: black;
}

.el-form .el-form-item__label {
  padding-right: 3px;
}

.emoji {
  margin-right: 5px;
  position: relative;
  user-select: none;
}

.emoji > img {
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
}

.emoji > img:hover {
  transform: rotate(360deg);
  -webkit-transform: rotate(360deg);
  -moz-transform: rotate(360deg);
  -o-transform: rotate(360deg);
}

.emoji-box {
  color: #222;
  overflow: visible;
  background: #fff;
  border: 1px solid #E5E9EF;
  box-shadow: 0 11px 12px 0 rgba(106, 115, 133, 0.3);
  border-radius: 8px;
  width: 340px;
  position: absolute;
  top: 40px;
  z-index: 100;
}

.emoji-box * {
  box-sizing: content-box;
}

.emoji-box .emoji-title {
  font-size: 12px;
  line-height: 16px;
  margin: 13px 15px 0;
  color: #757575;
}

.emoji-box .emoji-wrap {
  margin: 6px 11px 0 11px;
  height: 185px;
  overflow: auto;
  word-break: break-word;
}

.emoji-box .emoji-wrap .emoji-list {
  height: 33px;
  color: #111;
  border-radius: 4px;
  transition: background 0.2s;
  display: inline-block;
  outline: 0;
  cursor: pointer;
}

.emoji-box .emoji-wrap .emoji-list:hover {
  background-color: #ddd;
}

.emoji-box .emoji-wrap .emoji-list img {
  margin: 4px;
  width: 25px;
  height: 25px;
}

.emoji-box .emoji-tabs {
  position: relative;
  height: 36px;
  overflow: hidden;
  background-color: #f4f4f4;
  border-radius: 0 0 4px 4px;
}

.emoji-box .emoji-tabs .tab-link {
  cursor: pointer;
  float: left;
  padding: 7px 18px;
  width: 22px;
  height: 22px;
}

.emoji-box .emoji-tabs .tab-link.m-active {
  background-color: #fff;
}

.emoji-box .emoji-tabs .tab-link img {
  width: 22px;
}

.emoji-box .emoji-tabs .tab-link:hover {
  background: #e7e7e7;
}

.mask {
  pointer-events: auto;
  position: fixed;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>