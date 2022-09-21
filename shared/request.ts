import {errorTip, successTip, showLoading} from './utils'
import {httpHeader} from '../services/login'
const server = '';

const requestCommonParams = {
	fail() {
		errorTip('网络请求失败')
	},
	header: httpHeader
}

interface responseData<T> {
	code: number
	message: string
	result: T
}

function RequestMiddleware (isShowLoading: boolean) {
	return new Promise<void>((resolve)=>{
		if (isShowLoading) showLoading(true)
		resolve()
	})
}

function ResponseMiddleware<T> (res: UniApp.RequestSuccessCallbackResult | UniApp.UploadFileSuccessCallbackResult, resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: any) => void, isShowMessage?: boolean, isShowLoading?: boolean) {
	const responseData = res.data as responseData<T>
	if (isShowLoading) showLoading(false)
	switch (res.statusCode) {
		case 200:
			switch (responseData.code) {
				case 200:
					if (isShowMessage) {
						successTip(responseData.message) 
					}
					resolve(responseData.result)
					break
				case 401:
					// 沒有token返回登录页面
					uni.navigateTo({
						url: '/pages/login/index'
					})
					reject()
					break
				default:
					errorTip(responseData.message)
					reject()
			}
			break
		case 401:
			// 沒有token返回登录页面
			uni.navigateTo({
				url: '/pages/login/index'
			})
			reject()
			break
		default:
			const message = responseData?.message  ?? '网络请求失败';
			errorTip(message) 
			reject()
	}
}

export async function get<T={}>(url: string, data?: any, isShowMessage=true, isShowLoading=true): Promise<T> {
	await RequestMiddleware(isShowLoading)
	return new Promise<T>((resolve, reject)=>{
		uni.request({
			...requestCommonParams,
			url: `${server}${url}`,
			data,
			method: 'GET',
			success: (res)=>{
				ResponseMiddleware<T>(res, resolve, reject, isShowMessage, isShowLoading)
			}
		})
	})
}

export async function post<T={}>(url: string, data?: any, isShowMessage=true, isShowLoading=true): Promise<T> {
	await RequestMiddleware(isShowLoading)
	return new Promise((resolve, reject)=>{
		uni.request({
			...requestCommonParams,
			url: `${server}${url}`,
			data,
			method: 'POST',
			success: (res)=>{
				ResponseMiddleware<T>(res, resolve, reject, isShowMessage, isShowLoading)
			}
		})
	})
}

export async function uploadFiles<T={}>(files: UniApp.UploadFileOptionFiles[], formData?: {[index: string]: any}, isShowMessage=true, isShowLoading=true) {
	await RequestMiddleware(isShowLoading)
	return new Promise((resolve, reject)=>{
		uni.uploadFile({
			...requestCommonParams,
			url: `${server}ocr`,
			files,
			formData,
			success: (res)=>{
				ResponseMiddleware<T>(res, resolve, reject, isShowMessage, isShowLoading)
			}
		})
	})
}