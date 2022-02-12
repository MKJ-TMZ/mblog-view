interface StateType {
	clientSize: {
		clientHeight: number,
		clientWidth: number
	}
}

const state: StateType = {
	//可视窗口大小
	clientSize: {
		clientHeight: 0,
		clientWidth: 1080
	}
}

export { state, StateType }
