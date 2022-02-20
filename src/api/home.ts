export function getBlogList(pageNum: number) {
  return {
    totalPage: 10,
    list: [
      {
        id: 1,
        title: "first blog",
        description: "<img src='https://w.wallhaven.cc/full/pk/wallhaven-pkgkkp.png' alt='图片' />",
        createTime: "2022-02-04T11:40:12.000+0000",
        views: 9,
        words: 10,
        readTime: 0,
        top: true,
        password: "",
        privacy: false,
        category: {
          id: null,
          name: "tag",
          blogs: []
        },
        tags: [
          {
            id: null,
            name: "test",
            color: "orange",
            blogs: []
          }
        ]
      },
      {
        id: 2,
        title: "Hello",
        description: "<p>Hello</p>\n",
        createTime: "2022-02-19T07:06:16.000+0000",
        views: 0,
        words: 100,
        readTime: 1,
        top: false,
        password: "",
        privacy: false,
        category: {
          id: null,
          name: "tag",
          blogs: []
        },
        tags: [
          {
            id: null,
            name: "test",
            color: "orange",
            blogs: []
          }
        ]
      }
    ]
  }
}