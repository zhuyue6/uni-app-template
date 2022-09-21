<template>
	<view class="container">
		<view class="inputPlateNumber">
			<uni-forms
				:model="state.formData"
				validateTrigger="bind"
				:rules="rules"
				ref="formRef"
				label-position="top"
			>
				<view class="title">车牌号</view>
				<view class="content">
					<uni-icons custom-prefix="iconfont" type="icon-car-number" size="30" />
					<view class="inputNumberContainer">
						<uni-forms-item name="plateNumber" label="车牌号">
							<input class="inputNumber" v-model="state.formData.plateNumber" placeholder="请输入车牌号" />
						</uni-forms-item>
					</view>
					<uni-icons type="scan" size="20" @click="doScan" />
				</view>
			</uni-forms>
		</view>
		<view class="searchHistory">
			<view class="title">最近搜索</view>
			<view v-if="isHistoryShow" class="searchHistoryContent">
				<view v-for="item of state.laterSearchList" class="plateNumber">{{item}}</view>
			</view>
			<noData v-else />
		</view>
		<MileageInputPopup ref="mileageInputPopupRef" :data="state.formData.plateNumber" />
		<CheckPopup ref="checkPopupRef" :plateNumber="state.formData.plateNumber" />
		<FooterButtons okText="下一步" @ok="next" @cancel="back" />
	</view>
</template>

<script setup lang="ts">
	import FooterButtons from '@/components/footerButtons/index.vue'
	import noData from '@/components/noData/index.vue'
	import {reactive, computed, ref, onMounted} from 'vue'
	import {utils, validateRule, uniUiTypes} from '@/shared'
	import {scan} from '@/services/scan'
	import {getrReceiveList} from '@/services/pickCar'
	import MileageInputPopup from './mileageInputPopup.vue'
	import CheckPopup from './checkPopup.vue'
	
	interface State {
		laterSearchList: string[]
		formData: {
			plateNumber: string
		}
	}
	
	const state:State = reactive({
		laterSearchList: [],
		formData: {
			plateNumber: '',
		}
	})
	const rules = {
		plateNumber: {
			rules: [
				validateRule.required,
				validateRule.plateNumber
			]
		}
	}
	
	onMounted(()=>{
		// 从LocalStorage获取最近搜索记录
		state.laterSearchList = utils.getLocalStorage('laterSearch')
	})
	
	const isHistoryShow = computed<boolean>(()=>{
		return state.laterSearchList?.length > 0
	})

	const formRef = ref<uniUiTypes.uniForms | null>(null)
	const mileageInputPopupRef = ref<typeof MileageInputPopup | null>(null)
	const checkPopupRef = ref<typeof CheckPopup | null>(null)
	
	function doScan () {
		scan()
	}
	
	function adviserEntry(isFirstIn: boolean) {
		// 服务顾问入口
		if (!isFirstIn) {
			mileageInputPopupRef.value?.open()
		} else {
			uni.navigateTo({
				url: `/pages/carInfo/index?carNumber=${state.formData.plateNumber}`
			})
		}
	}
	
	function artificerEntry(isFirstIn: boolean) {
		// 技师入口
		checkPopupRef.value.open()
	}
	
	function back() {
		uni.navigateBack({
			delta: 1
		})
	}
	
	function next() {
		formRef.value?.validate((err:string)=>{
			if (err) {
				return
			}
			const userInfo = utils.getUseInfo()
			utils.setLocalStorage('laterSearch', state.formData.plateNumber)
			getrReceiveList({
				carNumber: state.formData.plateNumber
			}).then((res)=>{
				// 有车辆订单说明不是第一次来
				if (userInfo.userIdentity === 1) {
					// 服务顾问
					adviserEntry(res.records.length !== 0)
				}
			})
		})
	}
</script>

<style lang="scss">
	@import '@/global.scss';
	@import "@/static/iconfont.css";
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		@include pageContainer;
		.inputPlateNumber {
			background: white;
			width: 100%;
			border-radius: 8px;
			color: $lightFontColor;
			.title {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				border-bottom: 1px solid #eee;
			}
			.content {
				padding: 10px;
				height: 80px;
				display: flex;
				font-size: 10px;
				color: rgba(0,0,0,0.6);
				&::v-deep {
					.uni-forms-item__label {
						height: auto;
						font-size: inherit;
						padding: 0;
					}
				}
				.iconScan {
					width: 40px;
					height: 40px;
					background: #f00;
					border-radius: 20px;
					margin-right: 10px;
				}
				.inputNumberContainer {
					margin: 0px 10px;
					flex-grow: 1;
				}
				.inputNumber {
					font-size: 10px;
					::v-deep .input-placeholder {
						color: rgba(0,0,0,0.2);
					}
				}
				.scan {
					width: 20px;
					height: 20px;
					background: #f00;
					border-radius: 20px;
					margin-right: 10px;
				}
			}
		}
		.searchHistory {
			margin-top: 10px;
			border-radius: 8px;
			width: 650rpx;
			max-width: 700px;
			background: white;
			padding: 16px;
			.title {
				font-size: 12px;
			}
			.searchHistoryContent {
				display: flex;
				flex-wrap: wrap;
			}
			.plateNumber {
				padding: 10px 0;
				margin-top: 10px;
				margin-right: 10px;
			}
			.searchInPool {
				padding-top: 10px;
				color: blue;
				text-align: center;
				cursor: pointer;
			}
		}
	}
</style>