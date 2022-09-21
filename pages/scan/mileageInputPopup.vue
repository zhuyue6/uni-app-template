<template>
	<uni-popup ref="popupRef">
		<view class="popupContainer">
			<view class="title">{{plateNumber}}</view>
			<view class="carModel">奥迪A6</view>
			<view class="carAge">车龄：6年</view>
			<uni-forms 
				labelWidth="150"
				ref="formRef"
				:model="formData"
				:rules="rules"
				validateTrigger="bind"
			>
				<view class="mileage">
					<uni-forms-item label="当前里程数" name="mileage">
						<input v-model="formData.mileage" placeholder="请输入" maxlength="10" />
						公里
					</uni-forms-item>
				</view>
			</uni-forms>
			<view class="buttonContainer">
				<button type="primary" size="mini" @click="next">下一步</button>
			</view>
			
		</view>
	</uni-popup>
</template>

<script setup>
	import {ref} from 'vue'
	import {validateRule} from '@/shared'
	const popupRef = ref(null)
	const formRef = ref(null)
	const formData = ref({
		mileage: ''
	})
	const rules = {
		mileage: {
			rules: [
				validateRule.required,
				validateRule.number
			]
		}
	}
	
	defineProps(['plateNumber'])
	function next() {
		formRef.value.validate((err,value)=>{
			if (err) {
				return
			}
			popupRef.value.close()
			uni.navigateTo({
				url: '/pages/project/index'
			})
		})
	}
	
	defineExpose({
		open() {
			popupRef.value.open()
		},
		close() {
			popupRef.value.close()
		}
	})
</script>

<style lang="scss">
	.popupContainer {
		background-color: #fff;
		padding: 10px;
		border-radius: 8px;
		.title {
			font-size: 20px;
			font-weight: 650;
		}
		.carModel {
			margin-top: 10px;
			font-weight: 500;
		}
		.carAge {
			margin-top: 6px;
			font-weight: 400;
			font-size: 12px;
		}
		.mileage {
			margin-top: 10px;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			padding: 8px 0 0;
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			&::v-deep {
				.uni-forms-item__content {
					display: flex;
					align-items: center;
				}
				.uni-input-placeholder {
					font-size: 12px;
				}
				
			}
		}
		.buttonContainer {
			display: flex;
			justify-content: center;
		}
	}
</style>