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
					<text v-if="information.MsgStatus==1">零钱入账通知</text>
					<text v-if="information.MsgStatus==2">充值完成通知</text>
					<text v-if="information.MsgStatus==3">提现成功通知</text>
					<text v-if="information.MsgStatus==4">实名认证通知</text>
					<text v-if="information.MsgStatus==5">收款信息完善通知</text>
					<text v-if="information.MsgStatus==6">绑定成功通知</text>
				</view>
				<view class="tshi">
					<view v-if="information.MsgStatus==1">
						<view class="rwmc">
							<view class="rwmc1">任务名称：<text class="rwmc2">{{information.TaskTitle}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">任务类型：<text class="rwmc2">{{information.TaskType}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">入账金额：<text class="rwmc2">{{information.Money}}元</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">提交时间：<text class="rwmc2">{{information.CreateTime}}</text></view>
						</view>
					</view>
					<view v-if="information.MsgStatus==2||information.MsgStatus==3">
						<view class="rwmc">
							<view class="rwmc1">充值金额：<text class="rwmc2">{{information.Money}}</text>元</view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">充值方式：<text class="rwmc2">
							<text v-show="information.TopOpType==1">支付宝</text>
							<text v-show="information.TopOpType==2">微信</text>
							<text v-show="information.TopOpType==3">余额</text>
							</text>
							</view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">任务编号：<text class="rwmc2">{{information.TaskId}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">提现时间：<text class="rwmc2">{{information.CreateTime}}</text></view>
						</view>
					</view>
					<view v-if="information.MsgStatus==4">
						<view class="rwmc">
							<view class="rwmc1">用户名称：<text class="rwmc2">{{information.NickName}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">实名状态：<text class="rwmc2">未实名</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">说明：<text class="rwmc2">请尽快完善实名信息，以便您顺利进行业务操作！</text></view>
						</view>
					</view>
					<view v-if="information.MsgStatus==5">
						<view class="rwmc">
							<view class="rwmc1">用户名称：<text class="rwmc2">{{information.NickName}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">收款渠道：<text class="rwmc2">未绑定</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">说明：<text class="rwmc2">请尽快完善收款账号信息，以便您顺利进行提现操作。</text></view>
						</view>
					</view>
					<view v-if="information.MsgStatus==6">
						<view class="rwmc">
							<view class="rwmc1">绑定用户：<text class="rwmc2">{{information.NickName}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">绑定时间：<text class="rwmc2">{{information.CreateTime}}</text></view>
						</view>
						<view class="rwmc">
							<view class="rwmc1">说明：<text class="rwmc2">该合伙人已成功加入您的团队，请尽快与其沟通开展业务。</text></view>
						</view>
					</view>
					<!-- <view class="rwbj2 juzho"></view>
					<view class="ckxq" @click="chaXQ(information.MsgStatus)">查看详情<image class="ckxq_img juzho" src="../../../static/xyj.png"></image>
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
				title: "系统消息",
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
				this.$api.apiPost('/Msg/GetMsgSysInfoList', "", data, 'post', (status, code, res) => {
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
			chaXQ: function(value) {
				var area = 1;
				switch (Number(value)) {
					case 1: //零钱入账通知
						uni.navigateTo({
							url: '/pages/tixmoney/tixmoney?id=1'
						});
						break;
					case 2: //充值完成通知
						uni.navigateTo({
							url: '/pages/fabumoney/fabumoney?id=1'
						});
						break;
					case 3: //提现成功通知
						uni.navigateTo({
							url: '/pages/tixmoney/tixmoney?id=2'
						});
						break;
					case 4: //实名认证通知
						uni.navigateTo({
							url: '/pages/personal/editor/editor'
						});
						break;
					case 5: //收款信息完善通知
						uni.navigateTo({
							url: '/pages/personal/editor/editor'
						});
						break;
					case 6: //绑定成功通知
						uni.navigateTo({
							url: '/pages/personal/editor/editor'
						});
						break;
				}
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
		height: 50upx;
		line-height: 50upx;
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
		padding-top: 20upx;
		padding-bottom: 40upx;
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
		margin-right: 30upx;
		padding-top: 8upx;

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
