import request from "@/utils/request";

export function getAboutData() {
  return request({
    url: 'about'
  })
}