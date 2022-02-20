const state = {
	//可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
	},
	siteInfo: {
		blogName: '',
		commentAdminFlag: false,
		reward: '',
		copyright: {
			title: '',
			siteName: ''
		},
		webTitleSuffix: '',
		footerImgTitle: '',
		footerImgUrl: ''
	},
	introduction: {
		avatar: '',
		name: '',
		rollText: '',
		bilibili: '',
		email: '',
		favorites: [],
		github: '',
		bangumi: '',
		qq: '',
	},
	// 专注模式
	focusMode: false,
	// 博客文章渲染完成的标记
	isBlogRenderComplete: false,
	// 主页当前页码
	currentHomePageNum: 1
}

export default state
