<template>
	<view>
		<view class="status_bar" style="background-color: #FFFFFF;"></view>
		<view class="daohdiv" style="background-color: #FFFFFF;color: #000000;">
			<image class="return" src="../../../static/jiant2.png" @click="returnData"></image>
			我的团队
		</view>
		<view style="padding-top: 20upx;">
			<view class="suoydyg juzho">
				<view class="keaidn1">
					<view class="tujb1">团队人数（人）</view>
					<view class="tujb2">{{ TeamCount }}</view>
				</view>
				<view class="zheghuaf"></view>
				<view class="keaidn2">
					<view class="tujb1">本月团队总业绩（元）</view>
					<view class="tujb2">{{ TeamGrade }}</view>
				</view>
			</view>
		</view>
		<view class="zhijsqlil juzho">
			<view class="zhiszj1">直邀好友 {{ DirUssLen }} 人</view>
			<view class="zhiszj2">上月团队总业绩 {{ OldTeamGrade }} 元</view>
		</view>
		<view class="delbiao juzho">
			<view class="liebnr juzho" v-for="(item, key) in liebData" :key="key">
				<image class="jitouimg" :src="item.Headimgurl"></image>
				<view style="flex: 1;">
					<view class="wln1">{{ item.Nickname }}</view>
					<view class="wln2">{{ item.RegTime }}</view>
				</view>
			</view>
			<view class="loijwl" v-show="liebData == '' || liebData == null">
				<image class="loimg juzho" src="../../../static/jysj.png"></image>
				<view class="lowz">空空如也，快邀请好友加入团队吧</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//页数
			page: 1,
			//总列数
			count: 0,
			//数据
			liebData: '',
			//团队人数
			TeamCount: 0,
			//团队业绩
			TeamGrade: 0,
			//直邀好友人数
			DirUssLen: 0,
			//上月业绩
			OldTeamGrade: 0
		};
	},
	onLoad() {
		this.loadingData1();
		this.loadingData2();
	},
	//上拉加载
	onReachBottom() {
		if (this.page * 10 < this.count) {
			this.page++;
			this.loadingData2();
		} else {
			uni.showToast({
				title: '已经没有更多记录了~',
				icon: 'none',
				duration: 2000
			});
		}
	},
	methods: {
		//加载头部数据
		loadingData1: function() {
			this.$api.apiPost('/UserFollowInfo/MyTeam', '', '', 'post', (status, code, res) => {
				if (status) {
					this.TeamCount = res.obj.TeamCount;
					this.TeamGrade = res.obj.TeamGrade;
					this.DirUssLen = res.obj.DirUssLen;
					this.OldTeamGrade = res.obj.OldTeamGrade;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载列表数据
		loadingData2: function() {
			var data = {
				pageindex: this.page,
				pagecount: 10
			};
			this.$api.apiPost('/UserFollowInfo/MyTeamUss', '', data, 'post', (status, code, res) => {
				if (status) {
					//总列数
					this.count = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page == 1) {
						this.liebData = res.obj.data;
					} else {
						this.liebData = this.liebData.concat(res.obj.data);
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
		// 返回上一级页面
		returnData: function() {
			uni.setStorageSync('refreshData', 1);
			uni.navigateBack({
				delta: 1
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
.suoydyg {
	width: 690upx;
	height: 160upx;
	background-color: #fcbb67;
	box-shadow: 0px 4upx 16upx 0px rgba(240, 240, 240, 1);
	border-radius: 20upx 20upx 0px 0px;
	display: flex;
}
.keaidn1 {
	width: 230upx;
	height: auto;
	margin-left: 40upx;
}
.tujb1 {
	line-height: 40upx;
	color: #ffffff;
	font-size: 26upx;
	padding-top: 40upx;
}
.tujb2 {
	line-height: 40upx;
	color: #ffffff;
	font-size: 38upx;
	font-weight: bold;
	padding-top: 14upx;
}
.zheghuaf {
	width: 2upx;
	height: 94upx;
	background-color: #ffcb88;
	margin-top: 38upx;
}
.keaidn2 {
	flex: 1;
	height: auto;
	margin-left: 40upx;
}
.zhijsqlil {
	width: 690upx;
	height: 74upx;
	background-color: #fbcf96;
	display: flex;
}
.zhiszj1 {
	width: 266upx;
	height: 74upx;
	line-height: 74upx;
	font-size: 24upx;
	color: #ffffff;
	margin-left: 40upx;
}
.zhiszj2 {
	flex: 1;
	height: 74upx;
	line-height: 74upx;
	font-size: 24upx;
	color: #ffffff;
}
.delbiao {
	width: 690upx;
	height: auto;
	background-color: #ffffff;
	padding-bottom: 20upx;
}
.liebnr {
	width: 610upx;
	height: 180upx;
	display: flex;
	border-bottom: 1px #ebeef0 solid;
}

.jitouimg {
	width: 80upx;
	height: 80upx;
	display: block;
	margin-right: 40upx;
	border-radius: 50%;
	margin-top: 50upx;
}

.wln1 {
	width: 470upx;
	line-height: 30upx;
	font-size: 30upx;
	color: #000000;
	padding-top: 50upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.wln2 {
	width: 100%;
	line-height: 30upx;
	font-size: 26upx;
	color: #b5b5b5;
	padding-top: 20upx;
}
.loijwl {
	width: 100%;
	height: 600upx;
}

.loimg {
	width: 300upx;
	height: 284upx;
	display: block;
	padding-top: 120upx;
	padding-bottom: 54upx;
}

.lowz {
	width: 100%;
	font-size: 28upx;
	color: #c0c0c0;
	text-align: center;
}
</style>
