export interface validateRule {
	required?: boolean
	errorMessage: string
	validateFunction?: (rule: validateRule, value: string, data: {[index: string]: any}, callback: Function) => void
}

const required:validateRule = {
	required: true,
	errorMessage: '该选项必填'
}

const isNumberReg = /[0-9]*/
const number:validateRule = {
	validateFunction: (rule, value) => {
		return isNumberReg.test(value)
	},
	errorMessage: '必须输入数字'
}

const userNameReg = /[a-zA-Z0-9_!%$@.]{1,}/
const userName:validateRule = {
	validateFunction: (rule, value) => {
		return userNameReg.test(value)
	},
	errorMessage: '必须是1位以上的数字、字母或_!%$@.特殊字符'
}

const passwordReg = /[a-zA-Z0-9_!%$@.]{6,}/
const password:validateRule = {
	validateFunction: (rule, value) => {
		return passwordReg.test(value)
	},
	errorMessage: '必须是6位以上的数字、字母或_!%$@.特殊字符'
}

const phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
const phone:validateRule = {
	validateFunction: (rule, value) => {
		return phoneReg.test(value)
	},
	errorMessage: '请输入正确手机号'
}

const plateNumberReg = /[0-9A-Za-z]+/
const plateNumber:validateRule = {
	validateFunction: (rule, value) => {
		return plateNumberReg.test(value)
	},
	errorMessage: '请输入正确车牌号'
}

const vinReg = /[0-9A-Za-z]{17}/
const vin:validateRule = {
	validateFunction: (rule, value) => {
		return vinReg.test(value)
	},
	errorMessage: '请输入正确VIN号'
}

export {
	required,
	vin,
	userName,
	number,
	password,
	phone,
	plateNumber
}