import request from "@/utils/request";

export function getTagList() {
  return request({
    url: 'tag/list'
  })
}

export function getTag(id: string) {
  return request({
    url: `tag/${id}`
  })
}