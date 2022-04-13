import request from "@/utils/request";

export function getArchivesData() {
  return request({
    url: 'blog/archives'
  })
}

export function getCount() {
  return request({
    url: 'blog/count'
  })
}