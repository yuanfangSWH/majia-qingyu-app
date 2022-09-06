<template>
	<view>
		<Home
			v-show="selected == 1"
			:classification="classification"
			:conditionsGD="conditionsGD"
			:orderData="orderData"
			:widthData1="widthData1"
			:hotData="hotData"
			:widthData2="widthData2"
			:allhomeData="allhomeData"
			:HomeData="HomeData"
			:there="there"
			:there1="there1"
			v-on:chooseData="chooseData"
			v-on:mobileXi="mobileXi"
			:BannerData="BannerData"
			:messageData="messageData"
			v-on:orderF="orderF"
		></Home>
		<Recommended
			v-show="selected == 2"
			:hotData2="hotData2"
			:hotData3="hotData3"
			:there2="there2"
			:noteNULL="noteNULL"
			:noteNULL2="noteNULL2"
			:guanData="guanData"
			:recommendedData="recommendedData"
			v-on:gzflData="gzflData"
			v-on:yonMY="yonMY"
		></Recommended>
		<Message
			v-show="selected == 3"
			:SmallAssistant="SmallAssistant"
			:IssueTaskMsg="IssueTaskMsg"
			:ReceiveTaskMsg="ReceiveTaskMsg"
			:SysMsg="SysMsg"
			:information="information"
		></Message>
		<Personal v-show="selected == 4" :userData="userData"></Personal>
		<view class="navigation">
			<view class="navdiv" @click="Selected(1)">
				<image class="daoha_img juzho" src="../../static/shou1.png" v-show="selected != 1"></image>
				<image class="daoha_img juzho" src="../../static/shou2.png" v-show="selected == 1"></image>
				<view class="daoha" :class="{ selected: selected == 1 }">首页</view>
			</view>
			<view class="navdiv" @click="Selected(2)">
				<image class="daoha_img juzho" src="../../static/tuij1.png" v-show="selected != 2"></image>
				<image class="daoha_img juzho" src="../../static/tuij2.png" v-show="selected == 2"></image>
				<view class="daoha" :class="{ selected: selected == 2 }">推荐</view>
			</view>
			<view class="fabu" @click="fbrw">
				<image class="daohb_img" src="../../static/fab.png"></image>
				<view class="daohb">发布</view>
			</view>
			<view class="navdiv" @click="Selected(3)">
				<image class="daoha_img juzho" src="../../static/xiao1.png" v-show="selected != 3"></image>
				<image class="daoha_img juzho" src="../../static/xiao2.png" v-show="selected == 3"></image>
				<view class="daoha" :class="{ selected: selected == 3 }">消息</view>
			</view>
			<view class="navdiv" @click="Selected(4)">
				<image class="daoha_img juzho" src="../../static/wod1.png" v-show="selected != 4"></image>
				<image class="daoha_img juzho" src="../../static/wod2.png" v-show="selected == 4"></image>
				<view class="daoha" :class="{ selected: selected == 4 }">我的</view>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 发布任务提示弹框 -->
		<view class="fatkdiv" v-show="fabtk" :class="{ play: isActive1, implicit: isActive2 }">
			<image class="fbxzxli" @click="vipFB(2)" src="../../static/xzx.png"></image>
			<view class="farbt">发布任务</view>
			<image class="fadlogo juzho" src="../../static/logo.png"></image>
			<view class="famiaos juzho">为保障轻鱼平台用户在内侧期间的合法权益和产品体验发布任务功能目前仅对会员开放！</view>
			<view class="swhz">商务合作：2913740472</view>
			<view style="width: 100%;height: 20upx;background-color: #F8F8F8;margin-bottom: 26upx;"></view>
			<view class="fbtanzw juzho" @click="ktvip">立即开通</view>
		</view>
		<!-- 悬赏弹框 -->
		<view class="fendiv" v-if="xuanstk == 1">
			<image class="fenx_img" src="../../static/xuantb.png"></image>
			<view class="zgsdanr juzho">
				<view class="touxdiv juzho">
					<image class="zhestoux" :src="ArewardData.headImg"></image>
					<image class="zhesvvv" v-show="ArewardData.is_vip == 1" src="../../static/v.png"></image>
				</view>
				<view class="wlti1">{{ ArewardData.task_title }}</view>
				<view class="wlti2">你有任务待完成</view>
				<view class="wlti3">
					+
					<text>{{ ArewardData.task_price }}</text>
					元
				</view>
				<view class="tankan juzho" @click="dianjirw2(ArewardData.task_id)">立即查看</view>
			</view>
			<image class="gnyy_img" src="../../static/xfqx.png" @click="gbxsTK"></image>
		</view>
	</view>
</template>

<script>
//首页
import Home from '@/pages/home/home';
//推荐
import Recommended from '@/pages/recommended/recommended';
//消息
import Message from '@/pages/message/message';
//我的
import Personal from '@/pages/personal/personal';
export default {
	components: {
		Home,
		Recommended,
		Message,
		Personal
	},
	data() {
		return {
			//导航栏选择
			selected: 1,
			//分类数据
			classification: [],
			//分类模块宽度
			widthData1: '0',
			//新人秒赚数据
			hotData: '',
			//热门模块宽度
			widthData2: '0',
			//为你推荐任务数据
			HomeData: '',
			//按分类-任务数据
			allhomeData: '',
			//首页码数
			page1: 1,
			//首页总页数
			total1: 1,
			//热门码数
			page2: 1,
			//热门总页数
			total2: 1,
			//关注码数
			page3: 1,
			//关注总页数
			total3: 1,
			//高价码数
			page4: 1,
			//高价总页数
			total4: 1,
			//首页是否没有数据
			there: 0,
			//首页是否已经数据触底
			there1: 0,
			//推荐页是否已经数据触底
			there2: 0,
			//首页选中的分类
			conditions: 0,
			//首页固定分类
			conditionsGD: 12,
			//分类筛选条件2
			orderData: 0,
			//推荐页面热门任务数据
			hotData2: '',
			//推荐页面高价任务数据
			hotData3: '',
			//推荐页面兴趣用户推荐数据
			recommendedData: '',
			//推荐页选中的分类
			conditions2: 1,
			//轻鱼小助手数据
			SmallAssistant: '',
			//发布通知数据
			IssueTaskMsg: '',
			//任务通知数据
			ReceiveTaskMsg: '',
			//系统通知数据
			SysMsg: '',
			//消息数据
			information: '',
			//关注的用户为空
			noteNULL: 0,
			//热门/高级为空
			noteNULL2: 0,
			//关注用户数据
			guanData: '',
			//用户数据
			userData: '',
			//Banner数据
			BannerData: '',
			//公告消息数据
			messageData: '',
			//首页悬赏弹框数据
			ArewardData: '',
			//悬赏弹框显示
			xuanstk: 0,
			//通用遮罩-
			blocking: false,
			//发布弹框显示/关闭
			fabtk: false,
			//CSS3动画样式1
			isActive1: false,
			//CSS3动画样式2
			isActive2: false
		};
	},
	//显示是加载
	onShow() {
		if (this.xuanstk == 0) {
			this.blocking = false;
		}
		this.fabtk = false;
		if (Number(this.selected) == 4) {
			//更新用户数据
			this.loadingUser();
		}
	},
	//监听页面加载
	onLoad(option) {
		var bannerList = this.$store.state.HibData;
		if (bannerList == '') {
			this.loadingHiB();
		}
		if (option.location) {
			this.selected = option.location;
		}
		switch (Number(this.selected)) {
			case 1:
				//加载公告消息
				this.messageF();
				//检查是否需要弹框
				this.ArewardF();
				break;
			case 2:
				if (this.conditions2 == 1) {
					//推荐页面获取热门任务
					this.tuijieData1();
				} else if (this.conditions2 == 2) {
					//推荐页面获取高价任务
					this.yourData();
				} else if (this.conditions2 == 3) {
					//加载关注用户的数据
					this.guanzhuData();
				}
				break;
			case 3:
				//加载消息数据
				this.informationData();
				break;
			case 4:
				//加载邀请好友页面数据
				this.InvitationData();
				break;
		}
	},
	//下拉刷新
	onPullDownRefresh() {
		switch (Number(this.selected)) {
			case 1:
				this.page1 = 1;
				if (this.conditionsGD == 12) {
					//加载热门任务
					this.homeData2();
				} else {
					this.orderData = 0;
					//分类任务数据
					this.homeData3();
				}
				uni.stopPullDownRefresh();
				break;
			case 2:
				if (this.conditions2 == 1) {
					this.page2 = 1;
					//推荐页面获取热门任务
					this.tuijieData1();
					uni.stopPullDownRefresh();
				} else if (this.conditions2 == 2) {
					this.page4 = 1;
					//推荐页面获取高价任务
					this.yourData();
					uni.stopPullDownRefresh();
				} else if (this.conditions2 == 3) {
					this.page3 = 1;
					//加载关注用户的数据
					this.guanzhuData();
					uni.stopPullDownRefresh();
				}
				break;
			case 3:
				//加载消息数据
				this.informationData();
				uni.stopPullDownRefresh();
				break;
			case 4:
				//加载邀请好友页面数据
				this.InvitationData();
				//更新用户数据
				this.loadingUser();
				uni.stopPullDownRefresh();
				break;
		}
	},
	//上拉加载
	onReachBottom() {
		switch (Number(this.selected)) {
			case 1:
				if (this.page1 * 10 < this.total1) {
					this.page1++;
					this.there1 = 0;
					if (this.conditionsGD == 12) {
						this.HomeTJ();
					} else {
						this.homeData3();
					}
				} else {
					//判断是否没有分页数据了
					this.there1 = 1;
				}
				break;
			case 2:
				if (this.conditions2 == 1) {
					if (this.page2 * 12 < this.total2) {
						this.page2++;
						this.noteNULL2 = 0;
						//推荐页面获取热门任务
						this.tuijieData1();
					} else {
						//判断是否没有分页数据了
						this.there2 = 1;
					}
				} else if (this.conditions2 == 2) {
					if (this.page4 * 12 < this.total2) {
						this.page4++;
						this.noteNULL2 = 0;
						//推荐页面获取高价任务
						this.yourData();
					} else {
						//判断是否没有分页数据了
						this.there2 = 1;
					}
				} else if (this.conditions2 == 3) {
					if (this.page3 * 12 < this.total3) {
						this.page3++;
						this.noteNULL = 0;
						//加载关注用户的数据
						this.guanzhuData();
					} else {
						if (this.noteNULL == 0) {
							//判断是否没有分页数据了
							this.there2 = 1;
						}
					}
				}
				break;
		}
	},
	methods: {
		//加载海报数据
		loadingHiB: function() {
			this.$api.apiPost('/UserFollowInfo/AddFriends', '', '', 'post', (status, code, res) => {
				if (status) {
					var bannerList = [];
					for (var i = 0; i < res.obj.length; i++) {
						bannerList.push({
							picture: res.obj[i]
						});
					}
					//把邀请好友海报数据存入VUEX
					this.$store.commit('HibSave', bannerList);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//检查是否需要在首页显示悬赏任务弹框
		ArewardF: function() {
			this.ArewardData = this.$store.state.Areward;
			if (this.ArewardData.is_alert == '') {
				this.$api.apiPost('/Home/IsAlert', '', '', 'post', (status, code, res) => {
					if (status) {
						//把悬赏弹框信息存入VUEX
						this.$store.commit('ArewardBC', res.obj);
						//从VUEX获取到悬赏弹框数据
						this.ArewardData = this.$store.state.Areward;
						if (this.ArewardData.is_alert == 1) {
							this.xuanstk = 1;
							this.blocking = true;
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			} else if (this.ArewardData.is_alert == 0) {
				this.xuanstk = 0;
				this.blocking = false;
			}
		},
		//加载Banner数据（废弃）
		BannerF: function() {
			this.$api.apiPost('/Home/BannerList', '', '', 'post', (status, code, res) => {
				if (status) {
					this.BannerData = res.obj.arr;
					//加载公告消息
					this.messageF();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载消息数据
		messageF: function() {
			this.$api.apiPost('/Home/Notice', '', '', 'post', (status, code, res) => {
				if (status) {
					this.messageData = res.obj;
					//加载任务分类
					this.homeData1();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载任务分类
		homeData1: function() {
			this.$api.apiPost('/taskissue/gettasktypelist', '', '', 'post', (status, code, res) => {
				if (status) {
					this.classification = this.classification.concat(res.obj);
					this.widthData1 = this.classification.length * 150 + 200;
					this.homeData2();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//获取新人秒赚任务
		homeData2: function() {
			var data = {
				//页码
				pageindex: 1,
				//需要多少条数据
				pagecount: 10
			};
			this.$api.apiPost('/Home/GetNewPeoplesMake', '', data, 'post', (status, code, res) => {
				if (status) {
					this.hotData = res.obj.data;
					this.widthData2 = this.hotData.length * 250;
					this.HomeTJ();
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//首页-为你推荐
		HomeTJ: function() {
			var data = {
				//页码
				pageindex: this.page1,
				//需要多少条数据
				pagecount: 10
			};
			this.$api.apiPost('/Home/GetTaskByLowBrowse', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total1 = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page1 == 1) {
						this.HomeData = res.obj.data;
						//判断是否数据为空
						if (res.obj.data != '') {
							this.there = 0;
						} else {
							this.there = 1;
						}
					} else {
						this.HomeData = this.HomeData.concat(res.obj.data);
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
		//获取任务列表根据任务类型
		homeData3: function() {
			var data = {
				//分类
				tasktype: this.conditions,
				//分类条件
				order: this.orderData,
				//页码
				pageindex: this.page1,
				//需要多少条数据
				pagecount: 10
			};
			this.$api.apiPost('/Home/GetTaskListByType', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total1 = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page1 == 1) {
						this.allhomeData = res.obj.data;
						//判断是否数据为空
						if (res.obj.data != '') {
							this.there = 0;
						} else {
							this.there = 1;
						}
					} else {
						this.allhomeData = this.allhomeData.concat(res.obj.data);
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
		//推荐页面获取关注用户的数据
		guanzhuData: function() {
			var data = {
				//页码
				pageindex: this.page3,
				//需要多少条数据
				pagecount: 12
			};
			this.$api.apiPost('/UserFollowInfo/FollowIssueListByUserId', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total3 = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page3 == 1) {
						this.guanData = res.obj.tasks;
						//判断是否数据为空
						if (res.obj.tasks != '') {
							this.noteNULL = 0;
						} else {
							this.noteNULL = 1;
							//推荐页面兴趣用户推荐数据
							this.recommendedData = res.obj.tjUs;
						}
					} else {
						this.guanData = this.guanData.concat(res.obj.tasks);
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
		//判断关注用户数据是否为空
		yonMY: function(value) {
			this.noteNULL = value;
		},
		//推荐页面获取热门任务
		tuijieData1: function() {
			var data = {
				//页码
				pageindex: this.page2,
				//需要多少条数据
				pagecount: 12
			};
			this.$api.apiPost('/Home/GetTaskListHot', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total2 = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page2 == 1) {
						this.hotData2 = res.obj.data;
						//判断是否数据为空
						if (res.obj.data != '') {
							this.noteNULL2 = 0;
						} else {
							this.noteNULL2 = 1;
						}
					} else {
						this.hotData2 = this.hotData2.concat(res.obj.data);
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
		//推荐页面获取高价任务
		yourData: function() {
			var data = {
				//分类
				tasktype: 7,
				//条件
				order: 0,
				//页码
				pageindex: this.page4,
				//需要多少条数据
				pagecount: 12
			};
			this.$api.apiPost('/Home/GetTaskListByType', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total4 = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page4 == 1) {
						this.hotData3 = res.obj.data;
						//判断是否数据为空
						if (res.obj.data != '') {
							this.noteNULL2 = 0;
						} else {
							this.noteNULL2 = 1;
						}
					} else {
						this.hotData3 = this.hotData3.concat(res.obj.data);
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
		//加载消息数据
		informationData: function() {
			this.$api.apiPost('/Msg/GetMsgMainInfo', '', '', 'post', (status, code, res) => {
				if (status) {
					//轻鱼小助手
					this.SmallAssistant = res.obj.mn;
					//发布通知
					this.IssueTaskMsg = res.obj.mi;
					//任务通知
					this.ReceiveTaskMsg = res.obj.mr;
					//系统通知
					this.SysMsg = res.obj.ms;
					//用户通知
					this.information = '';
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//关闭悬赏弹框
		gbxsTK: function() {
			this.xuanstk = 0;
			this.blocking = false;
			//设置不在显示弹框
			this.$store.commit('ArewardQX', 0);
		},
		//任务详情-悬赏弹框
		dianjirw2: function(id) {
			//设置不在显示弹框
			this.$store.commit('ArewardQX', 0);
			uni.navigateTo({
				url: '/pages/recommended/rwdetails/rwdetails?id=' + id
			});
		},
		//更新用户信息
		loadingUser: function() {
			this.$api.loadingUser((status, code, res) => {
				if (status) {
					//把用户信息存入VUEX
					this.$store.commit('saveUser', res.obj);
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
		//加载邀请好友页面数据
		InvitationData: function() {
			this.$api.apiPost('/UserFollowInfo/AddFriendsDetails', '', '', 'post', (status, code, res) => {
				if (status) {
					//把邀请好友页面数据存入VUEX
					this.$store.commit('TuiJieSave', res.obj);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//首页分类
		chooseData: function(id) {
			if (id == 11 || id == 12) {
				this.conditionsGD = id;
				this.conditions = 0;
			} else {
				this.conditions = id;
				this.conditionsGD = 0;
			}
			//初始化
			this.page1 = 1;
			this.there1 = 0;
			this.orderData = 0;
			this.homeData3();
		},
		//首页分类中的条件
		orderF: function(id) {
			this.orderData = id;
			//初始化
			this.page1 = 1;
			this.there1 = 0;
			this.homeData3();
		},
		//跳转消息
		mobileXi: function(id) {
			this.Selected(id);
		},
		//推荐页分类
		gzflData: function(id) {
			this.conditions2 = id;
			//初始化
			this.page2 = 1;
			this.page3 = 1;
			this.page4 = 1;
			this.noteNULL = 0;
			this.noteNULL2 = 0;
			this.there2 = 0;
			if (this.conditions2 == 1) {
				//推荐页面获取热门任务
				this.tuijieData1();
			} else if (this.conditions2 == 2) {
				//推荐页面获取高价任务
				this.yourData();
			} else if (this.conditions2 == 3) {
				//加载关注用户的数据
				this.guanzhuData();
			}
		},
		//导航栏选择
		Selected: function(id) {
			this.selected = id;
			switch (this.selected) {
				case 1:
					if (this.messageData == '') {
						//加载公告消息
						this.messageF();
					}
					break;
				case 2:
					if (this.conditions2 == 1 && this.hotData2 == '') {
						//推荐页面获取热门任务
						this.tuijieData1();
					} else if (this.conditions2 == 2 && this.hotData3 == '') {
						//推荐页面获取高价任务
						this.yourData();
					} else if (this.conditions2 == 3 && this.guanData == '') {
						//加载关注用户的数据
						this.guanzhuData();
					}
					break;
				case 3:
					if (this.information == '') {
						//加载消息数据
						this.informationData();
					}
					break;
				case 4:
					//加载邀请好友页面数据
					this.InvitationData();
					//加载用户数据
					this.loadingUser();
					break;
			}
		},
		//发布任务
		fbrw: function() {
			var PlusMember = this.$store.state.userData.PlusMember;
			if (PlusMember == 1) {
				uni.navigateTo({
					url: '/pages/task/task'
				});
			} else {
				// uni.navigateTo({
				// 	url: '/pages/task/task'
				// });
				this.vipFB(1);
			}
		},
		//弹出提示弹框
		vipFB: function(value) {
			if (value == 1) {
				this.blocking = true;
				this.fabtk = true;
				this.isActive1 = true;
				this.isActive2 = false;
			} else {
				var _this = this;
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.fabtk = false;
				}, 500)
			}
		},
		//开通VIP
		ktvip: function() {
			uni.navigateTo({
				url: '/pages/vippage/vippage'
			});
		}
	}
};
</script>

<style>
/* body属性 */
page {
	background-color: #f8f8f8;
	padding-bottom: 90upx;
}

.navigation {
	width: 100%;
	height: 90upx;
	padding-top: 14upx;
	position: fixed;
	bottom: 0;
	display: flex;
	border-top: 1px #f7f4f2 solid;
	background-color: #ffffff;
	z-index: 10;
}

.navdiv {
	flex: 1;
	height: 100%;
}

.daoha_img {
	width: 40upx;
	height: 40upx;
	display: block;
}

.daoha {
	width: 100%;
	height: 48upx;
	line-height: 48upx;
	font-size: 22upx;
	color: #403833;
	text-align: center;
}

.selected {
	color: #fcbb67;
}

.fabu {
	flex: 1.1;
	height: 100%;
	position: relative;
}

.daohb_img {
	width: 110upx;
	height: 110upx;
	display: block;
	position: absolute;
	top: -60upx;
	left: 30upx;
}

.daohb {
	width: 100%;
	height: 48upx;
	line-height: 48upx;
	font-size: 22upx;
	color: #403833;
	text-align: center;
	padding-top: 40upx;
}
/* 发布任务提示弹框CSS */
.fatkdiv {
	width: 100%;
	height: 710upx;
	background-color: #ffffff;
	border-radius: 30upx 30upx 0px 0px;
	position: fixed;
	bottom: 0;
	z-index: 30;
	padding-bottom: 150upx;
}
.fbxzxli {
	width: 60upx;
	height: 60upx;
	display: block;
	position: absolute;
	right: 28upx;
	top: 28upx;
}
.farbt {
	width: 100%;
	height: 120upx;
	font-size: 38upx;
	color: #101010;
	text-align: center;
	line-height: 120upx;
	margin-bottom: 20upx;
}
.fadlogo {
	width: 120upx;
	height: 120upx;
	display: block;
	margin-bottom: 30upx;
}
.famiaos {
	width: 630upx;
	height: auto;
	line-height: 46upx;
	font-size: 26upx;
	color: #101010;
	text-align: center;
	margin-bottom: 200upx;
}
.swhz {
	width: 100%;
	height: auto;
	line-height: 40upx;
	font-size: 24upx;
	color: #8e8e8e;
	text-align: center;
	margin-bottom: 30upx;
}
.fbtanzw {
	width: 630upx;
	height: 100upx;
	background-color: #fcbb67;
	border-radius: 50upx;
	line-height: 100upx;
	font-size: 36upx;
	color: #ffffff;
	text-align: center;
}
/* 悬赏弹框 */
.fendiv {
	width: 650upx;
	height: 660upx;
	background-color: #fcbb67;
	border-radius: 16upx;
	position: fixed;
	left: 50%;
	margin-left: -325upx;
	top: 50%;
	margin-top: -330upx;
	z-index: 20;
}

.gnyy_img {
	width: 70upx;
	height: 70upx;
	display: block;
	position: absolute;
	left: 50%;
	margin-left: -30upx;
	bottom: -120upx;
}

.fenx_img {
	width: 244upx;
	height: 78upx;
	display: block;
	position: absolute;
	left: 50%;
	margin-left: -122upx;
	top: -26upx;
}

.zgsdanr {
	width: 590upx;
	height: 600upx;
	background-color: #ffffff;
	box-shadow: 0px -6px 34px 4px rgba(235, 178, 147, 1);
	border-radius: 8upx;
	margin-top: 30upx;
}

.touxdiv {
	width: 120upx;
	height: 120upx;
	position: relative;
	padding-top: 74upx;
}

.zhestoux {
	width: 100%;
	height: 100%;
	display: block;
	border-radius: 80upx;
}

.zhesvvv {
	width: 32upx;
	height: 32upx;
	display: block;
	position: absolute;
	right: 0upx;
	bottom: 0upx;
}

.wlti1 {
	width: 100%;
	height: 40upx;
	line-height: 40upx;
	font-size: 34upx;
	color: #424242;
	text-align: center;
	padding-top: 30upx;
}

.wlti2 {
	width: 100%;
	height: 40upx;
	line-height: 40upx;
	font-size: 26upx;
	color: #979797;
	text-align: center;
	padding-top: 10upx;
}

.wlti3 {
	width: 100%;
	height: 40upx;
	line-height: 40upx;
	font-size: 28upx;
	color: #ed703f;
	text-align: center;
	padding-top: 26upx;
	padding-bottom: 60upx;
}

.wlti3 text {
	font-size: 44upx;
	font-weight: bold;
}

.tankan {
	width: 400upx;
	height: 76upx;
	background-color: #fcbb67;
	border-radius: 38upx;
	text-align: center;
	line-height: 76upx;
	font-size: 26upx;
	color: #ffffff;
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
