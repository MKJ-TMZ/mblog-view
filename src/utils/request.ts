import axios from "axios";
// @ts-ignore
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { isNotEmpty } from "@/utils/func";
import { msgError } from "@/utils/message";

const request = axios.create({
	baseURL: 'http://192.168.21.158/',
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
	(res: any) => {
		NProgress.done()
		if (res.data.code !== 200 && isNotEmpty(res.data.msg)) {
			msgError(res.data.msg)
		}
		return res.data
	}
)

export default request