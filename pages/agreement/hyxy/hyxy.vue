<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="biaowz">
			总则<br>
			
			1.轻鱼是一款推广工具类产品。<br>
			
			2.本服务条款约定轻鱼与您之间关于“会员”服务的各项事项。“会员”是指注册、登录、使用本服务条款中轻鱼提供的各种服务的个人。会员服务是有偿的增值服务，会员必须完全同意本服务条款，并完成付费，才能享受相关服务。<br>
			
			3.在您注册成为会员之前，请认真阅读本《会员服务协议》（以下简称“服务协议”），确保您充分理解服务协议中各条款，包括免除轻鱼责任的条款及限制会员权利的条款。请您审慎阅读并选择接受或不接受本服务协议。除非您接受本服务协议所有条款，否则您不得注册、登录或使用本服务协议所涉服务。您的注册、登录、使用等行为将视为对本服务协议的接受，并同意接受本服务协议各项条款的约束。<br>
			
			4.本服务协议可由轻鱼随时更新，更新后的服务协议一旦公布即代替原来的服务协议，恕不再另行通知，用户可在应用内查阅最新版服务协议。<br>
			
			服务费用<br>
			
			1.会员资格以月为单位计算（每月按30天计算），用户应通过一次性支付的方式购买会员服务。轻鱼将根据不同的购买方式和数量，向用户提供不同幅度的优惠，具体优惠信息以会员购买支付页上内容为准。<br>
			
			2.轻鱼可以根据实际情况随时调整会员服务费用标准，经调整的会员服务费用标准将在会员资格支付页上显示，用户按调整后的服务费用标准支付后方可享有或延续会员资格。已按原会员服务费用标准购买会员服务的用户，其会员资格以及所享有的会员服务在已取得的会员资格期限内不受影响，无需补充缴纳差额。<br>
			
			服务内容<br>
			
			1.轻鱼将为会员提供多种专享的增值服务，具体内容将在会员页面显示。<br>
			
			2.轻鱼可以根据实际情况随时调整会员服务内容。<br>
			
			服务的开通和期限<br>
			
			1.本服务开通之后，不可进行转让或退订。 您不得通过以下任何方式为自已或他人开通本服务：<br>
			
			以营利、经营等非个人使用的目的为自己或他人开通本服务；<br>
			
			①过任何机器人软件、蜘蛛软件、爬虫软件、刷屏软件等任何程序、软件方式为自己或他人开通本服务；<br>
			
			②通过任何不正当手段或以违反诚实信用原则的方式为自己或他人开通本服务；<br>
			
			③通过非轻鱼指定的方式为自己或他人开通本服务；<br>
			
			④通过侵犯轻鱼或他人合法权益的方式为自己或他人开通本服务；<br>
			
			⑤通过其他违反相关法律、行政法规、国家政策等的方式为自己或他人开通本服务；<br>
			
			⑥会员的服务期限以您自行选择并支付相应服务费用的期限为准，您可以在会员购买页面查看；<br>
			
			权利和义务<br>
			
			1.会员在会员资格有效期内可以享受会员的各项增值服务。<br>
			
			2.如会员在会员资格有效期内主动终止或取消会员资格，轻鱼不负责退还与该会员剩余会员资格有效期对应的服务费用。<br>
			
			3.因不可抗力造成会员服务提供的中断或其它缺陷，轻鱼不承担任何责任，但将尽力减少因此给会员造成的损失和影响。<br>
			
			4.本服务协议的解释，效力及纠纷的解决，适用中华人民共和国法律。若会员和轻鱼之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，会员同意将纠纷或争议提交轻鱼所地有管辖权的人民法院管辖。<br>
			
			5.本服务协议的版权由轻鱼所有，轻鱼保留一切解释和修改的权利。<br>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "会员协议",
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
