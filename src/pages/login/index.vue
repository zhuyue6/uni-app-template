<template>
	<view class="container">
		<view class="logoContainer">
			<view class="logo"></view>
		</view>
		<uni-forms 
			:model="formData" 
			ref="form" 
			:rules="rules" 
			validateTrigger="bind"
			label-position="top"
		>
			<uni-forms-item name="userName" label="用户名">
				<view class="inputContainer">
					<uni-easyinput v-model="formData.userName" />
				</view>
			</uni-forms-item>
			<uni-forms-item name="password" label="登录密码">
				<view class="inputContainer">
					<uni-easyinput type="password" v-model="formData.password" />
				</view>
			</uni-forms-item>
		</uni-forms>
		<button class="button" type="primary" size="mini" @click="doLogin">登录</button>
		<!-- <view class="noAccount">
			<view class="noAccountItem">忘记密码</view>
			<view class="noAccountItem">立即注册</view>
		</view> -->
		<!-- <view class="agreement">
			登录注册即同意协议autoX3
			<text class="agreementDetail">《用户协议》</text>
			和
			<text class="agreementDetail">《隐私政策》</text>
		</view> -->
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, onMounted } from 'vue'
	import { validateRule, utils, uniUiTypes } from '@/shared'
	import { login } from '@/services/login'
	const form = ref<uniUiTypes.uniForms | null>(null)
	const formData = reactive({
		userName: '',
		password: '',
	})
	
	const rules = {
		userName: {
			rules: [
				validateRule.required,
				validateRule.number
			]
		},
		password: {
			rules: [
				validateRule.required,
				validateRule.password
			]
		}
	}
	function doLogin() {
		form.value?.validate([], (err: string)=>{
			if (err) {
				return utils.errorTip('用户名或密码错误')
			}
			login({
				username: formData.userName,
				password: formData.password,
			}).then(()=>{
				alreadyLoginToIndexPage()
			})
		})
	}
	function alreadyLoginToIndexPage() {
		// 如果已经登录了直接重定向到接车页面
		uni.redirectTo({
			url: '/pages/pickCar/index'
		})
	}
	
	onMounted(()=>{
		if (false) {
			alreadyLoginToIndexPage()
		}
	})
	
</script>

<style lang='scss'>
	@import '@/global.scss';
	.container {
		@include pageContainer;
		padding: 15rpx;
		box-sizing: border-box;
		flex-direction: column;
		align-items: center;
		&::v-deep {
			.uni-forms {
				width: 100%
			};
		}
		.logoContainer {
			width: 100%;
			.logo {
				width: 120px;
				height: 49px;
				background-image: url(@/static/logo.png);
				background-size: 100% 100%;
				margin-bottom: 10px;
			}
		}
		.inputContainer {
			min-width: 500rpx;
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
		/* .noAccount {
			color: $lightFontColor;
			font-size: 12px;
			margin-top: 10px;
			width: 100%;
			display: flex;
			justify-content: space-between;
			.noAccountItem {
				cursor: pointer;
			}
		}
		.agreement {
			margin-top: 30px;
			font-size: 12px;
			white-space: nowrap;
			color: $lightFontColor;
			.agreementDetail {
				cursor: pointer;
				color: $primaryColor;
			}
		} */
	}
</style>