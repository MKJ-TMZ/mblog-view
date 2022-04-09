const state = {
	//可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
	},
	baseSetting: {
		blogName: "",
		webTitleSuffix: "",
		homeTitle: "",
		copyright: "",
		icpNo: null,
		rewardUrl: "",
		createUser: "",
		createTime: "",
		updateTime: ""
	},
	profileSetting: {
		coverUrl: '',
		nickname: '',
		autograph: '',
		githubUrl: '',
		qqUrl: '',
		biliUrl: '',
		bangumiUrl: '',
		emailUrl: '',
		customList: [],
	},
	footerSetting: {
		badgeList: [],
		newBlogList: []
	},
	// 专注模式
	focusMode: false,
	// 博客文章渲染完成的标记
	isBlogRenderComplete: false,
	// 主页当前页码
	currentHomePageNum: 1,
	// 分类当前页码
	currentCategoryPageNum: 1,
	// 当前分类名称
	currentCategoryName: '',
	// 标签当前页码
	currentTagPageNum: 1,
	// 当前标签名称
	currentTagName: '',
}

export default state
