<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="tobu">
			<view>
				<view class="touxdiv2">
					<image class="tox" :src="userData.Headimgurl"></image>
					<image class="zhesvvv" v-if="userData.PlusMember == 1" src="../../../static/v.png"></image>
				</view>
			</view>
			<view>
				<view class="minc">{{ titleData }}</view>
				<view class="sbiao">
					<view class="sbiao1">
						￥
						<text class="sbiao2">{{ moneyData.tfdjData }}</text>
					</view>
					<view class="sbsl">
						x
						<text class="sbsl1">{{ moneyData.tfslData }}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 		<view class="rwjs">
			<view class="zffs1">任务加速包</view>
			<view class="rwjs1">￥<text class="yfje2">{{moneyData.speedData}}</text></view>
		</view> -->
		<view class="zffsbj">
			<view class="zffs">
				<view class="zffs1">支付方式</view>
				<view class="yfje">
					应付金额:
					<text class="yfje1">￥</text>
					<text class="yfje2">{{ moneyData.usData }}</text>
				</view>
			</view>

			<view class="zfb" @tap="paytype = 1">
				<view class="left">
					<image class="tishit" src="../../../static/zfb.png"><text class="xianzzt">支付宝支付</text></image>
				</view>
				<view class="right"><radio :checked="paytype == 1" color="#FCBB67" /></view>
			</view>

			<view class="wx" @tap="paytype = 2">
				<view class="left">
					<image class="tishit" src="../../../static/wx.png"><text class="xianzzt">微信支付</text></image>
				</view>
				<view class="right"><radio :checked="paytype == 2" color="#FCBB67" /></view>
			</view>
			<view class="wx" @tap="paytype = 3">
				<view class="left">
					<image class="tishit" src="../../../static/fbyl.png">
						<text class="xianzzt">
							发布余额支付
							<text class="fabwjq">￥{{ userData.IssueMoney }}</text>
						</text>
					</image>
				</view>
				<view class="right"><radio :checked="paytype == 3" color="#FCBB67" /></view>
			</view>
			<view class="qdbj">
				<view class="dibujrjk" @click="following()">确定支付{{ moneyData.usData }}元</view>
			</view>
		</view>
	</view>
</template>

<script>
import Navigation from '@/pages/navigation/navigation';
export default {
	components: {
		Navigation
	},
	data() {
		return {
			//标题
			title: '确认支付',
			//返回图片路径
			path: '../../../static/jiant.png',
			//支付类型
			paytype: 1,
			//金额数据
			moneyData: {
				//需要支付的价格
				usData: '',
				//投放单价
				tfdjData: '',
				//投放数量
				tfslData: '',
				//订单支付ID
				payId: ''
			},
			//执行方法
			executive: true,
			//任务标题
			titleData: '',
			//用户数据
			userData: ''
		};
	},
	//页面加载时
	onLoad() {
		this.moneyF();
		this.loadingUser();
	},
	methods: {
		//VUEX获取金钱数据
		moneyF: function() {
			//需要支付的价格
			var usData = Number(this.$store.state.moneyData.usData);
			this.moneyData.usData = usData.toFixed(2);
			//投放数量
			this.moneyData.tfslData = this.$store.state.moneyData.tfslData;
			//投放单价
			var money = this.$store.state.moneyData.tfdjData;
			//投放单价
			this.moneyData.tfdjData = Number(money.toFixed(2));
			//订单标题
			this.titleData = this.$store.state.moneyData.title;
			//订单支付ID
			this.moneyData.payId = this.$store.state.moneyData.payId;
		},
		//用户数据
		loadingUser: function() {
			//从VUEX获取到用户数据
			this.userData = this.$store.state.userData;
			if (this.userData.Id == '') {
				this.$api.loadingUser((status, code, res) => {
					if (status) {
						//把用户信息存入VUEX
						this.$store.commit('saveUser', res.obj);
						this.userData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		},
		//点击支付
		following: function() {
			if (this.executive) {
				this.executive = false;
				if (this.paytype == 3 && this.moneyData.usData > this.userData.IssueMoney) {
					uni.showToast({
						title: '发布余额不足，支付失败！',
						icon: 'none',
						duration: 2000
					});
				} else {
					var data = {
						//支付类型1支付宝2微信3余额
						pay_type: this.paytype,
						//购买类型1购买会员2发布任务3购买加速包
						buy_type: 2,
						//订单ID
						order_sn: this.moneyData.payId
					};
					this.$api.apiPost('/pay/taskissuepay', '', data, 'post', (status, code, res) => {
						if (status) {
							this.executive = true;
							if (this.paytype == 1) {
								//支付宝支付
								this.orderZF('alipay', res.obj.orderInfo);
							} else if (this.paytype == 2) {
								//微信支付
								this.orderZF('wxpay', res.obj.wxpay);
							} else if (this.paytype == 3) {
								uni.redirectTo({
									url: '/pages/task/success/success?value=update'
								});
							}
						} else {
							this.executive = true;
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					});
				}
			}
		},
		//调起API支付
		orderZF: function(serviceData, order) {
			if (this.paytype == 2) {
				order = JSON.stringify(order);
			}
			uni.requestPayment({
				provider: serviceData,
				orderInfo: order, //订单数据
				success: function(res) {
					uni.redirectTo({
						url: '/pages/task/success/success'
					});
				},
				fail: function(err) {
					uni.showToast({
						title: '支付关闭',
						icon: 'none',
						duration: 2000
					});
				}
			});
		}
	}
};
</script>

<style>
@import '../../../common/css/confirm.css';

@font-face {
	font-family: light;
	src: url('~@/static/DIN-Light.otf');
}

/* body属性 */
page {
	background-color: #f8f8f8;
}

.yfje2 {
	font-family: light;
}

.sbiao2 {
	font-family: light;
}

.sbsl1 {
	font-family: light;
}
</style>
