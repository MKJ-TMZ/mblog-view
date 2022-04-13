import request from "@/utils/request";

export function getFriendsData() {
  return request({
    url: 'friends'
  })

  // return {
  //   friendInfo: {
  //     content: '<p>随机排序，不分先后。欢迎交换友链~(￣▽￣)~*</p>\n<ul>\n<li>昵称：MTCode</li>\n<li>网址：<a href="https://mkj-tmz.github.io/" target=\"_blank\" rel=\"external nofollow noopener\">https://mkj-tmz.github.io/</a></li>\n<li>头像URL：<a href="/img/avatar.jpg" target="_blank" rel="external nofollow noopener">http://localhost:3000/img/avatar.jpg</a></li>\n</ul>\n<p>仅凭个人喜好添加友链，请在收到我的回复邮件后再于贵站添加本站链接。原则上已添加的友链不会删除，如果你发现自己被移除了，恕不另行通知，只需和我一样做就好。</p>\n',
  //     commentEnabled: true
  //   },
  //   friendList: [
  //     {
  //       nickname: "test",
  //       description: "test",
  //       website: "https://mkj-tmz.github.io/",
  //       avatar: "https://naccl.top/img/avatar.jpg"
  //     },
  //     {
  //       nickname: "MKJ",
  //       description: "妹控集 - 一个有点脱离时代的死宅",
  //       website: "https://mkj-tmz.github.io/",
  //       avatar: "https://naccl.top/img/avatar.jpg"
  //     }
  //   ]
  // }
}

export function addViewsByNickname(nickName: string) {
  return {}
}