import {
  SAVE_CLIENT_SIZE,
  SAVE_INTRODUCTION,
  SAVE_SITE_INFO,
  SAVE_CURRENT_HOME_PAGE_NUM,
  SCROLL_TO_TOP
} from "./mutations-types";

export default {
  [SAVE_CLIENT_SIZE](state: any, clientSize: any) {
    state.clientSize = clientSize
  },
  [SAVE_SITE_INFO](state: any, siteInfo: any) {
    state.siteInfo = siteInfo
  },
  [SAVE_INTRODUCTION](state: any, introduction: any) {
    state.introduction = introduction
  },
  [SAVE_CURRENT_HOME_PAGE_NUM](state: any, currentHomePageNum: number) {
    state.currentHomePageNum = currentHomePageNum
  },
  [SCROLL_TO_TOP]() {
    const cubic = (value: number) => Math.pow(value, 3);
    const easeInOutCubic = (value: number) => value < 0.5 ? cubic(value * 2) / 2 : 1 - cubic((1 - value) * 2) / 2;
    // 滚动至页面顶部，使用 ElementPlus 回到顶部 组件中的算法
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
  },
}
