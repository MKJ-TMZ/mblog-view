import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'semantic-ui-css/semantic.min.css'
//自定义全局css
import '@/assets/css/base.less'

const app = createApp(App)

app.config.globalProperties.msgSuccess = function (msg: string) {
  this.$message.success(msg)
}

app.config.globalProperties.msgError = function (msg: string) {
  this.$message.error(msg)
}

app.config.globalProperties.msgInfo = function (msg: string) {
  this.$message.info(msg)
}

app.use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')
