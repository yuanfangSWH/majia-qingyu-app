<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv">
			<image class="return" src="../../static/jiant2.png" @click="returnData"></image>
			发布余额
		</view>
		<view class="zgsjinq juzho">
			<view class="cjimz">
				<view class="teli">
					<view class="zgsyuaner">发布余额(元)</view>
					<view class="ljkqq"><text>¥</text>{{moneyData.IssueMoney}}</view>
				</view>
				<view class="cccya" @click="chonzhi">充值</view>
				<view class="zhenyx" @click="tixian">提现</view>
			</view>
			<view class="zgsxbf">
				<view class="xieyao">
					<view class="zgsqt"><text>¥</text>{{moneyData.allMoney}}</view>
					<view class="zgszz">总充值(元)</view>
				</view>
				<view class="zgsnmbdx"></view>
				<view class="xieyao">
					<view class="zgsqt"><text>¥</text>{{moneyData.allPay}}</view>
					<view class="zgszz">已冻结(元)</view>
				</view>
			</view>
		</view>

		<view class="jildiv juzho">
			<view class="jildaoh juzho">
				<view class="dianj dianj2" @click="xuanz(1)" :class="{ xuanzl: conditions == 1 }">支出</view>
				<view class="dianj dianj2" @click="xuanz(2)" :class="{ xuanzl: conditions == 2 }">退款</view>
			</view>
			<view class="zxsshuj juzho" v-for="(item,key) in recordData" :key="key">
				<image class="jildimg" :src="item.HeadImgUrl"></image>
				<view class="zgjswc">
					<view class="wxcz">{{item.TextShow}}</view>
					<view class="zgjkl">{{item.CreateTime}}</view>
				</view>
				<view class="zgsq">
					<view class="qwz"><text v-show="conditions == 1">-</text><text v-show="conditions == 2">+</text>{{item.Price}}<text>元</text></view>
					<view class="yctj" style="color: #484848;">{{item.ExpText}}</view>
				</view>
			</view>
			<view class="zgsweik" v-show="jiliunll">
				<image class="fuzdtp juzho" src="../../static/jilwk.png"></image>
				<view class="weikms">暂时没有充值记录哦~</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中的分类
				conditions: 1,
				//没有数据
				jiliunll: true,
				//金额数据
				moneyData: "",
				//记录数据
				recordData: "",
				//页数
				page: 1,
				//总页数
				total: 1,
				//用户数据
				userData: ""
			}
		},
		onShow() {
			//用户信息
			this.loadingUser();
			//商家钱包余额查询
			this.pullData();
		},
		onLoad(option) {
			if (option.id) {
				this.conditions = option.id;
			}
			this.xuanz(this.conditions);
		},
		//上拉加载
		onReachBottom() {
			if (this.page*10 < this.total) {
				this.page++;
				switch (Number(this.conditions)) {
					case 1:
						this.pullZhichu();
						break;
					case 2:
						this.pullTkjl();
						break;
				}
			} else {
				uni.showToast({
					title: "已经没有更多记录了~",
					icon: 'none',
					duration: 2000
				});
			}
		},
		methods: {
			//商家钱包余额查询
			pullData: function() {
				this.$api.apiPost('/UserFollowInfo/MyMoney', "", "", 'post', (status, code, res) => {
					if (status) {
						this.moneyData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//选择记录分类
			xuanz: function(id) {
				this.conditions = id;
				this.page = 1;
				this.jiliunll = false;
				switch (Number(id)) {
					case 1:
						this.pullZhichu();
						break;
					case 2:
						this.pullTkjl();
						break;
				}
			},
			//加载支出记录
			pullZhichu: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				};
				this.$api.apiPost('/UserFollowInfo/ExpRecords', "", data, 'post', (status, code, res) => {
					if (status) {
						//总页数
						this.total = res.obj.total;
						//判断是否是下拉刷新数据
						if (this.page == 1) {
							this.recordData = res.obj.arr;
							//判断是否数据为空
							if (res.obj.arr == "") {
								this.jiliunll = true;
							} else {
								this.jiliunll = false;
							}
						} else {
							this.recordData = this.recordData.concat(res.obj.arr);
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
			//加载退款记录
			pullTkjl: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				};
				this.$api.apiPost('/UserFollowInfo/RefundRecords', "", data, 'post', (status, code, res) => {
					if (status) {
						//总页数
						this.total = res.obj.total;
						//判断是否是下拉刷新数据
						if (this.page == 1) {
							this.recordData = res.obj.arr;
							//判断是否数据为空
							if (res.obj.arr == "") {
								this.jiliunll = true;
							} else {
								this.jiliunll = false;
							}
						} else {
							this.recordData = this.recordData.concat(res.obj.arr);
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
			//更新用户数据
			loadingUser: function() {
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
			},
			//充值
			chonzhi: function() {
				uni.navigateTo({
					url: '/pages/fabumoney/operation/operation?money=' + this.moneyData.IssueMoney
				});
			},
			//提现
			tixian: function() {
				if (this.userData.Mobile==""||this.userData.Mobile==null) {
					uni.showToast({
						title: "未绑定手机号，请到个人中心设置里绑定手机号",
						icon: 'none',
						duration: 3000
					});
				} else {
					uni.navigateTo({
						url: '/pages/tixmoney/withdrawal/withdrawal?type=1'
					});
				}
			},
			// 返回上一级页面
			returnData: function() {
				uni.navigateBack({
					delta: 1
				});
			}
		}
	}
</script>

<style>
	@import '../../common/css/money.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}

	.daohdiv {
		color: #000000;
		background-color: #FFFFFF;
	}

	/*  */
</style>
