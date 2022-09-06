<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="toubu">
			<view class="din1">
				<view class="shez"></view>
				<view class="biaot">我的</view>
				<view class="xiaox">
					<image class="xiaoximg" src="../../static/shez.png" @click="bjsz"></image>
				</view>
			</view>
			<view class="din2">
				<view class="zgswdtx" @click="releaseF">
					<image class="zhestoux" :src="userData.Headimgurl"></image>
					<image class="zhesvvv" src="../../static/v.png" v-if="userData.PlusMember==1"></image>
				</view>
				<view class="zlisx">
					<view class="yonunm">{{userData.Nickname}}</view>
					<view class="jindt">
						<view class="hydj">ID：{{userData.Id}}</view>
						<!-- <view class="jdtdiv"></view> -->
					</view>
				</view>
				<!-- <view class="ballwen">
					<image src="../../static/tiw.png"></image>
				</view> -->
			</view>
			<view class="din3 juzho">
				<view class="beijtc" v-if="userData.PlusMember==1">
					<view class="vipwz">VIP会员 将于{{userData.PlusEndTime}}到期</view>
					<view class="choann" @click="ktvip">续费VIP</view>
				</view>
				<view class="beijtc" v-else>
					<view class="vipwz">开通VIP 预计每年多赚</view>
					<view class="choann" @click="ktvip">开通VIP</view>
				</view>
			</view>
		</view>
		<!-- 该版本暂不启用 -->
		<!-- <view class="tuandm juzho">
			<view class="tuandwz">
				<view class="zgsmk">
					<view class="tddj">团队等级</view>
					<view class="dtbdj">V7</view>
				</view>
				<view class="zgssmtd">本月还需1,0000业绩可晋升为V8享更高返佣</view>
			</view>
			<image class="tuandjt" src="../../static/jiant4.png"></image>
		</view> -->
		<view class="mokdi juzho">
			<view class="fabye" @click="fbye">
				<view class="fanr">
					<view class="wztm">发布余额</view>
					<view class="jyauscz">立即充值＞</view>
				</view>
				<view class="zgsqian">{{userData.IssueMoney}}<text>元</text></view>
			</view>
			<view class="yonjyue" @click="tiye">
				<view class="fanr">
					<view class="wztm">佣金余额</view>
					<view class="jyauscz">立即提现＞</view>
				</view>
				<view class="zgsqian">{{userData.CommissionMoney}}<text>元</text></view>
			</view>
		</view>
		<view class="daoht juzho">
			<view class="wdrwbt">
				<view class="qiswdw1">我的任务</view>
				<view class="qiswdw2" @click="wdrw(0)">查看全部</view>
				<image class="grjt" src="../../static/grjt1.png"></image>
			</view>
			<view class="shouwdrw">
				<view class="mkmjg" @click="wdrw(0)">
					<image class="juzho" src="../../static/gr1.png"></image>
					<view class="zmkwzo">待提交</view>
				</view>
				<view class="mkmjg" @click="wdrw(1)">
					<image class="juzho" src="../../static/gr2.png"></image>
					<view class="zmkwzo">待审核</view>
				</view>
				<view class="mkmjg" @click="wdrw(2)">
					<image class="juzho" src="../../static/gr3.png"></image>
					<view class="zmkwzo">已通过</view>
				</view>
				<view class="mkmjg" @click="wdrw(3)">
					<image class="juzho" src="../../static/gr4.png"></image>
					<view class="zmkwzo">未通过</view>
				</view>
				<view class="mkmjg" @click="wdrw(5)">
					<image class="juzho" src="../../static/gr5.png"></image>
					<view class="zmkwzo">投诉中</view>
				</view>
			</view>
		</view>
		<view class="wdfabdiv juzho" @click="tiaozsj">
			<image class="qhhj" src="../../static/grz1.png"></image>
			<view class="rydzj">我的发布</view>
			<view class="wzmhxdqp">上热门</view>
			<image class="rgbj" src="../../static/grjt1.png"></image>
		</view>
		<view class="wyjzj juzho">
			<view class="rgkyht" @click="yaoqhy">
				<image class="qhhj" src="../../static/grz2.png"></image>
				<view class="rydzj">邀请好友</view>
				<view class="wzmhxdqp">好友越多，赚钱越快</view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
			<view class="zgsxiana juzho"></view>
			<view class="rgkyht" @click="banzj">
				<image class="qhhj" src="../../static/grz3.png"></image>
				<view class="rydzj">我的客服</view>
				<view class="wzmhxdqp"></view>
				<image class="rgbj" src="../../static/grjt1.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			//用户数据
			userData: ""
		},
		methods: {
			//个人详情
			releaseF: function() {
				uni.navigateTo({
					url: '/pages/shang/shang'
				});
			},
			//编辑个人信息
			bjsz: function() {
				uni.navigateTo({
					url: '/pages/personal/editor/editor'
				});
			},
			//提现余额
			tiye: function() {
				uni.navigateTo({
					url: '/pages/tixmoney/tixmoney'
				});
			},
			//发布余额
			fbye: function() {
				uni.navigateTo({
					url: '/pages/fabumoney/fabumoney'
				});
			},
			//我的任务
			wdrw: function(id) {
				uni.navigateTo({
					url: '/pages/wdtask/wdtask?id=' + id
				});
			},
			//发布管理
			tiaozsj: function() {
				uni.navigateTo({
					url: '/pages/taskzx/taskzx'
				});
			},
			//帮助中心
			banzj: function() {
				uni.navigateTo({
					url: '/pages/service/service'
				});
			},
			//开通VIP
			ktvip: function() {
				uni.navigateTo({
					url: '/pages/vippage/vippage'
				});
			},
			//邀请好友
			yaoqhy: function() {
				uni.navigateTo({
					url: '/pages/invitation/invitation'
				});
			}
		}
	}
</script>

<style>
	@import '../../common/css/personal.css';

	/* 等级背景图 */
	.beijtc {
		background-image: url(~@/static/vipbj2.png);
		background-size: contain;
	}
</style>
