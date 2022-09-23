<template>
		<SearchSelect
		 ref="popupRef"
		 @select="select" 
		 @search="search"
		 title="请选择品牌车款" 
		 :list="list"/>
</template>

<script setup lang="ts">
	import SearchSelect from '@/components/searchSelect/index.vue'
	import {reactive, ref, computed} from 'vue'
	import {getCarModels} from '@/services/carInfo'
	
	const emit = defineEmits(['select'])
	const popupRef = ref<typeof SearchSelect| null>(null)
	const state = reactive<{
		carModels: carModel[],
		searchText: string
	}>({
		carModels: [],
		searchText: ''
	})

	function select(data: carModel) {
		emit('select', data)
		popupRef.value?.close()
	}
	
	function formatResponse(res: carModel[]) {
		return res.map((item) => ({
			text: item.carBrandName,
			value: item.carBrandId,
			item
		}))
	}
	
	function search(data: string) {
		state.searchText = data
		getCarModels({
		  carBrandName: state.searchText
		}).then((res)=>{
			state.carModels = res
		})
	}
	
	const list = computed(() => formatResponse(state.carModels))
	
	defineExpose({
	  open() {
		  getCarModels({
			  carBrandName: state.searchText
		  }).then((res)=>{
		  	state.carModels = res
			popupRef.value?.open()
		  })
	  },
	  close() {
		  popupRef.value?.close()
	  }
	})
</script>

<style>
</style>