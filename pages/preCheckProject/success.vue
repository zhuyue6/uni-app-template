<template>
	<resultPage 
		:page="state.page"
		tip="接车成功"
	/>
</template>

<script setup lang="ts">
	import resultPage from '@/components/resultPage/index.vue'
	const state = {
		page: {
			name: '接车单首页',
			url: '/pages/pickCar/index'
		},
	}
</script>