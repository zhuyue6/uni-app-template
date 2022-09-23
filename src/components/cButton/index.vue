<template>
	<view @click="click" :class="[isClick && 'click']">
		<slot></slot>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import {debounce} from '@/shared/utils'
	const emit = defineEmits(['click'])
	const isClick = ref(false)
	function setClickFalse () {
		isClick.value = false
	}
	function click() {
		isClick.value = true;
		debounce(setClickFalse, 200)
		emit('click')
	}
</script>

<style lang="scss">
	.click {
		opacity: 0.5;
	}
</style>