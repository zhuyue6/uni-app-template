import {useStore} from '../stores'

export function simpleDeepCopy(param: any) {
	return JSON.parse(JSON.stringify(param))
}

const debounceMap = new Map<Function, NodeJS.Timer>()
export function debounce(fn: Function, time = 1000) {
	if (debounceMap.has(fn)) clearTimeout(debounceMap.get(fn) as NodeJS.Timer)
	debounceMap.set(fn, setTimeout(() => {
		debounceMap.delete(fn)
		fn()
	}, time))
}

const throttleMap = new Map<Function, NodeJS.Timer>()
export function throttle(fn: Function, time = 1000) {
	if (throttleMap.has(fn)) return
	throttleMap.set(fn, setTimeout(() => {
		throttleMap.delete(fn)
		fn()
	}, time))
}

export function openCamera() {
	return new Promise<UniApp.ChooseImageSuccessCallbackResult>((success, fail) => {
		uni.chooseImage({
			count: 1, //默认9
			sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			sourceType: ['camera'], //从相册选择
			success,
			fail
		});
	})
}

export function formatDate(timestamp: number | string, type = "yy/mm/dd hh:mm:ss"): string {
	const date = new Date(timestamp)
	const year = date.getFullYear()
	const mouth = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	const hour = `${date.getHours()}`.padStart(2, '0')
	const minute = `${date.getMinutes()}`.padStart(2, '0')
	const second = `${date.getSeconds()}`.padStart(2, '0')
	let time = `${year}-${mouth}-${day} ${hour}:${minute}:${second}`
	if (type === "hh:mm:ss") {
		time = `${hour}-${minute}-${second}`
	} else if (type === "yy/mm/dd") {
		time = `${year}-${mouth}-${day}`
	}
	return time
}

export function getTodayRange() {
	const date = new Date()
	const year = date.getFullYear()
	const mouth = `${date.getMonth() + 1}`.padStart(2, '0')
	const day = `${date.getDate()}`.padStart(2, '0')
	const start = `${year}-${mouth}-${day} 00:00:00`
	const end = `${year}-${mouth}-${day} 23:59:59`
	return {
		start,
		end
	}
}


export function emptyClearProps <T>(obj: T, keyArr: (keyof T)[]) {
	for (const key of keyArr) {
		if (!obj[key]) {
			delete obj[key]
		}
	}
	return obj
}

export function errorTip(title: string) {
	return tip('none', title)
}

export function successTip(title: string) {
	return tip('success', title)
}

export function tip(icon: 'error' | 'success' | 'none', title: string) {
	return new Promise((success, fail) => {
		uni.showToast({
			title,
			icon,
			position: 'top',
			success,
			fail
		})
	})
}

export function setLocalStorage(key: string, value: any, length=10) {
	const stor = localStorage.getItem(key)
	let storString = value
	let storList: string[] = []
	if (stor) {
		storList = stor.split(',')
		if (storList.length >= length) {
			storList.pop()
		}
		storList.unshift(value)
		storString = storList.join()
	}
	localStorage.setItem(key, storString)
}

export function getLocalStorage(key: string): string[] {
	const stor = localStorage.getItem(key)
	let storList: string[] = []
	if (stor) storList = stor.split(',')
	return storList
}

let showLoadingFlag = false;
export function showLoading(visible: boolean, mask=true) {
	if (visible && !showLoadingFlag) {
		uni.showLoading({
			title: '',
			mask,
		})
	} else if (!visible){
		uni.hideLoading()
		showLoadingFlag = false
	}
}

const store = useStore()
export function getUseInfo(): userInfo {
	let userInfo = null
	if (store.userInfo) {
		userInfo = store.userInfo
	} else {
		userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo') as string) : null
	}
	return userInfo
}