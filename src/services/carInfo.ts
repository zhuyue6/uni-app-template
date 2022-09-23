import {request} from '@/shared';

export function getCarModels(params?: {
	carBrandName: string
}) {
	return request.get<carModel[]>('service/brand/list', params, false)
}

export function saveCarRecord(params: carRecordParams) {
	return request.post('order/save', params)
}