import {
  SAVE_CLIENT_SIZE,
  SAVE_INTRODUCTION,
  SAVE_SITE_INFO,
  SAVE_HOME_TOTAL_PAGE
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
  [SAVE_HOME_TOTAL_PAGE](state: any, homeTotalPage: number) {
    state.homeTotalPage = homeTotalPage
  },
}
