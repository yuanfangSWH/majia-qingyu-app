<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="sjiamok">
			<view class="banqxx">
				<image class="shantoux" :src="userData.Headimgurl"></image>
				<view class="sjxl">
					<view class="wz1">{{userData.Nickname}}</view>
					<view class="wz2">ID：{{userData.Id}}</view>
				</view>
			</view>
			<view class="zgstes">
				<view class="dousyy">{{userData.FansCount}}粉丝</view>
				<view class="dousyy">{{userData.FocusCount}}关注</view>
				<view class="dousyy">{{userData.CommentCount}}评论</view>
			</view>
		</view>
		<view class="biaotl juzho">
				<view class="biz" >
					<view class="nroo" @click="xuanz(1)">
						<view class="bibt" :class="{ xuanzl: conditions == 1 }">发布任务<text>({{userData.TaskIssueCount}})</text></view>
						<view class="tgdlj juzho" v-show="conditions==1"></view>
					</view>
				</view>
				<view class="biz" >
					<view class="nroo" @click="xuanz(2)">
						<view class="bibt" :class="{ xuanzl: conditions == 2 }">完成任务<text>({{userData.TaskDoneCount}})</text></view>
						<view class="tgdlj juzho" v-show="conditions==2"></view>
					</view>
				</view>
		</view>
		<view class="rwlb juzho" v-for="(item, key) in shangData" :key="key" @click="dianjirw(item.Id)">
			<view class="lblg">
				<image class="rwlb_img juzho" :src="userData.Headimgurl"></image>
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
				//是否选中
				selected:true,
				//选中的分类
				conditions: 1,
				//是否已经数据触底
				there: 0,
				//数据最后一位的ID
				page: 0,
				//列表数据
				shangData:"",
				//用户数据
				userData:""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.loadingData();
		},
		//上拉加载
		onReachBottom() {
			this.loadingData();
		},
		methods: {
			//加载数据
			loadingData: function() {
				var data = {
					//1进行中 2已结束
					state:this.conditions,
					//数据最后一位的ID
					lastid:this.page,
					//页面大小，默认10
					count:10
				};
				this.$api.apiPost('/TaskIssue/GetTaskList', "", data, 'post', (status, code, res) => {
					if (status) {
						//用户数据
						this.userData = res.obj.userinfo;
						//判断是否是下拉刷新数据
						if (this.page == 0) {
							this.shangData = res.obj.tasks;
						} else {
							this.shangData = this.shangData.concat(res.obj.tasks);
							//判断是否数据触底
							if (res.obj.tasks != ""&&res.obj.tasks != null) {
								this.there = 0;
							} else {
								this.there = 1;
							}
						}
						//拿到数据最后一个的ID
						if (res.obj.tasks != ""&&res.obj.tasks != null) {
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
			//选择分类
			xuanz: function(id) {
				this.conditions = id;
				//初始化
				this.page = 0;
				this.loadingData();
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
