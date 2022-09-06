<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="kaittis">
			<image class="juzho" src="../../../static/huang.png"></image>
			<view class="qinyms">轻鱼会员开通成功</view>
			<view class="hyyx">会员有效期：{{userData.PlusEndTime}}</view>
		</view>
		<view class="dibfd"><view class="yetz juzho" @click="following">立即开展会员专享业务</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//标题
			title: '轻鱼会员开通成功',
			//返回图片路径
			path: '../../../static/jiant.png',
			//用户信息
			userData: ''
		};
	},
	onLoad() {
		this.loadingUser();
	},
	methods: {
		//用户数据
		loadingUser: function() {
			this.$api.loadingUser((status, code, res) => {
				if (status) {
					//把用户信息存入VUEX
					this.$store.commit('saveUser', res.obj);
					this.userData = res.obj;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//下一步
		following: function() {
			uni.reLaunch({
				url: '/pages/index/index?location=1'
			});
		}
	}
};
</script>

<style>
.kaittis {
	width: 100%;
	height: 320upx;
	padding-top: 190upx;
}

.kaittis image {
	width: 168upx;
	height: 168upx;
	display: block;
	margin-bottom: 30upx;
}

.qinyms {
	width: 100%;
	height: 40upx;
	line-height: 40upx;
	color: #333333;
	font-size: 40upx;
	margin-bottom: 20upx;
	text-align: center;
}

.hyyx {
	width: 100%;
	height: 40upx;
	line-height: 40upx;
	color: #979797;
	font-size: 30upx;
	text-align: center;
}

.dibfd {
	width: 100%;
	height: 180upx;
	position: fixed;
	bottom: 0;
}

.yetz {
	width: 630upx;
	height: 100upx;
	line-height: 100upx;
	text-align: center;
	font-size: 36upx;
	color: #ffffff;
	background-color: #fcbb67;
	border-radius: 50upx;
}
</style>
