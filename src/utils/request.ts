import axios from "axios";
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const request = axios.create({
	baseURL: 'http://localhost:8888/',
	timeout: 10000,
})

// 请求拦截
request.interceptors.request.use(
	(config: any) => {
		NProgress.start()
		return config
	}
)

// 响应拦截
request.interceptors.response.use(
	(config: any) => {
		NProgress.done()
		return config.data
	}
)

export default request