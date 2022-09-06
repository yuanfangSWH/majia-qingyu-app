<template>
	<view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<view class="xiztstk" v-show="downloadTK">
			<view class="xzbbh">{{ downloadData.version }}</view>
			<image class="xiazimg" src="../../static/xiaztp.png"></image>
			<view class="xiatswz">{{ downloadData.update_info }}</view>
			<view class="xiatisan" @click="lijgxF">立即更新</view>
			<view class="xiaml">为了不影响使用，请立即升级</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//是否显示遮罩
			blocking: false,
			//下载弹框
			downloadTK: false,
			//用户信息
			userData: '',
			//下载返回数据
			downloadData: '',
			//token
			token: ''
		};
	},
	onLoad() {
		this.updateApp();
	},
	methods: {
		//检查是否有更新
		updateApp: function() {
			var type = 1;
			//#ifdef APP-PLUS
			uni.getSystemInfo({
				success: function(res) {
					//判断客户端平台
					if (res.platform == 'android') {
						type = 1;
					} else if (res.platform == 'ios') {
						type = 2;
					}
				}
			});
			//#endif
			var version = plus.runtime.version; //获取当前版本号
			var parameter = '?version=v' + version + '&type=' + type;
			this.$api.apiPost('/app/checkversion', parameter, '', 'post', (status, code, res) => {
				if (Number(code) != 200 && Number(code) != 500) {
					this.downloadData = res.obj;
					this.blocking = true;
					this.downloadTK = true;
				} else {
					this.login();
				}
			});
		},
		//立即更新
		lijgxF: function() {
			//调用5+APP的API方法调起第三方程序打开URL
			plus.runtime.openURL(this.downloadData.link_url, function(e) {});
		},
		//判断是否登录
		login: function() {
			//获取token
			this.token = uni.getStorageSync('token');
			if (this.token != '' && this.token != null) {
				this.JCtoken();
			} else {
				uni.reLaunch({
					url: '/pages/login/login'
				});
			}
		},
		//检查token是否过期
		JCtoken: function() {
			var data = {
				//token
				token: this.token
			};
			this.$api.apiPost('/reg/tokenverify', '', data, 'post', (status, code, res) => {
				if (status) {
					uni.setStorageSync('token', res.obj);
					this.getUser();
				} else if (code == 100016) {
					this.wxdl();
				} else if (code == 100015) {
					//账号锁定页面
					uni.reLaunch({
						url: '/pages/titles/titles'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//微信登录1
		wxdl: function() {
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
		},
		//微信登录2
		loginData: function(WXcode) {
			var parameter = '?code=' + WXcode;
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
				} else if (code == 100013) {
					uni.navigateTo({
						url: '/pages/login/invite/invite'
					});
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//拉取用户信息
		getUser: function() {
			this.$api.loadingUser((status, code, res) => {
				if (status) {
					if (res.obj.IsDis) {
						//账号锁定页面
						uni.reLaunch({
							url: '/pages/titles/titles'
						});
					} else {
						//把用户信息存入VUEX
						this.$store.commit('saveUser', res.obj);
						this.userData = res.obj;
						uni.showToast({
							title: '欢迎回来，' + this.userData.Nickname + '~',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/index/index'
							});
						}, 2000);
					}
				} else {
					uni.showToast({
						title: res.msg + '错误，请重新登录',
						icon: 'none',
						duration: 2000
					});
					uni.reLaunch({
						url: '/pages/login/login'
					});
				}
			});
		}
	}
};
</script>

<style>
.xiztstk {
	width: 520upx;
	height: 592upx;
	background: #ffffff;
	border-radius: 8upx;
	position: fixed;
	top: 50%;
	margin-top: -292upx;
	left: 50%;
	margin-left: -260upx;
	z-index: 40;
}
.xiazimg {
	width: 100%;
	height: 340upx;
	display: block;
}
.xiatswz {
	width: 490upx;
	height: 80upx;
	line-height: 80upx;
	margin-left: auto;
	margin-right: auto;
	font-size: 24upx;
	text-align: center;
	color: #000000;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.xiatisan {
	width: 400upx;
	height: 80upx;
	margin-left: auto;
	margin-right: auto;
	border: 2upx solid rgba(252, 187, 103, 1);
	border-radius: 40upx;
	line-height: 80upx;
	color: #ffab3e;
	font-size: 28upx;
	font-weight: bold;
	text-align: center;
}
.xiaml {
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	color: #979797;
	font-size: 22upx;
	text-align: center;
}
.xzbbh {
	width: auto;
	height: 30upx;
	background-color: #ed703f;
	line-height: 30upx;
	font-size: 14upx;
	color: #ffffff;
	position: absolute;
	top: 84upx;
	left: 290upx;
	border-radius: 20upx;
	z-index: 50;
	padding-left: 20upx;
	padding-right: 20upx;
}
</style>
