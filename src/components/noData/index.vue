<template>
	<view class="noData">{{props.text}}</view>
</template>

<script setup lang="ts">
	const props = withDefaults(defineProps<{
		text: string
	}>(), {
	  text: '暂无数据',
	})
</script>

<style lang="scss">
	@import '@/global.scss';
	.noData {
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $lightFontColor;
	}
</style>