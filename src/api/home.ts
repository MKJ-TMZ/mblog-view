import request from "@/utils/request";
// @ts-ignore
import qs from 'qs'

export function getBlogList(current: number, param?: any) {
  return request({
    url: `blog/page/${current}?${qs.stringify(param)}`
  })
}