import { createApp, getCurrentInstance } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'semantic-ui-css/semantic.min.css'
//阿里巴巴矢量图标
import '@/assets/icon/iconfont.css'
//typo.css
import "@/assets/css/typo.css";
//自定义全局css
import '@/assets/css/base.less'

console.log(
  '%c MTCode %c By MTCode %c https://mkj-tmz.github.io/',
  'background:#35495e ; padding: 1px; border-radius: 3px 0 0 3px;  color: #fff',
  'background:#41b883 ; padding: 1px; border-radius: 0 3px 3px 0;  color: #000',
  'background:transparent'
)

const app = createApp(App)
const internalInstance: any = getCurrentInstance()

const msgSuccess = function (msg: string) {
  internalInstance.appContext.config.globalProperties.$message.success(msg)
}
app.provide('msgSuccess', msgSuccess);

const msgError = function (msg: string) {
  internalInstance.appContext.config.globalProperties.$message.error(msg)
}
app.provide('msgError', msgError);

const msgInfo = function (msg: string) {
  internalInstance.appContext.config.globalProperties.$message.info(msg)
}
app.provide('msgInfo', msgInfo);

const cubic = (value: number) => Math.pow(value, 3);
const easeInOutCubic = (value: number) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
//滚动至页面顶部，使用 ElementPlus 回到顶部 组件中的算法
const scrollToTop = function () {
  const el = document.documentElement
  const beginTime = Date.now()
  const beginValue = el.scrollTop
  const rAF = window.requestAnimationFrame || (func => setTimeout(func, 16))
  const frameFunc = () => {
    const progress = (Date.now() - beginTime) / 500;
    if (progress < 1) {
      el.scrollTop = beginValue * (1 - easeInOutCubic(progress))
      rAF(frameFunc)
    } else {
      el.scrollTop = 0
    }
  }
  rAF(frameFunc)
}
app.provide('scrollToTop', scrollToTop);

app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
