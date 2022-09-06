<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" src="../../static/jiant.png"  @click="returnData"></image>
		</view>
		<view class="temturb">
			<view class="pttwz1 juzho">好友做任务越多</view>
			<view class="pttwz2 juzho">我的收入越高</view>
			<view class="yaoqdiv juzho">
				<view class="diufwz" @click="wodtd">
					<view class="anxiu">团队人数：{{tuijieData.TeamCount}}</view>
					<image class="rgbj" src="../../static/grjt1.png"></image>
				</view>
				<view class="tfyqan juzho" @click="haibao">邀请好友</view>
			</view>
			<view class="tiemk1"></view>
			<view class="tiemk2"></view>
			<view class="tiemk3"></view>
		</view>
		<view class="yaoqdiv juzho" style="height: 224upx;margin-bottom: 20upx;">
			<view class="diufwz">
				<view class="anxiu">今日好友给我贡献</view>
				<view class="tebsm" @click="wfgzb">玩法规则</view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
			<view class="kludiv">
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #ED703F;font-size: 46upx;">{{tuijieData.TodayMoney}}</text><text style="color: #ED703F;">元</text></view>
					<view class="mkljt">今日好友贡献</view>
				</view>
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #333333;font-size: 46upx;">{{tuijieData.AllMoney}}</text><text style="color: #333333;">元</text></view>
					<view class="mkljt">累计好友贡献</view>
				</view>
			</view>
		</view>
		<view class="yaoqdiv juzho" style="height: 224upx;margin-bottom: 20upx;">
			<view class="diufwz">
				<view class="anxiu">好友预览赚红包</view>
				<view class="tebsm" @click="wfgza">玩法规则</view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
			<view class="kludiv">
				<!-- <view style="flex: 1.4;">
					<view class="tlmwz"><text style="color: #ED703F;font-size: 46upx;">{{tuijieData.ShareCount}}</text>条</view>
					<view class="mkljt">已分享</view>
				</view> -->
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #ED703F;font-size: 46upx;">{{tuijieData.ValidCount}}</text>条</view>
					<view class="mkljt">有效浏览</view>
				</view>
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #ED703F;font-size: 46upx;">{{tuijieData.AddUp}}</text>元</view>
					<view class="mkljt">累计佣金</view>
				</view>
			</view>
		</view>
		<view class="yaoqdiv juzho" style="height: 224upx;margin-bottom: 20upx;">
			<view class="diufwz">
				<view class="anxiu">成为合伙人，额外奖励</view>
				<view class="tebsm" @click="wfgzc">玩法规则</view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
			<view class="kludiv">
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #333333;font-size: 46upx;">X{{tuijieData.GradeLevel}}</text></view>
					<view class="mkljt">本月团队等级</view>
				</view>
				<view style="flex: 1;">
					<view class="tlmwz"><text style="color: #333333;font-size: 46upx;">{{tuijieData.MyTeamAllMoney}}</text><text style="color: #333333;">元</text></view>
					<view class="mkljt">预估我的奖金</view>
				</view>
			</view>
		</view>
		<view class="yaoqdiv juzho" style="height: 224upx;margin-bottom: 20upx;" v-if="tuijieData.MyPUser.Id!=0&&tuijieData.MyPUser.Id!=''">
			<view class="diufwz">
				<view class="anxiu">我的推荐人</view>
				<view class="tebsm" @click="tuijTK(1)" style="width: 86upx;">联系TA</view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
			<view class="kludiv">
				<image class="tuijtx" :src="tuijieData.MyPUser.Headimg"></image>
				<view style="flex: 1;">
					<view class="kylnwz1" style="padding-top: 24upx;">{{tuijieData.MyPUser.NickName}}</view>
					<!-- <view class="kylnwz1">他邀请了{{tuijieData.MyPUser.Friends}}人</view>
					<view class="kylnwz1">当前累计收益<text style="color: #ED703F;font-weight: bold;">{{tuijieData.MyPUser.MyTeamAllMoney}}元</text></view> -->
				</view>
			</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<view class="yaoqtk" v-if="recommended">
			<image class="teyqx" src="../../static/xzx.png" @click="tuijTK(2)"></image>
			<view class="ybt">我的邀请人</view>
			<image class="yonimg juzho" :src="tuijieData.MyPUser.Headimg"></image>
			<view class="yonhmz">{{tuijieData.MyPUser.NickName}}</view>
			<view class="tlnsjdh" v-if="tuijieData.MyPUser.Phone==''">未绑定手机号</view>
			<view class="tlnsjdh" v-else>{{tuijieData.MyPUser.Phone}}</view>
			<view class="huisgj juzho">
				<image class="weixtb" src="../../static/yaoq02.png"></image>
				<view class="wulyn">{{tjrWX!="" ? tjrWX:'微信号未设置'}}</view>
				<view class="fuzhiwxh" @click="fuzWX">复制微信号</view>
			</view>
			<view class="wylshez" @click="shezwx">我也要设置社交信息 ></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//是否显示遮罩
				blocking: false,
				//开启/关闭推荐人弹框
				recommended: false,
				//推荐页数据
				tuijieData: "",
				//推荐人微信(复制)
				tjrWX:""
			}
		},
		onShow() {
			var refreshData = uni.getStorageSync('refreshData');
			if (refreshData == 1) {
				uni.setStorageSync('refreshData', 2);
				this.InvitationData();
			}
		},
		onLoad() {
			//从VUEX获取到邀请好友海报数据
			this.tuijieData = this.$store.state.TuiJieData;
			if(this.tuijieData==""){
				this.InvitationData();
			}else{
				if(this.tuijieData.MyPUser.Id!=0&&this.tuijieData.MyPUser.Id!=''){
					this.loadingWX();
				}
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.InvitationData();
			uni.stopPullDownRefresh();
		},
		methods: {
			//加载邀请好友页面数据
			InvitationData: function() {
				this.$api.apiPost('/UserFollowInfo/AddFriendsDetails', "", "", 'post', (status, code, res) => {
					if (status) {
						this.tuijieData = res.obj;
						//把邀请好友页面数据存入VUEX
						this.$store.commit('TuiJieSave', res.obj);
						if(this.tuijieData.MyPUser.Id!=0&&this.tuijieData.MyPUser.Id!=''){
							this.loadingWX();
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
			//弹出或关闭推荐人弹框
			tuijTK: function(value) {
				if (value == 1) {
					this.blocking = true;
					this.recommended = true;
				} else {
					this.blocking = false;
					this.recommended = false;
				}
			},
			//查询微信号
			loadingWX: function() {
				var data={
					userid:this.tuijieData.MyPUser.Id
				};
				this.$api.apiPost('/UserFollowInfo/SeeWxAccount', "", data, 'post', (status, code, res) => {
					if (status) {
						this.tjrWX = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//复制微信号
			fuzWX: function() {
				if(this.tjrWX!=""){
					uni.setClipboardData({
						data: this.tjrWX,
						success: function() {
							uni.showToast({
								title: "复制成功",
								icon: 'none',
								duration: 3000
							});
						},
						fail: function() {
							uni.showToast({
								title: "复制失败，请重试",
								icon: 'none',
								duration: 3000
							});
						}
					});
				}
			},
			//设置社交微信号
			shezwx: function() {
				uni.navigateTo({
					url: '/pages/invitation/setwx/setwx'
				});
			},
			//邀请好友海报
			haibao: function() {
				uni.navigateTo({
					url: '/pages/invitation/posters/posters'
				});
			},
			//玩法规则1
			wfgza:function(){
				uni.navigateTo({
					url: '/pages/agreement/wfgza/wfgza'
				});
			},
			//玩法规则2
			wfgzb:function(){
				uni.navigateTo({
					url: '/pages/agreement/wfgzb/wfgzb'
				});
			},
			//玩法规则3
			wfgzc:function(){
				uni.navigateTo({
					url: '/pages/agreement/wfgzc/wfgzc'
				});
			},
			//邀请记录(废弃)
			yaojil: function() {
				uni.navigateTo({
					url: '/pages/invitation/record/record'
				});
			},
			//我的团队
			wodtd: function() {
				uni.navigateTo({
					url: '/pages/invitation/team/team'
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
	@import '../../common/css/invitation.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
		padding-bottom: 90upx;
	}
</style>
