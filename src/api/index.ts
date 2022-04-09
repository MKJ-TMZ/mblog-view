import request from "@/utils/request";

export function getBaseSetting() {
  return request({
    url: 'setting/base'
  })
}

export function getProfileSetting() {
  return request({
    url: 'setting/profile'
  })
}

export function getFooterSetting() {
  return request({
    url: 'setting/footer'
  })
}

export function getSite() {
  return {
    // siteInfo: {
    //   blogName: `MTCode's blog`,
    //   commentAdminFlag: false,
    //   reward: "/img/qr.png",
    //   copyright: {
    //     title: "Copyright © 2021 - 2022",
    //     siteName: "MTCode's Blog"
    //   },
    //   webTitleSuffix: "MTCode's Blog",
    //   footerImgTitle: "手机看本站",
    //   footerImgUrl: "/img/qr.png"
    // },
    categoryList: [
      {name: '菜单1'},
      {name: '菜单2'},
      {name: '菜单3'},
      {name: '菜单4'},
    ],
    randomBlogList: [
      {
        createTime: '2022-02-04T11:40:12.000+0000',
        firstPicture: 'https://w.wallhaven.cc/full/pk/wallhaven-pkgkkp.png',
        id: 1,
        password: '',
        privacy: false,
        title: 'first blog',
      },
      {
        createTime: '2022-02-07T14:22:12.000+0000',
        firstPicture: 'https://w.wallhaven.cc/full/y8/wallhaven-y8vlyk.jpg',
        id: 2,
        password: '',
        privacy: false,
        title: 'Hello',
      }
    ],
    tagList: [
      {
        blogs: [],
        color: "orange",
        id: null,
        name: "test"
      }
    ],
    badges: [
      {
        title: "由 Spring Boot 强力驱动",
        url: "https://spring.io/projects/spring-boot/",
        subject: "Powered",
        value: "Spring Boot",
        color: "blue"
      },
      {
        title: "Vue.js 客户端渲染",
        url: "https://cn.vuejs.org/",
        subject: "SPA",
        value: "Vue.js",
        color: "brightgreen"
      },
      {
        title: "UI 框架 Semantic-UI",
        url: "https://semantic-ui.com/",
        subject: "UI",
        value: "Semantic-UI",
        color: "semantic-ui"
      },
      {
        title: "GitHub",
        url: "https://github.com/",
        subject: "OSS",
        value: "GitHub",
        color: "github"
      },
      {
        title: "本站点采用 CC BY 4.0 国际许可协议进行许可",
        url: "https://creativecommons.org/licenses/by/4.0/",
        subject: "CC",
        value: "BY 4.0",
        color: "lightgray"
      }
    ],
    newBlogList: []
  }
}

export function getHitokoto() {
  return request({
    url: 'https://v1.hitokoto.cn/?c=d',
    method: 'GET'
  })
}