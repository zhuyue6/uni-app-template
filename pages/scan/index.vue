<template>
	<view class="container">
		<view class="inputPlateNumber">
			<view class="title">车牌号</view>
			<view class="content">
				<view class="iconScan" type="download"></view>
				<view class="inputNumberContainer">
					<text class="label">车牌号</text>
					<input class="inputNumber" v-model="phoneNumber" placeholder="请输入车牌号" />
				</view>
				<view class="scan" @click="doScan"></view>
			</view>
		</view>
		<view class="searchHistory">
			<view class="title">最近搜索</view>
			<view v-if="showHistory" v-for="item of list" class="plateNumber">{{item.number}}</view>
			<view v-else>暂无数据</view>
			<view class="searchInPool">前往车辆池查找</view>
		</view>
		<view class="footer">
			<button size="mini" class="cancelButton">取消</button>
			<button size="mini" class="nextButton">下一步</button>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
					number: '浙A1234567'
				},{
					number: '浙A1234567'
				}]
			}
		},
		computed: {
			showHistory () {
				return this.list?.length > 0
			}
		},
		methods: {
			doScan () {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	@import '@/global.scss';
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		@include pageContainer;
		.inputPlateNumber {
			background: white;
			width: 100%;
			border-radius: 8px;
			color: $lightFontColor;
			.title {
				width: 100%;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				font-weight: bold;
				border-bottom: 1px solid #eee;
			}
			.content {
				padding: 10px;
				height: 80px;
				display: flex;
				align-items: center;
				font-size: 10px;
				color: rgba(0,0,0,0.6);
				.iconScan {
					width: 40px;
					height: 40px;
					background: #f00;
					border-radius: 20px;
					margin-right: 10px;
				}
				.inputNumberContainer {
					flex-grow: 1;
				}
				.inputNumber {
					font-size: 10px;
					margin-top: 6px;
					::v-deep .input-placeholder {
						color: rgba(0,0,0,0.2);
					}
				}
				.scan {
					width: 20px;
					height: 20px;
					background: #f00;
					border-radius: 20px;
					margin-right: 10px;
				}
			}
		}
		.searchHistory {
			margin-top: 10px;
			border-radius: 8px;
			width: 650rpx;
			max-width: 700px;
			background: white;
			padding: 16px;
			.title {
				font-size: 12px;
			}
			.plateNumber {
				padding: 10px 0;
				margin-top: 10px;
				border-bottom: 1px solid #eee;
			}
			.searchInPool {
				padding-top: 10px;
				color: blue;
				text-align: center;
				cursor: pointer;
			}
		}
		.footer {
			margin: 10px 0;
			display: flex;
			.cancelButton {
				background-color: #eee;
				font-weight: 500;
				color: rgba(0,0,0,0.7);
				@include buttonNoBorder;
			}
			.nextButton {
				background-color: #999;
				color: white;
				margin-left: 10px;
				@include buttonNoBorder;
			}
		}
	}
</style>