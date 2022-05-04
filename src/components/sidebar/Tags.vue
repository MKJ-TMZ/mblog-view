<script lang="ts" setup>
const props = defineProps({
  tagList: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <!--标签云-->
  <div class="ui segments m-box">
    <div class="ui secondary segment m-none-select"><i class="tags icon"></i>标签云</div>
    <div class="ui yellow segment m-padding-small">
      <router-link :to="`/tag/${tag.id}`" class="ui label m-text" :class="tag.color" v-for="tag in tagList" :key="tag.id">
        {{ tag.name }}
      </router-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .secondary.segment {
    padding: 10px;
  }

  .m-padding-small {
    padding: 7px;
  }

  .label {
    margin: 3px !important;
  }
</style>