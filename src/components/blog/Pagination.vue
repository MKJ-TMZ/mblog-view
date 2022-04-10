<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { SCROLL_TO_TOP } from "@/store/mutations-types";

const store = useStore()
const route = useRoute()
const props = defineProps({
  getBlogList: {
    type: Function,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  currentPageNum: {
    type: Number,
    required: true
  }
})

const clientSize: any = computed(() => store.state.clientSize)

const handleCurrentChange = (newPage: number) => {
  const { clientHeight } = clientSize.value
  const { getBlogList } = props
  if (route.path === '/home') {
    window.scrollTo({top: clientHeight, behavior: 'smooth'})
  } else {
    store.commit(SCROLL_TO_TOP)
  }
  getBlogList(newPage)
}
</script>

<template>
  <div class="ui bottom" style="display: flex; justify-content: center;">
    <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPageNum"
        :total="total"
        :page-size="10"
        layout="prev, pager, next"
        background
        hide-on-single-page
    />
  </div>
</template>

<style lang="less" scoped>
:deep(.el-pagination.is-background) .btn-next, :deep(.el-pagination.is-background) .btn-prev, :deep(.el-pagination.is-background .el-pager li) {
  background-color: #ffffff !important;
}

:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #66CCFF !important;
}
</style>