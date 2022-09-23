<template>
	<view class="container">
		<view class="titleContainer">
			<view class="title">空调滤芯状态</view>
			<view class="checkPonitTotal">1个检测点</view>
		</view>
		<view class="camera" @click="photograph">
			<uni-icons type="camera-filled" color="#bbb" size="30"></uni-icons>
		</view>
		<view class="checkPoint">
			<view class="checkPointTitleContainer">
				<uni-icons type="smallcircle-filled" size="1" :color="constant.Color.primary"></uni-icons>
				<text class="checkPointTitle">检测点1：空调滤芯脏污度</text>
				<uni-tooltip content="查看详情1212121212">
				  <uni-icons type="help" size="20" :color="constant.Color.primary"></uni-icons>
				</uni-tooltip>
			</view>
			<view class="selectItem">
				A.干净
			</view>
			<view class="selectItem">
				B.一般
			</view>
			<view class="selectItem">
				C.脏
			</view>
		</view>
		<view class="suggest">
			<view class="title">维修建议</view>
			<view class="operate">
				<view class="item">
					<button plain="true" size="mini">客户已确定维修</button>
				</view>
				<view class="item" @click="addProblem">
					<button type="primary"  plain="true" size="mini">
						<view>
							<uni-icons type="plusempty" size="12" :color="constant.Color.primary"></uni-icons>
							增加维修项目
						</view>
					</button>
				</view>
				<searchSelect 
					ref="problemRef" 
					title="增加建议维修项目" 
					:list="list"
					:isMuti="true"
				/>
			</view>
			<view class="problemList">
				<view class="row">
					<view class="name">项目名称/问题描述</view>
					<view class="level">建议级别</view>
					<view class="number">数量</view>
				</view>
				<view class="row">
					<view class="name">前上支臂</view>
					<view class="level">
						<input class="input" placeholder="请输入" maxlength="10" />
					</view>
					<view class="number">
						<uni-number-box />
						<view class="delete">
							<uni-icons type="trash" size="18"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="checkPointCount">
				<text class="finish">0</text>
			/1</view>
			<button type="primary" size="mini" @click="addCheckModel">添加检测项目</button>
			<button  size="mini" :disabled="true">提交并继续检测</button>
			<searchSelect
				ref="checkModelRef"
				title="添加检测模块"
				:list="list"
				:isMuti="true"
			/>
		</view>
	</view>
</template>

<script setup>
	import { openCamera, constant } from '@/shared'
	import searchSelect from '@/components/searchSelect/index.vue'
	import {ref} from "vue"
	const list = [
	    { value: 0, text: "篮球" },
	    { value: 1, text: "足球" },
	    { value: 2, text: "游泳" },
	]
	const problemRef = ref(null)
	const checkModelRef = ref(null)

	function photograph() {
		openCamera()
	}
	function addCheckModel() {
		checkModelRef.value.open()
	}
	function addProblem() {
		problemRef.value.open()
	}
</script>

<style lang="scss">
	@import '@/global.scss';
	.container {
		@include pageContainer;
		padding: 10px;
		.titleContainer {
			.title {
				font-size: $titleFontsize;
			    font-weight: $fontBorder;
				margin-bottom: 6px;
			}
			.checkPonitTotal {
				font-size: 13px;
				color: #aaa;
			}
		}
		.camera {
			display: flex;
			flex-shrink: 0;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			margin-top: 20px;
			width: 100px;
			height: 100px;
			background-color: #ddd;
			border-radius: 10px;
		}
		.checkPoint {
			margin-top: 15px;
			background-color: $containerBG;
			border-radius: 8px;
			padding: 10px;
			.checkPointTitleContainer {
				display:flex;
				align-items: center;
				.checkPointTitle {
					margin: 0 5px;
					font-weight: $fontBorder;
				}
			}
			
			.selectItem {
				padding: 10px;
				border-radius: 8px;
				background-color: #F7F7FA;
				margin-top: 10px;
			}
		}
		.suggest {
			margin-top: 15px;
			background-color: $containerBG;
			border-radius: 8px;
			padding: 10px;
			.operate {
				display: flex;
				margin-top: 15px;
				.item {
					display: flex;
					&:first-child {
						margin-right: 10px;
					}
				}
			}
			.problemList {
				display: flex;
				flex-direction: column;
				margin-top: 10px;
				.row {
					display: flex;
					justify-content: space-between;
					padding: 10px 0;
					border-top: 1px solid #eee;
					&:first-child {
						border: none;
					}
					.name {
						display: flex;
						align-items: center;
						width: 40%;
					}
					.level {
						display: flex;
						align-items: center;
						width: 20%;
						&::v-deep {
							.uni-input-placeholder, .uni-input-input {
								font-size: 14px;
							}
						}
						.input {
							font: 12px;
						}
					}
					.number {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 35%;
					}
					.delete {
						cursor: pointer;
						margin-left: 10px;
					}
				}
			}
		}
		.bottom {
			background-color: $containerBG;
			margin-top: 10px;
			display: flex;
			align-items: center;
			height: 66px;
			padding: 8px;
			.checkPointCount {
				background-color: #eee;
				border-radius: 4px;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 0 8px;
				height: 100%;
				.finish {
					color: $primaryColor;
					
				}
			}
		}
	}
</style>