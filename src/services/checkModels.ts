import {request} from '@/shared'

interface requestParams {
	id: number
}

export interface orderDetail extends carRecord {
	adderDetail: addition[]
	orderDetail: checkModel[]
}

export function getOrderDetail(params: requestParams) {
	return request.get<orderDetail>('order/queryById', params, false)
}