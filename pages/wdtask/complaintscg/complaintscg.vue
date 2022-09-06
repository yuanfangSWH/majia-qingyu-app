<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zfcg">
			<image src="../../../static/fabucg.png"></image>
		</view>
		<view class="zfcgzt">你的投诉已成功提交</view>
		<view class="zfcgzt1">投诉的消息可以在我的发布中查看</view>
		<view class="qdbj">
			<view class="ljck juzho">查看我的投诉内容</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "投诉成功",
				//返回图片路径
				path: "../../../static/jiant.png"
			}
		},
		//监听页面加载
		onLoad(option) {
			this.taskIDdata = option.id;
		},
		methods: {
			//下一步
			following: function() {
				uni.setStorageSync('refreshData', 1);
				uni.navigateBack({
				    delta: 2
				});
			}
		}
	}
</script>

<style>
	.zfcg {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
	}

	.zfcg image {
		width: 160upx;
		height: 160upx;
		margin-top: 200upx;
	}

	.zfcgzt {
		width: auto;
		height: 37upx;
		font-size: 36upx;
		color: #333333;
		text-align: center;
		margin-top: 30upx;
	}
	.zfcgzt1 {
		width: auto;
		height: 37upx;
		font-size: 30upx;
		color: #C3C3C3;
		text-align: center;
		margin-top: 20upx;
	}
	.qdbj {
		width: 100%;
		height: 180upx;
		position: fixed;
		bottom: 0;
	}
	
	.ljck {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		text-align: center;
		color: #FFFFFF;
		background: rgba(252, 187, 103, 1);
		border-radius: 50upx;
	}
</style>
