<template>
	<view class="container">
		<view class="logo"></view>
		<uni-forms>
			<uni-forms-item>
				<view class="inputContainer">
					<text class="text">手机号码</text>
					<uni-easyinput v-model="phoneNumber" />
				</view>
			</uni-forms-item>
			<uni-forms-item>
				<view class="inputContainer">
					<text class="text">登录密码</text>
					<uni-easyinput type="password" v-model="password" />
				</view>
			</uni-forms-item>
		</uni-forms>
		<button class="button" type="primary" size="mini">登录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phoneNumber: '',
				password: '',
			}
		},
	}
</script>

<style scoped lang='scss'>
	@import '@/global.scss';
	.container {
		@include pageContainer;
		padding: 15rpx;
		box-sizing: border-box;
		.logo {
			width: 120px;
			height: 49px;
			background-image: url(@/static/logo.png);
			background-size: 100% 100%;
			margin-bottom: 10px;
		}
		.inputContainer {
			margin-bottom: 10px;
			width: 100%;
			max-width: 500px;
			display: flex;
			flex-direction: column;
			.text {
				font-size: 10px;
				margin-bottom: 10px;
			}
		}
		.button {
			width: 100%;
			max-width: 450px;
		}
	}
</style>