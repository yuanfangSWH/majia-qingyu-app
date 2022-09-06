<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
			<view class="return4" @click="baoniuc">保存</view>
			昵称
		</view>
		<view class="srkm">
			<input class="yonhm-input" v-model="linsuser" maxlength="12" placeholder="限制昵称长度为12个字符" @input="shujc" />
			<image class="nictb" src="../../../static/nictb01.png" v-show="qinglTB" @click="qingkong"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//用户昵称
				linsuser: "",
				//是否显示清空图标
				qinglTB: false
			}
		},
		//监听页面加载
		onLoad(option) {
			this.linsuser = option.linsuser;
			if (this.linsuser.length > 0) {
				this.qinglTB = true;
			}
		},
		methods: {
			//保存昵称
			baoniuc: function() {
				var data = {
					//昵称
					nickname: this.linsuser
				};
				this.$api.apiPost('/UserFollowInfo/UpdateNickName', "", data, 'post', (status, code, res) => {
					if (status) {
						uni.showToast({
							title: "保存昵称成功",
							icon: 'none',
							duration: 2000
						});
						uni.navigateBack({
							delta: 1
						});
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//清空输入框
			qingkong: function() {
				this.linsuser = "";
				this.qinglTB = false;
			},
			//检测
			shujc: function(event) {
				var value = event.detail.value;
				if (value.length > 0) {
					this.qinglTB = true;
				} else {
					this.qinglTB = false;
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
	}

	.srkm {
		width: 100%;
		height: 100upx;
		background-color: #FFFFFF;
		margin-top: 38upx;
		display: flex;
	}

	.yonhm-input {
		width: 640upx;
		height: 100upx;
		margin-left: 40upx;
		font-size: 36upx;
		color: #2D2D2D;
	}

	.nictb {
		width: 30upx;
		height: 30upx;
		display: block;
		padding-top: 38upx;
	}
</style>
