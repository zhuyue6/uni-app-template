import {formatProxy, carRecord} from './'
import type {receiveListResponse} from '@/services/pickCar'

const data: receiveListResponse = {
	countId: '1',
	current: 1,
	maxLimit: 1,
	optimizeCountSql: false,
	orders: [],
	pages: 1,
	records: [
		carRecord
	],
	searchCount: false,
	size: 10,
	total: 100,
}

export const getReceiveList = formatProxy('order/receiveList', data)
