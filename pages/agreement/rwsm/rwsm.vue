<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="biaowz">
			<text style="font-weight: bold;color: #101010;">一、任务关闭后退款说明</text><br>
			<view style="line-height: 48upx;">1. 如果有未接单的任务（即剩余任务），任务对应的余额会立刻退回到钱包。

2. 如果有已接单未提交截图的任务，任务对应的余额会暂时冻结。如果接单的任务在提交限时内没有提交截图，余额会直接退回您的钱包；如果用户接单后提交截图，余额会继续冻结，您需要对任务进行审核。

3. 如果有等待审核的任务，任务对应的余额会暂时冻结。审核通过后，余额自动转入对方账户；审核不通过，对应的余额会继续冻结。

4. 如果有审核不通过的任务，对应任务的余额会暂时冻结。如果接单用户没有提交复审/申诉，冻结的余额会在任务关闭48小时后退回；如果用户进行申诉，冻结的余额会在人工客服复审之后结算。</view><br>
			<text style="font-weight: bold;color: #101010;">二、任务审核说明</text><br>
			<view style="line-height: 48upx;">1. 用户完成任务上传截图，您需要及时对截图进行审核。如果超过、审核限时未审核，任务会自动审核通过。

2. 审核任务时，请按照自己的上传收集截图的信息和用户截图认真审核。（特别提示：由于安卓手机和苹果手机、网页和App内的不同，用户提交的截图可能会存在差异，请以实际情况进行审核。）

3. 审核任务时，可以对比用户提交时间和截图上显示的时间，截图时间应该在提交时间之前，时间间隔一般不会超过10分钟。

4. 如果您上传了错误的验证图，而用户按照验证图的提示上传了对应的截图。即使截图与您的预期不符，您也应该审核通过。

5. 任务审核通过，余额会自动转入对方的账号；任务审核不通过，任务对应的余额会暂时冻结，在48小时内按照申诉和人工复审的结果进行结算。

6. 如果用户完成任务并正确截图上传，您恶意审核不通过，您的账号将会被封禁，账户清零。</view><br>
			<text style="font-weight: bold;color: #101010;">三、任务发布规范说明</text><br>
			<view style="line-height: 48upx;">1.禁止发布黄、赌、毒及一切政策法律禁止的内容。

2.禁止发布本平台邀请码任务。

3.禁止发布金币交易任务。

4.禁止发布微信支付宝转账任务。

5.禁止发布微信解封、微信辅助任务。

6.禁止发布涉及用户隐私任务：帮他人账号实名、手机号实名、实名或绑卡后提交相关账号密码（如私人登陆密码、交易密码、密钥等）、设置指定密码悬赏禁止发布。禁止以任何形式私人（客服、表单、自制网页等）收集用户手持身份证、身份证照片、身份证号、护照、银行卡号、验证码等涉及用户隐私的悬赏。

7.禁止发布违背公序良俗及不合规任务：需要帮忙刷数据、做假数据、套奖励、举报某个平台等违背公序良俗，或可能导致推广平台受损的禁止发布。预定时间内用户根本无法达到要求、条件苛刻无法完成、存在概率随机性质等禁止发布。若因此产生纠纷需商家负责。

8.普遍举报较多、可能导致用户损失的任务禁止发布：推广平台中包含诱导兼职、赚钱APP、挂机赚钱APP、支付宝扫码后授权、个人公众号、加群加好友、借款网贷类等悬赏一律禁止发布。商家要对自己发布的悬赏负责。一旦出问题商家为第一责任人。部分风险较高的悬赏仅限会员发布；

9.为防止悬赏风险较高，需要用户出资（包括但不限于：投资、理财、消费等）类悬赏，不得大于500元，同时若投资收益率大于20%也禁止发布；

10.特别提醒：凡是以农场（买鸡）、牧场（买树）、渔场（买鱼）、充值vip每天返还N元、挖矿（买矿机）、虚拟币、区块链、代打、垫付、暂扣、冻结等，以【购买某商品】名义之后可以N天可以返还（具体返还形式不限），此类可能导致用户财产损失的任务不属于理财投资类，一律禁止发布。（打卡返利类任务打卡金额不超过2元可发布）

11.同类悬赏过多时会禁止新发布：为保证平台市场环境正常运营，当同类悬赏平台过多时会禁止新发布；

12.网赚类悬赏谨慎推广、竞品禁止推广：网赚类悬赏可能无法得到很好的曝光。轻鱼竞品（竞争关系）禁止推广。定义：根据推广平台主营业务判断，若用户在体验主营业务过程中顺便赚钱则属于网赚；若推广平台的用户可以完成任务来赚钱则属于竞品。

13.同一个悬赏只能发布一个：相同的悬赏（不区分是否是同一个邀请人）只能同时展示一个 ；

14.禁止发布引流、无实际意义悬赏（例：关注商家、转账、高价引流、浏览其它悬赏等）；

15.禁止发布敏感、存在概率、有随机性质的悬赏；在同一悬赏中禁止推广两个或多个APP；有低俗或涉嫌违法广告的；用户需要邀请好友或邀请好友完成指定操作后才可完成的悬赏，所发悬赏，用户可以独立完成并提交。

如果您发布这些类型的任务，轻鱼平台会自动关闭您的任务并且给予警告。如果严重违规，您的账号将会被封禁，账号内的余额不会退回。</view><br>
			<text style="font-weight: bold;color: #101010;">四、任务关闭情况说明</text><br>
			<view style="line-height: 48upx;">1. 在任务有效时间内，您的任务被接单完成，任务会自动结束关闭。

2. 如果您的任务超过有效时间，任务到期会自动关闭。

3. 您可以在我的任务页面找到对应的任务，点击关闭任务主动结束该任务。

4. 如果您发布的任务违规，平台会自动关闭该任务。

5.任务结束不影响任务审核，需要继续审核任务。</view><br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "任务说明",
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
