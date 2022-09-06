<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zfcg">
			<image src="../../../static/fabucg.png"></image>
		</view>
		<view class="zfcgzt">你的评价商家已收到</view>
		<view class="qdbj">
			<view class="ljck juzho" @click="following">前往任务详情查看评价</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "评价成功",
				//返回图片路径
				path: "../../../static/jiant.png",
				//当前任务的ID
				taskIDdata: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.taskIDdata = option.id;
		},
		methods: {
			//下一步(废弃)
			following: function() {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id='+this.taskIDdata
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
