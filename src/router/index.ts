import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import { SCROLL_TO_TOP, SAVE_CURRENT_HOME_PAGE_NUM, SAVE_IS_BLOG_RENDER_COMPLETE } from "@/store/mutations-types";

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
        path: '/moments',
        name: 'moments',
        component: () => import('@/components/Test.vue'),
        meta: {
          title: '动态'
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
  if (to.name !== 'home') {
    store.commit(SCROLL_TO_TOP)
  }

  if (to.name === 'blog') {
    store.commit(SAVE_IS_BLOG_RENDER_COMPLETE, false)
  }

  // 从主页访问博客再返回原页面，分页页数不变
  if (!((from.name === 'blog' && to.name === 'home') || (from.name === 'home' && to.name === 'blog'))) {
    store.commit(SAVE_CURRENT_HOME_PAGE_NUM, 1)
  }
  next()
})

export default router
