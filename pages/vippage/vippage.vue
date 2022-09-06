<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="toubu">
			<view class="zhuyhxmk">
				<view class="mik1">
					<view class="tuxdiv"><image class="touximg" :src="userData.Headimgurl"></image></view>
					<view class="wzmk">
						<view class="yonnc">轻鱼会员</view>
						<view class="wktm">
							<text v-if="userData.PlusMember == 0">未开通</text>
							<text v-else>{{ userData.PlusEndTime }}</text>
						</view>
					</view>
				</view>
				<view class="tism">
					<image src="../../static/vtub.png"></image>
					<view class="wzlbq">无限任务发布次数/商家服务费低至15%/提现减免手续费3%</view>
				</view>
			</view>
			<view class="ysey"></view>
		</view>
		<view class="taocbt juzho">
			<view class="wzxy">选择套餐</view>
			<view class="huiyxy" @click="hyxy">会员服务协议></view>
		</view>
		<view class="wdtjrw">
			<view class="wmjtsqtoo" :style="{ width: widthData + 'upx' }">
				<view class="zgsjiaoq" :class="{ xuanzl: choose == key }" v-for="(item, key) in vipData" :key="key" @click="xuanz(key)">
					<view class="tibto" :class="{ blwfwz1: choose == key }">{{ item.Time }}</view>
					<view class="bltzmb juzho" :class="{ xlndbj: choose == key }">
						<view class="taocwz1" :class="{ blwfwz2: choose == key }">
							<text>￥</text>
							{{ item.Price }}
						</view>
						<view class="taocwz2" :class="{ blwfwz2: choose == key }" v-show="key == 0">每月</view>
						<view class="taocwz2" :class="{ blwfwz2: choose == key }" v-show="key == 1">3个月</view>
						<view class="taocwz2" :class="{ blwfwz2: choose == key }" v-show="key == 1">即￥{{ item.Price / 3 }}/月</view>
						<view class="taocwz2" :class="{ blwfwz2: choose == key }" v-show="key == 2">12个月</view>
						<view class="taocwz2" :class="{ blwfwz2: choose == key }" v-show="key == 2">即￥{{ item.Price / 12 }}/月</view>
					</view>
				</view>
			</view>
		</view>
		<view class="zfswwz juzho">支付方式</view>
		<view class="baogzfxz">
			<view class="zhifxua juzho" @click="xuanzf(1)">
				<image class="zgszftb" src="../../static/zfbzf.png"></image>
				<view class="zfwz">支付宝付款</view>
				<view class="goutu1" v-show="payData != 1"></view>
				<view class="goutu2" v-show="payData == 1"><image class="juzho" src="../../static/goutu.png"></image></view>
			</view>
			<view class="zhifxua juzho" @click="xuanzf(2)">
				<image class="zgszftb" src="../../static/wxzf.png"></image>
				<view class="zfwz">微信付款</view>
				<view class="goutu1" v-show="payData != 2"></view>
				<view class="goutu2" v-show="payData == 2"><image class="juzho" src="../../static/goutu.png"></image></view>
			</view>
		</view>
		<view class="xuanzfdiv" @click="following">确认支付{{ money }}元</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//标题
			title: '会员中心',
			//返回图片路径
			path: '../../static/jiant.png',
			//选中的套餐
			choose: 0,
			//选中的支付
			payData: 1,
			//套餐Key-确认支付
			money: 0,
			//执行方法
			executive: true,
			//用户信息
			userData: '',
			//vip数据
			vipData: '',
			//列表宽度
			widthData: ''
		};
	},
	onShow() {
		this.loadingUser();
	},
	onLoad() {
		//获取会员充值费用数据
		this.loadingData();
	},
	methods: {
		//获取会员充值费用数据
		loadingData: function() {
			this.$api.apiPost('/UserFollowInfo/VipInfo', '', '', 'post', (status, code, res) => {
				if (status) {
					this.vipData = res.obj.vipdetails;
					this.widthData = this.vipData.length * 290;
					this.money = this.vipData[0].Price;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//更新用户数据
		loadingUser: function() {
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
		},
		//选择套餐
		xuanz: function(key) {
			this.money = this.vipData[key].Price;
			this.choose = key;
		},
		//选择支付
		xuanzf: function(id) {
			this.payData = id;
		},
		//点击支付
		following: function() {
			if (this.executive) {
				this.executive = false;
				var leix = 4;
				switch (Number(this.choose)) {
					case 0:
						leix = 4;
						break;
					case 1:
						leix = 5;
						break;
					case 2:
						leix = 6;
						break;
				}
				var data = {
					//支付类型1支付宝2微信
					pay_type: this.payData,
					//4月度会员5季度会员6年度会员
					buy_type: leix
				};
				this.$api.apiPost('/pay/taskissuepay', '', data, 'post', (status, code, res) => {
					if (status) {
						if (this.payData == 1) {
							//支付宝支付
							this.orderZF('alipay', res.obj.orderInfo);
						} else if (this.payData == 2) {
							//微信支付
							this.orderZF('wxpay', res.obj.wxpay);
						}
						this.executive = true;
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
						url: '/pages/vippage/vipcg/vipcg'
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
		},
		//会员协议
		hyxy: function() {
			uni.navigateTo({
				url: '/pages/agreement/hyxy/hyxy'
			});
		}
	}
};
</script>

<style>
@import '../../common/css/vippage.css';

.zhuyhxmk {
	background-image: url(~@/static/vipbj.png);
	background-size: contain;
}
</style>
