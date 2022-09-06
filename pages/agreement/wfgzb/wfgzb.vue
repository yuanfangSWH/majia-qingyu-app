<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view style="width: 100%;height: 30upx;background-color: #F8F8F8;"></view>
		<view class="biaowz">
			<text style="font-weight: bold;color: #101010;">1、如何邀请好友？</text><br>
			<view style="line-height: 48upx;">好友通过您的分享链接、二维码等官方邀请方式下载轻鱼app的新用户，将自动成为您的好友。</view><br>
			<text style="font-weight: bold;color: #101010;">2、邀好友必得11元</text><br>
			<view style="line-height: 48upx;">即app上线起，新邀请的每个好友完成首个悬赏任务奖励1元/人，新邀请的好友首次提现成功奖励2元，新邀请的好友第2次提现成功奖励2元，新邀请的好友第3次提现成功奖励2元，新邀请的好友第4次提现成功奖励2元，新邀请的好友第5次提现成功奖励2元，即每邀请1位新好友可赚11元扶持奖励。</view><br>                        
			<text style="font-weight: bold;color: #101010;">3、永久任务分成</text><br>
			<view style="line-height: 48upx;">好友每审核通过1个任务您都可获得系统额外奖励，直邀好友可为您贡献该任务奖励金额的8%，扩散好友可为您贡献该任务奖励金额的2%，上不封顶。</view><br>
			<text style="font-weight: bold;color: #101010;">4、app道具分成</text><br>
			<view style="line-height: 48upx;">好友购买超级会员你可以获得30%提成，app内购买道具、上推荐，你可以获得10%提成，仅限直邀好友。</view><br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "好友玩法",
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
