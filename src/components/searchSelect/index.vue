<template>
	<cPopup ref="cPopupRef">
		<content
			v-bind="$attrs"
			@select="select"
			@cancel="close"
			:list="list"
		>
		</content>
		<noData v-if="isShowNoDate"/>
	</cPopup>
</template>

<script setup lang="ts">
	import {ref,computed} from 'vue'
	import cPopup from '@/components/cPopup/index.vue'
	import content from './content.vue'
	import noData from '@/components/noData/index.vue'
	
	const cPopupRef = ref<typeof cPopup | null>(null)
	const props = withDefaults(defineProps<{
		list: {text: string, value: any, item: any}[]
	}>(), {
		list: () => []
	})
	const emit = defineEmits(['select'])
	const isShowNoDate = computed<boolean>(()=>{
		return props.list.length === 0
	})
	
	function select(data: any) {
		emit('select', data)
		close()
	}
	
	function close () {
		cPopupRef.value?.close()
	}
	defineExpose({
	  open() {
		  cPopupRef.value?.open()
	  },
	  close() {
		  cPopupRef.value?.close()
	  }
	})
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