<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSearchBlogList } from "@/api/blog";

const props = defineProps({
  blogName: {
    type: String,
    required: true
  },
  categoryList: {
    type: Array,
    required: true
  },
})
const route = useRoute()
const router = useRouter()
const store = useStore()

const clientSize = computed(() => store.state.clientSize)

const mobileHide = ref<boolean>(true)
const queryString = ref<string>('')
let queryResult = reactive<object[]>([])
const navRef = ref<any>(null)

watch(
    () => route.path,
    () => {
      mobileHide.value = true
    }
)

const toggle = () => {
  mobileHide.value = !mobileHide.value
}

const categoryRoute = (name: string) => {
  router.push(`/category/${name}`)
}

const debounceQuery = (queryString: string, callback: (queryResult: object[]) => void) => {
  // setTimeout(() => querySearchAsync(queryString, callback), 1000)
  querySearchAsync(queryString, callback)
}

const querySearchAsync = (queryString: string, callback: (queryResult: object[]) => void) => {
  if (queryString === null
      || queryString.trim() === ''
      || queryString.indexOf('%') !== -1
      || queryString.indexOf('_') !== -1
      || queryString.indexOf('[') !== -1
      || queryString.indexOf('#') !== -1
      || queryString.indexOf('*') !== -1
      || queryString.trim().length > 20) {
    return
  }

  // TODO
  queryResult = getSearchBlogList(queryString)
  if (queryResult.length === 0) {
    queryResult.push({id: -1, title: '无相关搜索结果', content: ''})
  }

  callback(queryResult)
}

const handleSelect = (item: { id: number }) => {
  const { id } = item
  if (id) {
    router.push(`/blog/${id}`)
  }
}

const handleScrollListener = () => {
  const {clientWidth, clientHeight} = clientSize.value
  //首页且不是移动端
  if (route.name === 'home' && clientWidth > 768) {
    if (window.scrollY > clientHeight / 2) {
      navRef.value.classList.remove('transparent')
    } else {
      if (navRef.value !== null) {
        navRef.value.classList.add('transparent')
      }
    }
  }
}

const handleClickListener = (e: any) => {
  let flag = e.path.some((item: any) => {
    //判断是否是nav的点击事件
    if (item === navRef.value) {
      return true
    }
  })
  //如果导航栏是打开状态，且点击的元素不是Nav的子元素，则收起菜单
  if (!mobileHide.value && !flag) {
    mobileHide.value = true
  }
}

onMounted(() => {
  //监听页面滚动位置，改变导航栏的显示
  window.addEventListener('scroll', handleScrollListener)
  //监听点击事件，收起导航菜单
  document.addEventListener('click', handleClickListener)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScrollListener)
  document.removeEventListener('click', handleClickListener)
})
</script>

<template>
  <div ref="navRef" class="ui fixed inverted stackable pointing menu"
       :class="{'transparent':$route.name==='home'}">
    <div class="ui container">
      <router-link to="/">
        <h3 class="ui header item m-blue">{{ blogName }}</h3>
      </router-link>
      <router-link to="/home" class="item" :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'home'}">
        <i class="home icon"/>首页
      </router-link>
      <el-dropdown popper-class="m-dropdown-popper" @command="categoryRoute">
				<span class="el-dropdown-link item"
              :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'category'}">
					<i class="idea icon"/>分类<i class="caret down icon"></i>
				</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :command="category.name" v-for="(category,index) in categoryList" :key="index">
              {{ category.name }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <router-link to="/archives" class="item"
                   :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'archives'}">
        <i class="clone icon"/>归档
      </router-link>
      <router-link to="/moments" class="item"
                   :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'moments'}">
        <i class="comment alternate outline icon"/>动态
      </router-link>
      <router-link to="/friends" class="item"
                   :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'friends'}">
        <i class="users icon"/>友人帐
      </router-link>
      <router-link to="/about" class="item" :class="{'m-mobile-hide': mobileHide, 'active': $route.name === 'about'}">
        <i class="info icon"/>关于我
      </router-link>
      <el-autocomplete
          v-model="queryString"
          :fetch-suggestions="debounceQuery"
          placeholder="Search..."
          class="right item m-search"
          :class="{'m-mobile-hide': mobileHide}"
          popper-class="m-search-popper"
          @select="handleSelect"
      >
        <template #suffix>
          <i class="search icon el-input__icon"/>
        </template>
        <template #default="{ item }">
          <div class="title">{{ item.title }}</div>
          <span class="content">{{ item.content }}</span>
        </template>
      </el-autocomplete>
      <button class="ui menu black icon button m-right-top m-mobile-show" @click="toggle">
        <i class="sidebar icon"/>
      </button>
    </div>
  </div>
</template>

<style lang="less">
.ui.fixed.menu .container {
  width: 1400px !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.ui.fixed.menu {
  transition: .3s ease-out;
}

@media screen and (min-width: 768px) {
  .ui.inverted.pointing.menu.transparent {
    background: transparent !important;
  }

  .ui.inverted.pointing.menu.transparent .active.item:after {
    background: transparent !important;
    transition: .3s ease-out;
  }

  .ui.inverted.pointing.menu.transparent .active.item:hover:after {
    background: transparent !important;
  }
}

@media screen and (max-width: 768px) {
  .ui.inverted.pointing.menu .active.item:after {
    display: none;
  }
}

.el-tooltip__trigger {
  @media screen and (max-width: 768px) {
    width: 100vw !important;
  }
}

.el-dropdown-link {
  outline-style: none !important;
  outline-color: unset !important;
  height: 100%;
  cursor: pointer;
}

.el-dropdown-menu {
  margin: 0 !important;
  padding: 0 !important;
  border: 0 !important;
  background: #1b1c1d !important;
}

.el-dropdown-menu__item {
  color: rgba(255, 255, 255, .9) !important;
}

.el-dropdown-menu__item:hover {
  background: rgba(255, 255, 255, .08) !important;
}

.el-popper__arrow {
  display: none !important;
}

.m-dropdown-popper {
  top: 56px !important;
}

.m-search {
  min-width: 220px;
  padding: 0 !important;
}

.m-search input {
  border: 0 !important;
  background-color: inherit;
}

.m-search i {
  color: rgba(255, 255, 255, .9) !important;
}

.el-input__inner {
  min-width: 350px !important;
}

.m-search-item li {
  line-height: normal !important;
  padding: 8px 10px !important;
}

.m-search-popper {
  max-width: 350px;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    min-width: 97vw !important;
  }
}

.m-search-popper li .title {
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(0, 0, 0, 0.87);
}

.m-search-popper li .content {
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 12px;
  color: rgba(0, 0, 0, .70);
}

.m-right-top {
  width: 51px;
  height: 51px;
  position: absolute;
  top: 0;
  right: 0;
}
</style>
