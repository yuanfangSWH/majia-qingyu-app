<template>
	<view>
		<view class="gudztou">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="daohdiv">
				<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
				<image class="return3" src="../../../static/gend.png" @click="moreF(1)"></image>
				任务详情
			</view>
		</view>
		<view style="width: 100%;height: 130upx;background-color: #FCBB67;"></view>
		<view class="toubxx">
			<view class="diy1 juzho">
				<view class="touxdiv" @click="gzyhxq(detailsData.UserId)">
					<image class="zhestoux" :src="detailsData.Headimgurl"></image>
					<image class="zhesvvv" v-show="detailsData.PlusMember == 1" src="../../../static/v.png"></image>
				</view>
				<view class="zgwzdiv">
					<view class="wz1">{{ detailsData.task_title }}</view>
					<view class="wz2">
						<view style="flex: 1;">剩余数量：{{ detailsData.task_count - detailsData.task_passed_count }}/{{ detailsData.task_count }}</view>
						<view style="flex: 1;">审核时间：{{ detailsData.audit_period }}小时</view>
					</view>
					<view class="wz3">截止日期：{{ detailsData.closing_date }}</view>
				</view>
				<!-- <view class="kuailx">
					<image class="lxtb juzho" src="../../../static/lxsj.png"></image>
					<view class="lxdzi" @click="NMSL">联系商家</view>
				</view> -->
			</view>
			<view class="fenxhonb juzho" v-if="detailsData.force_sum_money > 0" @click="shareTZ()">
				<image class="fendonmhh" src="../../../static/honbao01.png"></image>
				<view class="zhodwenz">赏主给你发了一个红包，点开领取</view>
				<image class="buykdao" src="../../../static/jiant3.png"></image>
			</view>
		</view>

		<view class="nrdiv">
			<view class="nrmk">
				<view class="rwbuz juzho" v-show="detailsData.task_link != '' && detailsData.task_link != null">
					<view class="biatd juzho">任务链接</view>
					<view class="biatdwz juzho">您可以选择打开任务链接或者复制任务链接</view>
					<view class="zgsrurl juzho">{{ detailsData.task_link }}</view>
					<view class="rwljan">
						<view class="jiangzj" @click="dklj">打开链接</view>
						<view class="jiangzj" @click="fzlj">复制链接</view>
					</view>
				</view>
				<view class="biatd juzho" style="padding-top: 40upx;">任务步骤</view>
				<view class="buzhou juzho" v-for="(item, key) in detailsData.StepInfos" :key="key">
					<view class="buz">
						<view class="shudai">{{ key + 1 }}</view>
						<view class="buzwz">
							步骤
							<text v-if="key == 0">一</text>
							<text v-if="key == 1">二</text>
							<text v-if="key == 2">三</text>
							<text v-if="key == 3">四</text>
							<text v-if="key == 4">五</text>
							<text v-if="key == 5">六</text>
							<text v-if="key == 6">七</text>
							<text v-if="key == 7">八</text>
							<text v-if="key == 8">九</text>
							<text v-show="item.step_type == 0">（图文说明）</text>
							<text v-show="item.step_type == 1">（提交截图）</text>
						</view>
					</view>
					<view class="tuwz juzho">
						<text :selectable="true">{{ item.step_text_des }}</text>
					</view>
					<view class="tiemimg juzho">
						<image class="tupimg" mode="aspectFill" :src="item.step_pic_demo_url" @click="previewIMG(item.step_pic_demo_url)"></image>
						<view class="tilimg" v-if="imgGroup[key].uri != '' && chooseData == 1 && detailsData.receive_task_status == 0">
							<image class="tupimg" mode="aspectFill" :src="imgGroup[key].uri" @click="previewIMG(imgGroup[key].uri)"></image>
							<image class="scdimg" src="../../../static/scx.png" @click="deleteimg(key)"></image>
						</view>
						<view class="sctpmk" v-show="item.step_type == 1 && chooseData == 1 && detailsData.receive_task_status == 0" v-else>
							<view class="xuanqutp" @click="chooseImg(key)">
								<image class="xuanqutpimg juzho" src="../../../static/jiahao.png"></image>
								<view class="xuanqutpwz">添加图片</view>
							</view>
						</view>
						<view class="tilimg" v-if="imgGroup[key].uri != '' && chooseData == 1 && detailsData.receive_task_status == 3">
							<image class="tupimg" mode="aspectFill" :src="imgGroup[key].uri" @click="previewIMG(imgGroup[key].uri)"></image>
							<image class="scdimg" src="../../../static/scx.png" @click="deleteimg(key)"></image>
						</view>
						<view class="sctpmk" v-show="item.step_type == 1 && chooseData == 1 && detailsData.receive_task_status == 3" v-else>
							<view class="xuanqutp" @click="chooseImg(key)">
								<image class="xuanqutpimg juzho" src="../../../static/jiahao.png"></image>
								<view class="xuanqutpwz">添加图片</view>
							</view>
						</view>
					</view>
				</view>
				<view class="tijiaosj" v-if="detailsData.submit_data != '' && detailsData.submit_data != null">
					<view class="tijdwz juzho">提交数据</view>
					<view class="wxhenk juzho">请在下方填写做任务的数据</view>
					<view class="shurkdiv juzho"><input class="tij-input" type="text" v-model="phone" :placeholder="detailsData.submit_data" /></view>
				</view>
				<view style="width: 100%;height: 30upx;" v-else></view>
				<!-- <image class="advertising juzho" src="../../../static/spgl.png" @click="advertisingF(1)"></image> -->
			</view>
		</view>
		<view style="width: 100%;height: 160upx;background-color: #F3F4F4;"></view>
		<!-- <view class="yonhpj juzho">
			<view class="yonwz">用户评价</view>
			<view class="yodiv" v-for="(item, key) in plunData" :key="key">
				<view class="yonpjtx">
					<image class="wtouxms" :src="item.Headimg"></image>
					<image class="qiqinm" v-if="item.IsVip == 1" src="../../../static/v.png"></image>
				</view>
				<view class="kudia">
					<view class="zhenymnc">{{ item.Nickname }}</view>
					<view class="zjmit">{{ item.UpdateAt }}</view>
					<view class="lihpl">{{ item.Comment }}</view>
				</view>
			</view>
			<view class="plwk" v-if="emptyData">
				<image class="juzho" src="../../../static/shadtb.png"></image>
				<view class="plwz">该任务暂时没有留言~</view>
			</view>
		</view> -->
		<view class="dibujrjk">
			<view class="yonjink">
				赏金：
				<text>{{ detailsData.task_price }}元</text>
			</view>
			<view class="tieanniu">
				<view class="xuybaog2" v-if="chooseData == 0" @click="receive">立即抢单</view>
				<view class="xuybaog2" v-if="chooseData == 1 && detailsData.receive_task_status == 6" @click="receive">立即抢单</view>
				<view class="xuybaog2" style="background-color: #C8C8C8;" v-if="detailsData.receive_task_status == 7">已放弃</view>
				<view class="xuybaog2" v-if="chooseData == 1 && detailsData.receive_task_status == 0" @click="submitYZ">提交验证</view>
				<view class="xuybaog2" style="background-color: #C8C8C8;" v-if="detailsData.receive_task_status == 1">待审核</view>
				<view class="xuybaog2" v-if="detailsData.receive_task_status == 2 || detailsData.receive_task_status == 8" @click="pinjia">已完成</view>
				<view class="xuybaog2" style="background-color: #C8C8C8;" v-if="detailsData.receive_task_status == 9">已完成</view>
				<view class="xuybaog2" v-if="detailsData.receive_task_status == 3" @click="submitYZ">复审提交</view>
				<view class="xuybaog2" style="background-color: #C8C8C8;" v-if="detailsData.receive_task_status == 4">被商家举报</view>
				<view class="xuybaog2" style="background-color: #C8C8C8;" v-if="detailsData.receive_task_status == 5">举报商家中</view>
			</view>
		</view>
		<view class="zgsdaojsj" v-show="chooseData == 1 && detailsData.receive_task_status == 0">
			请在
			<text>{{ submitXs }}</text>
			内提交验证，超时任务自动关闭
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 领取说明弹框 -->
		<view class="zhuanqsan" v-if="instructions" :class="{ play1: isActive1, implicit1: isActive2 }">
			<view class="zhuan_wz juzho">
				<image class="zhuan_xxtb" @click="tanchusm(2)" src="../../../static/wyxtb.png"></image>
				赚取赏金分3步
			</view>
			<view class="zhuan1 juzho">
				<view class="zhuan_buz">1</view>
				<view class="zhuantwbt">赚取赏金分3步</view>
			</view>
			<view class="zhuan2 juzho">做任务前必须先点击页面底部领取任务，否则将会错失赏金。</view>
			<view class="zhuan1 juzho">
				<view class="zhuan_buz">2</view>
				<view class="zhuantwbt">按步骤操作</view>
			</view>
			<view class="zhuan2 juzho">根据任务步骤要求进行操作，并提交正确的任务收集截图或数据。</view>
			<view class="zhuan1 juzho">
				<view class="zhuan_buz">3</view>
				<view class="zhuantwbt">提交正确的数据</view>
			</view>
			<view class="zhuan2 juzho">请正确提交验证所要求的数据，恶意提交与任务无关的信息，将会受到平台封号处理。</view>
			<view class="zhuan_andiv juzho">
				<view class="jiedg" @click="jdxy">接单规则</view>
				<view class="kaiszq" @click="receive2">开始赚钱</view>
			</view>
			<view class="bztxw juzho">
				<view class="goudx" @click="sfdyc"><image class="goudx_img" v-show="first == 1" src="../../../static/goudx.png"></image></view>
				<view class="bzts">不再提示</view>
			</view>
		</view>
		<!-- 提交弹框 -->
		<view class="tijiatk" v-show="tijil">
			<view class="querwz1">
				请按任务要求提交验证信息
				<br />
				若乱提交一律封号！
			</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tiaojtmk(2)">我再想想</view>
				<view class="nbdulan" @click="submitData()">确认提交</view>
			</view>
		</view>
		<!-- 广告弹框 -->
		<view class="dadahonb" v-show="advertising">
			<image class="glhbao" src="../../../static/honbao.png"></image>
			<image class="glhbaoxx" src="../../../static/xfqx.png" @click="advertisingF(2)"></image>
			<view class="wtmnb">
				<view class="lbwnb1">看视频就能获得</view>
				<view class="lbwnb2">
					0.88
					<text>元</text>
				</view>
				<view class="lbwnb3 juzho">每日你有20次领取红包的机会</view>
				<view class="lbwnb4 juzho">立即观看视频</view>
			</view>
		</view>
		<!-- 分享弹框 -->
		<view class="fendiv" v-if="sharetk" :class="{ play4: fxtkCSS1, implicit4: fxtkCSS2 }"><image class="fenimgtp" :src="shareData.img"></image></view>
		<view class="rhfdiv" v-if="sharetk">
			<view class="dsgt">
				<view class="jbtmp">如何分享？</view>
				<image class="tbdxjt" src="../../../static/xzx.png" @click="sharefan(2)"></image>
			</view>
			<view class="dibfx">
				<view class="tiefenk" @click="shareTW(2)">
					<image class="fenltb" src="../../../static/yaoq01.png"></image>
					<view class="yngtwz">朋友圈</view>
				</view>
				<view class="tiefenk" @click="shareTW(1)">
					<image class="fenltb" src="../../../static/yaoq02.png"></image>
					<view class="yngtwz">微信</view>
				</view>
				<view class="tiefenk" @click="baocImg">
					<image class="fenltb" src="../../../static/yaoq04.png"></image>
					<view class="yngtwz">保存图片</view>
				</view>
			</view>
		</view>
		<!-- 更多弹框 -->
		<view class="xuanz" v-show="moreData" :class="{ play5: isActive1, implicit5: isActive2 }">
			<view class="aitmd">
				<view class="gbhs2" @click="sharefan(1)">分享</view>
				<view class="gbhs3" @click="complaintsYM">投诉任务</view>
				<view class="gbhs3" @click="jdxy">接单规则</view>
			</view>
			<view class="wsmys" @click="moreF(2)">取消</view>
		</view>
		<!-- 图片分享弹框 -->
		<view class="xuanz" v-show="imgfx" :class="{ play6: isActive1, implicit6: isActive2 }">
			<view class="aitmd">
				<view class="gbhs2" @click="IMgFli(3)">发送给微信好友</view>
				<view class="gbhs3" @click="IMgFli(4)">保存相册</view>
				<view class="gbhs3" @click="IMgFli(5)">预览大图</view>
			</view>
			<view class="wsmys" @click="IMgFli(2)">取消</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//是否VIP
			vipData: '',
			//判断是否领取了任务
			chooseData: 0,
			//是否显示遮罩
			blocking: false,
			//是否关闭分享弹框
			sharetk: false,
			//分享弹框CSS效果1
			fxtkCSS1: false,
			//分享弹框CSS效果2
			fxtkCSS2: false,
			//是否关闭领取说明弹框
			instructions: false,
			//是否关闭提交弹框
			tijil: false,
			//是否不再弹出领取说明弹框
			first: 0,
			//是否关闭广告弹框
			advertising: false,
			//更多弹框
			moreData: false,
			//图片分享弹框
			imgfx: false,
			//评论数据是否为空
			emptyData: false,
			//评论数据
			plunData: '',
			//评论(数据最后一位的ID)
			page: 0,
			//提交数据
			phone: '',
			//CSS3效果1
			isActive1: false,
			//CSS3效果2
			isActive2: false,
			//图片数据
			imgData: '',
			//图片数组
			imgGroup: [],
			//图片下标
			imgKey: '',
			//详情数据
			detailsData: '',
			//当前任务的ID
			taskIDdata: '',
			//提交截止日期
			submitXs: '',
			//分享数据
			shareData: '',
			//需要操作的图片数据
			IMGshezhi: '',
			//是否可以点击
			ClickData: true
		};
	},
	onShow() {
		if (this.moreData == true || this.instructions == true) {
			this.blocking = false;
			this.moreData = false;
			this.instructions = false;
		}
		var refreshData = uni.getStorageSync('refreshData');
		if (refreshData == 1) {
			uni.setStorageSync('refreshData', 2);
			this.loadingData();
			this.loadingRWPJ();
		}
	},
	//监听页面加载
	onLoad(option) {
		//当前任务IDw
		this.taskIDdata = option.id;
		//判断是否永久关闭领取任务弹框
		this.first = uni.getStorageSync('firstData');
		//加载详情数据
		this.loadingData();
		//加载任务评价
		this.loadingRWPJ();
		//加载分享数据
		this.shareF();
		//添加浏览记录（暂时不需要）
		//this.browseF();
	},
	methods: {
		//加载详情数据
		loadingData: function() {
			var data = {
				//任务ID
				taskId: this.taskIDdata
			};
			this.$api.apiPost('/taskissue/gettaskdetail', '', data, 'post', (status, code, res) => {
				if (status) {
					this.detailsData = res.obj;
					this.submitXs = this.detailsData.ReceiveTimeoutAt;
					var e = 0;
					for (var i = 0; i < this.detailsData.StepInfos.length; i++) {
						e++;
						this.imgGroup.push({
							name: 'img' + e,
							uri: ''
						});
					}
					this.vipData = res.obj.PlusMember;
					if (res.obj.IsReceive) {
						//已领取任务
						this.chooseData = 1;
					}
					//计算分享的钱
					// this.fenxjin = Number(this.detailsData.force_count) / Number(this.detailsData.force_sum_money);
					// this.fenxjin = Number(this.fenxjin.toFixed(2));
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
			this.$api.apiPost('/TaskReceive/CommentList', '', data, 'post', (status, code, res) => {
				if (status) {
					this.plunData = res.obj;
					//判断是否数据触底
					if (res.obj != '') {
						this.emptyData = 0;
					} else {
						this.emptyData = 1;
					}
					//拿到数据最后一个的ID
					if (res.obj != '') {
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
		//添加浏览记录
		browseF: function() {
			var data = {
				//任务ID
				taskId: this.taskIDdata
			};
			this.$api.apiPost('/UserFollowInfo/AddBrowseRecord', '', data, 'post', (status, code, res) => {
				if (status) {
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载分享弹框数据
		shareF: function() {
			var data = {
				//任务ID
				taskid: this.taskIDdata
			};
			this.$api.apiPost('/TaskIssue/TaskShareInfo', '', data, 'post', (status, code, res) => {
				if (status) {
					this.shareData = res.obj;
					//把分享弹框数据存入VUEX
					this.$store.commit('shareImag', res.obj);
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
					if (this.imgGroup[i].uri == '') {
						pingz = false;
						uni.showToast({
							title: '步骤截图上传不完整',
							icon: 'none',
							duration: 2000
						});
						break;
					}
				}
			}
			if (pingz) {
				if (this.detailsData.submit_data != '' && this.phone == '') {
					uni.showToast({
						title: '提交数据不能为空',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.tiaojtmk(1);
				}
			}
		},
		//弹出或关闭提交弹框
		tiaojtmk: function(value) {
			if (value == 1) {
				this.blocking = true;
				this.tijil = true;
			} else {
				this.blocking = false;
				this.tijil = false;
			}
		},
		//提交验证
		submitData: function() {
			if (this.ClickData) {
				this.ClickData = false;
				var data = {
					//已领取任务ID
					taskid: this.taskIDdata,
					//提交数据
					rsubmitdata: this.phone
				};
				this.$api.releaseData('/TaskReceive/TaskSubmit', '', data, this.imgGroup, 'post', (status, code, res) => {
					if (status) {
						this.ClickData = true;
						this.isActive1 = false;
						this.isActive2 = true;
						setTimeout(function() {
							_this.blocking = false;
							_this.tijil = false;
						}, 500);
						uni.showToast({
							title: '提交成功',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 2000);
					} else {
						this.ClickData = true;
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
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
			this.imgGroup[key].uri = '';
		},
		//弹出或关闭领取弹框
		tangclq: function(value) {
			var _this = this;
			if (value == 1) {
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.linqu = true;
			} else {
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.linqu = false;
				}, 500);
			}
		},
		//领取任务
		receive: function() {
			// 判断是否永久关闭领取任务弹框
			if (this.first == 1) {
				if (this.ClickData) {
					this.ClickData = false;
				var data = {
					//任务ID
					taskid: this.taskIDdata
				};
				this.$api.apiPost('/TaskReceive/TaskDraw', '', data, 'post', (status, code, res) => {
					if (status) {
						this.ClickData = true;
						uni.showToast({
							title: '领取任务成功~',
							icon: 'none',
							duration: 3000
						});
						this.submitXs = res.obj;
						this.tanchusm(2);
						this.loadingData();
					} else {
						this.ClickData = true;
						this.tanchusm(2);
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
				}
			} else {
				//弹出领取说明弹框
				this.tanchusm(1);
			}
		},
		//领取任务-开始赚钱
		receive2: function() {
			if (this.ClickData) {
				this.ClickData = false;
			var data = {
				//任务ID
				taskid: this.taskIDdata
			};
			this.$api.apiPost('/TaskReceive/TaskDraw', '', data, 'post', (status, code, res) => {
				if (status) {
					this.ClickData = true;
					uni.showToast({
						title: '领取任务成功~',
						icon: 'none',
						duration: 3000
					});
					this.submitXs = res.obj;
					this.tanchusm(2);
					this.loadingData();
				} else {
					this.ClickData = true;
					this.tanchusm(2);
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
			}
		},
		//弹出或关闭领取说明弹框
		tanchusm: function(value) {
			var _this = this;
			if (value == 1) {
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.instructions = true;
			} else {
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.instructions = false;
				}, 500);
			}
		},
		//选择是否永久关闭领取说明弹框
		sfdyc: function() {
			if (this.first == 0) {
				this.first = 1;
				uni.setStorageSync('firstData', 1);
			} else {
				this.first = 0;
				uni.setStorageSync('firstData', 0);
			}
		},
		//弹出图片分享弹框
		IMgFli: function(value, url) {
			var _this = this;
			if (value == 1) {
				//保存临时图片
				this.IMGshezhi = url;
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.imgfx = true;
			} else if (value == 2) {
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.imgfx = false;
				}, 500);
			} else if (value == 3) {
				this.isActive1 = false;
				this.isActive2 = true;
				this.shareTW2();
				setTimeout(function() {
					_this.blocking = false;
					_this.imgfx = false;
				}, 500);
			} else if (value == 4) {
				this.isActive1 = false;
				this.isActive2 = true;
				this.baocImg2();
				setTimeout(function() {
					_this.blocking = false;
					_this.imgfx = false;
				}, 500);
			} else if (value == 5) {
				this.isActive1 = false;
				this.isActive2 = true;
				this.blocking = false;
				this.imgfx = false;
				//预览图片
				this.previewIMG(this.IMGshezhi);
			}
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
		//保存图片2
		baocImg2: function() {
			uni.saveImageToPhotosAlbum({
				filePath: this.IMGshezhi,
				success: function() {
					uni.showToast({
						title: '保存图片成功',
						icon: 'none',
						duration: 2000
					});
				},
				fail: function() {
					uni.showToast({
						title: '保存图片失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//分享图片到微信
		shareTW2: function() {
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 2, //类型为分享图片
				imageUrl: this.IMGshezhi,
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
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
		//弹出更多弹框
		moreF: function(value) {
			var _this = this;
			if (value == 1) {
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.moreData = true;
			} else {
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.moreData = false;
				}, 500);
			}
		},
		//弹出或关闭分享弹框
		sharefan: function(value) {
			var _this = this;
			if (value == 1) {
				//关闭更多弹框
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.moreData = false;
				}, 500);
				this.fxtkCSS2 = false;
				this.fxtkCSS1 = true;
				this.blocking = true;
				this.sharetk = true;
			} else {
				this.fxtkCSS1 = false;
				this.fxtkCSS2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.sharetk = false;
				}, 500);
			}
		},
		//分享图文到微信/朋友圈
		shareTW: function(value) {
			var wxData = '';
			if (value == 1) {
				wxData = 'WXSceneSession';
			} else {
				wxData = 'WXSenceTimeline';
			}
			uni.share({
				provider: 'weixin',
				scene: wxData,
				type: 0, //类型为图文
				href: this.shareData.link,
				title: '做任务赚现金',
				summary: '只需花费5分钟，就可以拿到这个任务的佣金，快来赚钱吧~',
				imageUrl: 'https://lightfish.oss-cn-shenzhen.aliyuncs.com/oss/record/demo2020-07-08/15942115827552839002552.png',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		//保存图片
		baocImg: function() {
			uni.saveImageToPhotosAlbum({
				filePath: this.shareData.img,
				success: function() {
					uni.showToast({
						title: '保存图片成功',
						icon: 'none',
						duration: 2000
					});
				},
				fail: function() {
					uni.showToast({
						title: '保存图片失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//投诉
		complaintsYM: function() {
			uni.navigateTo({
				url: '/pages/recommended/complaints/complaints?id=' + this.taskIDdata
			});
		},
		//打开链接
		dklj: function() {
			//调用5+APP的API方法调起第三方程序打开URL
			plus.runtime.openURL(encodeURI(this.detailsData.task_link), function(res) {});
		},
		//复制链接
		fzlj: function() {
			uni.setClipboardData({
				data: this.detailsData.task_link,
				success: function() {
					uni.showToast({
						title: '复制链接成功',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//商户详情
		gzyhxq: function(id) {
			uni.navigateTo({
				url: '/pages/noteshang/noteshang?id=' + id
			});
		},
		//接单协议
		jdxy: function(id) {
			uni.navigateTo({
				url: '/pages/agreement/jdgz/jdgz'
			});
		},
		//分享
		shareTZ: function() {
			uni.navigateTo({
				url: '/pages/sharemoney/sharemoney?id=' + this.taskIDdata + '&bounty=' + this.detailsData.task_price
			});
		},
		//评价
		pinjia: function() {
			// uni.navigateTo({
			// 	url: '/pages/wdtask/evaluation/evaluation?id=' + this.taskIDdata
			// });
		},
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style>
@import '../../../common/css/rwdetails.css';

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
	margin-top: -540upx;
	animation: play4 0.5s;
}

@keyframes play4 {
	from {
		top: -200%;
	}

	to {
		top: 50%;
		margin-top: -540upx;
	}
}

.implicit4 {
	top: -200%;
	animation: implicit4 1s;
}

@keyframes implicit4 {
	from {
		top: 50%;
		margin-top: -540upx;
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
/* CS3动画效果 */
.play6 {
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

.implicit6 {
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
