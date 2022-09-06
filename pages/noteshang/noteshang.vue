<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="sjiamok">
			<view class="banqxx">
				<image class="shantoux" :src="merchants.Headimgurl"></image>
				<view class="sjxl">
					<view class="wz1">{{merchants.Nickname}}</view>
					<view class="wz2">ID：{{merchants.Id}}</view>
				</view>
				<view class="zgsgz">
					<view class="guan" v-if="selected" @click="guanzhu">+关注</view>
					<view class="guan" @click="guanzhu" v-else>已关注</view>
					<!-- <view class="zgslxo" v-else>
						<image class="zgslxtb juzho" src="../../static/lxsj.png"></image>
						<view class="zgslwz">联系商家</view>
					</view> -->
				</view>
			</view>
			<view class="zgstes">
				<view class="dousyy">{{merchants.FansCount}}粉丝</view>
				<view class="dousyy">{{merchants.FocusCount}}关注</view>
				<view class="dousyy">{{merchants.CommentCount}}评论</view>
			</view>
		</view>
		<view class="biaotl juzho">
			<view class="biz">
				<view class="nroo">
					<view class="bibt" :class="{ xuanzl: conditions == 1 }">发布任务<text>({{merchants.TaskIssueCount}})</text></view>
					<!-- <view class="tgdlj juzho" v-show="conditions==1"></view> -->
				</view>
			</view>
			<!-- <view class="biz" >
					<view class="nroo" @click="xuanz(2)">
						<view class="bibt" :class="{ xuanzl: conditions == 2 }">完成任务<text>({{merchants.TaskDoneCount}})</text></view>
						<view class="tgdlj juzho" v-show="conditions==2"></view>
					</view>
				</view> -->
		</view>
		<view class="rwlb juzho" v-for="(item, key) in shangData" :key="key" @click="dianjirw(item.Id)">
			<view class="lblg">
				<image class="rwlb_img juzho" :src="merchants.Headimgurl"></image>
			</view>
			<view class="lwxyzc">
				<view class="rwl_bt">{{item.Task_title}}</view>
				<view class="wlt">
					<view class="bmb1">{{item.item_name}}</view>
					<view class="bmb2">剩余数量：<text>{{item.task_count-item.task_passed_count}}</text>/{{item.task_count}}</view>
				</view>
			</view>
			<view class="zhesgyq">+{{item.task_price}}</view>
		</view>






		<view class="yjdaodi" v-show="there==1">已经没有更多了~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "",
				//返回图片路径
				path: "../../static/jiant.png",
				//是否显示关注
				selected: true,
				//选中的分类
				conditions: 1,
				//是否已经数据触底
				there: 0,
				//数据最后一位的ID
				page: 0,
				//列表数据
				shangData: "",
				//商家数据
				merchants: "",
				//商家ID
				merchantsID: "",
				//用户数据
				userData: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.merchantsID = option.id
			this.gzhuyhF();
			this.merchantsData();
			this.loadingUser();
		},
		//上拉加载
		onReachBottom() {
			this.merchantsData();
		},
		methods: {
			//加载数据
			merchantsData: function() {
				var data = {
					//ID
					userid: this.merchantsID,
					//1进行中 2已结束
					state:1,
					//数据最后一位的ID
					lastid: this.page,
					//页面大小，默认10
					count: 10
				};
				this.$api.apiPost('/TaskIssue/GetTaskList', "", data, 'post', (status, code, res) => {
					if (status) {
						//商家数据
						this.merchants = res.obj.userinfo;
						//判断是否是下拉刷新数据
						if (this.page == 0) {
							this.shangData = res.obj.tasks;
						} else {
							this.shangData = this.shangData.concat(res.obj.tasks);
							//判断是否数据触底
							if (res.obj.tasks != "" && res.obj.tasks != null) {
								this.there = 0;
							} else {
								this.there = 1;
							}
						}
						//拿到数据最后一个的ID
						if (res.obj.tasks != "" && res.obj.tasks != null) {
							this.page = this.shangData[this.shangData.length - 1].Id;
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
			//查询是否关注了用户
			gzhuyhF: function() {
				var data = {
					//用户ID
					followid: this.merchantsID
				};
				this.$api.apiPost('/UserFollowInfo/IsFollow', "", data, 'post', (status, code, res) => {
					if (status) {
						if (Number(res.obj) == 1) {
							this.selected = false;
						} else {
							this.selected = true
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
			//关注/取消关注
			guanzhu: function() {
				if(this.userData.Id==this.merchantsID){
					uni.showToast({
						title: "不能关注自己哦~",
						icon: 'none',
						duration: 2000
					});
				}else{
					var data = {
						//用户ID
						follow_user_id: this.merchantsID
					};
					this.$api.apiPost('/UserFollowInfo/Follow', "", data, 'post', (status, code, res) => {
						if (status) {
							if (Number(res.obj) == 1) {
								this.selected = false;
								uni.showToast({
									title: "关注成功",
									icon: 'none',
									duration: 2000
								});
							} else {
								this.selected = true;
								uni.showToast({
									title: "取消关注",
									icon: 'none',
									duration: 2000
								});
							}
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
			//选择分类
			xuanz: function(id) {
				this.conditions = id;
				//初始化
				this.page = 0;
				this.merchantsData();
			},
			//任务详情
			dianjirw: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			}
		}
	}
</script>

<style>
	@import '../../common/css/shang.css';
</style>
