import { defineStore } from 'pinia';

export const useStore = defineStore<'index', {
	userInfo: null | { [index: string]: any}
}, {}, {
	setUserInfo: (data: userInfo) => void
}>('index', {
	state: () => {
		return { 
			userInfo: null
		};
	},
	actions: {
		setUserInfo(data: userInfo) {
			this.userInfo = data;
		},
	},
});