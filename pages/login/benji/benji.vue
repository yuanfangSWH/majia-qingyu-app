<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv"><image class="return" src="../../../static/jiant2.png" @click="returnData"></image></view>
		<view class="hm">********</view>
		<view class="sm">认证服务由轻鱼平台提供</view>
		<view class="dibu">
			<view class="dlan juzho" @click="steps1">本机号码一键登录</view>
			<view class="sjhdl" @click="qita">使用其他手机号登录 ＞</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<view class="tankdiv" :class="{ play: isActive1, implicit: isActive2 }">
			<image class="wxtb juzho" src="../../../static/weixin.png"></image>
			<view class="wz1">绑定微信</view>
			<view class="wz2">绑定微信后才可正常使用</view>
			<view class="queren juzho" @click="wxdl">确认</view>
		</view>
	</view>
</template>

<script>
const jv = uni.requireNativePlugin('JG-JVerification');
export default {
	data() {
		return {
			//通用遮罩-
			blocking: false,
			//CSS3效果1
			isActive1: false,
			//CSS3效果2
			isActive2: false,
			//微信id
			wxid: '',
			//用户id
			userid: '',
			//token
			tokenData: ''
		};
	},
	//监听页面加载
	onLoad() {
		//从VUEX获取微信id
		this.wxid = this.$store.state.loginData.wxid;
	},
	methods: {
		//初始化接口
		steps1: function() {
			// 开启 debug 模式，请在初始化前调用
			jv.setDebugMode(true);
			jv.init(
				{
					//设置初始化超时时间
					timeout: 7000,
					//是否生产环境。如果为开发状态，设置为 false；如果为生产状态，应改为 true
					isProduction: false
				},
				result => {
					let code = result.code;
					let desc = result.content;
					console.log('初始化接口结果：' + JSON.stringify(result));
					if (code == 8000) {
						this.steps2();
					}
				}
			);
		},
		//登录预取号
		steps2: function() {
			jv.preLogin(7000, result => {
				let code = result.code;
				let token = result.content;
				console.log('登录预取号结果：' + JSON.stringify(result));
				if (code == 7000) {
					this.steps3();
				} else if (code == 2016) {
					uni.showToast({
						title: '网络类型不支持，请检查是否打开流量数据开关',
						icon: 'none',
						duration: 3000
					});
				} else {
					uni.showToast({
						title: '获取手机号失败，请重试或者尝试手机短信验证码登录',
						icon: 'none',
						duration: 3000
					});
				}
			});
		},
		//获取 token
		steps3: function() {
			//获取 token方法
			jv.getToken(7000, result => {
				console.log('token结果：' + JSON.stringify(result));
				let code = result.code;
				let token = result.content;
				let operator = result.operator;
				if (code == 2000) {
					this.steps4();
				}
			});
		},
		//请求授权
		steps4: function() {
			//自定义样式
			jv.setCustomUIWithConfigAndroid({
				//设置状态栏与导航栏同色
				setStatusBarColorWithNav: true,
				//设置导航栏颜色
				setNavColor: 0xfffcbb67,
				//设置导航栏标题文字
				setNavText: '认证服务由轻鱼平台提供',
				//设置登录按钮文字
				setLogBtnText: '本机号码一键登录',
				//设置隐私条款默认选中状态
				setPrivacyState: true,
				//设置隐私条款名称颜色
				setAppPrivacyColor: [0xffacacac, 0xfffcbb67],
				//设置手机号码字体颜色
				setNumberColor: 0xff000000,
				//设置手机号码字体大小
				setNumberSize: 32,
				//设置登录按钮宽度
				setLogBtnWidth: 300,
				//设置登录按钮高度
				setLogBtnHeight: 40,
				//设置登录按钮字体大小
				setLogBtnTextSize: 20,
				//设置登录按钮相对屏幕底部y轴偏移
				setLogBtnBottomOffsetY: 100,
				//设置 slogan 是否隐藏
				setSloganHidden: true,
				//设置协议展示web页面导航栏背景颜色
				setPrivacyNavColor: 0xfffcbb67
			});
			jv.loginAuth(
				{
					autoFinish: true,
					timeout: 5000
				},
				result => {
					console.log('请求授权结果：' + JSON.stringify(result));
					// 结果监听
					let code = result.code;
					let loginToken = result.content;
					let operator = result.operator;
					if (code == 6000) {
						this.loginJK(loginToken);
					}
				},
				event => {
					// 事件监听
					let code = result.code;
					let eventDesc = result.content;
				}
			);
		},
		//调用手机号一键登录接口
		loginJK: function(token) {
			var data = {
				//极光loginToken
				loginToken: token,
				//此id是微信绑定接口返回的
				id: this.wxid
			};
			this.$api.apiPost('/reg/authphone', '', data, 'post', (status, code, res) => {
				if (status) {
					//登录成功后的token保存下来
					uni.setStorageSync('token', res.obj);
					this.getUser();
				} else if (code == 100002) {
					this.userid = res.obj;
					//弹出绑定微信弹框
					this.isActive2 = false;
					this.isActive1 = true;
					this.blocking = true;
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
									icon: 'none',
									duration: 3000
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
		loginData: function(code) {
			var parameter = '?code=' + code + '&id=' + this.userid;
			this.$api.apiPost('/reg/bindwx', parameter, '', 'get', (status, code, res) => {
				if (status) {
					//关闭绑定微信弹框
					this.isActive2 = true;
					this.isActive1 = false;
					this.blocking = false;
					//登录成功后的token保存下来
					uni.setStorageSync('token', res.obj);
					this.getUser();
				} else if (code == 100007) {
					//关闭绑定微信弹框
					this.isActive2 = true;
					this.isActive1 = false;
					this.blocking = false;
					uni.showToast({
						title: '微信授权成功，未绑定手机号，正在跳转到绑定手机号',
						icon: 'none',
						duration: 2000
					});
					setTimeout(function() {
						//把数据存入VUEX
						this.$store.commit('bcwx', res.obj);
						uni.navigateTo({
							url: '/pages/login/benji/benji'
						});
					}, 2000);
				} else {
					//关闭绑定微信弹框
					this.isActive2 = true;
					this.isActive1 = false;
					this.blocking = false;
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
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		//其他手机号登录
		qita: function() {
			uni.navigateTo({
				url: '/pages/login/shurusj/shurusj'
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

.wxtb {
	width: 130upx;
	height: 130upx;
	display: block;
	padding-top: 132upx;
	padding-bottom: 38upx;
}

.wz1 {
	width: 100%;
	height: 36upx;
	line-height: 36upx;
	color: #101010;
	font-size: 32upx;
	text-align: center;
	padding-bottom: 28upx;
}

.wz2 {
	width: 100%;
	height: 36upx;
	line-height: 36upx;
	color: #b5b5b5;
	font-size: 28upx;
	text-align: center;
	padding-bottom: 60upx;
}

.queren {
	width: 468upx;
	height: 100upx;
	background-color: #fcbb67;
	border-radius: 50upx;
	line-height: 100upx;
	color: #ffffff;
	font-size: 36upx;
	text-align: center;
}

.tankdiv {
	width: 618upx;
	height: 680upx;
	background-color: #ffffff;
	border-radius: 16upx;
	position: fixed;
	z-index: 30;
	top: -200%;
	left: 50%;
	margin-left: -309upx;
}

/* CS3动画效果 */
.play {
	top: 50%;
	margin-top: -340upx;
	animation: play 0.5s;
}

@keyframes play {
	from {
		top: -200%;
	}

	to {
		top: 50%;
		margin-top: -340upx;
	}
}

.implicit {
	top: -200%;
	animation: implicit 1s;
}

@keyframes implicit {
	from {
		top: 50%;
		margin-top: -340upx;
	}

	to {
		top: -200%;
	}
}

/* CS3动画效果结束 */
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
}

.dibu {
	width: 100%;
	height: 780upx;
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
</style>
