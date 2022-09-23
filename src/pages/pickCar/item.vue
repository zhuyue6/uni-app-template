<template>
	<view class="itemContainer">
		<view class="titleContainer">
			<view class="itemTitle">{{data.carNumber}}</view>
			<view :class="[data.orderStatus > 3 ? 'checking' : 'finish']">{{checkStatusText}}</view>
		</view>
		<view class="infoContainer">
			<view class="infoItem">
				<text class="infoTitle">{{data.formName}}</text>
				<text>{{data.checkBeginTime}}</text>
			</view>
			<view class="infoItem">
				<text>技师：{{data.checkUserName}}</text>
				<text>检测进度 {{data.checkRate}}</text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {computed} from 'vue'
	import {constant} from '@/shared'
	const props = defineProps<{
		data: carRecord
	}>()
	const checkStatusText = computed<string>(()=>{
		return constant.CheckStatus[props.data.orderStatus]
	})
</script>

<style lang="scss">
	.itemContainer {
		margin: 10px 6px 0px 6px;
		background: white;
		border-radius: 8px;
		padding: 10px 16px;
		.titleContainer {
			display: flex;
			justify-content: space-between;
			padding-bottom: 10px;
			border-bottom: 1px solid #eee;
			font-size: 14px;
			.itemTitle {
				font-size: 15px;
				font-weight: 400;
			}
			.checking{
				color: rgb(51, 136, 255);
			}
			.finish {
				color: rgb(112, 182, 3);
			}
		}
		.infoContainer {
			padding-top: 10px;
			font-size: 14px;
			.infoTitle {
				font-weight: bold;
			}
			.infoItem {
				display: flex;
				justify-content: space-between;
				margin-bottom: 10px;
			}
		}
	}
</style>