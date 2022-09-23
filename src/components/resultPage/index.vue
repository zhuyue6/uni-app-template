<template>
	<view class="container">
		<view class="infoContainer">
			<uni-icons :color="type === 'success' ? 'green' : 'red'" size="50" :type="type === 'success' ? 'checkbox-filled' : 'clear'"></uni-icons>
			<text class="tip">{{tip}}</text>
			<text class="countDown">
				{{state.time}}秒自动返回{{page.name}}
			</text>
			<button type="primary" size="mini" @click="back">返回</button>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {reactive} from 'vue'
	const props = defineProps({
		type: {
			type: String,
			default: 'success'
		},
		page: {
			type: Object,
			default() {
				return {
					url: '',
					name: ''
				}
			}
		},
		tip: {
			type: String,
			default: ''
		},
		time: {
			type: Number,
			default: 3
		}
	})
	const state =  reactive({
		time: props.time
	})
	
	let timer: NodeJS.Timer | null = null
	function back () {
		timer && clearTimeout(timer);
		uni.redirectTo({
			url: props.page.url
		})
	}
	function countDown() {
		if (state.time > 0) {
			timer = setTimeout(()=>{
				state.time--;
				countDown();
			}, 1000)
		} else {
			back();
		}
	}

	countDown()
	
	
</script>

<style lang="scss">
	@import '@/global.scss';
	.container{
		@include pageContainer;
		justify-content: center;
		.infoContainer {
			display: flex;
			flex-direction: column;
			align-items: center;
			.icon {
				font-size: 50px;
				&.success {
					color: green;
				}
				&.fail {
					color: red;
				}
			}
			.countDown {
				margin-bottom: 15px;
			}
			.tip {
				margin: 15px 0;
				font-weight: 650;
			}
		}
	}
</style>