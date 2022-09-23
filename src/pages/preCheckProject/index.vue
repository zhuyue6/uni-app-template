<template>
	<view class="container">
		<!-- <view class="title">请选择检测项目</view> -->
		<view class="itemContainer">
			<view 
				class="item" 
				v-for="item in state.list" 
				:key="item.formId" 
				@click="select(item)"
			>
				{{item.formName}}
				<radio :value="item.formId" :checked="state.selectData === item.formId" />
			</view>
		</view>
		<FooterButtons @ok="next" @cancel="cancel" />
	</view>
</template>

<script setup lang='ts'>
	import {reactive, onMounted} from 'vue'
	import FooterButtons from '@/components/footerButtons/index.vue'
	import { getCheckProject, type checkProjectRecord } from '@/services/preCheckProject'
	import {saveCarRecord} from '@/services/carInfo'
	import { uniAppApi } from '@/shared'
	
	const state = reactive<{
		list: checkProjectRecord[]
		selectData: number
		orderId: number
	}>({
		list: [],
		orderId: 0,
		selectData: 0
	})
	
	uniAppApi.onLoad((query) => {
		state.orderId = parseInt(query.orderId as string)
	})
	
	onMounted(()=>{
		getCheckProject().then((res)=>{
			state.list = res.records
			// 默认选中第一个
			state.selectData = res.records?.[0].formId ?? state.selectData
		})
	})
	
	function select(item: checkProjectRecord) {
		state.selectData = item.formId
	}
	function next () {
		saveCarRecord({
			orderId: state.orderId,
			formId: state.selectData
		}).then(()=>{
			uni.redirectTo({
				url: '/pages/preCheckProject/success'
			})
		})
	}
	function cancel () {
		uni.redirectTo({
			url: '/pages/scan/index'
		})
	}
</script>

<style lang="scss">
	@import '@/global.scss';
	.container {
		@include pageContainer;
		width: 100%;
		.title {
			margin: 10px 10px;
		}
		.item {
			&:first-child {
				border-bottom: none;
			}
			background-color: #fff;
			cursor: pointer;
			display: flex;
			justify-content: space-between;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			padding: 10px;
		}
	}
	
</style>