<template>
	<view class="container">
		<view class="header">
			<view class="operate">
				<view class="inputContainer">
					<uni-easyinput placeholder="请输入车牌号" @input="inputChange" />
				</view>
				<uni-icons type="plus" size="30" :color="Color.primary" @click="gotoScan"></uni-icons>
			</view>
			<view class="sort">
				<label 
				:class="['sortItem', sortStatus === 0 ? 'select' : '']"
				@click="doSort(0)"
				>
					今天
				</label>
				<label 
				:class="['sortItem', sortStatus === 1 ? 'select' : '']"
				@click="doSort(1)"
				>
					全部接车单
				</label>
			</view>
		</view>
		<Item v-if="isShowList" v-for="item of state.list" :data="item" />
		<noData v-else class="noData" />
	</view>
</template>

<script setup lang="ts">
	import {reactive, ref, onMounted, computed} from 'vue'
	import Item from './item.vue'
	import { getrReceiveList, type receiveListParams } from '@/services/pickCar'
	import noData from '@/components/noData/index.vue'
	import {getTodayRange, emptyClearProps} from '@/shared/utils'
	import {Color} from '@/shared/constant'
	const sortStatus = ref<number>(0)
	
	function search() {
		state.searchParams.orderStartTime = sortStatus.value === 0 ? getTodayRange()['start'] : ''
		state.searchParams.orderEndTime = sortStatus.value === 0 ? getTodayRange()['end'] : ''

		emptyClearProps(state.searchParams, ['orderStartTime', 'orderEndTime', 'carNumber'])
		getrReceiveList(state.searchParams).then((res) => {
			state.list = res.records
		})
	}
	
	const isShowList = computed<boolean>(()=>{
		return state.list.length > 0
	})
	
	onMounted(()=>{
		search()
	})
	
	const state = reactive<{
		list: carRecord[],
		searchParams: receiveListParams
	}>({
		list: [],
		searchParams: {}
	})
	
	function gotoScan() {
		uni.navigateTo({
			url: '/pages/scan/index'
		})
	}
	
	function inputChange(data: string) {
		state.searchParams.carNumber = data
		search()
	}
	
	function doSort (type: number) {
		sortStatus.value = type
		search()
	}
	
</script>

<style lang="scss">
	@import '@/global.scss';
	.container {
		@include pageContainer;
		.header {
			padding: 6px;
			background: white;
			border-radius: 0 0 8px 8px;
		}
		.operate {
			display: flex;
			align-items: center;
			margin-bottom: 10px;
			.inputContainer {
				min-width: 250rpx;
				max-width: 250px;
				display: flex;
				flex-direction: column;
				margin-right: 20px;
				.text {
					font-size: 10px;
				}
			}
		}
		
		.sort {
			margin-top: 10px;
			.sortItem {
				font-size: 16px;
				margin-right: 10px;
				color: $lightFontColor;
				font-weight: 400;
				&.select {
					color: #000;
					font-size: 18px;
				}
			}
		}
		.noData {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: center;
			align-items: center;
			color: $lightFontColor;
		}
	}
</style>