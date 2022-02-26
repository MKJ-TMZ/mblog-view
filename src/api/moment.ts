export function getMomentListData(pageNum: number) {
  return {
    "totalPage": 5,
    "list": [
      {
        "id": 2,
        "content": "<p>Hi<img src=\"https://w.wallhaven.cc/full/y8/wallhaven-y8vlyk.jpg\" alt=\"图片\" /></p>\n",
        "createTime": "2022-02-26T03:06:02.000+0000",
        "likeNum": 3,
        "published": false
      },
      {
        "id": 1,
        "content": "<p>Hello World</p>\n",
        "createTime": "2022-02-26T03:05:20.000+0000",
        "likeNum": 5,
        "published": true
      }
    ]
  }
}

export function likeMoment(id: number) {
  return {}
}