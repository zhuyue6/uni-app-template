<template>
	<cPopup ref="popupRef">
		<template #default>
			<uni-forms 
				:model="state.formData" 
				label-width="150"
				:border="true"
				ref="formRef"
				validateTrigger="bind"
				:rules="rules"
			>
				<uni-forms-item label="客户姓名" name="name">
					<uni-easyinput type="text" v-model="state.formData.name" placeholder="请输入姓名" />
				</uni-forms-item>
				<uni-forms-item name="sex">
					<view class="sex">
						<view 
							:class="['sexItem', state.formData.sex === 0 && 'sexSelect']"
							@click="selectSex(0)"
						>
							先生
						</view>
						<view 
							:class="['sexItem', state.formData.sex === 1 && 'sexSelect']"
							@click="selectSex(1)"
						>
							女士
						</view>
					</view>
				</uni-forms-item>
				<uni-forms-item label="手机号" name="phone">
					<uni-easyinput type="text" v-model="state.formData.phone" placeholder="请输入手机号" />
				</uni-forms-item>
			</uni-forms>
			<button type="primary" size="mini" @click="onSubmit">确定</button>
		</template>
	</cPopup>
</template>

<script setup lang='ts'>
	import {reactive, ref} from 'vue'
	import {simpleDeepCopy} from '@/shared/utils'
	import { validateRule, uniUiTypes } from '@/shared'
	import cPopup from '@/components/cPopup/index.vue'
	const props = defineProps(['formData'])
	const state = reactive({
		formData: simpleDeepCopy(props.formData),
	})
	const rules = {
		name: {
			rules: [
				validateRule.required
			]
		},
		phone: {
			rules: [
				validateRule.required,
				validateRule.phone
			]
		}
	}
	const emit = defineEmits(['submit'])
	const formRef = ref<uniUiTypes.uniForms | null>(null)
	const popupRef = ref<typeof cPopup | null>(null) 
	
	function onSubmit () {
		formRef.value?.validate((err: string)=>{
			if (err) {
				return
			}
			emit('submit', simpleDeepCopy(state.formData))
			popupRef.value.close()
		})
	}
	function selectSex (sex: number) {
		state.formData.sex = sex;
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
	.sex {
		display: flex;
		padding: 0 10px;
		.sexItem {
			width: 60px;
			height: 30px;
			border-radius: 15px;
			display: flex;
			justify-content: center;
			align-items: center;
			border: 1px solid rgba(215, 215, 215, 1);
			color: #7F7F7F;
			margin-right: 10px;
			cursor: pointer;
			&.sexSelect {
				background-color: rgba(129, 211, 248, 0.3);
				border-color: rgba(17, 142, 233, 1);
			}
		}
		
	}
</style>