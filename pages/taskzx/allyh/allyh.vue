<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
			任务审核
		</view>
		<view style="width: 100%;height: 30upx;background-color: #F8F8F8;"></view>
			<view class="qiehdh">
				<view class="yiqym" :class="{ xuanzyh: conditions == 1 }" @click="xuanz(1)">待审核</view>
				<view class="yiqym" :class="{ xuanzyh: conditions == 0 }" @click="xuanz(0)">待提交</view>
				<view class="yiqym" :class="{ xuanzyh: conditions == 2 }" @click="xuanz(2)">已通过</view>
				<view class="yiqym" :class="{ xuanzyh: conditions == 3 }" @click="xuanz(3)">未通过</view>
			</view>
			<view class="oujyej juzho" v-for="(item,key) in valueData" :key="key" >
				<image :src="item.Headimgurl"></image>
				<view class="rgnbzd">
					<view class="bietxwz1">{{item.Nickname}}</view>
					<view class="bietxwz2">{{item.RegTime}}</view>
				</view>
				<view class="kuailx" @click="jumpR(5,item.Id)" v-show="conditions == 1">去审核></view>
				<view class="kuailx" @click="jumpR(6,item.Id)" v-show="conditions == 2">查看></view>
				<view class="kuailx" @click="jumpR(7,item.Id)" v-show="conditions == 3">查看></view>
			</view>
			<view class="rwyqguan" v-show="there==1">
				<image class="rwqgimg juzho" src="../../../static/jysj.png"></image>
				<view class="rwqgwz">暂无用户</view>
			</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中的分类
				conditions: 1,
				//页码
				page: 1,
				//总页数
				total: 1,
				//数据
				valueData: "",
				//订单ID
				dinID: "",
				//数据为空
				there: 0
			}
		},
		onShow() {
			var refreshData = uni.getStorageSync('refreshData');
			if (refreshData == 1) {
				uni.setStorageSync('refreshData', 2);
				this.page = 1;
				this.pullData();
			}
		},
		onLoad(option) {
			this.dinID = option.id
			this.pullData();
		},
		//上拉加载
		onReachBottom() {
			if (this.page*10 < this.total) {
				this.page++;
				this.pullData();
			} else {
				uni.showToast({
					title: "已经没有更多数据了~",
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			//加载数据
			pullData: function() {
				var data = {
					//订单ID
					taskid: this.dinID,
					//状态 0待提交，1待审核，2已通过，3未通过
					stateid: this.conditions,
					//页码
					pageindex: this.page,
					//一次多少条数据
					pagecount: 10
				};
				this.$api.apiPost('/TaskIssue/IngDetails', "", data, 'post', (status, code, res) => {
					if (status) {
						//总页数
						this.total = res.obj.total;
						//判断是否是下拉刷新数据
						if (this.page == 1) {
							this.valueData = res.obj.data;
							//判断是否数据为空
							if (res.obj != "") {
								this.there = 0;
							} else {
								this.there = 1;
							}
						} else {
							this.valueData = this.valueData.concat(res.obj.data);
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
				//初始化页码
				this.page = 1;
				this.pullData();
			},
			//跳转到任务详情页-审核用户
			jumpR: function(area, uid) {
				uni.navigateTo({
					url: '/pages/taskzx/rwdetails/rwdetails?area=' + area + '&id=' + this.dinID + "&uid=" + uid
				});
			},
			// 返回上一级页面
			returnData: function() {
				uni.setStorageSync('refreshData', 1);
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>

	.rwyqguan {
		width: 100%;
		height: auto;
		padding-top: 40upx;
		padding-bottom: 120upx;
	}

	.rwqgimg {
		width: 300upx;
		height: 286upx;
		display: block;
	}

	.rwqgwz {
		width: 100%;
		font-size: 28upx;
		text-align: center;
		color: #BFBFBF;
		line-height: 40upx;
	}

	.oujyej {
		width: 660upx;
		height: 120upx;
		display: flex;
		border-bottom: 1px #EBEEF0 solid;
		margin-bottom: 40upx;
	}

	.oujyej image {
		width: 80upx;
		height: 80upx;
		display: block;
		border-radius: 50upx;
		margin-right: 40upx;
	}

	.rgnbzd {
		flex: 1;
		height: 100%;
	}

	.bietxwz1 {
		width: 390upx;
		height: 40upx;
		line-height: 40upx;
		font-size: 30upx;
		color: #000000;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.bietxwz2 {
		width: 100%;
		height: 50upx;
		line-height: 50upx;
		font-size: 26upx;
		color: #B5B5B5;
	}

	.kuailx {
		width: 110upx;
		height: 120upx;
		line-height: 80upx;
		font-size: 28upx;
		color: #FCBB67;
	}

	.zhejidiv {
		width: 690upx;
		height: auto;
		padding-bottom: 40upx;
		background-color: #FFFFFF;
		border-radius: 16upx;
		margin-top: 30upx;
	}

	.qiehdh {
		width: 100%;
		height: 156upx;
		display: flex;
		padding-top: 10upx;
	}

	.yiqym {
		flex: 1;
		height: 80upx;
		margin-left: 30upx;
		margin-right: 30upx;
		line-height: 80upx;
		font-size: 30upx;
		color: #161616;
		text-align: center;
	}

	.xuanzyh {
		border-bottom: 4upx #FCBB67 solid;
	}
</style>
