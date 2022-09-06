<template>
	<view>
		<view class="status_bar"></view>
		<view class="daohdiv"><image class="return" src="../../../static/jiant2.png" @click="returnData"></image></view>
		<view class="hm">输入短信验证码</view>
		<view class="sm">
			<view class="wz">短信已发送至{{ mobile }}</view>
			<view class="dt" :class="{ cxzho: isActive }" @click="obtainYZ">{{ animation }}</view>
		</view>
		<view class="shurk">
			<view class="getCodeMsg">
				<input
					class="move-ex"
					:class="{ moveda: disabled1, movedb: disabled2, movedc: disabled3, movedd: disabled4 }"
					type="number"
					maxlength="4"
					name="code"
					pattern="[0-9]*"
					v-model="validation"
					@input="moveDH"
					focus="focus"
				/>
				<view class="mlimbg" :class="{ mlimbgts: disabled1 }">{{ validation1 }}</view>
				<view class="mlimbg" :class="{ mlimbgts: disabled2 }">{{ validation2 }}</view>
				<view class="mlimbg" :class="{ mlimbgts: disabled3 }">{{ validation3 }}</view>
				<view class="mlimbg" :class="{ mlimbgts: disabled4 }">{{ validation4 }}</view>
			</view>
		</view>
		<view class="dlan juzho" :class="{ shurwb: selected }" @click="Verification">确认</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//倒数动画
			animation: '重新获取',
			countdown: 60,
			//是否可以点击重新获取
			yzmZJ: false,
			//改变样式
			isActive: false,
			//是否可以点击
			selected: false,
			//输入框假值
			validation1: '',
			validation2: '',
			validation3: '',
			validation4: '',
			//输入框移动
			disabled1: true,
			disabled2: false,
			disabled3: false,
			disabled4: false,
			//验证码
			validation: '',
			//uuid
			uuid: '',
			//手机号
			mobile: '',
			//判断是绑定还是更换
			keyData: 0
		};
	},
	//监听页面加载
	onLoad(option) {
		this.keyData = option.key;
		//验证码倒数动画
		this.setTime();
		//从VUEX获取用户ID
		this.uuid = this.$store.state.loginData.uuid;
		//从VUEX获取手机号数据
		this.mobile = this.$store.state.loginData.mobile;
	},
	methods: {
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		},
		//验证码倒数动画
		setTime: function() {
			let _this = this;
			if (this.countdown == 0) {
				this.countdown = 60;
				this.isActive = true;
				this.yzmZJ = true;
				this.animation = '重新获取';
			} else {
				this.animation = this.countdown + 's';
				this.countdown--;
				this.isActive = false;
				this.yzmZJ = false;
				setTimeout(function() {
					_this.setTime();
				}, 1000);
			}
		},
		//重新获取验证码
		obtainYZ: function() {
			if (this.yzmZJ) {
				var data = {
					//手机号
					mobile: this.mobile
				};
				this.$api.apiPost('/reg/sendsms', '', data, 'post', (status, code, res) => {
					if (status) {
						//验证码倒数动画
						this.setTime();
						uni.showToast({
							title: '验证码已重新发送',
							icon: 'none',
							duration: 2000
						});
						//用户ID
						this.uuid = res.obj;
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
		//输入框动画
		moveDH: function(event) {
			var yzmID = event.target.value;
			var group = new Array();
			group = yzmID.split('');
			switch (group.length) {
				case 0:
					this.validation1 = '';
					this.disabled1 = true;
					this.disabled2 = false;
					this.disabled3 = false;
					this.disabled4 = false;
					this.selected = false;
					break;
				case 1:
					this.validation1 = group[0];
					this.validation2 = '';
					this.disabled2 = true;
					this.disabled1 = false;
					this.disabled3 = false;
					this.disabled4 = false;
					this.selected = false;
					break;
				case 2:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = '';
					this.disabled3 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled4 = false;
					this.selected = false;
					break;
				case 3:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = group[2];
					this.validation4 = '';
					this.disabled4 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled3 = false;
					this.selected = false;
					break;
				case 4:
					this.validation1 = group[0];
					this.validation2 = group[1];
					this.validation3 = group[2];
					this.validation4 = group[3];
					this.disabled4 = true;
					this.disabled1 = false;
					this.disabled2 = false;
					this.disabled3 = false;
					this.selected = true;
					this.validation = this.validation1 + this.validation2 + this.validation3 + this.validation4;
					break;
			}
		},
		//提交保存新手机号
		Verification: function() {
			if (this.selected) {
				var data = {
					//新手机号码
					newphone: this.mobile,
					//验证码
					verifycode: this.validation,
					//短信的用户标识
					uuid: this.uuid
				};
				this.$api.apiPost('/UserFollowInfo/UpdatePhone', '', data, 'post', (status, code, res) => {
					if (status) {
						if (this.keyData == 0) {
							uni.showToast({
								title: '手机号码更改成功',
								icon: 'none',
								duration: 2000
							});
						} else {
							uni.showToast({
								title: '手机号码绑定成功',
								icon: 'none',
								duration: 2000
							});
						}
						uni.navigateBack({
							delta: 2
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
};
</script>

<style>
/* 顶部标题栏CSS */
.daohdiv {
	background-color: #ffffff;
}
/* 协议弹框CSS */
.xitykdiv {
	width: 600upx;
	height: 500upx;
	background-color: #fff;
	position: absolute;
	left: 50%;
	margin-left: -300upx;
	top: 50%;
	margin-top: -250upx;
	border-radius: 10upx;
	z-index: 30;
}

.xieydwz1 {
	margin-left: 30upx;
	margin-right: 30upx;
	font-size: 28upx;
	line-height: 50upx;
	padding-top: 40upx;
	color: #8f8f8f;
}

.xieydwz2 {
	margin-left: 30upx;
	margin-right: 30upx;
	font-size: 28upx;
	line-height: 50upx;
	padding-top: 30upx;
	color: #8f8f8f;
}

.xieyank {
	display: flex;
	padding-top: 30upx;
}

.xyant {
	width: 200upx;
	height: 70upx;
	line-height: 70upx;
	font-size: 34upx;
	text-align: center;
	color: #fff;
	border-radius: 24upx;
}

/* 协议弹框结束 */
/*  */
.wxtb {
	width: 130upx;
	height: 130upx;
	display: block;
	padding-top: 132upx;
	padding-bottom: 38upx;
}

.wz1 {
	width: 100%;
	height: 36upx;
	line-height: 36upx;
	color: #101010;
	font-size: 32upx;
	text-align: center;
	padding-bottom: 28upx;
}

.wz2 {
	width: 100%;
	height: 36upx;
	line-height: 36upx;
	color: #b5b5b5;
	font-size: 28upx;
	text-align: center;
	padding-bottom: 60upx;
}

.queren {
	width: 468upx;
	height: 100upx;
	background-color: #fcbb67;
	border-radius: 50upx;
	line-height: 100upx;
	color: #ffffff;
	font-size: 36upx;
	text-align: center;
}

.tankdiv {
	width: 618upx;
	height: 680upx;
	background-color: #ffffff;
	border-radius: 16upx;
	position: fixed;
	z-index: 30;
	top: -200%;
	left: 50%;
	margin-left: -309upx;
}
.shurk {
	width: 440upx;
	height: 100upx;
	margin-left: 180upx;
	margin-bottom: 80upx;
}

.getCodeMsg {
	width: 440upx;
	display: flex;
	position: relative;
}

.getCodeMsg .mlimbg {
	width: 70upx;
	height: 80upx;
	border-bottom: 1px solid #dcdcdc;
	margin-right: 40upx;
	line-height: 100upx;
	text-align: center;
	font-size: 32upx;
	padding-bottom: 20upx;
	font-weight: 500;
	z-index: 20;
}

.getCodeMsg .mlimbgts {
	border-bottom: 1px solid #fcbb67;
}

.getCodeMsg .move-ex {
	width: 70upx;
	height: 100upx;
	border-style: none;
	text-align: center;
	font-weight: 500;
	z-index: 30;
	position: absolute;
	opacity: 0;
}

.moveda {
	left: 0upx;
}

.movedb {
	left: 110upx;
}

.movedc {
	left: 218upx;
}

.movedd {
	left: 328upx;
}

.getCodeMsg .mlimbg:nth-of-type(1) {
	margin-left: 0;
}

.getCodeMsg .mlimbg:nth-last-of-type(1) {
	margin-rigth: 0;
}

.getCodeMsg .mlimbg .active {
	border-color: #257bff;
}

.hm {
	width: 100%;
	height: 140upx;
	line-height: 140upx;
	color: #101010;
	font-size: 60upx;
	text-align: center;
	padding-top: 200upx;
}

.sm {
	width: 520upx;
	height: 50upx;
	display: flex;
	margin-bottom: 50upx;
	margin-left: 150upx;
}

.wz {
	width: 400upx;
	height: 50upx;
	line-height: 50upx;
	color: #b5b5b5;
	font-size: 32upx;
}

.dt {
	height: 32upx;
	line-height: 32upx;
	padding: 4upx 4upx 4upx 4upx;
	color: #b5b5b5;
	font-size: 22upx;
	border: 1px #b5b5b5 solid;
	border-radius: 8upx;
	margin-top: 4upx;
}

.cxzho {
	color: #fcbb67;
	border: 1px #fcbb67 solid;
}

.dlan {
	width: 648upx;
	height: 100upx;
	line-height: 100upx;
	color: #ffffff;
	font-size: 36upx;
	text-align: center;
	background-color: #c8c8c8;
	margin-bottom: 20upx;
	border-radius: 50upx;
}

.shurwb {
	background-color: #fcbb67;
}
</style>
