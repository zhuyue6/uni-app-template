<template>
	<view class="footerButtonsContainer">
		<button class="cancelButton" @click="$emit('cancel')" size="mini">{{cancelText}}</button>
		<button class="okButton" @click="$emit('ok')" size="mini">{{okText}}</button>
	</view>
</template>

<script>
	export default {
		props: {
			okText: {
				type: String,
				default: '确认'
			},
			cancelText: {
				type: String,
				default: '取消'
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/global.scss';
	.button {
		padding: 0px 50px;
		font-weight: 300;
	}
	.footerButtonsContainer {
		display: flex;
		justify-content: center;
		width: 100%;
		margin: 20px 0;
		.cancelButton {
			background: #ccc;
			color: $lightFontColor;
			@extend .button;
			margin-right: 20px;
		}
		.okButton {
			background: royalblue;
			color: white;
			@extend .button;
		} 
	}
</style>