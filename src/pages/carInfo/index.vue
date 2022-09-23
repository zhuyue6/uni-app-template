<template>
	<view class="container">
		<view class="carInfo">
			<uni-forms
				:model="state" 
				ref="formRef"
				:rules="rules"
				validateTrigger="bind"
			>
				<view class="plateNumber">
					车牌号：
					<text class="plateNumberTitle">{{state.carNumber}}</text>
				</view>
				<view class="item">
					<view class="info">
						<view class="infoTitle">
							<view class="name">VIN号</view>
							<view class="star">*</view>
						</view>
						<view>
							<uni-forms-item name="vin">
								<input class="uni-input" v-model="state.vin" maxlength="17" placeholder="输入17位的VIN码" />
							</uni-forms-item>
						</view>
					</view>
					<uni-icons type="scan" size="30" @click="doScan" />
				</view>
				<view class="item">
					<view class="info">
						<view class="infoTitle">
							<view class="name">品牌/车款</view>
							<view class="star">*</view>
						</view>
						<view>
							<uni-forms-item name="carModelText">
								<input class="uni-input" v-model="state.carModelText" maxlength="17" placeholder="请选择" disabled="true" @click="openCarModelPopus" />
							</uni-forms-item>
						</view>
					</view>
					<carModelPopup ref="carModelPopupRef" @select="selectCarModel" />
				</view>
				<view class="item">
					<view class="info">
						<view class="infoTitle">
							<view class="name">出厂时间</view>
							<view class="star">*</view>
						</view>
						<view>
							<uni-forms-item name="date">
								<uni-datetime-picker v-model="state.date" type="date" :border="false" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="info">
						<view class="infoTitle">
							<view class="name">当前总里程/km</view>
							<view class="star">*</view>
						</view>
						<view>
							<uni-forms-item name="mileage">
								<input class="uni-input" v-model="state.mileage" maxlength="10" placeholder="请输入" />
							</uni-forms-item>
						</view>
					</view>
				</view>
				<view class="item">
					<view class="info">
						<view class="infoTitle">
							<view class="name">车主</view>
							<view class="star">*</view>
						</view>
						<view>
							<uni-forms-item name="userInfo">
								<input class="uni-input" v-model="state.userInfo" maxlength="17" placeholder="请输入" disabled="true" @click="userPopupStateChange" />
							</uni-forms-item>
						</view>
					</view>
					<UserPopup
						ref="userPopup"
						:formData="state.userPopupFormData"
						@submit="userPopupSubmit"
					/>
				</view>
			</uni-forms>
		</view>
		<FooterButtons okText="下一步" @ok="next" />
	</view>
</template>

<script setup lang="ts">
	import FooterButtons from '@/components/footerButtons/index.vue'
	import {reactive, computed, ref} from 'vue'
	import UserPopup from './userPopup';
	import carModelPopup from './carModelPopup.vue'
	import { validateRule, uniUiTypes, utils, uniAppApi} from '@/shared'
	import { saveCarRecord } from '@/services/carInfo'
	
	type userPopupFormData = {
		name: string,
		phone: string,
		sex: number
	}
	
	interface State {
		userPopupFormData: userPopupFormData,
		carNumber: string,
		carModel: carModel,
		carModelText: string,
		vin: string,
		mileage: string,
		date: string,
		userInfo: ReturnType<typeof computed>
	}
	
	const state = reactive<State>({
		userPopupFormData: {
			name: '',
			phone: '',
			sex: 0
		},
		carNumber: '',
		carModelText: '',
		carModel: {
			carBrandId: -1,
			carBrandImage: '',
			carBrandName: '',
			remark: ''
		},
		vin: '',
		mileage: '',
		date: '',
		userInfo: computed<string>(()=>{
			let text = '';
			if (state.userPopupFormData.name || state.userPopupFormData.phone) {
				text = `${state.userPopupFormData.name} ${state.userPopupFormData.phone}`;
			}
			return text
		})
	})
	
	const rules = {
		vin: {
			rules: [
				validateRule.required,
				validateRule.vin
			]
		},
		carModelText: {
			rules: [
				validateRule.required
			]
		},
		date: {
			rules: [
				validateRule.required
			]
		},
		mileage: {
			rules: [
				validateRule.required
			]
		},
		userInfo: {
			rules: [
				validateRule.required
			]
		},
	}
	
	const formRef = ref<uniUiTypes.uniForms | null>(null)
	function next () {
		formRef.value?.validate((err: string)=>{
			if (err) {
				return
			}
			saveCarRecord({
				carNumber: state.carNumber,
				vin: state.vin,
				carBrandId: state.carModel.carBrandId,
				productTime: state.date,
				currentMileage: state.mileage,
				sex: state.userPopupFormData.sex,
				carOwnerName: state.userPopupFormData.name,
				carOwnerPhone: state.userPopupFormData.phone
			}).then((res) => {
				uni.redirectTo({
					url: `/pages/preCheckProject/index?orderId=${res}`
				})
			})
		})
	}
	
	uniAppApi.onLoad((query)=>{
		// onload 接受参数
		state.carNumber = query.carNumber as string
	})
	
	// 用户信息
	const userPopup = ref<typeof UserPopup | null>(null)
	function userPopupStateChange() {
		userPopup.value?.open()
	}

	function userPopupSubmit(data: userPopupFormData) {
		state.userPopupFormData = data;
	}
	
	// 车辆类型
	const carModelPopupRef = ref<typeof carModelPopup |null>(null)
	function openCarModelPopus() {
		carModelPopupRef.value?.open()
	}
	function selectCarModel(data: any) {
		state.carModelText = data.text
		state.carModel = data.item
	}
	
	function doScan () {
	
	}
	
</script>

<style lang="scss">
	@import '@/global.scss';
	.container {
		color: $lightFontColor;
		@include pageContainer;
		&::v-deep {
			.uni-forms-item {
				// margin-bottom: 0;
			}
			.uni-forms-item__label {
				display: none;
			}
			.uni-date-x {
				background: none;
			}
		}
		.carInfo {
			width: 100%;
		}
		.plateNumber {
			background: #eee;
			height: 50px;
			padding: 0 10px;
			display: flex;
			align-items: center;
			border-bottom: 1px solid #888;
			.plateNumberTitle {
				font-size: 20px;
				font-size: 650;
				color: #000;
			}
		}
		.item {
			border-bottom: 1px solid #888;
			cursor: pointer;
			padding: 10px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.infoTitle {
					display: flex;
					.name {
						color: #000;
						
					}
				}
				&::v-deep {
					.input-placeholder {
						font-size: 15px;
						color: $lightFontColor;
					}
				}
				.icon {
					width: 40px;
					height: 40px;
					border-radius: 20px;
					background: #999;
					margin-right: 10px;
				}
				.star {
					margin-left: 5px;
					color: #f00;
				}
			}
		}
		
	}
</style>