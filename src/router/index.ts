import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import {
  SCROLL_TO_TOP,
  SAVE_CURRENT_HOME_PAGE_NUM,
  SAVE_IS_BLOG_RENDER_COMPLETE,
  SAVE_CURRENT_CATEGORY_PAGE_NUM,
  SAVE_CURRENT_CATEGORY_NAME,
  SAVE_CURRENT_TAG_PAGE_NUM,
  SAVE_CURRENT_TAG_NAME
} from "@/store/mutations-types";

const routes = [
  {
    path: '/',
    component: () => import('@/views/Index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '首页'
        }
      },
      {
        path: '/blog/:blogId',
        name: 'blog',
        component: () => import('@/views/blog/Blog.vue'),
        meta: {
          title: '博客'
        }
      },
      {
        path: '/category/:name',
        name: 'category',
        component: () => import('@/views/category/Category.vue'),
        meta: {
          title: '分类'
        }
      },
      {
        path: '/tag/:name',
        name: 'tag',
        component: () => import('@/views/tag/Tag.vue'),
        meta: {
          title: '标签'
        }
      },
      {
        path: '/archives',
        name: 'archives',
        component: () => import('@/views/archives/Archives.vue'),
        meta: {
          title: '归档'
        }
      },
      {
        path: '/moments',
        name: 'moments',
        component: () => import('@/views/moments/Moments.vue'),
        meta: {
          title: '动态'
        }
      },
      {
        path: '/friends',
        name: 'friends',
        component: () => import('@/views/friends/Friends.vue'),
        meta: {
          title: '友人帐'
        }
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('@/views/about/About.vue'),
        meta: {
          title: '关于我'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

//挂载路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    if (store.state.siteInfo.webTitleSuffix) {
      document.title = to.meta.title + ' - ' + store.state.siteInfo.webTitleSuffix
    } else {
      document.title = to.meta.title + ''
    }
  }
  //路由改变时，页面滚动至顶部
  if (to.name !== 'home' && to.name !== 'category' && to.name !== 'tag') {

  }

  // 从非博客页面跳转，滚动到顶部
  if (from.name !== 'blog') {
    store.commit(SCROLL_TO_TOP)
  }

  // 博客加载状态
  if (to.name === 'blog') {
    store.commit(SAVE_IS_BLOG_RENDER_COMPLETE, false)
  }

  // 不是从主页访问博客再返回原页面，重置分页
  if (!((from.name === 'blog' && to.name === 'home') || (from.name === 'home' && to.name === 'blog'))) {
    store.commit(SAVE_CURRENT_HOME_PAGE_NUM, 1)
  }

  // 不是从分类页访问博客再返回原页面，重置分页
  if (!((from.name === 'blog' && to.name === 'category') || (from.name === 'category' && to.name === 'blog'))) {
    store.commit(SAVE_CURRENT_CATEGORY_PAGE_NUM, 1)
  }

  // 离开分类页前储存最近访问的分类名
  if (from.name === 'category') {
    store.commit(SAVE_CURRENT_CATEGORY_NAME, from.params.name)
  }

  // 如果将要访问分类页面，但分类名和最近访问的分类名不一致，就重置页码并返回顶部
  if (to.name === 'category' && to.params.name !== store.state.currentCategoryName) {
    store.commit(SAVE_CURRENT_CATEGORY_PAGE_NUM, 1)
    store.commit(SCROLL_TO_TOP)
  }

  // 不是从标签页访问博客再返回原页面，重置分页
  if (!((from.name === 'blog' && to.name === 'tag') || (from.name === 'tag' && to.name === 'blog'))) {
    store.commit(SAVE_CURRENT_TAG_PAGE_NUM, 1)
  }

  // 离开标签页前储存最近访问的标签名
  if (from.name === 'tag') {
    store.commit(SAVE_CURRENT_TAG_NAME, from.params.name)
  }

  // 如果将要访问标签页面，但标签名和最近访问的标签名不一致，就重置页码并返回顶部
  if (to.name === 'tag' && to.params.name !== store.state.currentTagName) {
    store.commit(SAVE_CURRENT_TAG_PAGE_NUM, 1)
    store.commit(SCROLL_TO_TOP)
  }
  next()
})

export default router
