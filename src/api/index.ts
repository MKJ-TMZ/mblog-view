export function getSite() {
  return{
    siteInfo: { blogName: `MTCode's blog` },
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
    ]
  }
}