<template>
	<uni-popup ref="popup" type="bottom">
		<view class="popupContainer">
			<view class="popupContainerMain">
				<slot></slot>
			</view>
		</view>
	</uni-popup>
</template>

<script setup lang="ts">
	import {ref} from 'vue'
	import type {uniUiTypes} from '@/shared';
	
	const popup = ref<uniUiTypes.uniPopup| null>(null)

	defineExpose({
	  open() {
		  popup.value?.open()
	  },
	  close() {
		  popup.value?.close()
	  }
	})
</script>

<style lang="scss">
	.popupContainer {
		background: #fff;
		display: flex;
		justify-content: center;
		padding: 10px 0;
		.popupContainerMain {
			display: flex;
			flex-direction: column;
			width: 700rpx;
			max-width: 700px;
		}
	}
</style>