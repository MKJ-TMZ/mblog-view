<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore()

const introduction: any = computed(() => store.state.introduction)
</script>

<template>
  <div>
    <div class="ui segments m-box">
      <div class="ui card">
        <div class="image">
          <img :src="introduction.avatar">
        </div>
        <div class="content">
          <div class="header">{{ introduction.name }}</div>
          <div class="m-margin-top" style="font-size: 15px;">{{ introduction.rollText }}</div>
        </div>
        <div class="extra content">
          <a :href="introduction.github" style="color: #3e75c3" v-if="introduction.github" target="_blank" class="ui circular icon button">
            <span class="iconfont icon-github"/>
          </a>
          <a :href="introduction.qq" style="color: #4cafe9" v-if="introduction.qq" class="ui circular icon button">
            <span class="iconfont icon-qq"/>
          </a>
          <a :href="introduction.bilibili" style="color: #20b0e3" v-if="introduction.bilibili" target="_blank" class="ui circular icon button">
            <span class="iconfont icon-bilibili"/>
          </a>
          <a :href="introduction.bangumi" style="color: #f93292" v-if="introduction.bangumi" target="_blank" class="ui circular icon button">
            <span class="iconfont icon-bangumi-icon"/>
          </a>
          <a :href="introduction.email" style="color: #42a5f5" v-if="introduction.email" class="ui circular icon button">
            <span class="iconfont icon-email"/>
          </a>
        </div>
        <div>
          <el-collapse accordion>
            <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in introduction.favorites" :key="index">
              <div>{{ item.content }}</div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.content {
  text-align: center;
}

.el-collapse-item {
  padding-left: 15px;
  padding-right: 15px;
}

</style>