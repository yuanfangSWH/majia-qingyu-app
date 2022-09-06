<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			消息
		</view>
		<!-- <view class="gaozkq">
			<view class="tistuis">推送通知未开启，会错过重要消息哦！<text @click="qianSZ">前往设置</text></view>
			<image src="../../static/wyxtb.png"></image>
		</view> -->
		<view class="zhexgu" @click="xinayu" v-if="SmallAssistant!=''&&SmallAssistant!=null">
			<view class="tes_zgtxdiv">
				<image class="xiaotx" src="../../static/xttz1.png"></image>
			</view>
			<view class="zlwznr">
				<view class="yiz1">
					<view class="tozw1">轻鱼小助手</view>
					<view class="tozw2"></view>
				</view>
				<view class="yiz2">
					<view class="cmb">
						<view class="zgswnr">官方公告</view>
					</view>
					<view class="dsshul" v-show="SmallAssistant.count!=0"></view>
				</view>
			</view>
		</view>
		<view class="zhexgu" @click="fabtz" v-if="IssueTaskMsg!=''&&IssueTaskMsg!=null">
			<view class="tes_zgtxdiv">
				<image class="xiaotx" src="../../static/xttz2.png"></image>
			</view>
			<view class="zlwznr">
				<view class="yiz1">
					<view class="tozw1">任务通知</view>
					<view class="tozw2">{{IssueTaskMsg.mi.CreateTime}}</view>
				</view>
				<view class="yiz2">
					<view class="cmb">
						<view class="zgswnr">{{IssueTaskMsg.mi.MsgName}}</view>
					</view>
					<view class="dsshul" v-show="IssueTaskMsg.count!=0"></view>
				</view>
			</view>
		</view>
		<view class="zhexgu" @click="rwtz" v-if="ReceiveTaskMsg!=''&&ReceiveTaskMsg!=null">
			<view class="tes_zgtxdiv">
				<image class="xiaotx" src="../../static/xttz3.png"></image>
			</view>
			<view class="zlwznr">
				<view class="yiz1">
					<view class="tozw1">接单通知</view>
					<view class="tozw2">{{ReceiveTaskMsg.mr.CreateTime}}</view>
				</view>
				<view class="yiz2">
					<view class="cmb">
						<view class="zgswnr">{{ReceiveTaskMsg.mr.MsgName}}</view>
					</view>
					<view class="dsshul" v-show="ReceiveTaskMsg.count!=0"></view>
				</view>
			</view>
		</view>
		<view class="zhexgu" @click="xttz" v-if="SysMsg!=''&&SysMsg!=null">
			<view class="tes_zgtxdiv">
				<image class="xiaotx" src="../../static/xttz4.png"></image>
			</view>
			<view class="zlwznr">
				<view class="yiz1">
					<view class="tozw1">系统通知</view>
					<view class="tozw2">{{SysMsg.ms.CreateTime}}</view>
				</view>
				<view class="yiz2">
					<view class="cmb">
						<view class="zgswnr">{{SysMsg.ms.MsgName}}</view>
					</view>
					<view class="dsshul" v-show="SysMsg.count!=0"></view>
				</view>
			</view>
		</view>
		<!-- 下面为用户消息 -->
		<view class="zhexgu" v-for="(item, key) in information" :key="key" v-if="information!=''&&information!=null">
			<view class="zgtxdiv">
				<image class="xiaotx" :src="item.Headimgurl"></image>
			</view>
			<view class="zlwznr">
				<view class="yiz1">
					<view class="tozw1">{{item.UserName}}</view>
					<view class="tozw2">{{item.CreateTime}}</view>
				</view>
				<view class="yiz2">
					<view class="cmb">
						<view class="zgswnr">{{item.MsgName}}</view>
					</view>
					<view class="dsshul" v-show="item.count!=0"></view>
				</view>
			</view>
		</view>
		
		<view style="width: 100%;height: 163upx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			//轻鱼小助手数据
			SmallAssistant:"",
			//发布通知数据
			IssueTaskMsg:"",
			//任务通知数据
			ReceiveTaskMsg:"",
			//系统通知数据
			SysMsg:"",
			//用户消息数据
			information: ""
		},
		methods: {
			//前往设置
			qianSZ:function(){
				uni.navigateTo({
					url: '/pages/personal/editor/editor'
				});
			},
			//轻鱼小助手
			xinayu: function() {
				uni.navigateTo({
					url: '/pages/announcement/announcement'
				});
			},
			//发布通知
			fabtz: function() {
				uni.navigateTo({
					url: '/pages/message/Informmanagement/Informmanagement'
				});
			},
			//任务通知
			rwtz: function() {
				uni.navigateTo({
					url: '/pages/message/informreceive/informreceive'
				});
			},
			//系统通知
			xttz: function() {
				uni.navigateTo({
					url: '/pages/message/informsystem/informsystem'
				});
			}
		}
	}
</script>

<style>
	@import '../../common/css/message.css';
</style>
