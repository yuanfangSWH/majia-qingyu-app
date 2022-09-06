<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zgskeftb">
			<view class="wz1 juzho">嗨，亲爱的用户</view>
			<view class="wz2 juzho">已为您定制以下内容</view>
		</view>
		<view class="zgscj juzho">
			<view class="cjdwt">常见问题</view>
			<!-- <view class="fkutm">反馈建议</view> -->
		</view>
		<view class="zgszhuyd juzho" v-for="(item,key) in valueData" :key="key" @click="anXing(key)">
			<view class="zgsshou">
				<view class="btwz">{{key+1}}.{{item.Ask}}</view>
				<view class="zgsjt">
					<image v-show="groupData[key].keyData==0" src="../../static/xxjt.png"></image>
					<image v-show="groupData[key].keyData==1" src="../../static/ssjt.png"></image>
				</view>
			</view>
			<view class="zkdnr" v-show="groupData[key].keyData==1">{{item.Answer}}</view>
		</view>


		<view class="zgslxian juzho" @click="applyforF">联系客服</view>
		<view class="zgsgsn">客服在线时间：每周一至周五</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "客服中心",
				//返回图片路径
				path: "../../static/jiant.png",
				//数据
				valueData: "",
				//选择展开的数据下标
				groupData: []
			}
		},
		onLoad() {
			this.pullData();
		},
		methods: {
			//联系客服(已废弃)
			lianxikf:function(){
				this.$api.apiPost('/UserFollowInfo/GetKeFuAccount', "", "", 'post', (status, code, res) => {
					if (status) {
						plus.runtime.openURL('mqq://im/chat?chat_type=wpa&uin=' + res.obj +'&version=1&src_type=web');
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//联系客服
			applyforF: function() {
				uni.navigateTo({
					url: '/pages/applyfor/applyfor'
				});
			},
			//加载数据
			pullData: function() {
				var data = {
					//最后一行的ID
					lastid: 0,
					//一次多少条数据
					count: 10
				};
				this.$api.apiPost('/Home/ProblemQA', "", data, 'post', (status, code, res) => {
					if (status) {
						this.valueData = res.obj;
						for (var i = 0; i < this.valueData.length; i++) {
							this.groupData.push({
								keyData: 0
							})
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
			//展开/关闭内容信息
			anXing: function(key) {
				if (this.groupData[key].keyData==0) {
					this.groupData[key].keyData = 1;
				} else {
					this.groupData[key].keyData = 0;
				}

			}
		}
	}
</script>

<style>
	.zgslxian {
		width: 630upx;
		height: 100upx;
		background-color: #FCBB67;
		border-radius: 50upx;
		text-align: center;
		line-height: 100upx;
		color: #FFFFFF;
		font-size: 36upx;
		margin-top: 100upx;
	}

	.zgsgsn {
		width: 100%;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
		color: #A4A4A4;
		font-size: 28upx;
	}

	.zgszhuyd {
		width: 690upx;
		height: auto;
		padding-top: 40upx;
		padding-bottom: 40upx;
		border-bottom: 1px #E8E8E8 solid;
	}

	.zgsshou {
		width: 100%;
		height: auto;
		line-height: 28upx;
		display: flex;
	}

	.btwz {
		flex: 1;
		height: 100%;
		font-size: 30upx;
		color: #000000;
		line-height: 40upx;
	}

	.zgsjt {
		width: 28upx;
		height: 28upx;
		display: block;
		padding-top: 8upx;
		padding-right: 10upx;
	}

	.zgsjt image {
		width: 100%;
		height: 100%;
		display: block;
	}

	.zkdnr {
		width: 100%;
		height: auto;
		line-height: 28upx;
		font-size: 30upx;
		color: #B5B5B5;
		padding-top: 20upx;
		line-height: 40upx;
	}

	/*  */
	.zgscj {
		width: 690upx;
		height: 94upx;
		display: flex;
	}

	.cjdwt {
		flex: 1;
		height: 94upx;
		line-height: 94upx;
		font-size: 40upx;
		color: #101010;
	}

	.fkutm {
		width: 114upx;
		height: 94upx;
		line-height: 94upx;
		font-size: 28upx;
		color: #FCBB67;
	}

	.zgskeftb {
		width: 100%;
		height: 200upx;
		background-color: #FCBB67;
	}

	.wz1 {
		width: 690upx;
		height: 40upx;
		line-height: 40upx;
		color: #FFFFFF;
		font-size: 36upx;
		font-weight: bold;
		padding-top: 70upx;
	}

	.wz2 {
		width: 690upx;
		height: 40upx;
		line-height: 40upx;
		color: #FFFFFF;
		font-size: 28upx;
		padding-top: 10upx;
	}
</style>
