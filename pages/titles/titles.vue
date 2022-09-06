<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">账号锁定</view>
		<image class="zhfyimg juzho" src="../../static/zhsdtb.png"></image>
		<view class="zfcgzt">抱歉，您的账号已被锁定</view>
		<view class="zfcgzt1">原因是：涉嫌违反了轻鱼平台的相关使用规定</view>
		<view class="qdbj"><view class="ljck juzho" @click="quedin">确定</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		quedin:function(){
			uni.setStorageSync('token', "");
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>

<style>
.zhfyimg {
	width: 200upx;
	height: 200upx;
	display: block;
	padding-top: 224upx;
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
	color: #c3c3c3;
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
	color: #ffffff;
	background: rgba(252, 187, 103, 1);
	border-radius: 50upx;
}
</style>
