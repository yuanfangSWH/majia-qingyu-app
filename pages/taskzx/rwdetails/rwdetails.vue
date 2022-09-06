<template>
	<view>
		<view class="gudztou">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="daohdiv">
				<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
				<view class="return4" v-show="areaData == 5" @click="complaintsYM">举报</view>
				任务详情
			</view>
		</view>
		<view style="width: 100%;height: 150upx;background-color: #FCBB67;"></view>
		<view class="ytxiao" v-show="areaData == 0">
			<view class="kuaixywz1">审核中</view>
			<view class="kuaixywz2 juzho">您所提交的任务正在审核中，请耐心等待</view>
		</view>
		<view class="ytxiao" v-show="areaData == 1">
			<view class="kuaixywz1">审核未通过</view>
			<view class="kuaixywz2 juzho">您所提交的任务审核未通过，原因：{{ detailsData.Rejectbec }}</view>
		</view>
		<view class="ytxiao" v-show="areaData == 2">
			<view class="kuaixywz1">待支付</view>
			<view class="kuaixywz2 juzho">您所发布的任务尚未支付，建议尽快支付待任务上架</view>
		</view>
		<view class="ytxiao" v-show="areaData == 3">
			<view class="kuaixywz1">进行中</view>
			<view class="kuaixywz2 juzho">您所发布的任务正在进行中，建议使用加速红包让任务上热门</view>
		</view>
		<view class="ytxiao" v-show="areaData == 4">
			<view class="kuaixywz1">已结束</view>
			<view class="kuaixywz2 juzho">您所发布的任务已经结束，谢谢您的参与</view>
		</view>
		<view class="ytxiao" v-show="areaData == 5">
			<view class="kuaixywz1">待审核</view>
			<view class="kuaixywz2 juzho">请您尽快对用户所提交的任务信息完成审核</view>
		</view>
		<view class="ytxiao" v-show="areaData == 6">
			<view class="kuaixywz1">已通过</view>
			<view class="kuaixywz2 juzho">查看用户提交的任务信息</view>
		</view>
		<view class="ytxiao" v-show="areaData == 7">
			<view class="kuaixywz1">未通过</view>
			<view class="kuaixywz2 juzho">查看用户提交的任务信息</view>
		</view>
		<view class="rwshul">
			<view class="touxdiv3">
				<image class="zhestoux3" :src="detailsData.HeadImager"></image>
				<image class="zhesvvv" style="padding-right: 50upx;" v-show="detailsData.PlusMember == 1" src="../../../static/v.png"></image>
			</view>
			<view class="yishqtaog">
				<view class="ylwz1">{{ detailsData.task_title }}</view>
				<view class="ylwz2">
					<text>￥{{ detailsData.task_price }}</text>
					/{{ detailsData.task_count }}个
				</view>
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background-color: #F3F4F4;"></view>
		<view class="nrdiv">
			<view class="nrmk">
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
						<view class="tilimg" v-if="areaData == 5 && item.step_type == 1">
							<image class="tupimg" mode="aspectFill" :src="item.step_pic_url" @click="previewIMG(item.step_pic_url)"></image>
						</view>
						<view class="tilimg" v-if="areaData == 6 && item.step_type == 1">
							<image class="tupimg" mode="aspectFill" :src="item.step_pic_url" @click="previewIMG(item.step_pic_url)"></image>
						</view>
						<view class="tilimg" v-if="areaData == 7 && item.step_type == 1">
							<image class="tupimg" mode="aspectFill" :src="item.step_pic_url" @click="previewIMG(item.step_pic_url)"></image>
						</view>
					</view>
				</view>

				<view class="tijiaosj" v-if="detailsData.submit_data != '' && detailsData.submit_data != null">
					<view class="tijdwz juzho">提交数据</view>
					<view class="wxhenk2 juzho" v-if="areaData == 5 || areaData == 6||areaData == 7">{{ detailsData.ReceiveSubmitData }}</view>
					<view v-else>
						<view class="wxhenk juzho">请在下方填写做任务的数据</view>
						<view class="shurkdiv juzho"><input class="tij-input" type="text" :placeholder="'请填写您的' + detailsData.submit_data" /></view>
					</view>
				</view>
				<view style="width: 100%;height: 30upx;" v-else></view>
			</view>
		</view>
		<view style="width: 100%;height: 20upx;background-color: #F3F4F4;" v-if="areaData == 1||areaData == 2||areaData == 3||areaData == 4||areaData == 5"></view>
		<!-- <view class="rwllieb">
			<view class="baitnlieb juzho">
				<view class="zuowz1">任务编号</view>
				<view class="zuowz2">{{ detailsData.Id }}</view>
			</view>
			<view class="baitnlieb juzho">
				<view class="zuowz1">创建时间</view>
				<view class="zuowz2">{{ detailsData.AuditTime }}</view>
			</view>
			<view class="baitnlieb juzho">
				<view class="zuowz1">结束时间</view>
				<view class="zuowz2" v-if="detailsData.closing_date != ''">{{ detailsData.closing_date }}</view>
				<view class="zuowz2" v-else>数量完成后自动结束</view>
			</view>
			<view class="baitnlieb juzho">
				<view class="zuowz1">提交限时</view>
				<view class="zuowz2">{{ detailsData.submit_time_limit }}小时</view>
			</view>
			<view class="baitnlieb juzho">
				<view class="zuowz1">审核周期</view>
				<view class="zuowz2">{{ detailsData.audit_period }}小时</view>
			</view>
			<view class="baitnlieb juzho">
				<view class="zuowz1">加速红包</view>
				<view class="zuowz2">{{ detailsData.force_sum_money }}元</view>
			</view>
		</view> -->
		<view style="width: 100%;height:180upx;background-color: #F3F4F4;" v-if="areaData == 1||areaData == 2||areaData == 3||areaData == 4||areaData == 5"></view>
		<view class="dibujrjk" v-if="areaData == 5">
			<view class="yonjink">
				剩余时间：
				<text>{{ detailsData.audit_period }}</text>
				小时
			</view>
			<view class="tieanniu" style="width: 360upx;">
				<view class="xuybaog">
					<view class="rwanniu3" @click="jujueRW">不通过</view>
					<view class="rwanniu2" @click="tiaojtmk(1)">通过</view>
				</view>
			</view>
		</view>
		<view class="dibujrjk" v-if="areaData == 3 && detailsData.force_sum_money == 0">
			<view class="yonjink">
				剩余数量：
				<text>{{ detailsData.task_count - detailsData.task_passed_count }}</text>
				个
			</view>
			<view class="tieanniu" style="width: 360upx;">
				<view class="xuybaog">
					<view class="rwanniu3" @click="tkquxmk(1)">结束任务</view>
					<view class="rwanniu2" @click="speedF">上热门</view>
				</view>
			</view>
		</view>
		<view class="dibujrjk" v-if="areaData == 3 && detailsData.force_sum_money > 0">
			<view class="yonjink">
				剩余数量：
				<text>{{ detailsData.task_count - detailsData.task_passed_count }}</text>
				个
			</view>
			<view class="tieanniu"><view class="xuybaog2" @click="tkquxmk(1)">结束任务</view></view>
		</view>
		<view class="dibujrjk" v-if="areaData == 1 || areaData == 2 || areaData == 4">
			<view class="yonjink">
				支付金额：
				<text>{{ detailsData.IssueTaskMoney }}元</text>
			</view>
			<view class="tieanniu">
				<view class="xuybaog2" v-if="areaData == '4'" @click="zcfbF">再次发布</view>
				<view class="xuybaog" v-if="areaData == '1'||areaData == '2'">
					<view class="rwanniu3" @click="tkquxmk(1)">撤回发布</view>
					<view class="rwanniu2" v-if="areaData == '1'" @click="xiugRW">修改任务</view>
					<view class="rwanniu2" v-if="areaData == '2'" @click="lijiZF">立即支付</view>
				</view>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 通过弹框 -->
		<view class="tijiatk" v-show="tijil">
			<view class="querwz1">
				请认真核对验证信息
				<br />
				审核通过后佣金将立即发放
			</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tiaojtmk(2)">我再想想</view>
				<view class="nbdulan" @click="quertj()">确认通过</view>
			</view>
		</view>
		<!-- 关闭弹框 -->
		<view class="tijiatk2" v-show="tkqux">
			<view class="tlwzt">确认关闭任务吗？</view>
			<view class="querwz2 juzho">
				1、关闭任务后，其他用户将不能报
				<br />
				名您的任务；已报名的用户仍然可以
				<br />
				向你提交任务截图
				<br />
				2、未消耗的金币将自动退回到您的
				<br />
				钱包。
				<br />
			</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tkquxmk(2)">取消</view>
				<view class="nbdulan" @click="jiesrw()">确认</view>
			</view>
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
			//是否关闭通过弹框
			tijil: false,
			//是否关闭广告弹框
			advertising: false,
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
			//状态
			areaData: '',
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
			//当前领取任务用户的ID
			uId: '',
			//已领取任务ID（类似订单号）
			tid: '',
			//是否可以点击
			ClickData: true
		};
	},
	//监听页面加载
	onLoad(option) {
		this.areaData = option.area;
		this.taskIDdata = option.id;
		if (option.uid) {
			this.uId = option.uid;
			this.pullData2(1);
		} else if (option.tid) {
			this.tid = option.tid;
			this.pullData2(2);
		} else {
			this.pullData();
		}
	},
	methods: {
		//通用提示方法
		tonycts: function() {
			uni.showToast({
				title: '暂未开放，敬请期待',
				icon: 'none',
				duration: 3000
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
		//预览图片
		previewIMG: function(url) {
			var imgArr = [];
			imgArr.push(url);
			// 预览图片
			uni.previewImage({
				urls: imgArr
			});
		},
		//加载数据
		pullData: function() {
			var data = {
				//ID
				taskid: this.taskIDdata
			};
			this.$api.apiPost('/TaskIssue/StoreTaskInfo', '', data, 'post', (status, code, res) => {
				if (status) {
					this.detailsData = res.obj;
					var e = 0;
					for (var i = 0; i < this.detailsData.StepInfos.length; i++) {
						e++;
						this.imgGroup.push({
							name: 'img' + e,
							uri: ''
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
		//加载数据2
		pullData2: function(key) {
			if (key == 1) {
				var data = {
					//任务ID
					taskid: this.taskIDdata,
					//已领取任务的用户ID
					userid: this.uId
				};
			} else {
				var data = {
					//已领取任务ID（类似订单号）
					taskreceiveid: this.tid
				};
			}
			this.$api.apiPost('/TaskReceive/TaskInfo', '', data, 'post', (status, code, res) => {
				if (status) {
					this.detailsData = res.obj;
					var e = 0;
					for (var i = 0; i < this.detailsData.StepInfos.length; i++) {
						e++;
						this.imgGroup.push({
							name: 'img' + e,
							uri: ''
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
		//提交通过
		quertj: function() {
			this.tijil =false;
			this.blocking = false;
			if (this.ClickData) {
				this.ClickData = false;
				var data = {
					//已领取任务ID
					taskreceiveid: this.detailsData.Id,
					//是否通过（2通过，3不通过）
					ispass: 2
				};
				this.$api.apiPost('/TaskReceive/TaskTrial', '', data, 'post', (status, code, res) => {
					if (status) {
						this.ClickData = true;
						uni.setStorageSync('refreshData', 1);
						uni.showToast({
							title: '通过成功',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
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
		//结束任务
		jiesrw: function() {
			this.tkqux=false;
			this.blocking = false;
			if (this.ClickData) {
				this.ClickData = false;
				var data = {
					//任务ID
					taskid: this.taskIDdata
				};
				this.$api.apiPost('/TaskIssue/TaskOver', '', data, 'post', (status, code, res) => {
					if (status) {
						this.ClickData = true;
						uni.setStorageSync('refreshData', 1);
						uni.showToast({
							title: '结束成功',
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
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
		//立即支付
		lijiZF: function() {
			//保存投放数量
			this.$store.commit('bctfsl', this.detailsData.task_count);
			//保存投放单价
			this.$store.commit('bctfdj', this.detailsData.task_price);
			//保存支付金额
			this.$store.commit('payUsData', this.detailsData.IssueTaskMoney);
			//保存支付订单ID
			this.$store.commit('payData', this.detailsData.order_sn);
			//保存订单标题
			this.$store.commit('bctitle', this.detailsData.task_title);
			uni.navigateTo({
				url: '/pages/taskzx/confirm/confirm'
			});
		},
		//推荐任务-加速包购买
		speedF: function() {
			uni.navigateTo({
				url: '/pages/taskzx/speedzf/speedzf?id=' + this.taskIDdata
			});
		},
		//不通过
		jujueRW: function() {
			uni.navigateTo({
				//带上已领取任务ID
				url: '/pages/taskzx/downrw/downrw?id=' + this.detailsData.Id
			});
		},
		//举报
		complaintsYM: function() {
			uni.navigateTo({
				url: '/pages/taskzx/complaints/complaints?id=' + this.taskIDdata
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
				this.blocking = true;
				this.tijil = true;
			} else {
				this.blocking = false;
				this.tijil = false;
			}
		},
		//修改任务
		xiugRW: function() {
			uni.navigateTo({
				url: '/pages/task/fabutask/fabutask?id=' + this.taskIDdata + '&area=1'
			});
		},
		//再次发布
		zcfbF: function() {
			uni.navigateTo({
				url: '/pages/task/fabutask/fabutask?id=' + this.taskIDdata
			});
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

.nrmk {
	border-radius: 0;
}

.xuybaog2 {
	background-color: #fc6930;
}

.rwanniu2 {
	background-color: #fc6930;
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
/* CS3动画效果 */
.play6 {
	top: 50%;
	margin-top: -210upx;
	animation: play6 0.5s;
}

@keyframes play6 {
	from {
		top: -200%;
	}

	to {
		top: 50%;
		margin-top: -210upx;
	}
}

.implicit6 {
	top: -200%;
	animation: implicit6 1s;
}

@keyframes implicit6 {
	from {
		top: 50%;
		margin-top: -210upx;
	}

	to {
		top: -200%;
	}
}

/* CS3动画效果结束 */
</style>
