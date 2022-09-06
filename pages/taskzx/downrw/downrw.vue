<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<!-- <view class="wxnmqcs"><view class="nbwz">请确定用户提交信息不合理，否则拒绝失败，如恶意提交，平台将冻结账户。</view></view> -->
		<view class="pjiwz juzho">拒绝理由</view>
		<view class="whdata juzho"><textarea class="lmtext" maxlength="200" v-model="nrData" placeholder="请输入您的详细理由，我们将尽快解决。" auto-height /></view>
		<view class="zgsxiagx juzho">字数限制200个</view>
		<view class="zgscjimg juzho">
			<view class="zgsdiv" v-if="imgData[0].uri">
				<view class="zgscdiv">
					<image class="img" :src="imgData[0].uri"></image>
					<image class="scdimg" src="../../../static/scx.png" @click="deleteimg()"></image>
				</view>
			</view>
			<view class="zgsdiv" v-else>
				<view class="xuanqutp" @click="chooseImg()">
					<image class="xuanqutpimg juzho" src="../../../static/jiahao.png"></image>
					<view class="xuanqutpwz">添加图片</view>
				</view>
			</view>
		</view>
		<view class="sfjubt juzho">
			<checkbox-group @change="checkboxChange">
				<label>
					<checkbox value="0" :checked="additionalXS" color="#FCBB67" style="transform:scale(0.7)" />
					是否举报/投诉该用户
				</label>
			</checkbox-group>
		</view>
		<view v-show="additionalXS">
			<view class="zgesxuanz juzho" @click="xuanz(1)">
				<view class="tkiey">1.</view>
				<view class="zhegbmtwz">做单提交风景照、自拍照、二维码等无关的图，乱提交</view>
				<view class="dinajxz">
					<view class="goutu1" v-show="ewdliy != 1"></view>
					<view class="goutu2" v-show="ewdliy == 1"><image class="juzho" src="../../../static/goutu.png"></image></view>
				</view>
			</view>
			<view class="zgesxuanz juzho" @click="xuanz(2)">
				<view class="tkiey">2.</view>
				<view class="zhegbmtwz">做单多提交一单，P图提交等，恶意提交</view>
				<view class="dinajxz">
					<view class="goutu1" v-show="ewdliy != 2"></view>
					<view class="goutu2" v-show="ewdliy == 2"><image class="juzho" src="../../../static/goutu.png"></image></view>
				</view>
			</view>
			<view class="zgesxuanz juzho" @click="xuanz(3)">
				<view class="tkiey">3.</view>
				<view class="zhegbmtwz">其他</view>
				<view class="dinajxz">
					<view class="goutu1" v-show="ewdliy != 3"></view>
					<view class="goutu2" v-show="ewdliy == 3"><image class="juzho" src="../../../static/goutu.png"></image></view>
				</view>
			</view>
		</view>
		<view class="qdbj"><view class="ljck juzho" @click="following">提交</view></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//标题
			title: '发起拒绝',
			//返回图片路径
			path: '../../../static/jiant.png',
			//内容数据
			nrData: '',
			//图片数据
			imgData: [
				{
					name: 'img1',
					uri: ''
				}
			],
			//是否显示额外的理由
			additionalXS: false,
			//额外理由数据
			ewdliy: 0,
			//已领取任务ID
			taskIDdata: '',
			//正则验证不能有数字和子母
			re: /[0-9a-z]/i
		};
	},
	//监听页面加载
	onLoad(option) {
		this.taskIDdata = option.id;
	},
	methods: {
		//是否显示额外理由
		checkboxChange: function(e) {
			if(this.additionalXS){
				this.additionalXS=false;
				this.ewdliy = 0;
			}else{
				this.additionalXS=true;
			}
		},
		//切换选中
		xuanz: function(id) {
			this.ewdliy = id;
		},
		//选择图片方法
		chooseImg: function() {
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
					_this.imgData[0].uri = res.tempFilePath;
				}
			});
		},
		//图片路径转base64位
		imgzhuanH: function(img) {
			var reader = new plus.io.FileReader();
			//以URL编码格式读取文件数据内容
			reader.readAsDataURL(img);
			//读取文件成功完成的回调函数
			reader.onloadend = function(e) {
				var speech = e.target.result; //base64图片
				console.log('base64图片=' + speech);
			};
		},
		//删除图片
		deleteimg: function(key) {
			this.imgData[0].uri = '';
		},
		//提交
		following: function() {
			if (this.nrData == '') {
				uni.showToast({
					title: '理由不能为空',
					icon: 'none',
					duration: 2000
				});
				return;
			} else if (this.re.test(this.nrData)) {
				uni.showToast({
					title: '理由必须是纯中文',
					icon: 'none',
					duration: 2000
				});
				return;
			} else if (this.imgData[0].uri == '') {
				uni.showToast({
					title: '图片必填',
					icon: 'none',
					duration: 2000
				});
				return;
			}
			var data = {
				//任务ID
				taskreceiveid: this.taskIDdata,
				//3拒绝
				ispass: 3,
				//内容
				content: this.nrData,
				//额外理由
				bec: this.ewdliy
			};
			this.$api.releaseData('/TaskReceive/TaskTrial', '', data, this.imgData, 'post', (status, code, res) => {
				if (status) {
					uni.setStorageSync('refreshData', 1);
					uni.showToast({
						title: '拒绝成功',
						icon: 'none',
						duration: 2000
					});
					setTimeout(function() {
						uni.navigateBack({
							delta: 2
						});
					}, 1000);
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
.xuanqutp {
	width: 160upx;
	height: 160upx;
	background-color: #fcfcfc;
	border: 4upx dashed rgba(238, 238, 238, 1);
	border-radius: 10upx;
}

.xuanqutpimg {
	width: 40upx;
	height: 40upx;
	display: block;
	padding-top: 34upx;
}

.xuanqutpwz {
	width: 100%;
	height: 30upx;
	line-height: 30upx;
	font-size: 28upx;
	color: #a9a9a9;
	padding-top: 30upx;
	text-align: center;
}
.zgsdiv {
	width: 180upx;
	height: 180upx;
	float: left;
	margin-right: 14upx;
}
.zgscdiv {
	width: 100%;
	height: 100%;
	position: relative;
}
.img {
	width: 100%;
	height: 100%;
	display: block;
}
.scdimg {
	width: 36upx;
	height: 36upx;
	position: absolute;
	top: -14upx;
	right: -14upx;
}
.zgscjimg {
	width: 690upx;
	height: 180upx;
	padding-top: 30upx;
}
.wxnmqcs {
	width: 100%;
	height: 120upx;
	background-color: #ffebcb;
}
.nbwz {
	margin-left: 20upx;
	margin-right: 20upx;
	padding-top: 20upx;
	padding-bottom: 20upx;
	line-height: 40upx;
	font-size: 26upx;
	color: #ff8b4c;
}
.pjiwz {
	width: 690upx;
	height: 100upx;
	line-height: 100upx;
	font-size: 40upx;
	color: #101010;
}
.whdata {
	width: 690upx;
	height: auto;
}
.lmtext {
	width: 100%;
}
.zgsxiagx {
	width: 690upx;
	height: 60upx;
	line-height: 60upx;
	font-size: 24upx;
	color: #b3b3b3;
	text-align: right;
	padding-top: 70upx;
	border-bottom: 1px #e6e6e6 solid;
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
.sfjubt {
	width: 690upx;
	height: 100upx;
	line-height: 100upx;
	font-size: 36upx;
	font-weight: bold;
	color: #101010;
}
.zgesxuanz {
	width: 690upx;
	height: auto;
	padding-bottom: 20upx;
	display: flex;
}
.tkiey {
	width: 30upx;
	height: 50upx;
	line-height: 50upx;
	font-size: 28upx;
	color: #101010;
}
.zhegbmtwz {
	flex: 1;
	height: auto;
	font-size: 28upx;
	color: #101010;
	line-height: 50upx;
}
.dinajxz {
	width: 40upx;
	height: 50upx;
	padding-left: 80upx;
	padding-top: 8upx;
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
