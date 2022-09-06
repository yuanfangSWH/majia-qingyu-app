<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zgstuidv">
			<view class="gnn1">我的余额</view>
			<view class="gnn2">
				<text>¥</text>
				{{ moneyData }}
			</view>
			<view class="zgsxuanq">
				<view class="zgsbt juzho">提现账户</view>
				<view class="zgsshecz juzho">
					<view class="yaos" :class="{ selected: account == 2 }" @click="xuanzho(2)">提现余额</view>
					<view class="yaos" :class="{ selected: account == 1 }" @click="xuanzho(1)">发布余额</view>
				</view>
				<view class="qcfd"></view>
				<view class="zgsbt juzho">提现金额</view>
				<view class="zgsshecz juzho">
					<view class="yaos" :class="{ selected: MoneyChoose == key }" @click="moneyXZ(key, item.money)" v-for="(item, key) in mentionData" :key="key">
						{{ item.money }}
						<text style="font-size: 24upx;">元</text>
					</view>
				</view>
				<view class="qcfd"></view>
			</view>
		</view>
		<view class="zhuyxdiv juzho">
			<view class="zybt">注意事项</view>
			<view class="plwzw">1、提现将在3个工作日内审核到账，节假日不处理审批</view>
			<view class="plwzw">
				2、提现手续费为3%
				<text v-show="account == 2">，最低0.1元</text>
			</view>
			<view class="plwzw">3、余额将到账您的微信钱包，请注意查看通知</view>
			<view class="plwzw">4、第一次提现不收取手续费用</view>
		</view>
		<view class="tixian"><view class="zgsdianj juzho" @click="validation">立即提现</view></view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 邀请弹框 -->
		<view class="tijiatk" v-show="yaoqtk">
			<view class="querwz1">
				提现超过20元（包含20元）
				<br />
				需要邀请5个好友才可提现
			</view>
			<view class="juzyd">
				<view class="nbdulan2" @click="tiaojtmk(2)">了解</view>
				<view class="nbdulan" style="background-color: #FCBB67;" @click="haibao()">去完成</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//标题
			title: '提现',
			//返回图片路径
			path: '../../../static/jiant.png',
			//提现账户
			account: 2,
			//选择的金额下标
			MoneyChoose: 0,
			//提现金额
			valueData: 0,
			//余额
			moneyData: '',
			//用户数据
			userData: '',
			//提现金额
			mentionData: '',
			//执行方法
			executive: true,
			//是否显示遮罩
			blocking: false,
			//是否关闭邀请弹框
			yaoqtk: false
		};
	},
	onLoad(option) {
		this.loadingUser();
		this.xuanzho(option.type);
	},
	methods: {
		//选择提现账户
		xuanzho: function(id) {
			this.account = id;
			//初始化
			this.MoneyChoose = 0;
			if (this.account == 1) {
				//发布余额
				this.pullData1();
			} else {
				//用户余额
				this.pullData2();
			}
		},
		//加载数据-发布余额
		pullData1: function() {
			this.$api.apiPost('/UserFollowInfo/MyMoney', '', '', 'post', (status, code, res) => {
				if (status) {
					this.moneyData = res.obj.IssueMoney;
					this.mentionData = [
						{
							id: 1,
							money: 20
						},
						{
							id: 2,
							money: 50
						},
						{
							id: 3,
							money: 100
						},
						{
							id: 4,
							money: 200
						},
						{
							id: 5,
							money: 500
						},
						{
							id: 6,
							money: 1000
						}
					];
					this.valueData = this.mentionData[0].money;
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载数据-用户余额
		pullData2: function() {
			this.$api.apiPost('/UserFollowInfo/MyUserMoney', '', '', 'post', (status, code, res) => {
				if (status) {
					this.moneyData = res.obj.allUserMoney;
					this.mentionData = [
						{
							id: 1,
							money: 20
						},
						{
							id: 2,
							money: 50
						},
						{
							id: 3,
							money: 100
						},
						{
							id: 4,
							money: 200
						},
						{
							id: 5,
							money: 500
						}
					];
					this.valueData = this.mentionData[0].money;
					if (this.userData.RookieTaskHit == 0) {
						this.mentionData.unshift({
							id: 0,
							money: 1
						});
						this.valueData = 1;
					} else {
						this.mentionData.push({
							id: 6,
							money: 1000
						});
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//弹出或关闭邀请弹框
		tiaojtmk: function(value) {
			if (value == 1) {
				this.blocking = true;
				this.yaoqtk = true;
			} else {
				this.blocking = false;
				this.yaoqtk = false;
			}
		},
		//邀请好友海报
		haibao: function() {
			uni.navigateTo({
				url: '/pages/invitation/posters/posters'
			});
		},
		//用户数据
		loadingUser: function() {
			//从VUEX获取到用户数据
			this.userData = this.$store.state.userData;
			if (this.userData.RookieTaskHit == 0) {
				this.MoneyChoose = 1;
			}
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
		//验证
		validation: function() {
			if (this.valueData > this.moneyData) {
				if (this.account == 1) {
					uni.showToast({
						title: '发布余额不足',
						icon: 'none',
						duration: 2000
					});
				} else {
					uni.showToast({
						title: '提现余额不足',
						icon: 'none',
						duration: 2000
					});
				}
			} else {
				if (this.userData.RookieTaskHit == 0 && this.valueData == 1) {
					this.xyb();
				} else if (this.userData.CanTX == 1) {
					this.xyb();
				} else if (this.userData.CanTX == 0) {
					this.tiaojtmk(1);
				}
			}
		},
		//提现
		xyb: function() {
			if (this.executive) {
				this.executive = false;
				var data = {
					//提现金额
					amount: this.valueData,
					//1发布余额提现2提现余额提现
					amount_type: this.account
				};
				this.$api.apiPost('/take/take', '', data, 'post', (status, code, res) => {
					if (status) {
						this.executive = true;
						uni.navigateTo({
							url: '/pages/tixmoney/chengg/chengg?money=' + this.valueData + '&the=' + res.obj
						});
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
		//选择金额
		moneyXZ: function(key, money) {
			this.MoneyChoose = key;
			this.valueData = money;
		}
	}
};
</script>

<style>
@import '../../../common/css/withdrawal.css';

.selected {
	width: 178upx;
	height: 76upx;
	background-image: url(~@/static/tily.png);
	background-repeat: no-repeat;
	background-size: contain;
	border: 0;
}
</style>
