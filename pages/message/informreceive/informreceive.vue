<template>
	<view>
		<view class="fudon">
			<Navigation :title="title" :path="path"></Navigation>
		</view>
		<view class="status_bar"></view>
		<view style="width: 100%;height: 44px;"></view>
		<view v-for="(item, key) in valueData" :key="key">
			<view class="sj juzho">{{item[0].CreateTime}}</view>
			<view class="zti juzho" v-for="(information, index) in item" :key="index">
				<view class="biaoti">
					<text v-show="information.MsgStatus==1">抢单成功通知</text>
					<text v-show="information.MsgStatus==2">任务审核通知</text>
					<text v-show="information.MsgStatus==3">任务举报成功通知</text>
					<text v-show="information.MsgStatus==4">任务评价通知</text>
					<text v-show="information.MsgStatus==5">任务超时关闭通知</text>
					<text v-show="information.MsgStatus==6">任务举报结果通知</text>
				</view>
				<view class="tshi">
					<view class="rwmc">
						<view class="rwmc1">任务名称：<text class="rwmc2">{{information.TaskTitle}}</text></view>
					</view>
					<view class="rwmc">
						<view class="rwmc1">商家名称：<text class="rwmc2">{{information.TaskStoreNick}}</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==1">
						<view class="rwmc1">任务状态：<text class="rwmc2">
								<text v-show="information.TaskReceiveStatus==0">待提交</text>
								<text v-show="information.TaskReceiveStatus==1">已提交 </text>
								<text v-show="information.TaskReceiveStatus==2">已完成</text>
								<text v-show="information.TaskReceiveStatus==3">被驳回</text>
								<text v-show="information.TaskReceiveStatus==4">商家举报用户 </text>
								<text v-show="information.TaskReceiveStatus==5">用户举报商家</text>
								<text v-show="information.TaskReceiveStatus==6">超时未提交 </text>
								<text v-show="information.TaskReceiveStatus==7">取消任务</text>
								<text v-show="information.TaskReceiveStatus==8">系统自动处理</text>
							</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==2">
						<view class="rwmc1">审核状态：<text class="rwmc2">
								<text v-show="information.TaskReceiveStatus==1">审核中</text>
								<text v-show="information.TaskReceiveStatus==2">已通过</text>
								<text v-show="information.TaskReceiveStatus==3">被驳回</text>
							</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==3||information.MsgStatus==6">
						<view class="rwmc1">举报内容：<text class="rwmc2">{{information.ReportContent}}</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==6">
						<view class="rwmc1">结果：<text class="rwmc2">{{information.ReportResult}}</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==6">
						<view class="rwmc1">结果原因：<text class="rwmc2">{{information.ReportResult}}</text></view>
					</view>
					<view class="rwmc">
						<view class="rwmc1">任务编号：<text class="rwmc2">{{information.TaskReceiveId}}</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus==1">
						<view class="rwmc1">领取时间：<text class="rwmc2">{{information.CreateTime}}</text></view>
					</view>
					<view class="rwmc" v-show="information.MsgStatus!=1">
						<view class="rwmc1">提交时间：<text class="rwmc2">{{information.CreateTime}}</text></view>
					</view>
					<!-- <view class="rwbj2 juzho"></view>
					<view class="ckxq" @click="chaXQ(information.TaskId)">查看详情<image class="ckxq_img juzho" src="../../../static/xyj.png"></image>
					</view> -->
				</view>
			</view>
		</view>
		<view class="yjdaodi" v-show="there==1">已经没有更多了~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "接单通知",
				//返回图片路径
				path: "../../../static/jiant.png",
				//是否已经数据触底
				there: 0,
				//数据
				valueData: "",
				//数据最后一条ID
				page: 0
			}
		},
		//监听页面加载
		onLoad() {
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
					//数据最后一条ID
					lastid: this.page,
					//需要多少条数据
					count: 10
				}
				this.$api.apiPost('/Msg/GetTaskReceiveMsgList', "", data, 'post', (status, code, res) => {
					if (status) {
						if (res.obj.GroupData != "") {
							var data = res.obj.GroupData;
							var arr = Array();
							data.forEach((e) => {
								if (e != null) {
									arr.push(e)
								}
							});
							//判断是否是下拉刷新数据
							if (this.page == 0) {
								this.valueData = arr;
							} else {
								this.valueData = this.valueData.concat(arr);
							}
						}
						//判断是否数据触底
						if (res.obj.GroupData != "") {
							this.there = 0;
						} else {
							this.there = 1;
						}
						//拿到数据最后一个的ID
						if (res.obj.GroupData != "") {
							this.page = res.obj.LastId;
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
			//查看详情
			chaXQ: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			}
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F8F8F8;
	}

	/* 触底CSS */
	.yjdaodi {
		width: 100%;
		height: 160upx;
		line-height: 100upx;
	}

	.sj {
		width: 100%;
		text-align: center;
		height: 21upx;
		font-size: 26upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(181, 181, 181, 1);
		padding-top: 39upx;
	}

	.zti {
		width: 690upx;
		height: auto;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 16px 0px rgba(235, 235, 235, 1);
		border-radius: 16upx;
		margin-top: 30upx;
	}

	.biaoti {
		width: auto;
		height: 34upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(16, 16, 16, 1);
		margin-left: 30upx;
		padding-top: 30upx;
	}

	.tshi {
		width: auto;
		height: auto;
		padding-bottom: 40upx;
		padding-top: 30upx;
	}

	.rwmc1 {
		width: auto;
		height: aoto;
		font-size: 30upx;
		line-height: 40upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(198, 198, 198, 1);
		margin-left: 30upx;
		padding-top: 8upx;
		margin-right: 30upx;
	}

	.rwmc2 {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(38, 38, 38, 1);

	}

	.rwbj2 {
		width: 630upx;
		border-bottom: 1px #DDDDDD solid;
		margin-top: 20upx;

	}

	.ckxq {
		width: aoto;
		height: 28upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(16, 16, 16, 1);
		margin-left: 30upx;
		padding-top: 22upx;
	}

	.ckxq_img {
		width: 24upx;
		height: 24upx;
		padding-left: 493upx;

	}

	.fudon {
		width: 100%;
		height: auto;
		position: fixed;
		top: 0;
	}
</style>
