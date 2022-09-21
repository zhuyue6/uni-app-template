import {request} from '@/shared'
import { useStore } from '@/stores'

interface LoginParams {
  captcha?: string  // 验证码
  checkKey?: string // checkKey
  password: string // password
  username: string  // username
}

interface LoginReponse {
	departs: any[]
	multi_depart: number
	token: string
	userInfo: userInfo
}

export const httpHeader = {
	'X-Access-Token': sessionStorage.getItem('X-Access-Token') ?? '',
	'tenant-id': sessionStorage.getItem('tenant-id') ?? '',
}

const store = useStore()

export async function login(params: LoginParams) {
	return request.post<LoginReponse>('sys/login', params, false).then((res)=>{
		// 登录成功后token赋值
		httpHeader['X-Access-Token'] = res.token
		httpHeader['tenant-id'] =  res.userInfo.relTenantIds
		sessionStorage.setItem('X-Access-Token', res.token)
		sessionStorage.setItem('tenant-id', res.userInfo.relTenantIds)
		sessionStorage.setItem('userInfo', JSON.stringify(res.userInfo))
		store.setUserInfo(res.userInfo)
	})
}