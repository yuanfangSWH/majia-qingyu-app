<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view style="width: 100%;height: 30upx;background-color: #F8F8F8;"></view>
		<view class="biaowz">
			<text style="font-weight: bold;color: #101010;">1、什么是团队？</text><br>
			<view style="line-height: 48upx;">你的团队包括您自己和您的直邀好友与他的无限下级</view><br>
			<text style="font-weight: bold;color: #101010;">2、关于团队收益</text><br>
			<view style="line-height: 48upx;">（1）团队成员在app内完成每个悬赏任务获得的奖励金额都会累计成为您的团队业绩。</view><br>
			<view style="line-height: 48upx;">（2）平台将根据您每月的团队总业绩，按下表的要求确定您的奖励系数并计算您的团队业绩奖，业绩奖计算方法=个人业绩*奖励系数+团队业绩*奖励系数差（其中：奖励系数差=本人直邀好友的奖励系数之差）</view><br>
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;" mode="aspectFit"  src="../../../static/guizwf.png"></image>
			<view style="line-height: 48upx;">（3）团队业绩奖按自然月发放，次月第一个工作日发放上月团队奖</view><br>
			<view style="line-height: 48upx;">（4）当团队成员级别高于或等于上级推荐人时，您拿不到该团队奖励</view><br>
			<view style="line-height: 48upx;">（5）X5合伙人享有下级X5合伙人团队业绩的1%，二级X5合伙人的0.5%作为平级奖，平级奖发放时间与团队奖发放时间一致。</view><br>
			<view style="line-height: 48upx;">（6）公司保留在法律允许范围内对规则的解释和修改权。</view><br>
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;" mode="aspectFit" src="../../../static/guizjl.png"></image>
			<view>某自然月内，A的团队总业绩为51万元，团队等级为</view>
			<view>X5（5%）其中：</view>
			<view>>>A的本人返佣为20000元</view>
			<view>>>下属团队a1，返佣为300000元，等级X4（4%）</view>
			<view>>>下属团队a2，返佣为100000元，等级X3（3%）</view>
			<view>>>下属团队a2，返佣为90000元，等级X3（3%）</view>
			<view>>>A的奖金=20000*5%+300000*（5%-4%）</view>
			<view>+100000*（5%-3%）+90000*（5%-3%）</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "团队玩法",
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
