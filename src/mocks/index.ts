import { api } from '../api.config'

interface Response<T> {
	url: string
	method: string
	response: () => {
		code: number,
		message: string,
		result: T
	}
}

export function formatProxy<T={}>(url: string, response: T, message="ok", method="get", code=200): Response<T> {
	return {
		url: `${api}/${url}`,
		method,
		response() {
			return {
				code,
				message,
				result: response
			}
		}
	}
}

export const carRecord:carRecord = {
	carAge: 1,	// 车龄	
	carBrandId: 1,   //	车辆品牌/型号id
	carBrandImage: '',  // 车辆品牌图标url 
	carBrandName: '奥迪A7',   //  车辆品牌/型号 名称	
	carId: 1,	// 车辆ID 
	carNumber: '浙A888888',	// 车牌号
	carOwnerName: '霸道猪',	// 车主名称	
	carOwnerPhone: '13888888888',	// 车主手机号
	checkBeginTime: '2022-10-1 10:10:10', //	开始检测时间.
	checkFinishTime: '2022-10-1 10:10:10',	// 完成检测时间
	checkUserId: 1,	// 技师员工id 
	checkUserName: '张三',  // 技师员工名字	
	currentMileage: '1288',	// 检测时当前里程(公里)
	dayMileageAvg: 100, //	检测时日均行驶里程(公里)
	formId: 1,	// keep_form的form_id, 保养项目id
	formName: '华星检测',	// keep_form的form_name 保养项目名字 
	orderId: 1,	 // 订单id
	orderStatus: 0,	// 0 订单未完全生成. 1 待检测 2 检测中 3 检测完毕 4待确认 5 待维修 6维修中 7待取车
	orderTime: '2022-10-1 10:10:10',	//创建检测订单时间	
	productTime: '2022-10-1 10:10:10',	// 车辆生产日期	
	recUserId: 1,	// 接单服务顾问名字员工id
	recUserName: '李四',	 // 接单服务顾问名字
	remark: '测试车’',	// 备注	
	sex: 1,   // 车主性别
	shopId: 1,	// 店铺id
	vin: 'v1234567890123456'  // 车架号
}