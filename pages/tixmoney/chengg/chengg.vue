<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">提现详情</view>
		<view class="zfcg">
			<image src="../../../static/fabucg.png"></image>
		</view>
		<view class="zfcgzt">提现申请已提交</view>
		<view class="tljm">预计2小时内到账</view>
		<view class="bh">
			<view class="rw">充值账号</view>
			<view class="rw2">{{userData.Nickname}}</view>
		</view>
		<view class="zt">
			<view class="rw">到账金额</view>
			<view class="rw2">¥{{moneyData}}</view>
		</view>
		<view class="zt">
			<view class="rw">手续费</view>
			<view class="rw2">¥{{sxfData}}</view>
		</view>
		<view class="qdbj">
			<view class="ljck juzho" @click="following">查看进度</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//金额数据
				moneyData: "",
				//用户数据
				userData: "",
				//手续费
				sxfData:""
			}
		},
		onLoad(option) {
			this.sxfData = option.the;
			this.moneyData = Number(option.money)- Number(option.the);
			this.loadingUser();
			this.pullData();
		},
		methods: {
			//用户数据
			loadingUser: function() {
				//更新用户数据
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
			//下一步
			following: function() {
				uni.navigateBack({
					delta: 2
				});
			}
		}
	}
</script>

<style>
	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
	.tljm{
		width: 100%;
		height: 40upx;
		line-height: 40upx;
		text-align: center;
		font-size: 30upx;
		color: #979797;
		padding-top: 30upx;
	}

	.zfcg {
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;

	}

	.zfcg image {
		width: 160upx;
		height: 160upx;
		margin-top: 100upx;
	}

	.zfcgzt {
		width: auto;
		height: 37upx;
		font-size: 40upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-top: 30upx;
	}

	.bh {
		width: 100%;
		height: 94upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 8px 0px rgba(235, 235, 235, 1);
		margin-top: 30upx;
		display: flex;
	}

	.zt {
		width: 100%;
		height: 94upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 8px 0px rgba(235, 235, 235, 1);
		margin-top: 1upx;
		display: flex;
	}

	.rw {
		width: 250upx;
		height: 94upx;
		line-height: 94upx;
		font-size: 32upx;
		color: rgba(109, 109, 109, 1);
		margin-left: 58upx;
	}

	.rw2 {
		flex: 1;
		height: 94upx;
		line-height: 94upx;
		font-size: 32upx;
		text-align: right;
		color: rgba(0, 0, 0, 1);
		margin-right: 58upx;
	}

	.qdbj {
		width: 100%;
		height: 180upx;
		position: fixed;
		bottom: 0;
	}

	.ljck {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		text-align: center;
		color: #FFFFFF;
		background: rgba(252, 187, 103, 1);
		border-radius: 50upx;
	}
</style>
