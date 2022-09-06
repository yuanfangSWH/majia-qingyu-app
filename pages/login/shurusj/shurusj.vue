<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv">
			<image class="return" src="../../../static/jiant2.png" @click="returnData"></image>
		</view>
		<view class="hm">请输入手机号</view>
		<view class="sm">未注册的手机号下一步将要绑定微信</view>
		<view class="shurk juzho"><input class="sj-input" type="number" maxlength="11" v-model="mobile" placeholder="请输入手机号"
			 @input="shurpd" /></view>
		<view class="dlan juzho" :class="{ shurwb: selected }" @click="validation">获取验证码</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//手机
				mobile: "",
				//正则验证手机号格式
				re: /^1[3456789]\d{9}$/,
				//是否可以点击
				selected: false
			}
		},
		methods: {
			// 返回上一级页面
			returnData: function() {
				uni.navigateBack({
					delta: 1
				});
			},
			//是否可以点击
			shurpd: function(event) {
				if (event.target.value.length == 11) {
					this.selected = true;
				} else {
					this.selected = false;
				}
			},
			//验证信息完整
			validation: function() {
				if (this.selected) {
					if (!this.re.test(this.mobile)) {
						uni.showToast({
							title: '手机号不正确',
							icon: 'none',
							duration: 2000
						});
					} else {
						this.tiaozhq();
					}
				}
			},
			//获取验证码
			tiaozhq: function() {
				var data = {
					//手机号
					mobile: this.mobile
				};
				this.$api.apiPost('/reg/sendsms', "", data, 'post', (status, code, res) => {
					if (status) {
						//把数据存入VUEX
						this.$store.commit("bcsjh", this.mobile);
						this.$store.commit("bcuuid", res.obj);
						uni.navigateTo({
							url: '/pages/login/shuruyzm/shuruyzm'
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
		}
	}
</script>

<style>
	/* 顶部标题栏CSS */
	.daohdiv {
		background-color: #FFFFFF;
	}

	.hm {
		width: 100%;
		height: 140upx;
		line-height: 140upx;
		color: #101010;
		font-size: 72upx;
		text-align: center;
		padding-top: 200upx;
	}

	.sm {
		width: 100%;
		height: 32upx;
		line-height: 32upx;
		color: #B5B5B5;
		font-size: 32upx;
		text-align: center;
		margin-bottom: 60upx;
	}

	.shurk {
		width: 510upx;
		height: 76upx;
		border-bottom: 1px #DDDDDD solid;
		margin-bottom: 40upx;
	}

	.sj-input {
		width: 510upx;
		height: 76upx;
		line-height: 76upx;
		color: #101010;
		font-size: 32upx;
		text-align: center;
	}

	.dlan {
		width: 648upx;
		height: 100upx;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 36upx;
		text-align: center;
		background-color: #C8C8C8;
		margin-bottom: 20upx;
		border-radius: 50upx;
	}

	.shurwb {
		background-color: #FCBB67;
	}
</style>
