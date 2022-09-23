import {request} from '@/shared'

type checkProjectParams = Partial<{
	formId: number	// 每个店铺配置保养项目id
	formName: string	// 每个店铺配置保养项目名字
	pageNo: number	// pageNo,示例值(1)
	pageSize: number	// pageSize,示例值(10)
	shopId: number   // 店铺id
}>

export interface checkProjectRecord {
	formId: number	// 每个店铺配置保养项目id
	formName: string	// 每个店铺配置保养项目名字
	shopId: number	// 店铺id
}

export interface checkProjectResponse{
	current: number
	pages: number
	records: checkProjectRecord[]
	formId: number	// 每个店铺配置保养项目id
	formName: string	// 每个店铺配置保养项目名字
	shopId: number	// 店铺id	
	size: number
	total: number
}

export function getCheckProject(data?:checkProjectParams) {
	return request.get<checkProjectResponse>('service/formList', data, false)
}