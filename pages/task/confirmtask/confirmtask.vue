<template>
	<view>
		<view v-show="!prerw">
				<view class="status_bar" style="background-color: #FCBB67;"></view>
				<view class="daohdiv">
					<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
					<!-- <image class="return2" src="../../../static/wenhao.png"></image> -->
					发布任务2/2
				</view>
			<view class="wgjywz">任务数据设置</view>
			<view class="biandan" style="margin-bottom: 30upx;">
				<view class="danjie juzho">
					<view class="suohdby">任务单价<text class="hox">*</text></view>
					<view class="yueinpt"><input class="danjie-input" type="number" v-model="tfdjData" :placeholder="'最低'+minimum+'元'"
						 :placeholder-style="zitys" @input="tfdj" /></view>
				</view>
				<view class="danjie juzho">
					<view class="suohdby">任务数量<text class="hox">*</text></view>
					<view class="yueinpt"><input class="danjie-input" type="number" v-model="tfslData" placeholder="最低10个"
						 :placeholder-style="zitys" @input="tfsl" @blur="xiuzrs1" @confirm="xiuzrs1" /></view>
				</view>
				<view class="danjie juzho" style="border-bottom:0;">
					<view class="suohdby">服务费</view>
					<view class="yueinpt"><view class="mokfw">{{serviceFY}}元</view></view>
				</view>
				</view>
				<view class="biandan">
				<view class="danjie juzho">
					<view class="suohdby">下架时间<text class="hox">*</text></view>
					<view class="zgssj">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<input class="danjie-input2" type="text" :disabled="true" v-model="timeData1" placeholder="请选择任务的结束时间"
							 :placeholder-style="zitys" />
						</picker>
					</view>
					<image class="zgsjiantou" src="../../../static/xyj.png"></image>
				</view>
				<view class="danjie juzho">
					<view class="suohdby">提交限时</view>
					<image class="zgsgth" src="../../../static/tishi.png" @click="tiskTK(1)"></image>
					<view class="sjianl">
						<picker @change="bindPickerChange1" :value="index1" :range="array1">
							<input class="danjie-input3" type="text" :disabled="true" v-model="array1[index1]" placeholder="请选择用户提交任务时间"
							 :placeholder-style="zitys" />
						</picker>
					</view>
					<image class="zgsjiantou" src="../../../static/xyj.png"></image>
				</view>
				<view class="danjie juzho" style="border-bottom:0;">
					<view class="suohdby">审核周期</view>
					<image class="zgsgth" src="../../../static/tishi.png" @click="tiskTK2(1)"></image>
					<view class="sjianl">
						<picker @change="bindPickerChange2" :value="index2" :range="array2">
							<input class="danjie-input3" type="text" :disabled="true" v-model="array2[index2]" placeholder="若未按时审核，将自动通过"
							 :placeholder-style="zitys" />
						</picker>
					</view>
					<image class="zgsjiantou" src="../../../static/xyj.png"></image>
				</view>
			</view>
			<!-- <view class="wgjywz">任务加速设置(参与后任务会获得更高的曝光率)</view>
			<view class="biandan" style="height: 240upx;">
				<view class="danjie juzho">
					<view class="suohdby">影响人数</view>
					<view class="yueinpt"><input class="danjie-input" type="number" v-model="yxrsData" placeholder="最少填写1人"
						 :placeholder-style="zitys" @input="yxrs" @blur="xiuzrs2" @confirm="xiuzrs2" /></view>
				</view>
				<view class="danjie juzho" style="border-bottom:0;">
					<view class="suohdby">投放金额</view>
					<view class="yueinpt"><input class="danjie-input" type="number" :disabled="true" v-model="tfjeData" placeholder="自动计算"
						 :placeholder-style="zitys" /></view>
				</view>
			</view> -->
			<view class="fabtishi">发布提示：不得发布法律法规锁禁止的内容任务，请参考《发布规范》，如有违反将受到封号处罚，不退还充值余额。</view>
			<view class="dibxf">
			<view class="guidiv juzho">
				<view class="goutu1" v-show="!selected" @click="xuanz"></view>
				<view class="goutu2" v-show="selected" @click="xuanz">
					<image class="juzho" src="../../../static/goutu.png"></image>
				</view>
				<view class="wz">阅读并同意<text @click="fdxy">《轻鱼平台发布规则》</text></view>
			</view>
			<view class="dibujrjk">
				<view class="yonjink">支付金额：<text>{{moneyData.usData}}元</text></view>
				<view class="tieanniu">
					<view class="xuybaog">
						<view class="rwanniu1" @click="browseF(1)">预览任务</view>
						<view class="rwanniu2" @click="validation">提交订单</view>
					</view>
				</view>
			</view>
			</view>
		</view>
		<!--通用遮罩EX-->
		<view class="gzh-modelmask-box" style="z-index: 40;" v-show="blocking2"></view>
		<!-- 关闭支付提示弹框 -->
		<view class="tijiatk" style="z-index: 50;" v-show="tijil">
			<view class="querwz1">您的订单尚未支付<br>是否取消支付？</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tiaojtmk(2)">取消支付</view>
				<view class="nbdulan" @click="tiaojtmk(3)">继续支付</view>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 提示弹框1 -->
		<view class="tistk" v-show="tistkData1">
			<image class="weiltisx" src="../../../static/buzx.png" @click="tiskTK(2)"></image>
			<view class="weilxm">提交限时</view>
			<view class="jlms">提交限时是指从用户领取任务到提交任务的时间，如在此时间内未提交任务，需要重新领取任务</view>
		</view>
		<!-- 提示弹框2 -->
		<view class="tistk" v-show="tistkData2">
			<image class="weiltisx" src="../../../static/buzx.png" @click="tiskTK2(2)"></image>
			<view class="weilxm">审核周期</view>
			<view class="jlms">审核周期是最晚审核时间，请在审核时间内对提交的任务申请进行审核，超时未审核的将自动通过审核并发放佣金</view>
		</view>
		<!-- 支付弹框 -->
		<view class="zhitkdiv" v-show="paytk" :class="{ play: isActive1, implicit: isActive2 }">
			<view class="zgzhiwlcx">
				<image class="zyizfxx" src="../../../static/wyxtb.png" @click="paytkF(2)"></image>
			</view>
			<view class="tobu">
				<view>
					<view class="touxdiv2">
						<image class="tox" :src="userData.Headimgurl"></image>
						<image class="zhesvvv" v-if="userData.PlusMember==1" src="../../../static/v.png"></image>
					</view>
				</view>
				<view>
					<view class="minc">{{taskData.rwbtData}}</view>
					<view class="sbiao">
						<view class="sbiao1">￥<text class="sbiao2">{{tfdjData}}</text></view>
						<view class="sbsl">x<text class="sbsl1">{{tfslData}}</text></view>
					</view>
				</view>
			</view>
			<view class="zffsbj">
				<view class="zffs">
					<view class="zffs1">支付方式</view>
				</view>
				<view class="zfb" @tap="paytype=1">
					<view class="left">
						<image class="tishit" src="../../../static/zfb.png"><text class="xianzzt">支付宝支付</text></image>
					</view>
					<view class="right">
						<radio :checked="paytype==1" color="#FCBB67" />
					</view>
				</view>
				<view class="wx" @tap="paytype=2">
					<view class="left">
						<image class="tishit" src="../../../static/wx.png"><text class="xianzzt">微信支付</text></image>
					</view>
					<view class="right">
						<radio :checked="paytype==2" color="#FCBB67" />
					</view>
				</view>
				<view class="wx" @tap="paytype=3">
					<view class="left">
						<image class="tishit" src="../../../static/fbyl.png"><text class="xianzzt">发布余额支付<text class="fabwjq">￥{{userData.IssueMoney}}</text></text></image>
					</view>
					<view class="right">
						<radio :checked="paytype==3" color="#FCBB67" />
					</view>
				</view>
				<view class="zffs2">
					<view class="yfje">需要支付:<text class="yfje1">￥</text><text class="yfje2">{{moneyData.usData}}</text></view>
				</view>
				<view class="miaoswz">任务上架后按实际效果收取，未消耗的余额将在任务终止后退回到您的发布余额。</view>
				<view class="qdbj">
					<view class="dibujrjk2 juzho" @click="following">
						立即支付
					</view>
				</view>
			</view>
		</view>
		<!-- 预览任务弹框 -->
		<view class="zydzhe" v-show="prerw">
			<view class="cjinibi juzho">
				<view class="toubxx">
					<view class="diy1 juzho">
						<view class="touxdiv">
							<image class="zhestoux" :src="userData.Headimgurl"></image>
							<image class="zhesvvv" v-if="userData.PlusMember==1" src="../../../static/v.png"></image>
						</view>
						<view class="zgwzdiv">
							<view class="wz1">{{taskData.rwbtData}}</view>
							<view class="wz2">任务编号: 000001</view>
							<view class="wz3">0人已赚 剩余{{tfslData}}人
								{{shzqData}}小时内审核</view>
						</view>
						<view class="kuailx">
							<image class="lxtb juzho" src="../../../static/lxsj.png"></image>
							<view class="lxdzi">联系商家</view>
						</view>
					</view>
					<!-- <view class="diy2 juzho">
						<image class="ptrtb" src="../../../static/pu.png"></image>
						<view class="ptwz">+{{tfdjData}}<text class="doutxt">元</text></view>
						<image class="viptb" src="../../../static/bivip.png"></image>
						<view class="vipwz">+{{tfdjData}}<text class="doutxt">元</text></view>
						<view class="jiantou">
							<image class="jiantouimg" src="../../../static/jiant3.png"></image>
						</view>
					</view> -->
				</view>
				<view class="nrdiv">
					<view class="nrmk">
						<view class="biatd juzho">任务步骤</view>
						<view class="buzhou juzho" v-for="(item,key) in taskData.superData" :key="key">
							<view class="buz">
								<view class="shudai">{{key+1}}</view>
								<view class="buzwz">步骤{{key+1}}<text v-if="item.areaid==0">图文说明</text><text v-else>收集截图</text></view>
							</view>
							<view class="tuwz juzho">{{item.changewz}}</view>
							<view class="tiemimg juzho">
								<image class="tupimg" mode="widthFix" v-if="item.changeimg" :src="item.changeimg"></image>
							</view>
						</view>
						<view class="tijiaosj">
							<view class="tijdwz juzho">提交数据</view>
							<view class="wxhenk juzho">请在下方填写做任务的数据</view>
							<view class="shurkdiv juzho"><input class="tij-input" type="number" :disabled="true" maxlength="11"
								 :placeholder-style="zitys" placeholder="请填写您的手机号" /></view>
						</view>
					</view>
					<view class="zhuygban">
						<view class="zhenan juzho" @click="browseF(2)">预览结束</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			//返回当前日期
			const currentDate = this.getDate({
				format: true
			})
			return {
				//占位符CSS
				zitys: "color: #C3C3C3;",
				//是否显示遮罩
				blocking: false,
				//是否显示遮罩EX
				blocking2: false,
				//提示弹框1
				tistkData1:false,
				//提示弹框2
				tistkData2:false,
				//是否显示支付提示弹框
				tijil:false,
				//是否显示预览任务弹框
				prerw: false,
				//是否显示支付弹框
				paytk: false,
				//CSS3动画样式1
				isActive1: false,
				//CSS3动画样式2
				isActive2: false,
				//当前日期
				currentdate: currentDate,
				//日期控件操作值
				date: currentDate,
				//结束时间(传参数)
				timeData1: "",
				//提交日期参数
				array1: ["1小时", "6小时", "1天", "3天", "5天", "7天"],
				//选择的提交日期下标
				index1: "",
				//审核周期参数
				array2: ["1天", "3天", "5天", "7天"],
				//选择的审核周期下标
				index2: "",
				//投放单价
				tfdjData: "",
				//投放数量
				tfslData: "",
				//影响人数(加速包设置参数)
				yxrsData: "",
				//投放金额(加速包设置参数)
				tfjeData: "",
				//提交限时(传参数)
				tjsxData: "",
				//审核周期(传参数)
				shzqData: "",
				// 是否选中
				selected: true,
				//发布任务的数据
				taskData: {},
				//金额数据
				moneyData: {
					//需要支付的价格
					usData: 0.00,
					//任务总价格
					basisData: 0,
					//加速包价格
					speedData: 0
				},
				//执行方法
				executive: true,
				//执行提交重新拿ID吗
				executive2: true,
				//当前任务的ID
				taskIDdata: "",
				//每个分类动态的最低投放单价
				minimum: 0,
				//用户数据
				userData: "",
				//支付类型
				paytype: 1,
				//订单ID
				orderID: "",
				//服务费用
				serviceFY:0
			}

		},
		computed: {
			//计算返回开始日期
			startDate() {
				return this.getDate('start');
			},
			//计算返回结束日期
			endDate() {
				return this.getDate('end');
			}
		},
		//监听页面显示
		onShow() {
			this.executive = true;
			//得到VUEX发布数据
			this.browseDK();
			this.loadingUser();
		},
		//监听页面加载
		onLoad(option) {
			if (option.id) {
				this.taskIDdata = option.id;
				this.pullData();
			}
		},
		methods: {
			//加载数据
			pullData: function() {
				var data = {
					//ID
					taskid: this.taskIDdata
				};
				this.$api.apiPost('/TaskIssue/StoreTaskInfo', "", data, 'post', (status, code, res) => {
					if (status) {
						//选择的提交日期下标
						this.index1 = this.fhpdData3(res.obj.submit_time_limit);
						//提交限时(传参数)
						this.tjsxData = res.obj.submit_time_limit;
						//选择的审核周期下标
						this.index2 = this.fhpdData4(res.obj.audit_period);
						//审核周期(传参数)
						this.shzqData = res.obj.audit_period;
						if (res.obj.task_price != 0) {
							//投放单价
							this.tfdjData = Number(res.obj.task_price);
						}
						if (res.obj.task_count != 0) {
							//投放数量
							this.tfslData = Number(res.obj.task_count);
						}
						if (res.obj.force_count != 0) {
							//影响人数
							this.yxrsData = Number(res.obj.force_count);
						}
						if (this.tfslData != 0 && this.tfdjData != 0) {
							//任务总价格
							this.moneyData.basisData = Number(this.tfdjData) * Number(this.tfslData);
							//需要支付的价格
							this.moneyData.usData = Number(this.moneyData.basisData);
							this.moneyData.usData = this.moneyData.usData.toFixed(2);
							var value = Number(this.moneyData.usData) * (Number(this.userData.issue_rate) * 100) / 100;
							this.moneyData.usData = value + Number(this.moneyData.usData);
							//服务费
							this.serviceFY = value.toFixed(2);
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
			//查询分类动态的最低投放单价
			classificationDJ: function() {
				var data = {
					//分类ID
					typeid: this.taskData.xmlxData
				};
				this.$api.apiPost('/TaskIssue/GetTaskTypeMinPrice', "", data, 'post', (status, code, res) => {
					if (status) {
						//每个分类动态的最低投放单价
						this.minimum = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//得到数据
			browseDK: function() {
				//从VUEX获取发布数据
				this.taskData = this.$store.state.taskData;
				this.classificationDJ();
			},
			//用户数据
			loadingUser: function() {
				//从VUEX获取到用户数据
				this.userData = this.$store.state.userData;
				if (this.userData.Id == "") {
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
				}
			},
			//验证信息完整
			validation: function() {
				if (this.selected) {
					if (this.tfdjData < Number(this.minimum)) {
						uni.showToast({
							title: '投放单价不能低于' + this.minimum + '元',
							icon: 'none',
							duration: 2000
						});
					} else if (this.tfdjData == "") {
						uni.showToast({
							title: '投放单价必填',
							icon: 'none',
							duration: 2000
						});
					} else if (this.tfslData < 10) {
						uni.showToast({
							title: '投放数量不能低于10个',
							icon: 'none',
							duration: 2000
						});
					} else if (this.tfslData == "") {
						uni.showToast({
							title: '投放数量必填',
							icon: 'none',
							duration: 2000
						});
					} else if (this.timeData1 == "") {
						uni.showToast({
							title: '请选择结束时间',
							icon: 'none',
							duration: 2000
						});
					} else if (this.tjsxData == "") {
						uni.showToast({
							title: '请选择提交限时',
							icon: 'none',
							duration: 2000
						});
					} else if (this.shzqData == "") {
						uni.showToast({
							title: '请选择审核周期',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showLoading({
							title: '提交中...'
						});
						this.submitData();
					}
				}
			},
			//提交发布任务
			submitData: function() {
				if (this.executive) {
					if(this.executive2){
						this.executive = false;
						var group = Array();
						var wenData = Array();
						var e = 0;
						for (var i = 0; i < this.taskData.superData.length; i++) {
							e++;
							group.push({
								name: "step_pic_demo_url_" + e,
								uri: this.taskData.superData[i].changeimg
							});
							wenData.push({
								step_text_des: this.taskData.superData[i].changewz,
								step_type: this.taskData.superData[i].areaid
							});
						}
						var data = {
							//项目名
							item_name: this.taskData.minziData,
							//任务标题
							task_title: this.taskData.rwbtData,
							//任务链接
							task_link: this.taskData.rwljData,
							//发布金额
							task_price: this.tfdjData,
							//发布数量
							task_count: this.tfslData,
							//发布类型
							task_type_id: this.taskData.xmlxData,
							//提交限时
							submit_time_limit: this.tjsxData,
							//审核周期
							audit_period: this.shzqData,
							//结束时间
							closing_date: this.timeData1,
							//提交数据
							submit_data: this.taskData.usermane,
							//加速包金额
							force_sum_money: this.tfjeData,
							//加速包人数
							force_count: this.yxrsData,
							//步骤的集合
							step: JSON.stringify(wenData)
						};
						this.$api.releaseData('/taskissue/releasetask', "", data, group, 'post', (status, code, res) => {
							if (status) {
								if (res.obj != "" && res.obj != null) {
									//保存订单ID
									this.orderID = res.obj.order_sn;
									this.executive2 = false;
									this.executive = true;
									//关闭加载提示框
									uni.hideLoading();
									//下一步支付
									this.paytkF(1)
								}
							} else {
								//关闭加载提示框
								uni.hideLoading();
								this.executive = true;
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						});
					}else{
						//关闭加载提示框
						uni.hideLoading();
						//下一步支付
						this.paytkF(1)
					}
				}
			},
			//弹出或关闭提交弹框
			tiaojtmk: function(value) {
				if (value == 1) {
					this.blocking2 = true;
					this.tijil = true;
				} else if (value == 2) {
					this.blocking2 = false;
					this.tijil = false;
					var _this = this;
					this.isActive1 = false;
					this.isActive2 = true;
					setTimeout(function() {
						_this.blocking = false;
						_this.paytk = false;
					}, 500)
				} else if (value == 3){
					this.blocking2 = false;
					this.tijil = false;
				}
			},
			//支付弹框显示/关闭
			paytkF: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.paytk = true;
					this.isActive2 = false;
					this.isActive1 = true;
				} else {
					this.tiaojtmk(1);
				}
			},
			//下一步支付
			following: function() {
				if (this.executive) {
					this.executive = false;
					if (this.paytype == 3 && this.moneyData.usData > this.userData.IssueMoney) {
						this.executive = true;
						uni.showToast({
							title: '发布余额不足，支付失败！',
							icon: 'none',
							duration: 2000
						});
					} else {
						uni.showLoading({
							title: '支付中...'
						});
						var data = {
							//支付类型1支付宝2微信
							pay_type: this.paytype,
							//购买类型1购买会员2发布任务3购买加速包
							buy_type: 2,
							//订单ID
							order_sn: this.orderID,
						};
						this.$api.apiPost('/pay/taskissuepay', "", data, 'post', (status, code, res) => {
							if (status) {
								this.executive = true;
								if (this.paytype == 1) {
									//支付宝支付
									this.orderZF('alipay', res.obj.orderInfo);
								} else if (this.paytype == 2) {
									//微信支付
									this.orderZF('wxpay', res.obj.wxpay);
								} else if (this.paytype == 3) {
									//关闭加载提示框
									uni.hideLoading();
									this.executive = true;
									uni.redirectTo({
										url: '/pages/task/success/success'
									});
								}
							} else {
								//关闭加载提示框
								uni.hideLoading();
								this.executive = true;
								uni.showToast({
									title: res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						});
					}
				}
			},
			//调起API支付
			orderZF: function(serviceData, order) {
				if (this.paytype == 2) {
					order = JSON.stringify(order);
				}
				uni.requestPayment({
					provider: serviceData,
					orderInfo: order, //订单数据
					success: function(res) {
						//关闭加载提示框
						uni.hideLoading();
						this.executive = true;
						uni.redirectTo({
							url: '/pages/task/success/success'
						});
					},
					fail: function(err) {
						//关闭加载提示框
						uni.hideLoading();
						this.executive = true;
						uni.showToast({
							title: "支付关闭",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//投放单价输入后计算
			tfdj: function(event) {
				this.executive2 = true;
				var value = Number(event.detail.value);
				value = value.toFixed(2);
				if (isNaN(value) || value == 0) {
					//任务总价格
					this.moneyData.basisData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.speedData);
				} else {
					if (isNaN(this.tfslData) || this.tfslData == 0) {
						//任务总价格
						this.moneyData.basisData = 0;
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.speedData);
					} else {
						//任务总价格
						this.moneyData.basisData = Number(value) * Number(this.tfslData);
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.basisData);
						this.moneyData.usData = this.moneyData.usData.toFixed(2);
						var value = Number(this.moneyData.usData) * (Number(this.userData.issue_rate) * 100) / 100;
						this.moneyData.usData = value + Number(this.moneyData.usData);
						//服务费
						this.serviceFY = value.toFixed(2);
					}
				}
			},
			//投放数量输入后计算
			tfsl: function(event) {
				this.executive2 = true;
				var value = Number(event.detail.value);
				value = parseInt(value);
				if (isNaN(value) || value == 0) {
					//任务总价格
					this.moneyData.basisData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.speedData);
				} else {
					if (isNaN(this.tfdjData) || this.tfdjData == 0) {
						//任务总价格
						this.moneyData.basisData = 0;
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.speedData);
					} else {
						//任务总价格
						this.moneyData.basisData = Number(value) * Number(this.tfdjData);
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.basisData);
						this.moneyData.usData = this.moneyData.usData.toFixed(2);
						var value = Number(this.moneyData.usData) * (Number(this.userData.issue_rate) * 100) / 100;
						this.moneyData.usData = value + Number(this.moneyData.usData);
						//服务费
						this.serviceFY = value.toFixed(2);
					}

				}
			},
			//转换为整数1
			xiuzrs1: function(event) {
				var value = event.detail.value;
				if (value) {
					this.tfslData = parseInt(value);
				}
			},
			//影响人数输入后计算
			yxrs: function(event) {
				var value = Number(event.detail.value);
				value = parseInt(value);
				if (isNaN(value) || value == 0) {
					this.tfjeData = "";
				} else {
					this.tfjeData = Number(value) * Number(0.1);
					this.tfjeData = this.tfjeData.toFixed(2);
					// var renData = Number(0.07) / Number(value);
					// if (renData == 0) {
					// 	this.tfjeData = 1;
					// } else if (renData < 1) {
					// 	this.tfjeData = Number(value) * Number(0.07);
					// }
				}
				if (isNaN(this.tfjeData) || this.tfjeData == 0) {
					//加速包价格
					this.moneyData.speedData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.basisData);
				} else {
					//加速包价格
					this.moneyData.speedData = Number(this.tfjeData);
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.speedData) + Number(this.moneyData.basisData);
				}

			},
			//转换为整数2
			xiuzrs2: function(event) {
				var value = event.detail.value;
				if (value) {
					this.yxrsData = parseInt(value);
				}
			},
			//投放金额-输入后计算(废弃)
			tfje: function(event) {
				var value = event.detail.value;
				//计算-不能出现每个人得的钱低于1元
				if (value != 0) {
					var renData = Number(value) / Number(this.yxrsData);
					if (renData < 1) {
						value = Number(this.yxrsData);
						this.tfjeData = Number(this.yxrsData);
					}
				}
				if (value) {
					if (this.yxrsData) {
						//加速包价格
						this.moneyData.speedData = Number(value);
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.speedData) + Number(this.moneyData.basisData);
					}
				} else {
					//加速包价格
					this.moneyData.speedData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.basisData);
				}
			},
			//投放金额-失去焦点后(废弃)
			tfjesqjd: function(event) {
				var value = event.detail.value;
				//计算-不能出现每个人得的钱低于1元
				if (value != 0) {
					var renData = Number(value) / Number(this.yxrsData);
					if (renData < 1) {
						value = Number(this.yxrsData);
						this.tfjeData = Number(this.yxrsData);
					}
				}
				if (value) {
					if (this.yxrsData) {
						//加速包价格
						this.moneyData.speedData = Number(value);
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.speedData) + Number(this.moneyData.basisData);
					}
				} else {
					//加速包价格
					this.moneyData.speedData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.basisData);
				}
			},
			//投放金额-点击小键盘完成(废弃)
			tfjedjwc: function(event) {
				var value = event.detail.value;
				//计算-不能出现每个人得的钱低于1元
				if (value != 0) {
					var renData = Number(value) / Number(this.yxrsData);
					if (renData < 1) {
						value = Number(this.yxrsData);
						this.tfjeData = Number(this.yxrsData);
					}
				}
				if (value) {
					if (this.yxrsData) {
						//加速包价格
						this.moneyData.speedData = Number(value);
						//需要支付的价格
						this.moneyData.usData = Number(this.moneyData.speedData) + Number(this.moneyData.basisData);
					}
				} else {
					//加速包价格
					this.moneyData.speedData = 0;
					//需要支付的价格
					this.moneyData.usData = Number(this.moneyData.basisData);
				}
			},

			// 返回上一级页面
			returnData: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			//开启/关闭预览窗口
			browseF: function(value) {
				if (value == 1) {
					this.prerw = true;
				} else {
					this.prerw = false;
				}
			},
			//切换选中
			xuanz: function() {
				if (this.selected) {
					this.selected = false;
				} else {
					this.selected = true;
				}
			},
			//发单协议
			fdxy: function(id) {
				uni.navigateTo({
					url: '/pages/agreement/fdgz/fdgz'
				});
			},
			//选择提交时限
			bindPickerChange1: function(e) {
				this.executive2 = true;
				this.index1 = e.target.value;
				this.tjsxData = this.fhpdData1(this.index1);
			},
			//选择审核周期
			bindPickerChange2: function(e) {
				this.executive2 = true;
				this.index2 = e.target.value;
				this.shzqData = this.fhpdData2(this.index2);
			},
			//判断返回对应的值1
			fhpdData1: function(id) {
				switch (Number(id)) {
					case 0:
						return 1;
						break;
					case 1:
						return 6;
						break;
					case 2:
						return 24;
						break;
					case 3:
						return 72;
						break;
					case 4:
						return 120;
						break;
					case 5:
						return 168;
						break;
				}
			},
			//判断返回对应的值
			fhpdData2: function(id) {
				switch (Number(id)) {
					case 0:
						return 24;
						break;
					case 1:
						return 72;
						break;
					case 2:
						return 120;
						break;
					case 3:
						return 168;
						break;
				}
			},
			//判断返回对应的值3
			fhpdData3: function(timeData) {
				switch (Number(timeData)) {
					case 1:
						return 0;
						break;
					case 6:
						return 1;
						break;
					case 24:
						return 2;
						break;
					case 72:
						return 3;
						break;
					case 120:
						return 4;
						break;
					case 168:
						return 5;
						break;
				}
			},
			//判断返回对应的值4
			fhpdData4: function(timeData) {
				switch (Number(timeData)) {
					case 6:
						return 0;
						break;
					case 24:
						return 1;
						break;
					case 72:
						return 2;
						break;
					case 120:
						return 3;
						break;
					case 168:
						return 4;
						break;
				}
			},
			//日期控件得到结束时间
			bindDateChange: function(e) {
				this.executive2 = true;
				this.date = e.target.value;
				if (this.date.split('-') < this.currentdate.split('-')) {
					uni.showToast({
						title: '结束日期不能小于今天！',
						icon: 'none',
						duration: 2000
					});
				} else {
					this.timeData1 = this.date;
				}
			},
			//日期控件计算函数
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			//弹出/关闭提示弹框1
			tiskTK: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.tistkData1 = true;
				} else{
					this.blocking = false;
					this.tistkData1 = false;
				}
			},
			//弹出/关闭提示弹框2
			tiskTK2: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.tistkData2 = true;
				} else{
					this.blocking = false;
					this.tistkData2 = false;
				}
			}
		}
	}
</script>

<style>
	@import '../../../common/css/confirmtask.css';

	@font-face {
		font-family: light;
		src: url('~@/static/DIN-Light.otf');
	}

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}

	.yfje2 {
		font-family: light;
	}

	.sbiao2 {
		font-family: light;
	}

	.sbsl1 {
		font-family: light;
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
