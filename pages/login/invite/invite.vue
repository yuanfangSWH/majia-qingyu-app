<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv"><image class="return" src="../../../static/jiant2.png" @click="returnData"></image></view>
		<view class="hm">请输入邀请码</view>
		<view class="sm">当前轻鱼为邀请开放状态</view>
		<view class="shurk juzho"><input class="sj-input" type="number" maxlength="11" v-model="inviteData" placeholder="请输入邀请码" @input="shurpd" /></view>
		<view class="dlan juzho" :class="{ shurwb: selected }" @click="wxdl">确定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//邀请码
			inviteData: '',
			//是否可以点击
			selected: false,
			//微信code
			WXcode:""
		};
	},
	onLoad() {
		//从VUEX获取微信code
		this.WXcode = this.$store.state.loginData.wxcode;
	},
	methods: {
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		//是否可以点击
		shurpd: function(event) {
			if (event.target.value.length >1) {
				this.selected = true;
			} else {
				this.selected = false;
			}
		},
		//微信授权
		wxdl: function() {
			if (this.selected) {
				var _self = this;
				plus.oauth.getServices(
					function(services) {
						let auths = services;
						let aweixin = auths[0];
						if (!aweixin.authResult) {
							aweixin.authorize(
								function(e) {
									_self.loginData(e.code);
								},
								function(e) {
									uni.showToast({
										title: '微信授权失败，请重试',
										icon: 'none'
									});
								},
								{
									scope: 'snsapi_userinfo',
									state: '123'
								}
							);
						} else {
							uni.showToast({
								title: '已授权',
								icon: 'none'
							});
						}
					},
					function(e) {
						console.log('获取登录授权服务列表失败：' + JSON.stringify(e));
					}
				);
			}
		},
		//绑定邀请码
		loginData: function(WXcode) {
			if (this.selected) {
			var parameter = '?code=' + WXcode+'&pid='+this.inviteData;
			this.$api.apiPost('/reg/bindwx', parameter, '', 'get', (status, code, res) => {
				if (status) {
					//登录成功后的token保存下来
					uni.setStorageSync('token', res.obj);
					this.getUser();
				} else if (code == 100007) {
					//把微信ID数据存入VUEX
					this.$store.commit('bcwx', res.obj);
					uni.navigateTo({
						url: '/pages/login/shurusj/shurusj'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
			}
		},
		//拉取用户信息
		getUser: function() {
			this.$api.loadingUser((status, code, res) => {
				if (status) {
					//把用户信息存入VUEX
					this.$store.commit('saveUser', res.obj);
					this.userData = res.obj;
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						duration: 2000
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/index/index'
						});
					}, 2000);
				} else {
					uni.showToast({
						title: res.msg + '错误，请重新登录',
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style>
/* 顶部标题栏CSS */
.daohdiv {
	background-color: #ffffff;
}

.hm {
	width: 100%;
	height: 140upx;
	line-height: 140upx;
	color: #101010;
	font-size: 72upx;
	text-align: center;
	padding-top: 200upx;
}

.sm {
	width: 100%;
	height: 32upx;
	line-height: 32upx;
	color: #b5b5b5;
	font-size: 32upx;
	text-align: center;
	margin-bottom: 60upx;
}

.shurk {
	width: 510upx;
	height: 76upx;
	border-bottom: 1px #dddddd solid;
	margin-bottom: 40upx;
}

.sj-input {
	width: 510upx;
	height: 76upx;
	line-height: 76upx;
	color: #101010;
	font-size: 32upx;
	text-align: center;
}

.dlan {
	width: 648upx;
	height: 100upx;
	line-height: 100upx;
	color: #ffffff;
	font-size: 36upx;
	text-align: center;
	background-color: #c8c8c8;
	margin-bottom: 20upx;
	border-radius: 50upx;
}

.shurwb {
	background-color: #fcbb67;
}
</style>
