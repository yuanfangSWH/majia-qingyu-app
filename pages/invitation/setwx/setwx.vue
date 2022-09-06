<template>
	<view>
		<view class="status_bar" style="background-color: #FFFFFF;"></view>
		<view class="daohdiv" style="background-color: #FFFFFF;color: #000000;">
			<image class="return" src="../../../static/jiant2.png" @click="returnData"></image>
			社交信息
		</view>
		<view class="limtimr">
			<image class="weixtb" src="../../../static/yaoq02.png"></image>
			<view class="wtlw">微信号</view>
			<input class="wxt-input" type="text" v-model="wxData" placeholder="请输入您的微信号" @input="shurpd" />
		</view>
		<view class="dibfd">
			<view class="yetz juzho" :class="{ shurwb: selected }" @click="tijiao">保存</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//微信号
				wxData: "",
				//是否可以点击
				selected: false,
				//用户信息
				userData: ""
			}
		},
		onLoad() {
			this.loadingUser();
		},
		methods: {
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
							this.loadingWX();
						} else {
							uni.showToast({
								title: res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					});
				} else {
					this.loadingWX();
				}
			},
			//查询微信号
			loadingWX: function() {
				var data = {
					userid: this.userData.Id
				};
				this.$api.apiPost('/UserFollowInfo/SeeWxAccount', "", data, 'post', (status, code, res) => {
					if (status) {
						this.wxData = res.obj;
						if (this.wxData != "") {
							this.selected = true;
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
			//是否可以点击
			shurpd: function(event) {
				if (event.target.value.length > 6) {
					this.selected = true;
				} else {
					this.selected = false;
				}
			},
			//提交保存
			tijiao: function() {
				if (this.selected) {
					var data = {
						wxaccount: this.wxData
					};
					this.$api.apiPost('/UserFollowInfo/SetWxAccount', "", data, 'post', (status, code, res) => {
						if (status) {
							uni.showToast({
								title: "保存成功",
								icon: 'none',
								duration: 3000
							});
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
	/* body属性 */
	page {
		background-color: #F8F8F8;
		padding-bottom: 90upx;
	}

	.limtimr {
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		display: flex;
		margin-top: 30upx;
	}

	.weixtb {
		width: 43upx;
		height: 43upx;
		display: block;
		padding-left: 20upx;
		padding-top: 30upx;
		padding-right: 20upx;
	}

	.wtlw {
		width: 100upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #101010;
	}

	.wxt-input {
		flex: 1;
		height: 100upx;
		line-height: 100upx;
		font-size: 28upx;
		color: #101010;
	}

	.dibfd {
		width: 100%;
		height: 180upx;
		position: fixed;
		bottom: 0;
	}

	.yetz {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		background-color: #C8C8C8;
		border-radius: 50upx;
	}

	.shurwb {
		background-color: #FCBB67;
	}
</style>
