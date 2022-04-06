<script setup lang="ts">
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore()

const profileSetting: any = computed(() => store.state.profileSetting)
</script>

<template>
  <div>
    <div class="ui segments m-box">
      <div class="ui card">
        <div class="image">
          <img :src="profileSetting.coverUrl">
        </div>
        <div class="content">
          <div class="header">{{ profileSetting.nickname }}</div>
          <div class="m-margin-top" style="font-size: 15px;">{{ profileSetting.autograph }}</div>
        </div>
        <div class="extra content">
          <a :href="profileSetting.githubUrl"
             v-if="profileSetting.githubUrl"
             class="ui circular icon button"
             style="color: #3e75c3"
             target="_blank"
          >
            <span class="iconfont icon-github"/>
          </a>
          <a :href="profileSetting.qqUrl"
             v-if="profileSetting.qqUrl"
             style="color: #4cafe9"
             class="ui circular icon button">
            <span class="iconfont icon-qq"/>
          </a>
          <a :href="profileSetting.biliUrl"
             v-if="profileSetting.biliUrl"
             class="ui circular icon button"
             style="color: #20b0e3"
             target="_blank">
            <span class="iconfont icon-bilibili"/>
          </a>
          <a :href="profileSetting.bangumiUrl"
             v-if="profileSetting.bangumiUrl"
             class="ui circular icon button"
             style="color: #f93292"
             target="_blank">
            <span class="iconfont icon-bangumi-icon"/>
          </a>
          <a :href="profileSetting.emailUrl"
             v-if="profileSetting.emailUrl"
             style="color: #42a5f5"
             class="ui circular icon button">
            <span class="iconfont icon-email"/>
          </a>
        </div>
        <div>
          <el-collapse accordion>
            <el-collapse-item :title="item.title" :name="index" v-for="(item, index) in profileSetting.customList" :key="index">
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