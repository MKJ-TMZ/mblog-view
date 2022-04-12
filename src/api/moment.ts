import request from "@/utils/request";

export function getMomentListData(current: number) {
  return request({
    url: `moment/page/${current}`
  })
}

export function likeMoment(id: number) {
  return request({
    url: `moment/like/${id}`
  })
}