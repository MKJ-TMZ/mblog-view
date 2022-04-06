import {
  SAVE_CLIENT_SIZE,
  SAVE_PROFILE_SETTING,
  SAVE_BASE_SETTING,
  SAVE_CURRENT_HOME_PAGE_NUM,
  SCROLL_TO_TOP,
  SAVE_IS_BLOG_RENDER_COMPLETE,
  SAVE_FOCUS_MODE,
  SAVE_CURRENT_CATEGORY_PAGE_NUM,
  SAVE_CURRENT_CATEGORY_NAME,
  SAVE_CURRENT_TAG_PAGE_NUM,
  SAVE_CURRENT_TAG_NAME
} from "./mutations-types";

export default {
  [SAVE_CLIENT_SIZE](state: any, clientSize: any) {
    state.clientSize = clientSize
  },
  [SAVE_BASE_SETTING](state: any, baseSetting: any) {
    state.baseSetting = baseSetting
  },
  [SAVE_PROFILE_SETTING](state: any, profileSetting: any) {
    state.profileSetting = profileSetting
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
  [SAVE_IS_BLOG_RENDER_COMPLETE](state: any, blogState: boolean) {
    state.isBlogRenderComplete = blogState
  },
  [SAVE_FOCUS_MODE](state: any, focusMode: boolean) {
    state.focusMode = focusMode
  },
  [SAVE_CURRENT_CATEGORY_PAGE_NUM](state: any, currentCategoryPageNum: number) {
    state.currentCategoryPageNum = currentCategoryPageNum
  },
  [SAVE_CURRENT_CATEGORY_NAME](state: any, currentCategoryName: string) {
    state.currentCategoryName = currentCategoryName
  },
  [SAVE_CURRENT_TAG_PAGE_NUM](state: any, currentTagPageNum: number) {
    state.currentTagPageNum = currentTagPageNum
  },
  [SAVE_CURRENT_TAG_NAME](state: any, currentTagName: string) {
    state.currentTagName = currentTagName
  },
}
