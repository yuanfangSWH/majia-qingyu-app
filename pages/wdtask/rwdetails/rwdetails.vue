<template>
	<view>
		<view class="gudztou">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="daohdiv">
				<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
				<view class="return4" @click="complaintsYM">投诉</view>
				任务详情
			</view>
		</view>
		<view style="width: 100%;height: 120upx;background-color: #FCBB67;"></view>
		<view class="toubxx">
			<view class="diy1 juzho">
				<view class="touxdiv">
					<image class="zhestoux" :src="detailsData.Headimgurl"></image>
					<image class="zhesvvv" v-show="detailsData.PlusMember==1" src="../../../static/v.png"></image>
				</view>
				<view class="zgwzdiv">
					<view class="wz1">{{detailsData.task_title}}</view>
					<view class="wz2">任务编号: {{detailsData.Id}}</view>
					<view class="wz3">{{detailsData.task_passed_count}}人已赚 剩余{{detailsData.task_count-detailsData.task_passed_count}}人
						{{detailsData.submit_time_limit}}小时内审核</view>
				</view>
				<!-- <view class="kuailx">
					<image class="lxtb juzho" src="../../../static/lxsj.png"></image>
					<view class="lxdzi" @click="NMSL">联系商家</view>
				</view> -->
			</view>
		</view>
		<view class="nrdiv">
			<view class="nrmk">
				<!-- <view class="rwbuz juzho">
					<view class="biatd juzho">任务链接</view>
					<view class="biatdwz juzho">您可以选择打开任务链接或者复制任务链接</view>
					<view class="rwljan">
						<view class="jiangzj">打开链接</view>
						<view class="jiangzj">复制链接</view>
					</view>
					<view class="biatd juzho" style="padding-top: 40upx;">任务步骤</view>
				</view> -->
				<view class="biatd juzho" style="padding-top: 40upx;">任务步骤</view>
				<view class="buzhou juzho" v-for="(item, key) in detailsData.StepInfos" :key="key">
					<view class="buz">
						<view class="shudai">{{key+1}}</view>
						<view class="buzwz">步骤
							<text v-if="key==0">一</text>
							<text v-if="key==1">二</text>
							<text v-if="key==2">三</text>
							<text v-if="key==3">四</text>
							<text v-if="key==4">五</text>
							<text v-if="key==5">六</text>
							<text v-if="key==6">七</text>
							<text v-if="key==7">八</text>
							<text v-if="key==8">九</text>
							<text v-show="item.step_type==0">（图文说明）</text><text v-show="item.step_type==1">（提交截图）</text></view>
					</view>
					<view class="tuwz juzho">{{item.step_text_des}}</view>
					<view class="tiemimg juzho">
						<image class="tupimg" mode="aspectFill" :src="item.step_pic_demo_url" @click="previewIMG(item.step_pic_demo_url)"></image>
						<view class="tilimg" v-if="imgGroup[key].uri&&chooseData==1">
							<image class="tupimg" mode="aspectFill" :src="imgGroup[key].uri" @click="previewIMG(imgGroup[key].uri)"></image>
							<image class="scdimg" src="../../../static/scx.png" @click="deleteimg(key)"></image>
						</view>
						<view class="sctpmk" v-show="item.step_type==1&&chooseData==1" v-else>
							<view class="xuanqutp" @click="chooseImg(key)">
								<image class="xuanqutpimg juzho" src="../../../static/jiahao.png"></image>
								<view class="xuanqutpwz">添加图片</view>
							</view>
						</view>
					</view>
				</view>


				<view class="tijiaosj" v-if="detailsData.submit_data!=''&&detailsData.submit_data!=null">
					<view class="tijdwz juzho">提交数据</view>
					<view class="wxhenk juzho">请在下方填写做任务的数据</view>
					<view class="shurkdiv juzho"><input class="tij-input" type="text" v-model="phone" :placeholder="'请填写您的'+detailsData.submit_data" /></view>
				</view>
				<view style="width: 100%;height: 30upx;" v-else></view>
				<!-- <image class="advertising juzho" src="../../../static/spgl.png" @click="advertisingF(1)"></image> -->
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background-color: #F3F4F4;"></view>
		<view class="yonhpj juzho">
			<view class="yonwz">用户评价</view>
			<view class="yodiv" v-for="(item, key) in plunData" :key="key">
				<view class="yonpjtx">
					<image class="wtouxms" :src="item.Headimg"></image>
					<image class="qiqinm" v-if="item.IsVip==1" src="../../../static/v.png"></image>
				</view>
				<view class="kudia">
					<view class="zhenymnc">{{item.Nickname}}</view>
					<view class="zjmit">{{item.UpdateAt}}</view>
					<view class="lihpl">{{item.Comment}}</view>
				</view>
			</view>
			<view class="plwk" v-if="emptyData">
				<image class="juzho" src="../../../static/shadtb.png"></image>
				<view class="plwz">该任务暂时没有留言~</view>
			</view>
		</view>

		<view class="dibujrjk">
			<view class="yonjink">赏金：<text>{{detailsData.task_price}}元</text></view>
			<view class="tieanniu">
				<view class="xuybaog" v-if="areaData=='1'">
					<view class="rwanniu1" style="background-color: #C8C8C8;" @click="tkquxmk(1)">取消任务</view>
					<view class="rwanniu2" @click="submitYZ">提交任务</view>
				</view>
				<view class="xuybaog" v-if="areaData=='5'">
					<view class="rwanniu1" style="background-color: #C8C8C8;" @click="tkquxmk(1)">取消任务</view>
					<view class="rwanniu2" @click="submitYZ">提交复审</view>
				</view>
				<view class="xuybaog2" v-if="areaData=='2'" @click="kkqtrw">看看其他任务</view>
				<view class="xuybaog2" v-if="areaData=='3'" @click="pinjia">立即评价</view>
				<view class="xuybaog2" v-if="areaData=='4'" style="background-color: #C8C8C8;">已评价</view>
				<view class="xuybaog2" v-if="areaData=='7'" @click="pleaF">查看举报</view>
				<view class="xuybaog2" v-if="areaData=='6'" @click="NMSL">联系客服</view>
			</view>
		</view>

		<view class="zgsdaojsj" v-show="chooseData==1">请在<text>{{detailsData.receive_timeout_at}}</text>内提交任务，超时任务自动关闭</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 取消任务弹框 -->
		<view class="quxtk" v-show="tkqux">
			<view class="qutkbt">确认取消此任务？</view>
			<view class="wlkjtms">取消任务之后将不会获得赏金</view>
			<view class="qianto">
				<view class="wsmyqx1" @click="tkquxmk(2)">取消</view>
				<view class="wsmyqx2" @click="querquxrw">确认</view>
			</view>
		</view>
		<!-- 提交弹框 -->
		<view class="tijiatk" v-show="tijil" :class="{ play3: isActive1, implicit3: isActive2 }">
			<view class="zhuan_wz juzho" style="height: 74upx;">
				<image class="zhuan_xxtb" @click="tiaojtmk(2)" src="../../../static/wyxtb.png"></image>
			</view>
			<view class="querwz1 juzho">请确认您上传的<text class="chenyu">任务信息是否准确</text>，若恶意提交与任务无关的信息，平台将对此账号采取封号处理！任务
				通过审核后，赏金奖励将在<text class="chenyu">24小时内</text>审核发放</view>
			<view class="nbdulan juzho" @click="tiaojtmk(2)">确认提交</view>
		</view>
		<!-- 广告弹框 -->
		<view class="dadahonb" v-show="advertising">
			<image class="glhbao" src="../../../static/honbao.png"></image>
			<image class="glhbaoxx" src="../../../static/xfqx.png" @click="advertisingF(2)"></image>
			<view class="wtmnb">
				<view class="lbwnb1">看视频就能获得</view>
				<view class="lbwnb2">0.88<text>元</text></view>
				<view class="lbwnb3 juzho">每日你有20次领取红包的机会</view>
				<view class="lbwnb4 juzho">立即观看视频</view>
			</view>
		</view>
		<!-- 提交弹框 -->
		<view class="tijiatk" v-if="tijil" :class="{ play3: isActive1, implicit3: isActive2 }">
			<view class="zhuan_wz juzho" style="height: 74upx;">
				<image class="zhuan_xxtb" @click="tiaojtmk(2)" src="../../../static/wyxtb.png"></image>
			</view>
			<view class="querwz1 juzho">请确认您上传的<text class="chenyu">任务信息是否准确</text>，若恶意提交与任务无关的信息，平台将对此账号采取封号处理！任务
				通过审核后，赏金奖励将在<text class="chenyu">{{detailsData.submit_time_limit}}小时内</text>审核发放</view>
			<view class="nbdulan juzho" @click="tiaojtmk(2)">确认提交</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否VIP
				vipData: 1,
				//判断是否领取了任务
				chooseData: 1,
				//是否显示遮罩
				blocking: false,
				//是否关闭取消弹框
				tkqux: false,
				//是否关闭提交弹框
				tijil: false,
				//是否关闭广告弹框
				advertising: false,
				//评论数据是否为空
				emptyData: false,
				//评论数据
				plunData: "",
				//评论(数据最后一位的ID)
				page: 0,
				//提交数据
				phone: "",
				//CSS3效果1
				isActive1: false,
				//CSS3效果2
				isActive2: false,
				//状态
				areaData: "",
				//图片数据
				imgData: "",
				//图片数组
				imgGroup: [],
				//图片下标
				imgKey: "",
				//详情数据
				detailsData: "",
				//当前任务的ID
				taskIDdata: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.areaData = option.area;
			this.taskIDdata = option.id;
			this.pullData();
			this.loadingRWPJ();
		},
		methods: {
			NMSL: function() {
				uni.showToast({
					title: '功能完善中，敬请期待',
					icon: 'none',
					duration: 2000
				});
			},
			//辩诉/举报
			pleaF: function() {
				uni.navigateTo({
					url: '/pages/wdtask/pleadetails/pleadetails?id=' + this.taskIDdata
				});
			},
			//看看其他任务
			kkqtrw: function() {
				uni.reLaunch({
					url: '/pages/index/index?location=2'
				});
			},
			//加载数据
			pullData: function(id) {
				var data = {
					//已领取任务ID
					taskreceiveid: this.taskIDdata
				};
				this.$api.apiPost('/TaskReceive/TaskInfo', "", data, 'post', (status, code, res) => {
					if (status) {
						this.detailsData = res.obj;
						var e = 0;
						for (var i = 0; i < this.detailsData.StepInfos.length; i++) {
							e++;
							this.imgGroup.push({
								name: "img" + e,
								uri: ""
							});
						}
						this.vipData = res.obj.PlusMember;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//加载任务评价
			loadingRWPJ: function() {
				var data = {
					//任务ID
					taskid: this.taskIDdata,
					//最后一个的id
					lastid: this.page,
					//数据数量
					count: 6
				};
				this.$api.apiPost('/TaskReceive/CommentList', "", data, 'post', (status, code, res) => {
					if (status) {
						this.plunData = res.obj;
						//判断是否数据触底
						if (res.obj != "") {
							this.emptyData = 0;
						} else {
							this.emptyData = 1;
						}
						//拿到数据最后一个的ID
						if (res.obj != "") {
							this.page = this.plunData[this.plunData.length - 1].Id;
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
			//提交验证
			submitYZ: function() {
				var pingz = true;
				for (var i = 0; i < this.detailsData.StepInfos.length; i++) {
					if (this.detailsData.StepInfos[i].step_type == 1) {
						if (this.imgGroup[i].uri == "") {
							pingz = false;
							uni.showToast({
								title: "步骤截图上传不完整",
								icon: 'none',
								duration: 2000
							});
							break;
						}
					}
				}
				if (pingz) {
					if (this.phone == "") {
						uni.showToast({
							title: "提交数据不能为空",
							icon: 'none',
							duration: 2000
						});
					} else {
						this.tiaojtmk(1);
					}
				}
			},
			//提交任务
			submitData: function() {
				var data = {
					//已领取任务ID
					taskreceiveid: this.taskIDdata,
					//提交数据
					rsubmitdata: this.phone
				};
				this.$api.releaseData('/TaskReceive/TaskSubmit', "", data, this.imgGroup, 'post', (status, code, res) => {
					if (status) {
						uni.setStorageSync('refreshData', 1);
						uni.showToast({
							title: "提交成功",
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
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
			},
			//预览图片
			previewIMG: function(url) {
				var imgArr = [];
				imgArr.push(url);
				// 预览图片
				uni.previewImage({
					urls: imgArr
				});
			},
			//选择图片方法
			chooseImg: function(key) {
				this.imgKey = key;
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
						_this.imgGroup[_this.imgKey].uri = res.tempFilePath;
					}
				})
			},
			//图片路径转base64位
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
				this.imgGroup[key].uri = "";
			},
			//评价
			pinjia: function() {
				uni.navigateTo({
					url: '/pages/wdtask/evaluation/evaluation?id=' + this.taskIDdata
				});
			},
			//取消任务
			querquxrw: function() {
				this.blocking = false;
				this.tkqux = false;
				var data = {
					//已领取任务ID
					taskreceiveid: this.taskIDdata
				};
				this.$api.apiPost('/TaskReceive/CancelTaskRc', "", data, 'post', (status, code, res) => {
					if (status) {
						uni.setStorageSync('refreshData', 1);
						uni.showToast({
							title: "取消成功",
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
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
			},
			//弹出或关闭取消弹框
			tkquxmk: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.tkqux = true;
				} else {
					this.blocking = false;
					this.tkqux = false;

				}
			},
			//弹出或关闭提交弹框
			tiaojtmk: function(value) {
				var _this = this;
				if (value == 1) {
					this.isActive2 = false;
					this.isActive1 = true;
					this.blocking = true;
					this.tijil = true;
				} else {
					this.submitData();
					this.isActive1 = false;
					this.isActive2 = true;
					setTimeout(function() {
						_this.blocking = false;
						_this.tijil = false;
					}, 500);

				}
			},
			//弹出或关闭广告弹框
			advertisingF: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.advertising = true;
				} else {
					this.blocking = false;
					this.advertising = false;
				}
			},
			//投诉
			complaintsYM: function() {
				uni.navigateTo({
					url: '/pages/wdtask/complaints/complaints?id=' + this.taskIDdata
				});
			},
			// 返回上一级页面
			returnData: function() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import '../../../common/css/rwdetails.css';

	.xuybaog2 {
		background-color: #FC6930;
	}

	.rwanniu2 {
		background-color: #FC6930;
	}

	/* 所有CSS动画放最下面 */
	/* CS3动画效果 */
	.play1 {
		top: 50%;
		margin-top: -436upx;
		animation: play1 0.5s;
	}

	@keyframes play1 {
		from {
			top: -200%;
		}

		to {
			top: 50%;
			margin-top: -436upx;
		}
	}

	.implicit1 {
		top: -200%;
		animation: implicit1 1s;
	}

	@keyframes implicit1 {
		from {
			top: 50%;
			margin-top: -436upx;
		}

		to {
			top: -200%;
		}
	}

	/* CS3动画效果结束 */
	/* CS3动画效果 */
	.play2 {
		top: 50%;
		margin-top: -188upx;
		animation: play2 0.5s;
	}

	@keyframes play2 {
		from {
			top: -200%;
		}

		to {
			top: 50%;
			margin-top: -188upx;
		}
	}

	.implicit2 {
		top: -200%;
		animation: implicit2 1s;
	}

	@keyframes implicit2 {
		from {
			top: 50%;
			margin-top: -188upx;
		}

		to {
			top: -200%;
		}
	}

	/* CS3动画效果结束 */
	/* CS3动画效果 */
	.play3 {
		top: 50%;
		margin-top: -233upx;
		animation: play3 0.5s;
	}

	@keyframes play3 {
		from {
			top: -200%;
		}

		to {
			top: 50%;
			margin-top: -233upx;
		}
	}

	.implicit3 {
		top: -200%;
		animation: implicit3 1s;
	}

	@keyframes implicit3 {
		from {
			top: 50%;
			margin-top: -233upx;
		}

		to {
			top: -200%;
		}
	}

	/* CS3动画效果结束 */
	/* CS3动画效果 */
	.play4 {
		top: 50%;
		margin-top: -477upx;
		animation: play4 0.5s;
	}

	@keyframes play4 {
		from {
			top: -200%;
		}

		to {
			top: 50%;
			margin-top: -477upx;
		}
	}

	.implicit4 {
		top: -200%;
		animation: implicit4 1s;
	}

	@keyframes implicit4 {
		from {
			top: 50%;
			margin-top: -477upx;
		}

		to {
			top: -200%;
		}
	}

	/* CS3动画效果结束 */
	/* CS3动画效果 */
	.play5 {
		bottom: 0;
		animation: play5 0.5s;
	}

	@keyframes play5 {
		from {
			bottom: -100%;
		}

		to {
			bottom: 0;
		}
	}

	.implicit5 {
		bottom: -100%;
		animation: implicit5 1s;
	}

	@keyframes implicit5 {
		from {
			bottom: 0;
		}

		to {
			bottom: -100%;
		}
	}

	/* CS3动画效果结束 */
</style>
