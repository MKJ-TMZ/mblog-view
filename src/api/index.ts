import axios from "@/plugins/axios";

export function getSite() {
  return {
    siteInfo: {
      blogName: `MTCode's blog`,
      commentAdminFlag: false,
      reward: "/img/qr.png",
      copyright: {
        title: "Copyright © 2021 - 2022",
        siteName: "MTCode's Blog"
      },
      webTitleSuffix: "MTCode's Blog",
      footerImgTitle: "手机看本站",
      footerImgUrl: "/img/qr.png"
    },
    categoryList: [
      {name: '菜单1'},
      {name: '菜单2'},
      {name: '菜单3'},
      {name: '菜单4'},
    ],
    introduction: {
      avatar: '/img/avatar.jpg',
      name: 'MTCode',
      rollText: '欢迎来到MTCode的博客',
      bilibili: 'https://space.bilibili.com/30572468',
      email: 'mailto:1318844659@qq.com',
      favorites: [
        {
          content: '来自新世界，白夜行，末日时在做什么',
          title: '最喜欢的小说'
        },
        {
          content: '黑暗之魂3，只狼，血缘诅咒，重力眩晕',
          title: '最喜欢的游戏'
        },
        {
          content: 'Java，React',
          title: '最喜欢的语言'
        }
      ],
      github: 'https://github.com/MKJ-TMZ',
      bangumi: 'https://bgm.tv/user/519359',
      qq: 'tencent://message/?uin=1318844659&Site=&Menu=yes',
    },
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
  return axios({
    url: 'https://v1.hitokoto.cn/?c=d',
    method: 'GET'
  })
}