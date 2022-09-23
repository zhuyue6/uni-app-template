<template>
	<view class="searchSelectContainer">
		<view class="title">{{title}}</view>
		<uni-easyinput 
			prefixIcon="search" 
			v-model="state.inputValue" 
			placeholder="搜索" 
			@input="search"
			@iconClick="iconClick">
		</uni-easyinput>
		<view class="listContainer">
			<view class="item" v-for="item of list" @click="select(item)" :key="item.value">
				{{item.text}}
				<uni-icons v-if="state.selects.has(item.value)" :color="constant.Color.primary" type="checkmarkempty"></uni-icons>
			</view>
		</view>
		<view class="mutiButtonContainer" v-if="isMuti">
			<CButton class="mutiButton" @click="mutiOk">
				确定
			</CButton>
			<CButton class="mutiButton" @click="mutiCancel">
				取消
			</CButton>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive } from 'vue'
	import { constant, utils } from '@/shared'
	import CButton from '@/components/cButton/index.vue'
	const state = reactive({
		selects: new Set(),
		inputValue: ''
	});
	
	const props = defineProps(['title', 'list', 'isMuti']);
	const emit = defineEmits(['search', 'select', 'cancel'])
	
	function iconClick (iconType: string) {
		if (iconType === 'prefix') search()
	}
	
	function search () {
		utils.debounce(()=>{
			emit('search', state.inputValue)
		}, 300)
	}
	
	function select(item: any) {
		if (props.isMuti) {
			if (state.selects.has(item.value)) {
				state.selects.delete(item.value)
			} else {
				state.selects.add(item.value)
			}
			return
		}
		emit('select', item)
	}
	
	function mutiOk () {
		emit('select', select)
	}
	
	function mutiCancel () {
		emit('cancel')
	}
</script>

<style lang="scss">
	.searchSelectContainer {
		display: flex;
		flex-direction: column;
		align-items: center;
		.title {
			margin-bottom: 10px;
		}
		.listContainer{
			margin-top: 10px;
			width: 100%;
			.item {
				display:flex;
				justify-content: space-between;
				margin-top: 5px;
				padding: 5px 10px;
				color: #333;
				font-size: 17px;
				border-bottom: 1px solid #ddd;
				&:last-child {
					border-bottom: none;
				}
			}
		}
		.mutiButtonContainer {
			display: flex;
			flex-grow: 1;
			flex-direction: column;
			width: 100%;
			.mutiButton {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-grow: 1;
				height: 55px;
				&:first-child {
					border-bottom: 1px solid #eee;
				}
			}
		}
	}
</style>