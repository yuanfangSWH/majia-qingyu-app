<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="wxnmqcs">
			<view class="nbwz">希望用户和商家在对任务内容有异议时，先有效沟通，并确定提交审核的内容准确，否则辩诉失败。</view>
		</view>
		<view class="pjiwz juzho">辩诉理由</view>
		<view class="whdata juzho"><textarea class="lmtext" maxlength="200" v-model="nrData" placeholder="请填写您的辩诉理由，至少10个字"
			 auto-height /></view>
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
		<view class="qdbj">
			<view class="ljck juzho" @click="following">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "发起辩诉",
				//返回图片路径
				path: "../../../static/jiant.png",
				//内容数据
				nrData:"",
				//图片数据
				imgData:[{
					name: "img1",
					uri: ""
				}],
				//当前任务的ID
				taskIDdata: ""
			}
		},
		onLoad(option) {
			if (option.id) {
				this.taskIDdata = option.id;
			}
		},
		methods: {
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
						_this.imgData[0].uri=res.tempFilePath;
					}
				})
			},
			//H5+APP方法图片路径转base64位
			imgzhuanH: function(img) {
				var reader = new plus.io.FileReader();
				//以URL编码格式读取文件数据内容
				reader.readAsDataURL(img);
				//读取文件成功完成的回调函数
				reader.onloadend = function(e) {
					var speech = e.target.result; //base64图片   
					console.log("base64图片=" + speech);
				};
			},
			//删除图片
			deleteimg: function(key) {
				this.imgData[0].uri="";
			},
			//提交
			following: function() {
				if(this.nrData==""){
					uni.showToast({
						title: "理由不能为空",
						icon: 'none',
						duration: 2000
					});
					return;
				}else if(this.imgData[0].uri==""){
					uni.showToast({
						title: "图片必填",
						icon: 'none',
						duration: 2000
					});
					return;
				}
				var data = {
					//任务ID
					taskreceiveid: this.taskIDdata,
					//内容
					content:this.nrData
				};
				this.$api.releaseData('/TaskReceive/TaskReport', "", data, this.imgData, 'post', (status, code, res) => {
					if (status) {
						uni.navigateTo({
							url: '/pages/wdtask/pleacg/pleacg'
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
	}
</script>

<style>
	.xuanqutp {
		width: 160upx;
		height: 160upx;
		background-color: #FCFCFC;
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
		color: #A9A9A9;
		padding-top: 30upx;
		text-align: center;
	}
	.zgsdiv{
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
	.scdimg{
		width: 36upx;
		height:36upx;
		position: absolute;
		top: -14upx;
		right: -14upx;
	}
	.zgscjimg{
		width: 690upx;
		height: 180upx;
		padding-top: 30upx;
	}
	.wxnmqcs{
		width: 100%;
		height: 120upx;
		background-color: #FFEBCB;
	}
	.nbwz{
		margin-left: 20upx;
		margin-right: 20upx;
		padding-top: 20upx;
		padding-bottom: 20upx;
		line-height: 40upx;
		font-size: 26upx;
		color: #FF8B4C;
	}
.pjiwz{
	width: 690upx;
	height: 100upx;
	line-height: 100upx;
	font-size: 40upx;
	color: #101010;
}
.whdata{
	width: 690upx;
	height: auto;
}
.lmtext{
	width: 100%;
}
.zgsxiagx{
	width: 690upx;
	height: 60upx;
	line-height: 60upx;
	font-size: 24upx;
	color: #B3B3B3;
	text-align: right;
	padding-top: 70upx;
	border-bottom:1px #E6E6E6 solid;
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
