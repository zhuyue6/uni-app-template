import {request} from '@/shared'

export type receiveListParams = Partial<{
	carNumber: string	     // 车牌号或者服务顾问名字
    orderEndTime: string	 // 接车结束时间
    orderStartTime: string	 // 接车车开始时间
    orderStatus: number   // 0 订单未完全生成. 1 待检测 2 检测中 3 检测完毕 4待确认 5 待维修 6维修中 7待取车	
    pageNo: number       //	pageNo,示例值(1)
    pageSize: number    // 	pageSize,示例值(10)	
    shopId:number       // 店铺id
}>

interface receiveListResponse {
	countId: string	
	current: number
	maxLimit: number
	optimizeCountSql:boolean	
	orders: {
		asc: boolean	
		column:	string
	}[]
	pages: number
	records: carRecord[]
	searchCount: boolean	
	size: number
	total: number
}

export  function  getrReceiveList(params: receiveListParams) {
	return request.get<receiveListResponse>('order/receiveList', params, false)
}