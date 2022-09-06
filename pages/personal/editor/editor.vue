<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zhegdiv1">
			<view class="wdfabdiv juzho" @click="xiugtx">
				<view class="rydzj">头像</view>
				<view class="wzmhxdqptx"><image class="qhhj" :src="userData.Headimgurl"></image></view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
			<view class="wdfabdiv juzho" @click="xingnc">
				<view class="rydzj">昵称</view>
				<view class="wzmhxdqp">{{ userData.Nickname }}</view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
			<view class="wdfabdiv juzho" @click="genhdsjh">
				<view class="rydzj">
					<text v-if="userData.Mobile == '' || userData.Mobile == null">绑定手机</text>
					<text v-else>更换绑定</text>
				</view>
				<view class="wzmhxdqp">{{ userData.Mobile }}</view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
			<view class="wdfabdiv juzho" style="border:0;" @click="NMSL">
				<view class="rydzj">绑定微信</view>
				<view class="wzmhxdqp">更换绑定</view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
		</view>
		<view class="zhegdiv1">
			<view class="wdfabdiv juzho">
				<view class="rydzj">推送通知</view>
				<view class="qchd1">
					<view class="gzldiv"><Evanswitch v-model="checked" active-color="#FCBB67" @change="tstzkg"></Evanswitch></view>
				</view>
			</view>
			<view class="wdfabdiv juzho">
				<view class="rydzj">清除缓存</view>
				<view class="qchd2"><view class="qchdan" @click="qchc">清除</view></view>
			</view>
			<view class="wdfabdiv juzho" @click="gywm">
				<view class="rydzj">关于我们</view>
				<view class="wzmhxdqp"></view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
			<view class="wdfabdiv juzho" style="border:0;" @click="bbgx">
				<view class="rydzj">版本更新</view>
				<view class="wzmhxdqp"></view>
				<image class="rgbj" src="../../../static/grjt1.png"></image>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking" @click="gbitk"></view>
		<!-- 修改头像弹框 -->
		<view class="touxtk" v-show="tkdata1">
			<view class="ljwtl juzho"><image class="bbqtx" :src="linsimg"></image></view>
			<view class="xuanztp juzho" @click="chooseImg">选择图片</view>
			<view class="bcxgo juzho" @click="saveImg">保存头像</view>
		</view>
		<view class="qdbj"><view class="ljck juzho" @click="tcdl">退出登录</view></view>
	</view>
</template>

<script>
//开关插件
import Evanswitch from '@/components/evan-switch/evan-switch.vue'
export default {
	components: {
		Evanswitch
	},
	data() {
		return {
			//标题
			title: "编辑个人信息",
			//返回图片路径
			path: "../../../static/jiant.png",
			//推送开关
			checked: true,
			//用户数据
			userData: "",
			//头像路径
			linsimg: "",
			//是否上传了头像
			shifouIMG: false,
			//用户昵称
			linsuser: "",
			blocking: false,
			tkdata1: false,
			tkdata2: false,
			tkdata3: false,
			mobile: "",
			verification: "",
			uuid: "",
			//是否可以点击重新获取
			yzmZJ: true,
			countdown: 60,
			//验证码文字
			yzmWZ: "发送验证码"
		}
	},
	onShow() {
		this.loadingUser();
	},
	methods: {
		NMSL: function() {
			uni.showToast({
				title: '功能暂未开放，敬请期待',
				icon: 'none',
				duration: 2000
			});
		},
		//修改手机号
		genhdsjh: function() {
			var key=0;
			if(this.userData.Mobile==''||this.userData.Mobile==null){
				key =1;
			}
			uni.navigateTo({
				url: '/pages/personal/changesjha/changesjha?key=' +key
			});
		},
		//用户数据
		loadingUser: function() {
			//更新用户数据
			this.$api.loadingUser((status, code, res) => {
				if (status) {
					//把用户信息存入VUEX
					this.$store.commit("saveUser", res.obj);
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
		//修改头像
		xiugtx: function() {
			this.linsimg = this.userData.Headimgurl;
			this.blocking = true;
			this.tkdata1 = true;
		},
		//选择图片
		chooseImg: function(key) {
			//要保存集合下标
			this.keyData = key;
			var _this = this;
			uni.chooseImage({
				count: 1, //限制的张数
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'], //从相册选择
				success: function(res) {
					//判断图片是否超过大小限制
					_this.judge2M(res.tempFilePaths[0]);
				}
			});
		},
		//判断图片是否超过大小限制
		judge2M: function(imgData) {
			var _this = this;
			var wtm = uni.getSavedFileInfo({
				filePath: imgData, //仅做示例用，非真正的文件路径
				success: function(res) {
					if (res.size > 2097152) {
						uni.showToast({
							title: '图片超过2M限制！',
							icon: 'none',
							duration: 2000
						});
					} else {
						_this.pressure(imgData);
					}
				}
			});
		},
		//压缩图片大小
		pressure: function(imgData) {
			var _this = this;
			uni.compressImage({
				src: imgData,
				quality: 80,
				success: res => {
					_this.linsimg = res.tempFilePath;
					_this.shifouIMG = true;
				}
			})
		},
		//保存头像
		saveImg: function() {
			if (this.shifouIMG) {
				this.shifouIMG = false;
				var imgdata = [{
					//表单的项目名
					name: 'filename',
					//文件的本地地址
					uri: this.linsimg
				}];
				this.$api.pictureImg('/UserFollowInfo/UpdateHeadImg', "", "", imgdata, 'post', (status, code, res) => {
					if (status) {
						this.blocking = false;
						this.tkdata1 = false;
						uni.showToast({
							title: "保存头像成功",
							icon: 'none',
							duration: 2000
						});
						//更新用户信息
						this.loadingUser();
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			} else {
				this.blocking = false;
				this.tkdata1 = false;
				uni.showToast({
					title: "保存头像成功",
					icon: 'none',
					duration: 2000
				});
			}
		},
		//修改昵称
		xingnc: function() {
			uni.navigateTo({
				url: '/pages/personal/nickname/nickname?linsuser=' + this.userData.Nickname
			});
		},

		//关闭弹框
		gbitk: function() {
			this.blocking = false;
			this.tkdata1 = false;
			this.tkdata2 = false;
			this.tkdata3 = false;
		},
		//关于我们
		gywm: function() {
			uni.navigateTo({
				url: '/pages/personal/about/about'
			});
		},
		//版本更新
		bbgx: function() {
			uni.showToast({
				title: '当前版本为最新，无需更新',
				icon: 'none',
				duration: 2000
			});
		},
		//清除缓存
		qchc: function() {
			uni.showToast({
				title: '已清除缓存',
				icon: 'none',
				duration: 2000
			});
		},
		//推送通知开工
		tstzkg: function() {
			if (this.checked) {
				uni.showToast({
					title: '已开启推送通知',
					icon: 'none',
					duration: 800
				});
			} else {
				uni.showToast({
					title: '已关闭推送通知',
					icon: 'none',
					duration: 800
				});
			}
		},
		//退出登录
		tcdl: function() {
			uni.showModal({
				title: '提示',
				content: '是否退出登录',
				success: function(res) {
					if (res.confirm) {
						//清空token
						uni.setStorageSync('token', "");
						uni.showToast({
							title: '已退出登录',
							icon: 'none',
							duration: 800
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/login/login'
							});
						}, 900)
					}
				}
			});
		}
	}
}
</script>

<style>
/* body属性 */
page {
	background-color: #f8f8f8;
}

.gzldiv {
	float: right;
}

.qchd2 {
	flex: 1;
	height: 44upx;
	padding-top: 34upx;
}

.qchd1 {
	flex: 1;
	height: auto;
	padding-top: 26upx;
}

.qchdan {
	width: 90upx;
	height: 44upx;
	background-color: #c8c8c8;
	border-radius: 22upx;
	line-height: 44upx;
	text-align: center;
	font-size: 24upx;
	color: #ffffff;
	float: right;
	margin-right: 10upx;
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

.zhegdiv1 {
	width: 100%;
	height: auto;
	margin-bottom: 20upx;
	background-color: #ffffff;
}

.wdfabdiv {
	width: 700upx;
	height: 114upx;
	border-bottom: 1px #e6e6e6 solid;
	display: flex;
}

.rydzj {
	width: 160upx;
	height: 114upx;
	line-height: 114upx;
	font-size: 36upx;
	color: #2d2d2d;
}

.wzmhxdqp {
	flex: 1;
	height: 114upx;
	line-height: 114upx;
	font-size: 32upx;
	color: #c3c3c3;
	text-align: right;
}

.rgbj {
	width: 24upx;
	height: 24upx;
	display: block;
	padding-top: 48upx;
	padding-right: 20upx;
	padding-left: 20upx;
}

.wzmhxdqptx {
	flex: 1;
	height: 80upx;
	line-height: 80upx;
	font-size: 32upx;
	color: #c3c3c3;
	text-align: right;
	padding-top: 16upx;
}

.qhhj {
	width: 80upx;
	height: 80upx;
	display: block;
	border-radius: 60upx;
	float: right;
}

/* 弹框1CSS */
.touxtk {
	width: 400upx;
	height: 450upx;
	position: fixed;
	background-color: #ffffff;
	border: 1px #f1f1f1 solid;
	border-radius: 30upx;
	top: 50%;
	margin-top: -225upx;
	left: 50%;
	margin-left: -200upx;
	z-index: 40;
}

.ljwtl {
	width: 180upx;
	height: 180upx;
	padding-top: 40upx;
}

.bbqtx {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 100upx;
}

.xuanztp {
	width: 280upx;
	height: 60upx;
	background-color: #f0f2f4;
	line-height: 60upx;
	font-size: 24upx;
	color: #38393f;
	text-align: center;
	border-radius: 10upx;
	margin-top: 40upx;
}

.bcxgo {
	width: 280upx;
	height: 60upx;
	background-color: #f0f2f4;
	line-height: 60upx;
	font-size: 24upx;
	color: #38393f;
	text-align: center;
	border-radius: 10upx;
	margin-top: 30upx;
}

/* 弹框2CSS */
.touxtk2 {
	width: 500upx;
	height: 350upx;
	position: fixed;
	background-color: #ffffff;
	border: 1px #f1f1f1 solid;
	border-radius: 30upx;
	top: 50%;
	margin-top: -175upx;
	left: 50%;
	margin-left: -250upx;
	z-index: 40;
}

.tlsrk {
	width: 400upx;
	height: 80upx;
	border-radius: 10upx;
	border: 1px #f0f2f4 solid;
	margin-top: 40upx;
}

.user-input {
	width: 100%;
	height: 80upx;
	line-height: 80upx;
	font-size: 32upx;
	color: #38393f;
	text-align: center;
}

/* 弹框3CSS */
.touxtk3 {
	width: 500upx;
	height: 570upx;
	position: fixed;
	background-color: #ffffff;
	border: 1px #f1f1f1 solid;
	border-radius: 30upx;
	top: 50%;
	margin-top: -285upx;
	left: 50%;
	margin-left: -250upx;
	z-index: 40;
}
</style>
