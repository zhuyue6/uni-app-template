import {request, utils} from '@/shared'
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
	'X-Access-Token': utils.getStorage('X-Access-Token') ?? '',
	'tenant-id': utils.getStorage('tenant-id') ?? '',
}

const store = useStore()

export async function login(params: LoginParams) {
	return request.post<LoginReponse>('sys/login', params, false).then((res)=>{
		// 登录成功后token赋值
		httpHeader['X-Access-Token'] = res.token
		httpHeader['tenant-id'] =  res.userInfo.relTenantIds
		utils.setStorage('X-Access-Token', res.token)
		utils.setStorage('tenant-id', res.userInfo.relTenantIds)
		utils.setStorage('userInfo', res.userInfo)
		store.setUserInfo(res.userInfo)
	})
}