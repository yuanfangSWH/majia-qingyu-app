import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		//用户信息
		userData: {
			//ID
			Id: "",
			//手机号
			Mobile: "",
			//发布余额
			IssueMoney: "",
			//佣金余额
			CommissionMoney: "",
			//是否是新用户(0:显示|1:不显示)
			RookieTaskHit: "",
			//粉丝数量
			FansCount: "",
			//关注数量
			FocusCount: "",
			//评论数量
			CommentCount: "",
			//发布任务数量
			TaskIssueCount: "",
			//完成任务数量
			TaskDoneCount: "",
			//是否Plus会员(0:不是|1:是)
			PlusMember: "",
			//Plus到期时间
			PlusEndTime: "",
			//微信信息，Openid
			Openid: "",
			//微信信息，昵称
			Nickname: "",
			//微信信息，性别
			Sex: "",
			//微信信息，城市
			City: "",
			//微信信息，头像
			Headimgurl: "",
			//计算佣金用倍率
			issue_rate:"",
			//邀请用户是否达到提现标准
			CanTX:""
		},
		//发布任务的预览参数
		taskData: {
			//项目类型
			xmlxData: "",
			//项目名字
			minziData: "",
			//任务标题
			rwbtData: "",
			//任务链接
			rwljData: "",
			//提交数据（选填）
			usermane: "",
			//上传的数据组集合
			superData: []
		},
		//金额数据
		moneyData: {
			//任务标题
			title: "",
			//需要支付的价格
			usData: "",
			//任务总价格
			basisData: "",
			//加速包价格
			speedData: "",
			//投放单价
			tfdjData: "",
			//投放数量
			tfslData: "",
			//订单ID
			orderID: "",
			//订单支付ID
			payId: ""
		},
		//登录数据
		loginData: {
			//微信code
			wxcode:"",
			//微信id
			wxid: "",
			//uuid
			uuid: "",
			//手机号
			mobile: ""
		},
		//悬赏弹框数据
		Areward: {
			//是否弹窗
			is_alert: "",
			//是否是VIP
			is_vip: "",
			//头像url
			headImg: "",
			//任务ID
			task_id: "",
			//任务标题
			task_title: "",
			//任务赏金
			task_price: ""
		},
		//邀请好友海报数据
		HibData: [],
		//邀请好友页面数据
		TuiJieData: [],
		//分享任务的数据
		shareImagData:[]
	},
	mutations: {
		//保存用户信息参数
		saveUser(state, provider) {
			state.userData.Id = provider.Id;
			state.userData.Mobile = provider.Mobile;
			state.userData.IssueMoney = provider.IssueMoney;
			state.userData.CommissionMoney = provider.CommissionMoney;
			state.userData.RookieTaskHit = provider.RookieTaskHit;
			state.userData.FansCount = provider.FansCount;
			state.userData.FocusCount = provider.FocusCount;
			state.userData.CommentCount = provider.CommentCount;
			state.userData.TaskIssueCount = provider.TaskIssueCount;
			state.userData.TaskDoneCount = provider.TaskDoneCount;
			state.userData.PlusMember = provider.PlusMember;
			state.userData.PlusEndTime = provider.PlusEndTime;
			state.userData.Openid = provider.Openid;
			state.userData.Nickname = provider.Nickname;
			state.userData.Sex = provider.Sex;
			state.userData.City = provider.City;
			state.userData.Headimgurl = provider.Headimgurl;
			state.userData.issue_rate = provider.issue_rate;
			state.userData.CanTX = provider.CanTX;
		},
		//保存发布任务的预览参数
		task(state, provider) {
			state.taskData.xmlxData = provider.xmlxData;
			state.taskData.minziData = provider.minziData;
			state.taskData.rwbtData = provider.rwbtData;
			state.taskData.rwljData = provider.rwljData;
			state.taskData.usermane = provider.usermane;
			state.taskData.superData = provider.superData;
		},
		//保存发布任务的金额参数
		money(state, provider) {
			state.moneyData.usData = provider.usData;
			state.moneyData.basisData = provider.basisData;
			state.moneyData.speedData = provider.speedData;
		},
		//保存投放单价
		bctfdj(state, provider) {
			state.moneyData.tfdjData = provider;
		},
		//保存投放数量
		bctfsl(state, provider) {
			state.moneyData.tfslData = provider;
		},
		//保存任务标题
		bctitle(state, provider) {
			state.moneyData.title = provider;
		},
		//保存订单ID
		orderData(state, provider) {
			state.moneyData.orderID = provider;
		},
		//保存订单支付ID
		payData(state, provider) {
			state.moneyData.payId = provider;
		},
		//保存支付总金额
		payUsData(state, provider) {
			state.moneyData.usData = provider;
		},
		//保存微信code
		bcwxcode(state, provider) {
			state.loginData.wxcode = provider;
		},
		//保存微信ID
		bcwx(state, provider) {
			state.loginData.wxid = provider;
		},
		//保存UUID
		bcuuid(state, provider) {
			state.loginData.uuid = provider;
		},
		//保存手机号
		bcsjh(state, provider) {
			state.loginData.mobile = provider;
		},
		//保存分享悬赏弹框数据
		ArewardBC(state, provider) {
			state.Areward.is_alert = provider.is_alert;
			state.Areward.is_vip = provider.is_vip;
			state.Areward.headImg = provider.headImg;
			state.Areward.task_id = provider.task_id;
			state.Areward.task_title = provider.task_title;
			state.Areward.task_price = provider.task_price;
		},
		//设置分享悬赏弹框在应用生命周期里不再显示
		ArewardQX(state, provider) {
			state.Areward.is_alert = provider;
		},
		//邀请好友海报数据
		HibSave(state, provider) {
			state.HibData = provider;
		},
		//邀请好友页面数据
		TuiJieSave(state, provider) {
			state.TuiJieData = provider;
		},
		//分享任务的数据
		shareImag(state, provider) {
			state.shareImagData = provider;
		}
	}
})
export default store
