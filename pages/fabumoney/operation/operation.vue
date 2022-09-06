<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="czxs">
			<view class="czje">充值金额</view>
			<view class="dqfb">当前发布余额：￥{{moneyFB}}元</view>
		</view>
		<view class="je">
			<view class="with-div">
				<view class="with-rm">¥</view>
				<view class="with-input"><input class="child-input" type="number" v-model="money" placeholder="请输入充值金额"
					 placeholder-style="color:#CDCDCD" /></view>
			</view>
		</view>

		<view class="zffsbj">
			<view class="zffs">
				<view class="zffs1">支付方式</view>
			</view>


			<view class="zfb" @tap="paytype='alipay'">
				<view class="left">
					<image class="tishit" src="../../../static/zfb.png"><text class="xianzzt">支付宝支付</text></image>
				</view>
				<view class="right">
					<radio :checked="paytype=='alipay'" color="#FCBB67" />
				</view>
			</view>


			<view class="wx" @tap="paytype='wxpay'">
				<view class="left">
					<image class="tishit" src="../../../static/wx.png"><text class="xianzzt">微信支付</text></image>
				</view>
				<view class="right">
					<radio :checked="paytype=='wxpay'" color="#FCBB67" />
				</view>
			</view>
			<view class="qdbj">
				<view class="qd juzho" @click="validation()">
					确定
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import Navigation from '@/pages/navigation/navigation'
	export default {
		components: {
			Navigation
		},
		data() {
			return {
				//标题
				title: "发布余额充值",
				//返回图片路径
				path: "../../../static/jiant.png",
				//支付类型
				paytype: 'alipay',
				//执行方法
				executive: true,
				//充值金额
				money: "",
				//发布余额展示
				moneyFB: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.moneyFB = option.money;
		},
		methods: {
			//验证
			validation: function() {
				if (this.money == '' || this.money == 0) {
					uni.showToast({
						title: "充值金额不能为空",
						icon: 'none',
						duration: 2000
					});
				} else if (Number(this.money) < 1) {
					uni.showToast({
						title: "充值金额不能低于1",
						icon: 'none',
						duration: 2000
					});
				} else {
					this.qddj();
				}
			},
			//点击确定
			qddj: function() {
				if (this.executive) {
					this.executive = false;
					var pay_type = 1;
					if (this.paytype == 'wxpay') {
						pay_type = 2;
					}
					var data = {
						//支付类型1支付宝2微信
						pay_type: pay_type,
						//购买类型1充值余额
						buy_type: 1,
						//充值金额
						money: this.money
					};
					this.$api.apiPost('/pay/taskissuepay', "", data, 'post', (status, code, res) => {
						if (status) {
							if (this.paytype == 'alipay') {
								//支付宝支付
								this.orderZF('alipay', res.obj.orderInfo);
							} else if (this.paytype == 'wxpay') {
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
				if (this.paytype == 'wxpay') {
					order = JSON.stringify(order);
				}
				uni.requestPayment({
					provider: serviceData,
					orderInfo: order, //订单数据
					success: function(res) {
						uni.navigateTo({
							url: '/pages/fabumoney/chengg/chengg'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: "支付关闭",
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		}
	}
</script>

<style>
	@import '../../../common/css/operation.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
</style>
