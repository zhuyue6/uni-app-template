interface carRecord {
	carAge: number	// 车龄	
	carBrandId: number   //	车辆品牌/型号id
	carBrandImage: string  // 车辆品牌图标url 
	carBrandName: string   //  车辆品牌/型号 名称	
	carId: number	// 车辆ID 
	carNumber: string	// 车牌号
	carOwnerName: string	// 车主名称	
	carOwnerPhone: string	// 车主手机号
	checkBeginTime: string //	开始检测时间.
	checkFinishTime: string	// 完成检测时间
	checkUserId: number	// 技师员工id 
	checkUserName: string  // 技师员工名字	
	currentMileage: string	// 检测时当前里程(公里)
	dayMileageAvg: number //	检测时日均行驶里程(公里)
	formId: number	// keep_form的form_id, 保养项目id
	formName: string	// keep_form的form_name 保养项目名字 
	orderId: number	 // 订单id
	orderStatus: number	// 0 订单未完全生成. 1 待检测 2 检测中 3 检测完毕 4待确认 5 待维修 6维修中 7待取车
	orderTime: string	//创建检测订单时间	
	productTime: string	// 车辆生产日期	
	recUserId: number	// 接单服务顾问名字员工id
	recUserName: string	 // 接单服务顾问名字
	remark: string	// 备注	
	sex: number   // 车主性别
	shopId: number	// 店铺id
	vin: string	// 车架号
}

interface carModel {
	carBrandId: number	// 自增主键 , 车辆品牌/型号id	
	carBrandImage: string	// 车辆品牌图标url
	carBrandName: string		// 车辆品牌/型号 名称	
	remark: string  // 备注
}

type carRecordParams =  Partial<{
	carAge: number	// 车龄	
	carBrandId: number   //	车辆品牌/型号id
	carBrandImage: string  // 车辆品牌图标url 
	carBrandName: string   //  车辆品牌/型号 名称	
	carId: number	// 车辆ID 
	carNumber: string	// 车牌号
	carOwnerName: string	// 车主名称	
	carOwnerPhone: string	// 车主手机号
	checkBeginTime: string //	开始检测时间.
	checkFinishTime: string	// 完成检测时间
	checkUserId: number	// 技师员工id 
	checkUserName: string  // 技师员工名字	
	currentMileage: string	// 检测时当前里程(公里)
	dayMileageAvg: number //	检测时日均行驶里程(公里)
	formId: number	// keep_form的form_id, 保养项目id
	formName: string	// keep_form的form_name 保养项目名字 
	orderId: number	 // 订单id
	orderStatus: number	// 0 订单未完全生成. 1 待检测 2 检测中 3 检测完毕 4待确认 5 待维修 6维修中 7待取车
	orderTime: string	//创建检测订单时间	
	productTime: string	// 车辆生产日期	
	recUserId: number	// 接单服务顾问名字员工id
	recUserName: string	 // 接单服务顾问名字
	remark: string	// 备注	
	sex: number   // 车主性别
	shopId: number	// 店铺id
	vin: string	// 车架号
}>

interface userInfo {
	activitiSync: number
	avatar: string
	birthday: string
	clientId: number
	createBy: string
	createTime: string
	delFlag : number
	departIds: string
	email: string
	homePath: string
	id: string
	orgCode: string
	orgCodeTxt: string
	phone: string
	post: string
	realname:string
	relTenantIds: string
	sex: string
	status: number
	telephone: string
	updateBy: string
	updateTime: string
	userIdentity:number   // 用户身份   1 服务顾问  2 技师
	username: string
	workNo: string
}

/***
 增项单
***/
interface addition {
	caseId:string //	检测点项	string	
	caseName: string //	检测项名字	string	
	fixId: number //	维修项目id	integer	
	fixName: string //	维修项目名称	integer	
	fixed: 1|2	// 客户是否确认维修 1是 2 否	integer	
	fixedFinish: 1 | 2	// 是否已维修完毕 1是 2 否	integer	
	id: number  //	增项单详情,自增id	integer	
	moduleId: number  //	模块ID	integer	
	moduleName: string  //	模块名称	string	
	optionDesc: string //	检测点选项描述	string	
	optionId: number   //	检测点选项ID	integer	
	optionLevel: 0 | 1 | 2 | 3 //	0， 正常 1 轻微异常， 2 异常 3 紧急，对应检测概述	integer	
	optionName: string  //	检测点选项名称	string	
	optionValue: string  //	检测点选项检测结果	string	
	orderId: number  //	接车订单id	integer	
	partArrivalTime: string	 // 到货时间	string	
	partId: number  //	零件备件号	integer	
	partMoney: number  //	零件花费钱(总)	number	
	partNum: number  //	零件数量	integer	
	partStatus: 1 | 2  //	1 有货 2 缺货	integer	
	serviceId: number  //	检测项ID	integer	
	serviceName: string  //	检测项名称	string	
	shopId: number  //	店铺id	integer	
	status: 1 | 2  //	1 备件是否 待确认 2 已确认	integer	
	timeMoney: number   //	工时费	number
}

/***
 检测模块
***/
interface checkModel {
	caseId: string //	检测点项	string	
	caseName: string  //	检测项名字	string	
	caseType: 1 | 2   //	检测点类型 varchar/select 文本、单选？1 文本, 2 单选	integer	
	checkImage: string  //	检测项图片阿里云oss地址	string	
	checkImage1: string  //	检测项图片阿里云oss地址1	string	
	checkImage2: string  //	检测项图片阿里云oss地址2	string	
	id: number //	自增id,每条检测点记录id字段	integer	
	moduleId: number //	模块ID	integer	
	moduleName: string  //	模块名称	string	
	optionDesc: string  //	检测点选项描述	string	
	optionId: number //	检测点选项ID	integer	
	optionLevel: 0 | 1 | 2 | 3 //	0， 正常 1 轻微异常， 2 异常 3 紧急，对应检测概述	integer	
	optionName: string  //	检测点选项名称	string	
	optionValue: string  //	检测点选项检测结果	string	
	orderId: number  //	 接车订单id	integer	
	serviceId: number  // 检测项ID	integer	
	serviceName: string   // 检测项名称	string	
	shopId: number       //	店铺id	integer
}