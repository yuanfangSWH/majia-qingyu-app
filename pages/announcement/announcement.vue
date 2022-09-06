<template>
	<view>
		<view class="fudon">
			<Navigation :title="title" :path="path"></Navigation>
		</view>
		<view class="status_bar"></view>
		<view style="width: 100%;height: 44px;"></view>
		<view class="zgsbaosj" v-for="(item, key) in valueData" :key="key">
			<view class="zgsimrq">{{item[0].CreateTime}}</view>
			<view class="zti juzho" @click="dianjigg(information.Id)" v-for="(information, index) in item" :key="index">
				<view class="ggnr">{{information.NoticeTitle}}</view>
				<view class="ggt">
					<image class="ggt_img juzho" :src="information.NoticeStreamer"></image>
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
				title: "官方公告",
				//返回图片路径
				path: "../../static/jiant.png",
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
				this.$api.apiPost('/Msg/GetMsgNoticeInfoList', "", data, 'post', (status, code, res) => {
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
						if (res.obj != "") {
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
			//详情
			dianjigg: function(id) {
				uni.navigateTo({
					url: '/pages/announcement/announcementxq/announcementxq?id='+id
				});
			},
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
		margin-bottom: 90upx;
	}

	.zgsbaosj {
		width: 100%;
		height: auto;
	}

	.zgsimrq {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		font-size: 26upx;
		color: #B5B5B5;
		text-align: center;
	}

	.zti {
		width: 690upx;
		height: 384upx;
		background: #FFFFFF;
		box-shadow: 0px 4px 16px 0px rgba(235, 235, 235, 1);
		border-radius: 16upx;
		margin-bottom: 20upx;
	}

	.ggnr {
		width: auto;
		height: 34upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(16, 16, 16, 1);
		margin-left: 30upx;
		padding-top: 30upx;
	}

	.ggt {
		width: auto;
		height: 260upx;
	}

	.ggt_img {
		width: 630upx;
		height: 260upx;
		background: #FFFFFF;
		border-radius: 6upx;
		margin-left: 30upx;
		margin-top: 30upx;
	}
	.fudon {
		width: 100%;
		height: auto;
		position: fixed;
		top: 0;
	}
</style>
