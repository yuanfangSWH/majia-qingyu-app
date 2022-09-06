<template>
	<view>
		<view class="gudztou">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="daohdiv">
				<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
				<!-- <image class="return2" src="../../../static/wenhao.png"></image> -->
				发布任务1/2
			</view>
		</view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view style="width: 100%;height: 44px;"></view>
		<view class="xmmz">
			<view class="xmmz1">
				项目名字
				<text class="hox">*</text>
				<image class="tishi" src="../../../static/tishi.png" @click="tiskTK(1)"></image>
			</view>
			<view class="xmmz2 juzho">
				<input class="mz-input" type="text" v-model="taskData.minziData" :placeholder-style="zitys" placeholder="请输入项目名字（一般为App名字，1-4个字）" />
			</view>
			<view class="xmmz1">
				任务标题
				<text class="hox">*</text>
			</view>
			<view class="xmmz2 juzho"><input class="mz-input" type="text" v-model="taskData.rwbtData" :placeholder-style="zitys" placeholder="请输入任务标题（1-10字）" /></view>
			<view>
				<view class="xmmz1">任务链接（选填）</view>
				<view class="xmmz2 juzho">
					<input class="mz-input" type="text" v-model="taskData.rwljData" :placeholder-style="zitys" placeholder="请输入任务链接（开头例如：https://xxx）" />
				</view>
			</view>
		</view>
		<view class="rwbj">
			<view class="rwbj1">
				任务步骤
				<text class="hox">*</text>
			</view>
			<view class="rwbj2"></view>
			<view class="zgsrw" v-for="(item, key) in taskData.superData" :key="key">
				<view class="rwbj3">
					<image class="buzimg" v-show="key != 0" src="../../../static/buzx.png" @click="scbDataF(1, key)"></image>
					第{{ key + 1 }}步（
					<text v-if="item.areaid == 0">图文说明</text>
					<text v-else>收集截图</text>
					）
				</view>
				<view class="rwbj4">
					<input
						class="mz-input"
						type="text"
						v-model="item.changewz"
						:placeholder-style="zitys"
						placeholder="请填写图文说明的任务步骤，图片选填最多一张"
						v-if="item.areaid == 0"
					/>
					<input class="mz-input" type="text" v-model="item.changewz" :placeholder-style="zitys" placeholder="您可以在详细说明要截取哪个界面，图片必填" v-else />
				</view>
				<view class="zgsdiv">
					<view class="zgscdiv" v-if="item.changeimg">
						<image class="img" :src="item.changeimg"></image>
						<image class="scdimg" src="../../../static/scx.png" @click="deleteimg(key)"></image>
					</view>
					<view class="xuanqutp" @click="chooseImg(key)" v-else>
						<image class="xuanqutpimg juzho" src="../../../static/jiahao.png"></image>
						<view class="xuanqutpwz">上传照片</view>
					</view>
				</view>
				<view class="hex juzho"></view>
			</view>
			<view class="tianjia juzho" @click="attentionEwm">+ 添加任务步骤</view>
		</view>

		<view class="tjsj">
			<view class="xmmz1">做单者提交数据（选填）</view>
			<view class="xmmz2 juzho"><input class="mz-input" type="text" v-model="taskData.usermane" :placeholder-style="zitys" placeholder="如：提交手机号或用户昵称" /></view>
		</view>
		<view class="dibujrjk" @click="validation" v-if="areaData == 1">保存修改</view>

		<view class="dibujrjk" @click="validation" v-else>下一步</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 添加步骤弹框 -->
		<view class="xuanz" v-show="stepsData" :class="{ play: isActive1, implicit: isActive2 }">
			<view class="aitmd">
				<view class="gbhs1">请选择你要添加的步骤类型</view>
				<view class="gbhs2" @click="chooseBZ(1)">图文说明</view>
				<view class="gbhs3" @click="chooseBZ(2)">收集截图</view>
			</view>
			<view class="wsmys" @click="guanBZ">取消</view>
		</view>
		<!-- 删除步骤弹框 -->
		<view class="scbuztk" v-show="scbData">
			<view class="tisyonyu">是否删除此步骤？</view>
			<view class="scbzan">
				<view class="wzhenan1" @click="scbDataF(3)">取消</view>
				<view class="wzhenan2" @click="scbDataF(2)">删除</view>
			</view>
		</view>
		<!-- 提示弹框1 -->
		<view class="tistk" v-show="tistkData1">
			<image class="weiltisx" src="../../../static/buzx.png" @click="tiskTK(2)"></image>
			<view class="weilxm">项目名字</view>
			<view class="jlms">填写项目名字可有效防止用户做一次任务提交多个任务等骗单行为，设置后，同一个项目每位用户只能领取一次提交。一般为APP的名字</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//占位符CSS
			zitys: 'color: #C3C3C3;',
			//通用遮罩-
			blocking: false,
			//提示弹框1
			tistkData1:false,
			//添加步骤弹框
			stepsData: false,
			//删除步骤弹框
			scbData: false,
			//CSS3动画样式1
			isActive1: false,
			//CSS3动画样式2
			isActive2: false,
			//发布任务的数据
			taskData: {
				//项目类型
				xmlxData: '',
				//项目名字
				minziData: '',
				//任务标题
				rwbtData: '',
				//任务链接
				rwljData: '',
				//提交数据（选填）
				usermane: '',
				//上传的数据组集合（默认固定有2个）
				superData: [
					{
						//区分是图文说明还是收集截图
						areaid: 0,
						//文字内容
						changewz: '',
						//上传的图片
						changeimg: ''
					}
				]
			},
			//要保存集合下标
			keyData: 0,
			//执行方法
			executive: true,
			//当前任务的ID
			taskIDdata: '',
			//1是修改任务
			areaData: 0,
			//网络图片资源集合
			wlimgData: [],
			//网络图片下标
			keyimg: 1,
			//要删除的步骤下标
			keyBZ: 0
		};
	},
	//监听页面显示
	onShow() {
		this.executive = true;
	},
	//监听页面加载
	onLoad(option) {
		if (option.type) {
			this.taskData.xmlxData = option.type;
		}
		if (option.id) {
			this.areaData = option.area;
			this.taskIDdata = option.id;
			this.pullData();
		}
	},
	methods: {
		//加载数据
		pullData: function() {
			this.executive = false;
			var data = {
				//ID
				taskid: this.taskIDdata
			};
			this.$api.apiPost('/TaskIssue/StoreTaskInfo', '', data, 'post', (status, code, res) => {
				if (status) {
					//项目类型
					this.taskData.xmlxData = res.obj.task_type_id;
					//项目名字
					this.taskData.minziData = res.obj.item_name;
					//任务标题
					this.taskData.rwbtData = res.obj.task_title;
					//任务链接
					this.taskData.rwljData = res.obj.task_link;
					//提交数据（选填）
					this.taskData.usermane = res.obj.submit_data;
					this.taskData.superData = [];
					res.obj.StepInfos.forEach(e => {
						this.taskData.superData.push({
							//区分是图文说明还是收集截图
							areaid: e.step_type,
							//文字内容
							changewz: e.step_text_des,
							//上传的图片
							changeimg: e.step_pic_demo_url
						});
					});
					this.getNetworkData();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//遍历得到网络图片信息
		getNetworkData: function() {
			if (this.keyimg <= this.taskData.superData.length) {
				var e = Number(this.keyimg) - 1;
				this.keyimg++;
				//下载网络图片地址到本地
				uni.downloadFile({
					url: this.taskData.superData[e].changeimg,
					success: res => {
						this.wlimgData.push(res.tempFilePath);
						this.getNetworkData();
					}
				});
			} else {
				this.IMGjihe();
			}
		},
		//把图片循环到图片集合
		IMGjihe: function() {
			for (var e = 0; e < this.wlimgData.length; e++) {
				this.taskData.superData[e].changeimg = this.wlimgData[e];
			}
			this.executive = true;
		},
		//下一步
		following: function() {
			if (this.executive) {
				this.executive = false;
				//把发布数据存入VUEX
				this.$store.commit('task', this.taskData);
				uni.navigateTo({
					url: '/pages/task/confirmtask/confirmtask?id=' + this.taskIDdata
				});
			}
		},
		//验证信息完整
		validation: function() {
			var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
			if (this.taskData.minziData == '') {
				uni.showToast({
					title: '项目名字必填',
					icon: 'none',
					duration: 2000
				});
			} else if (this.taskData.minziData.length > 4) {
				uni.showToast({
					title: '项目名字超过字数',
					icon: 'none',
					duration: 2000
				});
			} else if (this.taskData.rwbtData == '') {
				uni.showToast({
					title: '任务标题必填',
					icon: 'none',
					duration: 2000
				});
			} else if(reg.test(this.taskData.rwljData)){
				uni.showToast({
					title: '任务链接不能填写中文',
					icon: 'none',
					duration: 2000
				});
			}else if (this.taskData.rwbtData.length > 10) {
				uni.showToast({
					title: '任务标题超过字数',
					icon: 'none',
					duration: 2000
				});
			} else {
				var validation1 = true;
				var validation2 = true;
				for (var i = 0; this.taskData.superData.length > i; i++) {
					if (this.taskData.superData[i].changewz == '') {
						uni.showToast({
							title: '步骤文案未填写',
							icon: 'none',
							duration: 2000
						});
						validation1 = false;
						break;
					}
				}
				if (validation1) {
					for (var i = 0; this.taskData.superData.length > i; i++) {
						if (this.taskData.superData[i].changeimg == '') {
							uni.showToast({
								title: '步骤图片未上传',
								icon: 'none',
								duration: 2000
							});
							validation2 = false;
							break;
						}
					}
					if (validation2) {
						if (this.areaData == 1) {
							this.repairData();
						} else {
							this.following();
						}
					}
				}
			}
		},
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		//修改发布任务
		repairData: function() {
			var group = Array();
			var wenData = Array();
			var e = 0;
			for (var i = 0; i < this.taskData.superData.length; i++) {
				e++;
				group.push({
					name: 'step_pic_demo_url_' + e,
					uri: this.taskData.superData[i].changeimg
				});
				wenData.push({
					step_text_des: this.taskData.superData[i].changewz,
					step_type: this.taskData.superData[i].areaid
				});
			}
			var data = {
				taskid: this.taskIDdata,
				//项目名
				item_name: this.taskData.minziData,
				//任务标题
				task_title: this.taskData.rwbtData,
				//任务链接
				task_link: this.taskData.rwljData,
				//提交数据
				submit_data: this.taskData.usermane,
				//步骤的集合
				step: JSON.stringify(wenData)
			};
			this.$api.releaseData('/TaskIssue/UpdateTask', '', data, group, 'post', (status, code, res) => {
				if (status) {
					uni.showToast({
						title: '修改成功',
						icon: 'none',
						duration: 2000
					});
					setTimeout(function() {
						uni.reLaunch({
							url: '/pages/taskzx/taskzx?id=1'
						});
					}, 2000);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//弹出选择步骤弹框
		attentionEwm: function() {
			if (this.taskData.superData.length == 9) {
				uni.showToast({
					title: '任务步骤最多添加9个',
					icon: 'none',
					duration: 2000
				});
			} else {
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.stepsData = true;
			}
		},
		//添加步骤-选择步骤
		chooseBZ: function(value) {
			if (value == 1) {
				this.taskData.superData = this.taskData.superData.concat({
					//图文说明
					areaid: 0,
					//文字内容
					changewz: '',
					//上传的图片
					changeimg: ''
				});
				this.guanBZ();
			} else {
				this.taskData.superData = this.taskData.superData.concat({
					//收集截图
					areaid: 1,
					//文字内容
					changewz: '',
					//上传的图片
					changeimg: ''
				});
				this.guanBZ();
			}
		},
		//关闭添加步骤弹框
		guanBZ: function() {
			var _this = this;
			this.isActive1 = false;
			this.isActive2 = true;
			setTimeout(function() {
				_this.blocking = false;
				_this.stepsData = false;
			}, 500);
		},
		//弹出/关闭删除步骤弹框
		scbDataF: function(value, key) {
			if (value == 1) {
				//保存选择的步骤下标
				this.keyBZ = key;
				this.blocking = true;
				this.scbData = true;
			} else if (value == 2) {
				//删除步骤
				this.taskData.superData.splice(this.keyBZ, 1);
				this.blocking = false;
				this.scbData = false;
			} else if (value == 3) {
				//关闭弹框
				this.blocking = false;
				this.scbData = false;
			}
		},
		//弹出/关闭提示弹框
		tiskTK: function(value) {
			if (value == 1) {
				this.blocking = true;
				this.tistkData1 = true;
			} else{
				this.blocking = false;
				this.tistkData1 = false;
			}
		},
		//选择图片方法
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
					_this.taskData.superData[_this.keyData].changeimg = res.tempFilePath;
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
			this.taskData.superData[key].changeimg = '';
		}
	}
};
</script>

<style>
@import '../../../common/css/fabutask.css';

/* body属性 */
page {
	background-color: #f8f8f8;
}

/* CS3动画效果 */
.play {
	bottom: 0;
	animation: play 0.5s;
}

@keyframes play {
	from {
		bottom: -100%;
	}

	to {
		bottom: 0;
	}
}

.implicit {
	bottom: -100%;
	animation: implicit 1s;
}

@keyframes implicit {
	from {
		bottom: 0;
	}

	to {
		bottom: -100%;
	}
}

/* CS3动画效果结束 */
</style>
