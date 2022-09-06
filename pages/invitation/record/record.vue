<template>
	<view>
		<view class="status_bar" style="background-color: #FFFFFF;"></view>
		<view class="daohdiv" style="background-color: #FFFFFF;color: #000000;">
			<image class="return" src="../../../static/jiant2.png" @click="returnData"></image>
			邀请记录
		</view>
		<view class="mokzsl juzho">
			<view class="damotj">
				<view class="shuzts1">{{dirCount}}</view>
				<view class="shuzts2">直邀好友</view>
			</view>
			<view class="henws"></view>
			<view class="damotj">
				<view class="shuzts1">{{undirCount}}</view>
				<view class="shuzts2">扩散好友</view>
			</view>
		</view>
		<view class="tuijtab juzho">
			<view class="qiehjb">
				<view style="flex: 1;">
					<view class="hunint juzho" :class="{xuanz:qiehData==1}" @click="qiehTAB(1)">直邀好友</view>
				</view>
				<view style="flex: 1;">
					<view class="hunint juzho" :class="{xuanz:qiehData==2}" @click="qiehTAB(2)">扩散好友</view>
				</view>
			</view>

			<view class="liebnr juzho" v-for="(item, key) in zhitksHY" :key="key">
				<image class="jitouimg" :src="item.Headimgurl"></image>
				<view style="flex: 1;">
					<view class="wln1">{{item.Nickname}}</view>
					<view class="wln2">{{item.RegTime}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//切换分类
				qiehData: 1,
				//页数
				page: 1,
				//直推/扩散数据
				zhitksHY: "",
				//直邀好友
				dirCount: 0,
				//扩散好友
				undirCount: 0,
				//总列数
				count: 0
			}
		},
		onLoad() {
			this.loadingData1();
		},
		//上拉加载
		onReachBottom() {
			if (this.page*10 < this.count) {
				this.page++;
				switch (Number(this.qiehData)) {
					case 1:
						this.loadingData1();
						break;
					case 2:
						this.loadingData2();
						break;
				}
			} else {
				uni.showToast({
					title: "已经没有更多记录了~",
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			//加载直邀好友
			loadingData1: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				}
				this.$api.apiPost('/UserFollowInfo/InviteRecords', "", data, 'post', (status, code, res) => {
					if (status) {
						this.dirCount = res.obj.dirCount;
						this.undirCount = res.obj.undirCount;
						//总列数
						this.count = res.obj.count;
						//判断是否是下拉刷新数据
						if (this.page == 1) {
							this.zhitksHY = res.obj.dirArr;
						} else {
							this.zhitksHY = this.zhitksHY.concat(res.obj.dirArr);
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
			//加载扩散好友
			loadingData2: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				}
				this.$api.apiPost('/UserFollowInfo/UnDirInviteRecords', "", data, 'post', (status, code, res) => {
					if (status) {
						//总列数
						this.count = res.obj.count;
						//判断是否是下拉刷新数据
						if (this.page == 1) {
							this.zhitksHY = res.obj.dirArr;
						} else {
							this.zhitksHY = this.zhitksHY.concat(res.obj.dirArr);
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
			//切换分类
			qiehTAB: function(id) {
				this.qiehData = id;
				this.page = 1;
				switch (Number(this.qiehData)) {
					case 1:
						this.loadingData1();
						break;
					case 2:
						this.loadingData2();
						break;
				}
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
	/* body属性 */
	page {
		background-color: #F8F8F8;
		padding-bottom: 90upx;
	}

	.liebnr {
		width: 610upx;
		height: 124upx;
		margin-bottom: 40upx;
		display: flex;
		border-bottom: 1px #EBEEF0 solid;
	}

	.jitouimg {
		width: 80upx;
		height: 80upx;
		display: block;
		margin-right: 40upx;
		border-radius: 50%;
	}

	.wln1 {
		width: 100%;
		line-height: 30upx;
		font-size: 30upx;
		color: #000000;
	}

	.wln2 {
		width: 100%;
		line-height: 30upx;
		font-size: 26upx;
		color: #B5B5B5;
		padding-top: 20upx;
	}

	.qiehjb {
		width: 100%;
		height: 100upx;
		display: flex;
		margin-bottom: 60upx;
	}

	.hunint {
		width: 120upx;
		height: 90upx;
		text-align: center;
		line-height: 90upx;
		color: #656565;
		font-size: 30upx;
	}

	.xuanz {
		color: #000;
		border-bottom: 4upx #FCBB67 solid;
	}

	.tuijtab {
		width: 690upx;
		height: auto;
		background-color: #FFFFFF;
		box-shadow: 0px 4upx 16upx 0px rgba(240, 240, 240, 1);
		border-radius: 20upx;
		padding-bottom: 30upx;
		margin-bottom: 20upx;
	}

	.mokzsl {
		width: 690upx;
		height: 170upx;
		background-color: #FFFFFF;
		box-shadow: 0px 4upx 16upx 0px rgba(240, 240, 240, 1);
		border-radius: 20upx;
		display: flex;
		margin-top: 20upx;
		margin-bottom: 20upx;

	}

	.damotj {
		flex: 1;
		height: 100%;
		text-align: center;
	}

	.shuzts1 {
		width: 100%;
		height: 30upx;
		line-height: 30upx;
		font-size: 38upx;
		color: #414141;
		font-weight: bold;
		padding-top: 44upx;
	}

	.shuzts2 {
		width: 100%;
		height: 30upx;
		line-height: 30upx;
		font-size: 26upx;
		color: #A9A9A9;
		padding-top: 26upx;
	}

	.henws {
		width: 1px;
		height: 96upx;
		background-color: #D8D8D8;
		margin-top: 38upx;
	}
</style>
