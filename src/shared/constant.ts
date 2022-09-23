export enum Color {
	primary = '#007aff'
}

export enum Font {
	initSize = '14px',
	titleSize = '16px',
	bord = 650
}

export const CheckStatus: {[index: string| number] : string} = {
	1: '待检测',
	2: '检测中',
	3: '检测完毕',
	4: '待确认',
	5: '待维修',
	6: '维修中',
	7: '待取车'
}