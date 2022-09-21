interface carRecord {
	carBrandId: string	// 车辆品牌/型号id		
	carBrandName: string	// 车辆品牌/型号 名称	
	carId: number  // 车辆ID	
	carNumber: string	// 车牌号	
	carOwnerName: string // 车主名称	
	checkBeginTime: string // 开始检测时间
	checkRate: string	// 检测进度: 已检测数量/总检测点		
	checkUserId: number // 技师员工id
	checkUserName: string	// 技师员工名字	
	formId: number	// keep_form的form_id, 保养项目id	
	formName: string	// keep_form的form_name 保养项目名字,	
	orderId: number	// 订单id	
	orderStatus: number  //	0 订单未完全生成. 1 待检测 2 检测中 3 检测完毕 4待确认 5 待维修 6维修中 7待取车
	orderTime: string	// 创建检测订单时间		
	recUserId: number	// 接单服务顾问名字员工id	
	recUserName: string	// 接单服务顾问名字
	shopId: number	// 店铺id
}

interface carModel {
	carBrandId: number	// 自增主键 , 车辆品牌/型号id	
	carBrandImage: string	// 车辆品牌图标url
	carBrandName: string		// 车辆品牌/型号 名称	
	remark: string  // 备注
}

type carInfo =  Partial<{
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