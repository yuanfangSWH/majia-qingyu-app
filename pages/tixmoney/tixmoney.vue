<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv">
			<image class="return" src="../../static/jiant2.png" @click="returnData"></image>
			佣金余额
		</view>
		<view class="zgsjinq juzho">
			<view class="cjimz">
				<view class="teli">
					<view class="zgsyuaner">提现余额(元)</view>
					<view class="ljkqq"><text>¥</text>{{moneyData.allUserMoney}}</view>
				</view>
				<view class="zhenyx2" @click="tixian">提现</view>
			</view>
			<view class="zgsxbf">
				<view class="xieyao">
					<view class="zgsqt"><text>¥</text>{{moneyData.txMoney}}</view>
					<view class="zgszz">总提现(元)</view>
				</view>
				<view class="zgsnmbdx"></view>
				<view class="xieyao">
					<view class="zgsqt"><text>¥</text>{{moneyData.ingMoney}}</view>
					<view class="zgszz">在路上(元)</view>
				</view>
			</view>
		</view>

		<view class="jildiv juzho">
			<view class="jildaoh juzho">
				<view class="dianj" @click="xuanz(1)" :class="{ xuanzl: conditions == 1 }">收入明细</view>
				<view class="dianj" @click="xuanz(2)" :class="{ xuanzl: conditions == 2 }">支出记录</view>
			</view>
			<view class="zxsshuj juzho" v-for="(item,key) in recordData" :key="key">
				<image class="jildimg" src="../../static/srmx.png" v-show="conditions == 1"></image>
				<image class="jildimg" src="../../static/zcjl.png" v-show="conditions == 2"></image>
				<view class="zgjswc">
					<view class="wxcz" v-if="conditions == 2">{{userData.Nickname}}</view>
					<view class="wxcz" v-else>{{item.TextShow}}</view>
					<view class="zgjkl">{{item.CreateTime}}</view>
				</view>
				<view class="zgsq">
					<view class="qwz"><text v-show="conditions == 1">+</text><text v-show="conditions == 2">-</text>{{item.Price}}<text>元</text></view>
					<view class="yctj" v-show="conditions == 1" style="color: #484848;">{{item.SrType}}</view>
					<view class="yctj" v-show="conditions == 2" style="color: #484848;">{{item.TextShow}}</view>
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
				//数据状态
				state: 1,
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
			this.loadingUser();
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
						this.pullShouru();
						break;
					case 2:
						this.pullRecord();
						break;
					case 3:
						this.pullFenx();
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
			//加载数据
			pullData: function() {
				this.$api.apiPost('/UserFollowInfo/MyUserMoney', "", "", 'post', (status, code, res) => {
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
			//提现
			tixian: function() {
				if(this.userData.Mobile==""||this.userData.Mobile==null){
					uni.showToast({
						title: "未绑定手机号，请到个人中心设置里绑定手机号",
						icon: 'none',
						duration: 3000
					});
				}else{
					uni.navigateTo({
						url: '/pages/tixmoney/withdrawal/withdrawal?type=2'
					});
				}
			},
			//选择记录分类
			xuanz: function(id) {
				this.conditions = id;
				this.page = 1;
				this.jiliunll = false;
				switch (Number(id)) {
					case 1:
						this.pullShouru();
						break;
					case 2:
						this.pullRecord();
						break;
					case 3:
						this.pullFenx();
						break;
				}
			},
			//加载收入记录
			pullShouru: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				};
				this.$api.apiPost('/UserFollowInfo/SrRecords', "", data, 'post', (status, code, res) => {
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
			//加载提现记录
			pullRecord: function() {
				var parameter = "?amount_type=2&page=" + this.page + "&size=5";
				this.$api.apiPost('/take/takelist', parameter, "", 'get', (status, code, res) => {
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
			//加载浏览记录（废弃）
			pullFenx: function() {
				var data = {
					pageindex: this.page,
					pagecount: 10
				};
				this.$api.apiPost('/UserFollowInfo/BrowRecords', "", data, 'post', (status, code, res) => {
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

	.dianj {
		margin-left: 50upx;
		margin-right: 50upx;
	}

	/*  */
</style>
