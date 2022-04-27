import request from "@/utils/request";

export function getCategoryList() {
  return request({
    url: 'category/list'
  })
}

export function getCategoryName(id: string) {
  return request({
    url: `category/${id}`
  })
}
