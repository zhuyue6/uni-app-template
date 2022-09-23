<template>
	<uni-popup ref="popupRef">
		<view class="popupContainer">
			<view class="titleContainer">
				<view class="title">{{data?.carNumber}}</view>
				<view :class="['status', data.orderStatus >= 3 && 'finish']">{{statusText}}</view>
			</view>
			<view class="checkInfoContainer">
				<view class="carModel">{{data?.carBrandName}}</view>
				<view class="artificer">检测技师： {{data?.checkUserName}}</view>
			</view>
			<view class="carInfo">
				<view class="item">
					<view class="itemTitle">当前里程总数</view>
					<view class="itemContent">{{data?.currentMileage}} Km</view>
				</view>
				<view class="item">
					<view class="itemTitle">车龄</view>
					<view class="itemContent">{{data?.carAge}} 年</view>
				</view>
				<view class="item">
					<view class="itemTitle">出厂信息</view>
					<view class="itemContent">{{data?.productTime}}</view>
				</view>
			</view>
			<view class="adviserInfo">
				<view class="item">
					接车时间：{{data?.orderTime}}
				</view>
				<view class="item">
					服务顾问：{{data?.recUserName}}
				</view>
			</view>
			<view class="buttonContainer">
				<button v-if="data.orderStatus === 1" type="primary" size="mini" class="maxButton" @click="startCheck">开始检测</button>
				<template v-else="data.orderStatus === 2">
					<button  type="primary" size="mini" @click="grabOrder">抢单</button>
					<button  type="primary" size="mini" @click="info">查看详情</button>
				</template>
				<template v-else="data.orderStatus >= 3">
					<button type="primary" size="mini" @click="report">查看报告</button>
					<button type="primary" size="mini" @click="additions">查看增项</button>
				</template>
			</view>
		</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import {ref, computed} from 'vue'
	import {constant, uniUiTypes,utils} from '@/shared'
	import {saveCarRecord} from '@/services/carInfo'
	const props = defineProps<{
		data: carRecord
	}>()
	const popupRef = ref<uniUiTypes.uniPopup | null>(null)
	const statusText = computed(()=>{
		constant.CheckStatus[props.data.orderStatus]
	})
	
	function startCheck () {
		
	}
	
	function grabOrder () {
		const userInfo = utils.getStorage('userInfo')
		saveCarRecord({
			orderId: props.data.orderId,
			checkUserName: userInfo.checkUserName,
			checkUserId: userInfo.checkUserId,
		})
	}
	function info () {
		uni.navigateTo({
			url: `/pages/checkModel/index?orderId=${props.data.orderId}`
		})
	}
	
	function report () {
		
	}
	
	function additions () {
		
	}
	
	defineExpose({
		open() {
			popupRef.value?.open()
		},
		close() {
			popupRef.value?.close()
		}
	})
</script>

<style lang="scss">
	.popupContainer {
		width: 320px;
		max-width: 660rpx;
		background-color: #fff;
		box-sizing: border-box;
		padding: 10px;
		border-radius: 8px;
		.titleContainer {
			display: flex;
			justify-content: space-between;
			.title {
				font-size: 20px;
				font-weight: 650;
			}
			.status {
				font-size: 17px;
				color: #3388FF;
				&.finish {
					color: #70B603;
				}
			}
		}
		.checkInfoContainer {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			.carModel {
				font-size: 16px;
				font-weight: 500;
			}
			.artificer {
				font-size: 14px;
			}
		}
		
		.carAge {
			margin-top: 6px;
			font-weight: 400;
			font-size: 12px;
		}
		.carInfo {
			margin-top: 10px;
			display: flex;
			justify-content: space-between;
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				.itemTitle {
					font-weight: 400;
					font-size: 13px;
					color: #AAAAAA;
				}
				.itemContent {
					font-size: 14px;
					font-weight: 500;
					color: #000000;
				}
			}
		}
		.adviserInfo {
			display: flex;
			justify-content: space-between;
			margin-top: 10px;
			.item {
				font-size: 12px;
				color: #7F7F7F;
			}
		}
		.buttonContainer {
			display: flex;
			justify-content: space-around;
			margin-top: 20px;
			.maxButton {
				width: 80%;
			}
		}
	}
</style>