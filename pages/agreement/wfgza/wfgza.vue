<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view style="width: 100%;height: 30upx;background-color: #F8F8F8;"></view>
		<view class="biaowz">
			<text style="font-weight: bold;color: #101010;">1、什么是分享红包？</text><br>
			<view style="line-height: 48upx;">轻鱼红包广告系统（以下简称分享红包），开放给所有用户，目的是让用户在做任务的同时还可以参与到平台广告利润分成。</view><br>
			<text style="font-weight: bold;color: #101010;">2、如何获得分享红包？</text><br>
			<view style="line-height: 48upx;">（1）把商家发布的任务转发到朋友圈/微信群，好友有效浏览了任务就可获得相应的红包奖励，转发后自己浏览和让好友“帮看”都不计算收入。</view><br>
			<view style="line-height: 48upx;">（2）投放了分享红包的任务会在任务详情中提示，根据提示可进入该任务红包详情。</view><br>
			<view style="line-height: 48upx;">（3）我们希望通过分享红包帮助商家扩大任务曝光范围，若发现用户有恶意作弊行为，一律封禁账号并扣除账户所余额。</view><br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "红包玩法",
				//返回图片路径
				path: "../../../static/jiant.png",
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.biaot{
	width: 100%;
	height: 120upx;
	line-height: 120upx;
	font-size: 40upx;
	color: #000000;
	text-align: center;
	padding-top: 30upx;
}
.biaowz{
	margin-left: 50upx;
	margin-right: 50upx;
	line-height: 40upx;
	font-size: 28upx;
	color: #8f8f8f;
	padding-top: 60upx;
	padding-bottom: 60upx;
}
</style>
