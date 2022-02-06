import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import SemanticUI from "semantic-ui-vue";
import 'semantic-ui-css/semantic.min.css'
//自定义全局css
import '@/assets/css/base.less'

const app = createApp(App)

app.config.globalProperties.msgSuccess = function (msg) {
  this.$message.success(msg)
}

app.config.globalProperties.msgError = function (msg) {
  this.$message.error(msg)
}

app.config.globalProperties.msgInfo = function (msg) {
  this.$message.info(msg)
}

app.use(store)
  .use(router)
  .use(ElementPlus)
  .use(SemanticUI)
  .mount('#app')
