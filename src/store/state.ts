interface StateType {
	clientSize: {
		clientHeight: number,
		clientWidth: number
	},
	introduction: {
		avatar: string,
		name: string,
		rollText: string,
		bilibili: string,
		email: string,
		favorites: any[],
		github: string,
		bangumi: string,
		qq: string,
	},
	focusMode: boolean,
	isBlogRenderComplete: boolean
}

const state: StateType = {
	//可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
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
	//专注模式
	focusMode: false,
	//博客文章渲染完成的标记
	isBlogRenderComplete: false,
}

export { state, StateType }
