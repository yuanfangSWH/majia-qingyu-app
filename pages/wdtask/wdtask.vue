<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zgshos">
			<view class="shous juzho">
				<image class="shous_img" src="../../static/shoutb1.png"></image>
				<input class="shous-input" type="text" v-model="searchData" @confirm="searchF" confirm-type="search" placeholder="请输入任务编号或任务关键字进行搜索" />
			</view>
		</view>
		<view class="zgldilx">
			<view class="biaotl juzho">
				<view class="biz">
					<view class="nroo" @click="xuanz(0)">
						<view class="bibt" :class="{ xuanzl: conditions == 0 }">待提交</view>
						<view class="tgdlj juzho" v-show="conditions==0"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(1)">
						<view class="bibt" :class="{ xuanzl: conditions == 1 }">待审核</view>
						<view class="tgdlj juzho" v-show="conditions==1"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(2)">
						<view class="bibt" :class="{ xuanzl: conditions == 2 }">已完成</view>
						<view class="tgdlj juzho" v-show="conditions==2"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(3)">
						<view class="bibt" :class="{ xuanzl: conditions == 3 }">未通过</view>
						<view class="tgdlj juzho" v-show="conditions==3"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(4)">
						<view class="bibt" :class="{ xuanzl: conditions == 4 }">被举报</view>
						<view class="tgdlj juzho" v-show="conditions==4"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(5)">
						<view class="bibt" :class="{ xuanzl: conditions == 5 }">投诉中</view>
						<view class="tgdlj juzho" v-show="conditions==5"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 待提交 -->
		<view v-if="conditions==0">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos" v-show="item.IsTimeOut==0">审核截止日期：<text>{{item.ReceiveTimeoutAt}}</text></view>
									<view class="zgsmiaos" v-show="item.IsTimeOut==1"><text>任务已超时请重新领取任务</text></view>
									<view class="lingqsj">领取时间：{{item.ReceiveTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
								</view>
							</view>
							<view class="xindanwz">
								<view class="fqingb">
									<view class="tijrwan2" v-show="item.IsTimeOut==0" @click="tkquxmk(1,item.Id)">放弃任务</view>
									<view class="tijrwan3" v-show="item.IsTimeOut==0" @click="jumpR(item.TaskId)">提交验证</view>
									<view class="tijrwan3" v-show="item.IsTimeOut==1" @click="jumpR(item.TaskId)">重新领取</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<!-- 待审核 -->
		<view v-if="conditions==1">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv" @click="jumpR(item.TaskId)">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos">任务正在审核中请耐心等待</view>
									<view class="lingqsj">领取时间：{{item.ReceiveTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
									<view class="tijrwan juzho" @click.stop="tixiajts">提醒审核</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 已完成 -->
		<view v-if="conditions==2">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos">任务已经完成</view>
									<view class="lingqsj">领取时间：{{item.ReceiveTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
									<view class="tijrwan juzho" v-show="item.IsComent==0" style="background-color: #C8C8C8;" >已完成</view>
									<view class="tijrwan juzho" v-show="item.IsComent==1" style="background-color: #C8C8C8;">已完成</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 未通过 -->
		<view v-if="conditions==3">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos">原因：{{item.NopassBecause}}</view>
									<view class="lingqsj">拒绝时间：{{item.AuditTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
								</view>
							</view>
							<view class="xindanwz">
								<view class="fqingb">
									<view class="tijrwan2" @click="complaintsYM(item.Id)">我要投诉</view>
									<view class="tijrwan3" v-show="item.IsThreeSubmit==0" @click="jumpR(item.TaskId)">提交复审</view>
									<view class="tijrwan3" v-show="item.IsThreeSubmit==1" @click="applyforF">联系客服</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 被举报 -->
		<view v-if="conditions==4">
			<view class="zhuylbmk juzho" style="height: 256upx;" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos">原因：{{item.ReportBecause}}</view>
									<view class="zgsmiaos" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0">等待客服处理<text></text></view>
									<view class="zgsmiaos" v-show="item.IsReportSuccess==1"><text>您所提交的资料符合事实，您已胜诉</text></view>
									<view class="zgsmiaos" v-show="item.IsReportSuccess==2"><text>您所提交的资料不符合事实，商家已胜诉</text></view>
									<view class="lingqsj">举报时间：{{item.ReportTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
									<!-- <view class="tijrwan juzho" v-show="item.IsWaitReply==0&&item.IsReportSuccess==0" @click="pleaF(item.Id)">立刻处理</view>
									<view class="tijrwan juzho" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0" style="background-color: #C8C8C8;">等待答复</view>
									<view class="tijrwan juzho" v-show="item.IsReportSuccess==1||item.IsReportSuccess==2" style="background-color: #C8C8C8;">处理结果</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 投诉中 -->
		<view v-if="conditions==5">
			<view class="zhuylbmk juzho" style="height: 260upx;" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="temdnd">
						<view class="rwdiv">
							<view class="rwbh">
								<image class="yhigm" :src="item.HeadImg"></image>
								<view class="yonhm">{{item.NickName}}</view>
								<view class="zbhwz">任务编号：{{item.TaskId}}</view>
							</view>
							<view class="dnrmk">
								<view class="rwmk1">
									<view class="rwms">{{item.TaskTitle}}</view>
									<view class="zgsmiaos">原因：{{item.ReportBecause}}</view>
									<view class="zgsmiaos" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0">等待客服处理<text></text></view>
									<!-- <view class="zgsmiaos" v-show="item.IsWaitReply==0&&item.IsReportSuccess!=1&&item.IsReportSuccess!=2">请在日期内辩诉：<text>{{item.PleaOutTime}}</text></view> -->
									<view class="zgsmiaos" v-show="item.IsReportSuccess==1"><text>您所提交的资料符合事实，您已胜诉</text></view>
									<view class="zgsmiaos" v-show="item.IsReportSuccess==2"><text>您所提交的资料不符合事实，商家已胜诉</text></view>
									<view class="lingqsj">投诉时间：{{item.ReportTime}}</view>
								</view>
								<view class="rwmk2">
									<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
									<!-- <view class="tijrwan juzho" v-show="item.IsWaitReply==0&&item.IsReportSuccess==0" @click="pleaF(item.Id)">立刻处理</view>
									<view class="tijrwan juzho" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0" style="background-color: #C8C8C8;">等待答复</view>
									<view class="tijrwan juzho" v-show="item.IsReportSuccess==1||item.IsReportSuccess==2" style="background-color: #C8C8C8;">处理结果</view> -->
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</view>
		<view class="zgsweik" v-show="jiliunll">
			<image class="fuzdtp1 juzho" src="../../static/jilwk1.png"></image>
			<view class="weikms">暂时没有接单任务~</view>
		</view>
		<view style="width: 100%;height: 90upx;"></view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 取消任务弹框 -->
		<view class="tijiatk" v-show="tkqux">
			<view class="querwz1">取消任务后将不能再重新领取<br>请确认是否放弃</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tkquxmk(2)">我再想想</view>
				<view class="nbdulan" @click="querquxrw()">确认放弃</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "我的任务",
				//返回图片路径
				path: "../../static/jiant.png",
				//是否显示遮罩
				blocking: false,
				//是否关闭取消弹框
				tkqux: false,
				//选中的分类
				conditions: 0,
				//更变状态1
				change1: 1,
				//更变状态2
				change2: 1,
				//没有数据
				jiliunll: false,
				//数据
				valueData: [],
				//最后一列的ID
				page: 0,
				//当前任务的ID
				taskIDdata: "",
				//搜索关键字
				searchData: ""
			}
		},
		onShow() {
			var refreshData = uni.getStorageSync('refreshData');
			if (refreshData == 1) {
				uni.setStorageSync('refreshData', 2);
				this.page =0;
				this.pullData();
			}
		},
		onLoad(option) {
			if (option.id) {
				this.conditions = option.id;
			}
			this.pullData();
		},
		//下拉刷新
		onPullDownRefresh() {
			this.page = 0;
			this.searchData = "";
			this.pullData();
			uni.stopPullDownRefresh();
		},
		//上拉加载
		onReachBottom() {
			this.pullData();
		},
		methods: {
			//点击搜索关键字
			searchF: function() {
				this.page = 0;
				this.pullData();
			},
			//加载数据
			pullData: function() {
				var data = {
					//订单状态ID（0待提交，1待审核，2已完成，3未通过，4被举报，5投诉中）
					state: this.conditions,
					//最后一行的ID
					lastid: this.page,
					//一次多少条数据
					count: 10,
					//搜索关键字
					key: this.searchData
				};
				this.$api.apiPost('/TaskReceive/TaskList', "", data, 'post', (status, code, res) => {
					if (status) {
						//判断是否是下拉刷新数据
						if (this.page == 0) {
							this.valueData = res.obj;
							if(res.obj == ""){
								this.jiliunll=true;
							}else{
								this.jiliunll=false;
							}
						} else {
							if (res.obj == "") {
								uni.showToast({
									title: "已经没有更多数据了",
									icon: 'none',
									duration: 2000
								});
							} else {
								this.valueData = this.valueData.concat(res.obj);
							}
						}
						if (this.valueData != "") {
							this.page = this.valueData[this.valueData.length - 1].Id;
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
			//选择分类
			xuanz: function(id) {
				this.conditions = id;
				//初始化最后一行的ID
				this.page = 0;
				this.pullData();
			},
			//任务详情-领取任务(废弃)
			dianjirw: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			},
			//跳转到任务详情页
			jumpR: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			},
			//辩诉/举报
			pleaF: function(id) {
				uni.navigateTo({
					url: '/pages/wdtask/pleadetails/pleadetails?id=' + id
				});
			},
			//提醒审核
			tixiajts: function() {
				uni.showToast({
					title: "提醒审核成功",
					icon: 'none',
					duration: 3000
				});
			},
			//投诉
			complaintsYM: function(id) {
				uni.navigateTo({
					url: '/pages/wdtask/complaints/complaints?id=' + id
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
						uni.showToast({
							title: "取消成功",
							icon: 'none',
							duration: 2000
						});
						//初始化页码ID
						this.page =0;
						this.pullData();
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
			tkquxmk: function(value, id) {
				if (value == 1) {
					this.taskIDdata = id;
					this.blocking = true;
					this.tkqux = true;
				} else {
					this.blocking = false;
					this.tkqux = false;

				}
			},
			//联系客服
			applyforF: function() {
				uni.navigateTo({
					url: '/pages/applyfor/applyfor'
				});
			}
		}
	}
</script>

<style>
	@import '../../common/css/wdtask.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
</style>
