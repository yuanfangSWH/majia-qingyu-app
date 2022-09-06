<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" src="../../static/jiant.png" @click="returnData"></image>
			发布管理
			<view class="return5" @click="rwsm">任务说明</view>
		</view>
		<view class="zgshos">
			<view class="shous juzho">
				<image class="shous_img" src="../../static/shoutb1.png"></image>
				<input class="shous-input" type="text" v-model="searchData" @confirm="searchF" confirm-type="search" placeholder="请输入任务编号或任务关键字进行搜索" />
			</view>
		</view>
		<view class="zgldilx">
			<view class="biaotl juzho">
				<view class="biz">
					<view class="nroo" @click="xuanz(1)">
						<view class="bibt" :class="{ xuanzl: conditions == 1 }">未上线</view>
						<view class="tgdlj juzho" v-show="conditions==1"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(2)">
						<view class="bibt" :class="{ xuanzl: conditions == 2 }">进行中</view>
						<view class="tgdlj juzho" v-show="conditions==2"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(3)">
						<view class="bibt" :class="{ xuanzl: conditions == 3 }">已结束</view>
						<view class="tgdlj juzho" v-show="conditions==3"></view>
					</view>
				</view>
				<!-- <view class="biz">
					<view class="nroo" @click="xuanz(4)">
						<view class="bibt" :class="{ xuanzl: conditions == 4 }">待复审</view>
						<view class="tgdlj juzho" v-show="conditions==4"></view>
					</view>
				</view> -->
				<view class="biz">
					<view class="nroo" @click="xuanz(5)">
						<view class="bibt" :class="{ xuanzl: conditions == 5 }">被投诉</view>
						<view class="tgdlj juzho" v-show="conditions==5"></view>
					</view>
				</view>
				<view class="biz">
					<view class="nroo" @click="xuanz(6)">
						<view class="bibt" :class="{ xuanzl: conditions == 6 }">举报中</view>
						<view class="tgdlj juzho" v-show="conditions==6"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 未上线 -->
		<view v-if="conditions==1">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key" @click="jumpR(item.UnLineStatus,item.Id)">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.Headimg"></image>
						<view class="yonhm">{{item.Nickname}}</view>
						<view class="zbhwz">任务编号：{{item.Id}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos">任务单价：<text>{{item.TaskPrice}}</text>元</view>
							<view class="lingqsj" v-show="item.IsStartSpeed==1">加速余额：<text>{{item.SpeedMoney}}</text>元</view>
							<view class="lingqsj" v-show="item.UnLineStatus==1">原因：{{item.Rejectbec}}</view>
							<view class="lingqsj">发布时间：{{item.CreateTime}}</view>
						</view>
						<view class="rwmk2">
							<view class="jiaq" v-show="item.UnLineStatus==0" style="margin-bottom:44upx;">审核中</view>
							<view class="jiaq" v-show="item.UnLineStatus==1" style="margin-bottom:44upx;color: #F27669;">未通过</view>
							<view class="jiaq" v-show="item.UnLineStatus==2" style="margin-bottom:44upx;">待支付</view>
							<view class="tijrwan" v-show="item.UnLineStatus==1" @click.stop="jumpR(1,item.Id)">修改任务</view>
							<view class="tijrwan" v-show="item.UnLineStatus==2" @click.stop="jumpR(2,item.Id)">立即支付</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 进行中 -->
		<view v-if="conditions==2">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key" @click="jumpR(3,item.Id)">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.Headimg"></image>
						<view class="yonhm">{{item.Nickname}}</view>
						<view class="zbhwz">任务编号：{{item.Id}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos">剩余数量：<text>{{item.TaskOverCount}}/{{item.TaskCount}}</text></view>
							<!-- <view class="lingqsj">浏览次数：<text>{{item.BrowseCount}}</text></view> -->
							<view class="lingqsj" v-show="item.IsStartSpeed==1">加速余额：<text>{{item.SpeedMoney}}</text></view>
							<view class="lingqsj">审核时间：<text>{{item.AuditTime}}</text></view>

						</view>
						<view class="rwmk2">
							<view class="jiaq" style="margin-bottom:44upx;"></view>
							<view class="tijrwan" v-if="item.SpeedMoney==0" @click.stop="speedF(item.Id)">上热门</view>
						</view>
					</view>
					<view class="sanftx" v-if="item.ReceiveStatus!=''&&item.ReceiveStatus!=null">
						<view class="blzw" :class="{ choosewz: conditions2 == 1 }">待审核{{item.ReceiveStatus[1]}}个</view>
						<view class="blzw">待提交{{item.ReceiveStatus[0]}}个</view>
						<view class="blzw">已通过{{item.ReceiveStatus[2]}}个</view>
						<view class="blzw">未通过{{item.ReceiveStatus[3]}}个</view>
					</view>
					<view class="wsmzhal juzho" @click.stop="chakgd(item.Id)">
						<view class="bljy">展开</view>
						<image class="yaymim" src="../../static/zkaic1.png"></image>
					</view>
					<!-- <view v-if="zaikData[key]!=''&&zaikData[key]!=null">
						<view class="wsmzhal juzho" v-show="zaikData[key].judgeId==0" @click.stop="chakgd(item.Id,key)">
							<view class="bljy">展开</view>
							<image class="yaymim" src="../../static/zkaic1.png"></image>
						</view>
						<view class="wsmzhal juzho" v-show="zaikData[key].judgeId==1" @click.stop="xialGB(key)">
							<view class="bljy">收起</view>
							<image class="yaymim" src="../../static/zkaic2.png"></image>
						</view>
						<view class="leitwb" v-show="zaikData[key].judgeId==1">
							<view class="yonhjb" v-for="(theit,index) in zaikData[key].neir" :key="index">
								<view class="zhiyqmjbtx">
									<image :src="theit.Headimgurl"></image>
								</view>
								<view class="symjwz1">{{theit.Nickname}}</view>
								<view class="symjwz2"><text v-show="conditions2 == 0">待提交</text><text v-show="conditions2 == 1">待审核</text><text
									 v-show="conditions2 == 2">已通过</text><text v-show="conditions2 == 3">未通过</text></view>
								<view class="symjwz3" @click.stop="jumpR2(5,item.Id,theit.Id)" v-if="conditions2 == 1">马上审核</view>
								<view class="symjwz3" @click.stop="tonycts" v-else>联系用户</view>
							</view>
							<view class="zhanwnull" v-show="zaikData[key].neir==''||zaikData[key].neir==null">暂无用户数据~</view>
							<view class="ckadjiae" v-show="zaikData[key].neir!=''&&zaikData[key].neir!=null" @click.stop="chakgd(item.Id,conditions2)">查看更多用户</view>
						</view>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 已结束 -->
		<view v-if="conditions==3">
			<view class="zhuylbmk juzho" v-for="(item,key) in valueData" :key="key">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.Headimg"></image>
						<view class="yonhm">{{item.Nickname}}</view>
						<view class="zbhwz">任务编号：{{item.Id}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos">剩余数量：<text>{{item.TaskOverCount}}/{{item.TaskCount}}</text></view>
							<!-- <view class="lingqsj">浏览次数：<text>{{item.BrowseCount}}</text></view> -->
							<view class="lingqsj">审核时间：<text>{{item.AuditTime}}</text></view>
						</view>
						<view class="rwmk2">
							<view class="jiaq" style="margin-bottom:44upx;"></view>
							<view class="tijrwan" @click="jumpR(4,item.Id)">重新上架</view>
						</view>
					</view>
					<!-- <view class="sanftx">
						<view class="blzw">任务总数{{item.TaskCount}}个</view>
						<view class="blzw">完成数量{{item.TaskSuccessCount}}个</view>
						<view class="blzw">剩余数量{{item.TaskOverCount}}个</view>
					</view> -->
					<view class="sanftx" v-if="item.ReceiveStatus!=''&&item.ReceiveStatus!=null">
						<view class="blzw" :class="{ choosewz: conditions2 == 1 }">待审核{{item.ReceiveStatus[1]}}个</view>
						<view class="blzw">待提交{{item.ReceiveStatus[0]}}个</view>
						<view class="blzw">已通过{{item.ReceiveStatus[2]}}个</view>
						<view class="blzw">未通过{{item.ReceiveStatus[3]}}个</view>
					</view>
					<view class="wsmzhal juzho" @click.stop="chakgd(item.Id)">
						<view class="bljy">展开</view>
						<image class="yaymim" src="../../static/zkaic1.png"></image>
					</view>
				</view>
			</view>
		</view>
		<!--  待复审 -->
		<view v-if="conditions==4" v-for="(item,key) in valueData" :key="key">
			<view class="zhuylbmk juzho">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.HeadImg"></image>
						<view class="yonhm">{{item.NickName}}</view>
						<view class="zbhwz">任务编号：{{item.TaskId}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos">请在<text>{{item.TrialOutTime}}</text>前完成审核</view>
							<view class="lingqsj">提交时间：<text>{{item.ReceiveAudit}}</text></view>
						</view>
						<view class="rwmk2">
							<view class="jiaq" style="margin-bottom:0upx;"></view>
							<view class="tijrwan" @click="jumpR3(5,item.Id)">重新审核</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 被投诉 -->
		<view v-if="conditions==5" v-for="(item,key) in valueData" :key="key">
			<view class="zhuylbmk juzho">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.HeadImg"></image>
						<view class="yonhm">{{item.NickName}}</view>
						<view class="zbhwz">任务编号：{{item.TaskId}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos2">原因：{{item.ReportBecause}}</view>
							<!-- <view class="zgsmiaos" v-show="item.IsWaitReply==0&&item.IsReportSuccess==0" >请在<text>{{item.TrialOutTime}}</text>前完成审核</view> -->
							<view class="zgsmiaos" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0">等待客服处理<text></text></view>
							<view class="zgsmiaos" v-show="item.IsReportSuccess==2"><text>您所提交的资料符合事实，您已胜诉</text></view>
							<view class="zgsmiaos" v-show="item.IsReportSuccess==1"><text>您所提交的资料不符合事实，您已败诉</text></view>
							<view class="lingqsj">投诉时间：<text>{{item.ReportTime}}</text></view>
						</view>
						<view class="rwmk2">
							<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
							<!-- <view class="tijrwan" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0" style="background-color: #C8C8C8;">等待答复</view>
							<view class="tijrwan" v-show="item.IsWaitReply==0&&item.IsReportSuccess==0" @click="pleaF(item.Id)">立刻处理</view>
							<view class="tijrwan" v-show="item.IsReportSuccess!=0" style="background-color: #C8C8C8;">处理结果</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 举报中 -->
		<view v-if="conditions==6" v-for="(item,key) in valueData" :key="key">
			<view class="zhuylbmk juzho">
				<view class="gundmk">
					<view class="rwbh">
						<image class="yhigm" :src="item.HeadImg"></image>
						<view class="yonhm">{{item.NickName}}</view>
						<view class="zbhwz">任务编号：{{item.TaskId}}</view>
					</view>
					<view class="dnrmk">
						<view class="rwmk1">
							<view class="rwms">{{item.TaskTitle}}</view>
							<view class="zgsmiaos2">原因：{{item.ReportBecause}}</view>
							<view class="zgsmiaos" v-show="item.IsWaitReply==1&&item.IsReportSuccess==0">等待客服处理<text></text></view>
							<view class="zgsmiaos" v-show="item.IsReportSuccess==2"><text>您所提交的资料符合事实，您已胜诉</text></view>
							<view class="zgsmiaos" v-show="item.IsReportSuccess==1"><text>您所提交的资料不符合事实，您已败诉</text></view>
							<view class="lingqsj">举报时间：<text>{{item.ReportTime}}</text></view>
						</view>
						<view class="rwmk2">
							<view class="jiaq">+{{item.TaskPrice}}<text>元</text></view>
							<!-- <view class="tijrwan" v-show="item.IsWaitReply==0" @click="pleaF(item.Id)">立即处理</view>
							<view class="tijrwan" v-show="item.IsWaitReply==1" style="background-color: #C8C8C8;">等待答复</view>
							<view class="tijrwan" v-show="item.IsReportSuccess!=0" style="background-color: #C8C8C8;">处理结果</view> -->
						</view>
					</view>
				</view>
			</view>
		</view>


		<view class="zgsweik" v-show="jiliunll">
			<image class="fuzdtp1 juzho" src="../../static/jilwk2.png"></image>
			<view class="weikms">暂时没有接单任务~</view>
		</view>
		<view style="width: 100%;height: 90upx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中的分类
				conditions: 1,
				//调用数据用的分类
				dioyonID: 0,
				//更变状态1
				change1: 1,
				//更变状态2
				change2: 1,
				//没有数据
				jiliunll: false,
				//数据
				valueData: "",
				//最后一列的ID
				page: 0,
				//选择的分类2
				conditions2: 1,
				//搜索关键字
				searchData: "",
				//展开下拉数据
				zaikData: []
			}
		},
		onShow() {
			var refreshData = uni.getStorageSync('refreshData');
			if (refreshData == 1) {
				uni.setStorageSync('refreshData', 2);
				this.page = 0;
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
			//通用提示方法
			tonycts: function() {
				uni.showToast({
					title: "暂未开放，敬请期待",
					icon: 'none',
					duration: 3000
				});
			},
			//点击搜索关键字
			searchF: function() {
				this.page = 0;
				this.pullData();
			},
			//选择分类
			xuanz: function(id) {
				this.conditions = id;
				//初始化
				this.zaikData = [];
				this.page = 0;
				this.pullData();
			},
			//加载数据
			pullData: function() {
				var data = {
					//订单状态ID（1待上线，2进行中，3已结束，4待复审，5被投诉，6举报中）
					stateid: this.conditions,
					//最后一行的ID
					lastid: this.page,
					//一次多少条数据
					count: 10,
					//搜索关键字
					key: this.searchData
				};
				this.$api.apiPost('/TaskIssue/TaskListScreen', "", data, 'post', (status, code, res) => {
					if (status) {
						//判断是否是下拉刷新数据
						if (this.page == 0) {
							this.valueData = res.obj;
							if(res.obj == ""){
								this.jiliunll=true;
							}else{
								this.jiliunll=false;
							}
							//计算状态为2就进行下拉数据计算存储
							// if (this.conditions == 2) {
							// 	for (var i = 0; i < res.obj.length; i++) {
							// 		this.zaikData.push({
							// 			judgeId: 0,
							// 			neir: []
							// 		})
							// 	}
							// }
						} else {
							if (res.obj == "") {
								uni.showToast({
									title: "已经没有更多数据了",
									icon: 'none',
									duration: 2000
								});
							} else {
								this.valueData = this.valueData.concat(res.obj);
								//计算状态为2就进行下拉数据计算存储
								if (this.conditions == 2) {
									var group = [];
									for (var i = 0; i < this.valueData.length; i++) {
										group.push({
											judgeId: 0,
											neir: []
										})
									}
									this.zaikData = this.zaikData.concat(group);
								}
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
			//展开
			anRW: function(id, key) {
				var data = {
					//订单ID
					taskid: id,
					//状态 0待提交，1待审核，2已通过，3未通过
					stateid: this.conditions2,
					//最后一行的ID
					lastid: 0,
					//一次多少条数据
					count: 5
				};
				this.$api.apiPost('/TaskIssue/IngDetails', "", data, 'post', (status, code, res) => {
					if (status) {
						this.zaikData[key].neir = res.obj;
						this.zaikData[key].judgeId = 1;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//展开关闭
			xialGB: function(key) {
				this.zaikData[key].neir = "";
				this.zaikData[key].judgeId = 0;
			},
			//选择分类2(废弃)
			xuanz2: function(id, key, type) {
				this.conditions2 = type;
				if (this.zaikData[key].judgeId == 1) {
					this.anRW(id, key);
				}
			},
			//跳转到任务详情页
			jumpR: function(area, id) {
				uni.navigateTo({
					url: '/pages/taskzx/rwdetails/rwdetails?area=' + area + '&id=' + id
				});
			},
			//跳转到任务详情页-审核用户
			jumpR2: function(area, id, uid) {
				uni.navigateTo({
					url: '/pages/taskzx/rwdetails/rwdetails?area=' + area + '&id=' + id + "&uid=" + uid
				});
			},
			//跳转到任务详情页-复审核
			jumpR3: function(area, tid) {
				uni.navigateTo({
					url: '/pages/taskzx/rwdetails/rwdetails?area=' + area + '&tid=' + tid
				});
			},
			//查看更多用户
			chakgd: function(id, conditions) {
				uni.navigateTo({
					url: '/pages/taskzx/allyh/allyh?id=' + id
				});
			},
			//辩诉/举报
			pleaF: function(id) {
				uni.navigateTo({
					url: '/pages/wdtask/pleadetails/pleadetails?id=' + id
				});
			},
			//推荐任务-加速包购买
			speedF: function(id) {
				uni.navigateTo({
					url: '/pages/taskzx/speedzf/speedzf?id=' + id
				});
			},
			//任务说明
			rwsm:function(){
				uni.navigateTo({
					url: '/pages/agreement/rwsm/rwsm'
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
	@import '../../common/css/taskzx.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
</style>
