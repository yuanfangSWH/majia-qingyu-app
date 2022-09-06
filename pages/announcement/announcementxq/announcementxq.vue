<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="ggxqt">
			<view>
				<image class="ggxqt1_img juzho" :src="annData.PicUrl"></image>
			</view>
		</view>
		<view class="biaoti">{{annData.NoticeTitle}}</view>
		<view class="xqnr">{{annData.NoticeCentent}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "公告详情",
				//返回图片路径
				path: "../../../static/jiant.png",
				//数据
				annData: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.loadingData(option.id);
		},
		methods: {
			//加载数据
			loadingData: function(id) {
				var data = {
					//ID
					msgId: id
				};
				this.$api.apiPost('/Msg/GetMsgNoticeInfo', "", data, 'post', (status, code, res) => {
					if (status) {
						this.annData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
		}
	}
</script>

<style>
	.ggxqt {
		width: auto;
		height: 300upx;
	}

	.ggxqt1_img {
		width: 100%;
		height: 300upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 6upx;
	}

	.biaoti {
		width: auto;
		height: 34upx;
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(0, 0, 0, 1);
		text-align: center;
		padding-top: 30upx;
	}

	.xqnr {
		width: 683upx;
		height: auto;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(33, 33, 33, 1);
		text-align: center;
		margin-left: 33upx;
		padding-top: 38upx;

	}
</style>
