<template>
	<view>
		<view class="status_bar"></view>
		<image class="logo juzho" src="../../static/logo.png" @click="kjdl"></image>
		<view class="dibu">
			<view class="dlan juzho" @click="wxdl">微信登录</view>
			<view class="sjhdl" @click="qita">使用手机号登录 ＞</view>
			<view class="guidiv">
				<view class="goutu1" v-show="!selected" @click="xuanz"></view>
				<view class="goutu2" v-show="selected" @click="xuanz"><image class="juzho" src="../../static/goutu.png"></image></view>
				<view class="wz">
					已阅读并同意遵守
					<text @click="yhxy">《用户协议》</text>
					及
					<text @click="ysxy">《隐私政策》</text>
				</view>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 协议弹框 -->
		<view class="xitykdiv" v-show="xieyTK">
			<view class="tljybt">用户协议及隐私条款</view>
			<view class="zhihsmdoubs">我们依据最新的法律，向你说明轻鱼软件的隐私政策，特向您推送本提示。请您阅读并充分理解相关条款。</view>
			<view class="zhihsmdoubs" style="padding-top: 10upx;">我们承诺</view>
			<view class="xieydwz1">
				<text style="color: #e9ba68;">*</text>
				我们会严格按照《网络安全法》、《信息网络传播保护调理》等保护您的个人信息。
			</view>
			<view class="xieydwz1">
				<text style="color: #e9ba68;">*</text>
				如果未经您的授权，我们不会使用您的个人信息用于您未授权的其他途径或目的。
			</view>
			<view class="xieydwz2">您点击“同意，即表示您已阅读并同意更新后的《用户协议》及《隐私政策》</view>
			<view class="nijiuzho">
				查看完整版
				<text style="color: #e9ba68;" @click="yhxy">《用户协议》</text>
				及
				<text style="color: #e9ba68;" @click="ysxy">《隐私政策》</text>
			</view>
			<view class="xieyank">
				<view class="xyant" style="margin-left: 48upx;background-color: #FFFFFF;color:#FCBB67 ;" @click="agreementDJ(2)">不同意</view>
				<view class="xyant" style="margin-left: 50upx;background-color: #FCBB67;" @click="agreementDJ(1)">同意</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 是否选中
			selected: true,
			//是否显示遮罩
			blocking: false,
			//协议弹框
			xieyTK: false,
			//用户信息
			userData: ''
		};
	},
	onLoad() {
		var agreement = uni.getStorageSync('agreement');
		if (agreement == '') {
			this.xieyTK = true;
			this.blocking = true;
		}
	},
	methods: {
		//快捷登录
		kjdl: function() {
			uni.setStorageSync('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkaXMiOjAsImlhdCI6MTU5ODk0NTA1OCwidWlkIjoxMDMzfQ.j-NIzGB5cI0Oq7--9UcVDmxyAqe72SbctI_rIFUdXzw');
			this.getUser();
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
							title: '登录成功',
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
				}
			});
		},
		//是否同意协议
		agreementDJ: function(value) {
			if (value == 2) {
				this.blocking = false;
				this.xieyTK = false;
				//退出应用（注意：iOS 平台不支持此 API，只能是用户主动杀进程）
				plus.runtime.quit();
			} else if (value == 1) {
				this.blocking = false;
				this.xieyTK = false;
				//点击同意协议后关闭弹框保存状态
				uni.setStorageSync('agreement', 1);
			}
		},
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
		//切换选中
		xuanz: function() {
			if (this.selected) {
				this.selected = false;
			} else {
				this.selected = true;
			}
		},
		//手机号登录
		sjhdl: function() {
			uni.navigateTo({
				url: '/pages/login/benji/benji'
			});
		},
		//其他手机号登录
		qita: function() {
			uni.navigateTo({
				url: '/pages/login/shurusj/shurusj'
			});
		},
		//微信登录1
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
		}
	}
};
</script>

<style>
/* 协议弹框CSS */
.xitykdiv {
	width: 600upx;
	height: 860upx;
	background-color: #fff;
	position: absolute;
	left: 50%;
	margin-left: -300upx;
	top: 50%;
	margin-top: -440upx;
	border-radius: 10upx;
	z-index: 30;
}

.xieydwz1 {
	margin-left: 30upx;
	margin-right: 30upx;
	font-size: 26upx;
	line-height: 50upx;
	color: #acacac;
}

.xieydwz2 {
	margin-left: 30upx;
	margin-right: 30upx;
	font-size: 26upx;
	line-height: 50upx;
	padding-top: 30upx;
	color: #acacac;
}

.xieyank {
	display: flex;
	padding-top: 30upx;
}

.xyant {
	width: 220upx;
	height: 70upx;
	line-height: 70upx;
	font-size: 34upx;
	text-align: center;
	color: #fff;
	border-radius: 36upx;
	border: 2upx #fcbb67 solid;
}

.tljybt {
	width: 100%;
	font-size: 36upx;
	line-height: 50upx;
	padding-top: 40upx;
	color: #101010;
	text-align: center;
	font-weight: bold;
}

.zhihsmdoubs {
	margin-left: 30upx;
	margin-right: 30upx;
	font-size: 26upx;
	line-height: 50upx;
	padding-top: 20upx;
	color: #101010;
}

.nijiuzho {
	width: 100%;
	font-size: 26upx;
	line-height: 50upx;
	padding-top: 20upx;
	color: #acacac;
	text-align: center;
}

/*  */
.logo {
	width: 140upx;
	height: 140upx;
	display: block;
	padding-top: 179upx;
}

.dibu {
	width: 100%;
	height: 356upx;
	position: fixed;
	bottom: 0;
}

.dlan {
	width: 648upx;
	height: 100upx;
	line-height: 100upx;
	color: #ffffff;
	font-size: 36upx;
	text-align: center;
	background-color: #fcbb67;
	margin-bottom: 20upx;
	border-radius: 50upx;
}

.sjhdl {
	width: 100%;
	height: 130upx;
	line-height: 130upx;
	color: #fcbb67;
	font-size: 30upx;
	text-align: center;
}

.guidiv {
	width: auto;
	height: 36upx;
	line-height: 36upx;
	color: #acacac;
	font-size: 28upx;
	display: flex;
	margin-left: 80upx;
}

.wz {
	margin-left: 10upx;
}

.wz text {
	color: #fcbb67;
}

.goutu1 {
	width: 32upx;
	height: 32upx;
	background-color: #ffffff;
	border: 1px solid #bebebe;
	border-radius: 20upx;
}

.goutu2 {
	width: 32upx;
	height: 32upx;
	background-color: #fcbb67;
	border: 1px solid #fcbb67;
	border-radius: 20upx;
}

.goutu2 image {
	width: 20upx;
	height: 20upx;
	display: block;
	padding-top: 8upx;
}


</style>
