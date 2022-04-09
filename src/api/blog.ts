import request from "@/utils/request";

export function getRecommendList() {
  return request({
    url: 'blog/recommend'
  })
}

export function getSearchBlogList(query: string) {
  return [
    {id: 1, title: "111", content: "11223"},
    {id: 2, title: "222", content: "长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试长度测试"},
    {id: 3, title: "333", content: "22222"}
  ]
}

export function getBlogById(id: number) {
  return request({
    url: `blog/${id}`
  })
}