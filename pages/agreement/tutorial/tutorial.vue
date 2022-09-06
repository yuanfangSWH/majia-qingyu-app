<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view style="width: 100%;height: 30upx;background-color: #F8F8F8;"></view>
		<view class="biaowz">
			<text style="font-weight: bold;color: #101010;">1、选择接单任务</text>
			<br />
			<view style="line-height: 48upx;">进入 app首页可按任务类型或系统推荐的任务，选择适合自己的任务，新人建议先从难度较低的任务开始</view>
			<br />
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;padding-bottom: 70upx;" mode="widthFix" src="../../../static/jiaocimg1.png"></image>
			<text style="font-weight: bold;color: #101010;">2、阅读任务要求</text>
			<br />
			<view style="line-height: 48upx;">
				打开任务详情
				<text style="color: #FF9000;">阅读相关条件</text>
				限制，操作步骤、审核时间等相关内容，如符合条件可立即抢单开始任务
			</view>
			<br />
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;padding-bottom: 70upx;" mode="widthFix" src="../../../static/jiaocimg2.png"></image>
			<text style="font-weight: bold;color: #101010;">3、上传提交验证</text>
			<br />
			<view style="line-height: 48upx;">
				按任务要求过程中
				<text style="color: #FF9000;">保存相关截图</text>
				，请按照
				<text style="color: #FF9000;">规定的时间内上传</text>
				任务要求提交的截图或数据，如任务超时未提交会自动过期失效，请勿提交虚假/重复/与任务无关截图，如遇举报立即封号。
			</view>
			<br />
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;padding-bottom: 70upx;" mode="widthFix" src="../../../static/jiaocimg3.png"></image>
			<text style="font-weight: bold;color: #101010;">4、审核发放佣金</text>
			<br />
			<view style="line-height: 48upx;">
				任务提交完成后可在
				<text style="color: #FF9000;">个人中心-我的任务</text>
				查看任务状态，等待审核商家通过后发放佣金，如商家超时未审核将自动发放佣金。
			</view>
			<br />
			<image style="display: block;margin-left: auto;margin-right: auto;width: 100%;padding-bottom: 70upx;" mode="widthFix" src="../../../static/jiaocimg4.png"></image>
			<text style="font-weight: bold;color: #101010;">5、接单防骗指南</text>
			<br />
			<view style="line-height: 48upx;">（1）任何需要加QQ/微信/群领取任务的请警惕！十有八九是骗局！</view>
			<br />
			<view style="line-height: 48upx;">（2）任务过程中有“领取红包/必赚”等需要投资金钱进去的任务！投资有风险！请警惕！</view>
			<br />
			<view style="line-height: 48upx;">
				（3）
				<text style="font-weight: bold;color: #101010;">平台不会以官方身份发布任何任务</text>
				，不要相信/添加任何打着官方名义的群聊或客服，谨防上当受骗，过程中遇到有违法/违规/无法完成的任务，可向客服举报
			</view>
			<br />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//标题
			title: '接单教程',
			//返回图片路径
			path: '../../../static/jiant.png'
		};
	},
	methods: {}
};
</script>

<style>
.biaot {
	width: 100%;
	height: 120upx;
	line-height: 120upx;
	font-size: 40upx;
	color: #000000;
	text-align: center;
	padding-top: 30upx;
}
.biaowz {
	margin-left: 50upx;
	margin-right: 50upx;
	line-height: 40upx;
	font-size: 28upx;
	color: #8f8f8f;
	padding-top: 60upx;
	padding-bottom: 60upx;
}
</style>
