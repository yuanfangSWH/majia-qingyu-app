<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<!-- <view class="tobu">
			<view>
				<image class="tox" src="../../../static/qy.png"></image>
			</view>
			<view>
				<view class="minc">轻鱼任务推荐加速包</view>
				<view class="sbiao">
					<view class="sbsl">购买加速包后任务会获得更高的曝光率</view>
				</view>
			</view>
		</view> -->
		<view class="rwshul">
			<view class="touxdiv3">
				<image class="zhestoux3" :src="detailsData.HeadImager"></image>
				<image class="zhesvvv" v-show="detailsData.PlusMember==1" src="../../../static/v.png"></image>
			</view>
			<view class="yishqtaog">
				<view class="ylwz1">{{detailsData.task_title}}</view>
				<view class="ylwz2"><text>￥{{detailsData.task_price}}</text>/{{detailsData.task_count}}个</view>
			</view>
		</view>
		<view class="biandan">
			<view class="danjie juzho">
				<view class="suohdby">影响人数</view>
				<view class="yueinpt"><input class="danjie-input" type="number" v-model="yxrsData" placeholder="最少填写100人"
					 placeholder-style="color:#C3C3C3" @input="yxrs" @blur="xiuzrs2" @confirm="xiuzrs2" /></view>
			</view>
			<view class="danjie juzho" style="border-bottom:0;">
				<view class="suohdby">投放金额</view>
				<view class="yueinpt"><input class="danjie-input" type="number" v-model="tfjeData" placeholder="最低填写10元"
					 placeholder-style="color:#C3C3C3" @input="tfje" /></view>
			</view>
		</view>
		<view class="zffsbj">
			<view class="zffs">
				<view class="zffs1">支付方式</view>
			</view>
			<view class="zfb" @tap="paytype=1">
				<view class="left">
					<image class="tishit" src="../../../static/zfb.png"><text class="xianzzt">支付宝支付</text></image>
				</view>
				<view class="right">
					<radio :checked="paytype==1" color="#FCBB67" />
				</view>
			</view>


			<view class="wx" @tap="paytype=2">
				<view class="left">
					<image class="tishit" src="../../../static/wx.png"><text class="xianzzt">微信支付</text></image>
				</view>
				<view class="right">
					<radio :checked="paytype==2" color="#FCBB67" />
				</view>
			</view>
			<view class="wx" @tap="paytype=3">
				<view class="left">
					<image class="tishit" src="../../../static/fbyl.png"><text class="xianzzt">发布余额支付<text class="fabwjq">￥{{userData.IssueMoney}}</text></text></image>
				</view>
				<view class="right">
					<radio :checked="paytype==3" color="#FCBB67" />
				</view>
			</view>
			<view class="qdbj">
				<view class="dibujrjk" @click="validation()">
					确定支付{{moneyData}}元
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
				title: "投放加速包",
				//返回图片路径
				path: "../../../static/jiant.png",
				//支付类型
				paytype: 1,
				//需支付金额数据
				moneyData: 0,
				//执行方法
				executive: true,
				//当前任务ID
				orderID: "",
				//影响人数(加速包设置参数)
				yxrsData: "",
				//投放金额(加速包设置参数)
				tfjeData: "",
				//用户数据
				userData: "",
				//详情数据
				detailsData: ""
			}
		},
		//页面加载时
		onLoad(option) {
			this.orderID = option.id;
			this.pullData();
			this.loadingUser();
		},
		methods: {
			//加载数据
			pullData: function() {
				var data = {
					//ID
					taskid: this.orderID
				};
				this.$api.apiPost('/TaskIssue/StoreTaskInfo', "", data, 'post', (status, code, res) => {
					if (status) {
						this.detailsData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//用户数据
			loadingUser: function() {
				//从VUEX获取到用户数据
				this.userData = this.$store.state.userData;
				if (this.userData.Id == "") {
					this.$api.loadingUser((status, code, res) => {
						if (status) {
							//把用户信息存入VUEX
							this.$store.commit("saveUser", res.obj);
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
			//影响人数输入后计算
			yxrs: function(event) {
				var value = event.detail.value;
				value = parseInt(value);
				if (Number(value) < 100) {
					this.executive = false;
				} else {
					this.executive = true;
					//计算-不能出现每个人得的钱低于1元
					if (value != 0 && value > 0) {
						if (this.tfjeData != 0 && this.tfjeData != "" && this.tfjeData >= 0.1) {
							var renData = Number(this.tfjeData) / Number(value);
							if (renData < 0.1) {
								var renData = Number(value) * Number(0.1);
								renData = Number(renData.toFixed(2));
								this.tfjeData = renData;
								//需支付金额数据
								this.moneyData = Number(this.tfjeData);
							} else {
								//需支付金额数据
								this.moneyData = Number(this.tfjeData);
							}
						} else {
							var renData = Number(value) * Number(0.1);
							renData = Number(renData.toFixed(2));
							this.tfjeData = renData;
							//需支付金额数据
							this.moneyData = Number(this.tfjeData);
						}
					} else {
						this.tfjeData = 0;
						//需支付金额数据
						this.moneyData = 0;
					}
				}
			},
			//影响人数转换为整数
			xiuzrs2: function(event) {
				var value = event.detail.value;
				if (value) {
					this.yxrsData = parseInt(value);
				}
			},
			//投放金额-输入后计算
			tfje: function(event) {
				var value = event.detail.value;
				//计算-不能出现每个人得的钱低于0.1元
				if (value != 0 && value >= 0.1 && this.yxrsData != 0 && this.yxrsData != "") {
					var renData = Number(value) / Number(this.yxrsData);
					if (renData < 0.1) {
						//需支付金额数据
						this.moneyData = 0;
						uni.showToast({
							title: '投放金额填写需保证每个人最低可获得0.1元！',
							icon: 'none',
							duration: 2000
						});
					} else {
						//需支付金额数据
						this.moneyData = Number(value);
					}
				}
			},
			//验证信息完整
			validation: function() {
				if(Number(this.yxrsData) < 100){
					uni.showToast({
						title: "影响人数最低填100人",
						icon: 'none',
						duration: 2000
					});
				}else{
					if (this.moneyData != "" && this.moneyData > 0) {
						if (this.paytype == 3) {
							if (this.moneyData > this.userData.IssueMoney) {
								uni.showToast({
									title: '发布余额不足，支付失败！',
									icon: 'none',
									duration: 2000
								});
							} else {
								this.following();
							}
						} else {
							this.following();
						}
					}
				}
			},
			//支付
			following: function() {
				if (this.executive) {
					this.executive = false;
					var data = {
						//支付类型1支付宝2微信3余额
						pay_type: this.paytype,
						//购买类型1购买会员2发布任务3购买加速包
						buy_type: 3,
						//任务id
						task_id: this.orderID,
						//人数
						count: this.yxrsData,
						//投放金额
						money: this.tfjeData
					};
					this.$api.apiPost('/pay/taskissuepay', "", data, 'post', (status, code, res) => {
						if (status) {
							this.executive = true;
							if (this.paytype == 1) {
								console.log('支付宝支付：' + JSON.stringify(res.obj.orderInfo));
								//支付宝支付
								this.orderZF('alipay', res.obj.orderInfo);
							} else if (this.paytype == 2) {
								console.log('微信支付：' + JSON.stringify(res.obj.wxpay));
								//微信支付
								this.orderZF('wxpay', res.obj.wxpay);
							} else if (this.paytype == 3) {
								uni.redirectTo({
									url: '/pages/taskzx/speedzfcg/speedzfcg?value=update'
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
			},
			//调起API支付
			orderZF: function(serviceData,order) {
				if (this.paytype == 2) {
					order = JSON.stringify(order);
				}
				uni.requestPayment({
					provider: serviceData,
					orderInfo: order, //订单数据
					success: function(res) {
						uni.redirectTo({
							url: '/pages/taskzx/speedzfcg/speedzfcg'
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
	@import '../../../common/css/speedzf.css';

	@font-face {
		font-family: light;
		src: url('~@/static/DIN-Light.otf');
	}

	/* body属性 */
	page {
		background-color: #F8F8F8;
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

	.fabwjq {
		font-size: 32upx;
		color: #BEBEBE;
		font-family: light;
	}
</style>
