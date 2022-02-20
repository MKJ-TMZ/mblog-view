import { createApp, getCurrentInstance } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'semantic-ui-css/semantic.min.css'
// 阿里巴巴矢量图标
import '@/assets/icon/iconfont.css'
// typo.less
import "@/assets/less/typo.less";
// 自定义全局css
import '@/assets/less/base.less'
// prism代码高亮
import '@/assets/lib/prism/prism.css';
// v-viewer图片预览组件
import Viewer from "v-viewer";
import 'viewerjs/dist/viewer.css'

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


app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(Viewer)
  .mount('#app')
