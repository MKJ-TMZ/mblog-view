import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('@/views/Index')
const Home = () => import('@/views/Home')

const routes = [
  {
    path: '/',
    component: Index,
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: '首页'
        }
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
