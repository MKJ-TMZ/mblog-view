<script lang="ts" setup>
import { onBeforeMount, ref } from "vue";
import { getMomentListData, likeMoment } from "@/api/moment";
import { useStore } from "vuex";
import { ElNotification } from "element-plus";
import { SCROLL_TO_TOP } from "@/store/mutations-types";
import { dateFromNow } from '@/utils/momentUtil'
import { msgError, msgSuccess } from "@/utils/message";

const store = useStore()

const likeMomentIds =
    ref<any[]>(JSON.parse(window.localStorage.getItem('likeMomentIds') || '[]'))
const momentList = ref<any[]>([])
const current = ref<number>(1)
const total = ref<number>(0)

onBeforeMount(() => {
  getMomentList()
})

const getMomentList = () => {
  getMomentListData(current.value).then((res: any) => {
    if (res.code === 200) {
      const { data } = res
      momentList.value = data.records
      total.value = data.total
      console.log(total.value)
      current.value = data.current
    }
  }).catch((error: any) => {
    msgError('请求失败')
    console.log(error.msg)
  })
}

const isLike = (id: number): boolean => {
  return likeMomentIds.value.indexOf(id) > -1
}

const handlePageNumChange = (pageNum: number) => {
  store.commit(SCROLL_TO_TOP)
  current.value = pageNum
  getMomentList()
}

const handleLike = (id: number) => {
  if (isLike(id)) {
    ElNotification({
      message: '不可以重复点赞哦',
      type: 'warning',
    })
    return
  }
  likeMoment(id).then((res: any) => {
    if (res.code === 200) {
      msgSuccess('点赞成功')
      likeMomentIds.value.push(id)
      window.localStorage.setItem('likeMomentIds', JSON.stringify(likeMomentIds.value))
      momentList.value.map(moment => {
        if (moment.id === id) {
          return moment.likeCount++
        }
      })
    }
  }).catch((error: any) => {
    msgError('点赞失败')
    console.log(error)
  })

}
</script>

<template>
  <div>
    <div class="ui top attached segment" style="text-align: center">
      <h2 class="m-text-500">我的动态</h2>
    </div>
    <div class="ui attached segment m-padding-bottom-large">
      <div class="moments">
        <div class="moment" v-for="(moment, index) in momentList" :key="index">
          <div class="avatar">
            <img alt="" :src="store.state.profileSetting.coverUrl">
          </div>
          <div class="ui card">
            <div class="content m-top">
              <span style="font-weight: 700">{{ store.state.profileSetting.nickname }}</span>
              <span class="right floated">{{ dateFromNow(moment.createTime) }}</span>
            </div>
            <div class="content typo" :class="{privacy: !moment.isCopyable}" v-viewer v-html="moment.content"/>
            <div class="extra content">
              <a class="left floated" @click="handleLike(moment.id)">
                <i class="heart icon" :class="isLike(moment.id)?'like-color':'outline'"/>{{ moment.likeCount }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="ui bottom pagination-wrap">
        <el-pagination
            @current-change="handlePageNumChange"
            :current-page="current"
            :total="total"
            layout="prev, pager, next"
            class="pagination"
            background
            hide-on-single-page
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.avatar {
  margin-left: -62.5px;
  float: left;
}

.avatar img {
  height: 45px;
  width: 45px;
  border-radius: 500px;
}

.moments {
  margin-left: 26px;
  padding-left: 40px;
  border-left: 1px solid #dee5e7;
}

.moment {
  margin-top: 30px;
}

.moment:first-child {
  margin-top: 0;
}

.card {
  width: 100%;
}

.card:before {
  border-width: 0 0 1px 1px !important;
  transform: translateX(-50%) translateY(-50%) rotate(45deg) !important;
  bottom: auto !important;
  right: auto !important;
  top: 22px !important;
  left: 0 !important;
  position: absolute !important;
  content: '' !important;
  background-image: none !important;
  z-index: 2 !important;
  width: 12px !important;
  height: 12px !important;
  transition: background .1s ease !important;
  background-color: inherit !important;
  border-style: solid !important;
  border-color: #d4d4d5 !important;
}

.content.m-top {
  padding: 10px 14px !important;
}

.content .right.floated {
  font-size: 12px !important;
}

.content.typo * {
  font-size: 14px !important;
}

.extra.content {
  padding: 5px 14px !important;
}

.extra.content a {
  color: rgba(0, 0, 0, 0.7) !important;
  font-size: 12px !important;
}

.extra.content a:hover {
  color: red !important;
}

.extra.content .like-color {
  color: red !important;
}

.extra.content i {
  font-size: 12px !important;
}

.pagination-wrap {
  display: flex;
  justify-content: center;
  margin-top: 3em;
}


:deep(.el-pagination.is-background .el-pager li:not(.disabled).active) {
  background-color: #66CCFF !important;
}

.privacy {
  background: repeating-linear-gradient(145deg, #f2f2f2, #f2f2f2 15px, #fff 0, #fff 30px) !important;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>