<template>
	<view class="container">
		<view class="title">检测模块</view>
		<view class="modelItem" v-for="(item, index) of models" @click="openModelDetail">
			<view class="info">
				<view class="infoTitle">{{index + 1}}.{{item.name}}</view>
				<view class="checkPonit">检测点：{{item.checkPoints.finish}}/{{item.checkPoints.total}}</view>
			</view>
			<view class="status">
				<uni-icons type="info-filled" color="red" size="20"></uni-icons>
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
		<view class="buttonContainer">
			<button type="primary" plain="true" size="mini" @click="addCheckModel">
				<uni-icons type="plusempty" color="#007aff"></uni-icons>
				添加检测模块
			</button>
			<searchSelect 
				ref="searchSelectRef"
				title="添加检测模块"
				:list="list"
				:isMuti="true"
			/>
		</view>
		
		<view class="operateContainer">
			<cButton class="operateItem" @click="openReport">
				<uni-icons type="search" color="#007aff"></uni-icons>
				<text class="text">查看报告</text>
			</cButton>
			<cButton v-if="false" class="operateItem big change" @click="checkFinish">
				检测完成
			</cButton>
			<cButton v-else class="operateItem big change"  @click="changeOwner">
				变更为自己名下
			</cButton>
		</view>
	</view>
</template>

<script setup>
	import {reactive, ref} from 'vue'
	import cButton from '@/components/cButton/index.vue'
	import searchSelect from '@/components/searchSelect/index.vue'
	const searchSelectRef = ref(null)
	const list = [
	    { value: 0, text: "篮球" },
	    { value: 1, text: "足球" },
	    { value: 2, text: "游泳" },
	]
	const models = [{
		name: '空调系统',
		checkPoints: {
			total: 1,
			finish: 0
		}
	}, {
		name: '发动机-进气系统',
		checkPoints: {
			total: 1,
			finish: 1
		}
	}, {
		name: '底盘-制动系统',
		checkPoints: {
			total: 1,
			finish: 1
		}
	}, {
		name: '底盘-轮胎',
		checkPoints: {
			total: 1,
			finish: 1
		}
	}]
	
	uni.setNavigationBarTitle({
		title: '华星精检'
	});
	
	function openModelDetail () {
		uni.navigateTo({
			url: "/pages/checkModel/info"
		})
	}
	
	function addCheckModel() {
		searchSelectRef.value.open()
	}
	
	function openReport () {
		
	}
	
	function checkFinish () {
		
	}
	
	function changeOwner () {
		
	}
	
</script>

<style lang="scss">
	@import '@/global.scss';
	.container {
		@include pageContainer;
		.title {
			padding: 10px;
		}
		.modelItem {
			display: flex;
			justify-content: space-between;
			align-items: center;
			cursor: pointer;
			padding: 10px;
			.info {
				display: flex;
				flex-direction: column;
				.infoTitle {
					font-weight: 650;
				}
				.checkPonit {
					margin-top: 10px;
					font-size: 12px;
					color: #aaa;
				}
			}
			.status {
				display: flex;
			}
		}
		.buttonContainer {
			margin: 10px 0 0 10px;
			width: 140px;
			max-width: 375rpx;
		}
		.operateContainer {
			margin-top: 50px;
			display: flex;
			justify-content: space-between;
			font-size: 14px;
			.operateItem {
				background-color: #f2f2f2;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 30%;
				color: #333;
				height: 44px;
				border-radius: 8px;
				cursor: pointer;
				.text {
					margin-left: 6px;
				}
				&:first-child {
					margin-right: 10px;
				}
				&.big {
					width: 60%;
				}
				&.disable {
					background-color: #d7d7d7;
					color: white;
				}
				&.change {
					background-color: #3388ff;
					color: white;
				}
			}
		}
	}
</style>