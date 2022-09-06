<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<image class="logo juzho" src="../../../static/logo.png" ></image>
		<view class="wljiym">轻鱼</view>
		<view class="wdfabdiv" @click="yhxy">
			<view class="rydzj">服务协议</view>
			<image class="rgbj" src="../../../static/xyj.png"></image>
		</view>
		<view class="wdfabdiv" @click="ysxy">
			<view class="rydzj">隐私协议</view>
			<image class="rgbj" src="../../../static/xyj.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "关于我们",
				//返回图片路径
				path: "../../../static/jiant.png",
			}
		},
		methods: {
			//轻鱼用户服务协议
			yhxy: function() {
				uni.navigateTo({
					url: '/pages/agreement/yhfw/yhfw'
				});
			},
			//轻鱼用户隐私政策
			ysxy: function() {
				uni.navigateTo({
					url: '/pages/agreement/yszc/yszc'
				});
			},
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
.logo{
	width: 130upx;
	height: 130upx;
	display: block;
	padding-top: 110upx;
}
.wljiym{
	width: 100%;
	height: 120upx;
	line-height: 80upx;
	font-size: 30upx;
	color: #101010;
	text-align: center;
}
.wdfabdiv{
	width: 100%;
	height: 120upx;
	display: flex;
	line-height: 120upx;
	background-color: #FFFFFF;
	margin-bottom: 4upx;
}
.rydzj{
	flex: 1;
	margin-left: 30upx;
	font-size: 36upx;
	color: #2D2D2D;
}
.rgbj{
	width: 24upx;
	height: 24upx;
	display: block;
	padding-top: 50upx;
	padding-right: 20upx;
}
</style>
