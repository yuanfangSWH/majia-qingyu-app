<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" src="../../../static/jiant.png" @click="returnData"></image>
			<!-- <view class="return4">规则</view> -->
			邀请好友
		</view>
		<view class="fudldiv">
			<view class="yaohdp">
				<special-banner :banner-list="bannerList" :swiper-config="swiperConfig" @changes="childClick"></special-banner>
			</view>
		</view>
		<view class="dibfx">
			<view class="tiefenk" @click="shareTW(2)">
				<image class="fenltb" src="../../../static/yaoq01.png"></image>
				<view class="yngtwz">朋友圈</view>
			</view>
			<view class="tiefenk" @click="shareTW(1)">
				<image class="fenltb" src="../../../static/yaoq02.png"></image>
				<view class="yngtwz">微信</view>
			</view>
			<view class="tiefenk" @click="fzlj">
				<image class="fenltb" src="../../../static/yaoq03.png"></image>
				<view class="yngtwz">保存链接</view>
			</view>
			<view class="tiefenk" @click="baocImg">
				<image class="fenltb" src="../../../static/yaoq04.png"></image>
				<view class="yngtwz">保存图片</view>
			</view>
		</view>
	</view>
</template>

<script>
	//3D幻灯片插件
	import specialBanner from '@/components/EtherealWheat-banner/specialBanner.vue'
	export default {
		components: {
			specialBanner
		},
		data() {
			return {
				//3D幻灯片数据
				bannerList: [],
				//3D幻灯片配置
				swiperConfig: {
					indicatorDots: true,
					indicatorColor: 'rgba(255, 255, 255, 255)',
					indicatorActiveColor: 'rgba(252,187,103,1)',
					autoplay: false,
					interval: 3000,
					duration: 300,
					circular: true,
					previousMargin: '80rpx',
					nextMargin: '80rpx'
				},
				//海报下标
				postersY: 0,
				//链接
				urlData:""
			}
		},
		onLoad() {
			//从VUEX获取到邀请好友海报数据
			this.bannerList = this.$store.state.HibData;
			if (this.bannerList == "") {
				this.loadingData();
			}
		},
		methods: {
			//加载海报数据
			loadingData: function() {
				this.$api.apiPost('/UserFollowInfo/AddFriends', "", "", 'post', (status, code, res) => {
					if (status) {
						this.urlData = res.obj.url;
						for (var i = 0; i < res.obj.arr.length; i++) {
							this.bannerList.push({
								picture: res.obj.arr[i]
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
			//获得海报图片下标
			childClick: function(e) {
				this.postersY = e;
			},
			//分享图文到微信/朋友圈
			shareTW: function(value) {
				var wxData = "";
				if (value == 1) {
					wxData = "WXSceneSession";
				} else {
					wxData = "WXSenceTimeline";
				}
				uni.share({
					provider: "weixin",
					scene: wxData,
					type: 2,
					imageUrl: this.bannerList[this.postersY].picture,
					success: function(res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function(err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			//保存图片到本地
			baocImg: function() {
				uni.saveImageToPhotosAlbum({
					filePath: this.bannerList[this.postersY].picture,
					success: function() {
						uni.showToast({
							title: "保存图片成功",
							icon: 'none',
							duration: 2000
						});
					},
					fail: function() {
						uni.showToast({
							title: "保存图片失败",
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//复制链接
			fzlj: function() {
				uni.setClipboardData({
					data: this.urlData,
					success: function() {
						uni.showToast({
							title: '复制链接成功',
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
	/* body属性 */
	page {
		background-color: #F8F8F8;
		padding-bottom: 90upx;
	}
.fudldiv{
	width: 100%;
	height:890upx;
	position: fixed;
	top: 50%;
	margin-top: -555upx;
}
	.yaohdp {
		width: 100%;
		height: 890upx;
	}

	.dibfx {
		width: 100%;
		height: 240upx;
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
		display: flex;
	}

	.tiefenk {
		flex: 1;
		height: auto;
		padding-top: 60upx;
	}

	.fenltb {
		width: 76upx;
		height: 76upx;
		display: block;
		margin-left: auto;
		margin-right: auto;
	}

	.yngtwz {
		width: 100%;
		line-height: 60upx;
		text-align: center;
		font-size: 28upx;
		color: #424242;
	}
</style>
