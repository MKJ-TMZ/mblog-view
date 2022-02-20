import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";
import { SAVE_HOME_TOTAL_PAGE } from "@/store/mutations-types";

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
        path: '/blog',
        name: 'blog',
        component: () => import('@/views/home/Home.vue'),
        meta: {
          title: '博客'
        }
      }
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
  if (to.name === 'home' && from.name !== 'blog') {
    store.commit(SAVE_HOME_TOTAL_PAGE, 1)
  }
  next()
})

export default router
