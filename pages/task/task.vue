<template>
	<view>
		<view class="gudztou">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="daohdiv">
				<image class="return" src="../../static/jiant.png" @click="returnData"></image>
				选择任务类型
			</view>
			<view class="tishi">
				<view class="tishizi">温馨提示：请正确选择发布任务的类型，分类选择错误会导致发布审核不通过</view>
			</view>
		</view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view style="width: 100%;height: 210upx;"></view>
		<view class="xzrw juzho" v-for="(item, key) in areaData" :key="key" @click="rwlx(item.Id,key)">
			<view class="rwlg">
				<image class="rwlb_img juzho" :src="item.Img"></image>
			</view>
			<view class="faburw">
				<view class="rwts">
					<view class="faburw_m">{{item.TypeName}}</view>
				</view>
				<view class="rwts2">
					<view class="faburw_m2">{{item.TypeDescribe}}</view>
				</view>
			</view>
			<view>
				<image class="xyb" src="../../static/xyj.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//分类数据
				areaData: ""
			}
		},
		//监听页面加载
		onLoad() {
			this.loadingData();
		},
		methods: {
			//获取任务列表根据任务类型
			loadingData: function() {
				this.$api.apiPost('/taskissue/gettasktypelist', "", "", 'post', (status, code, res) => {
					if (status) {
						this.areaData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//任务类型
			rwlx: function(id, key) {
				uni.navigateTo({
					url: '/pages/task/fabutask/fabutask?type=' + id
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
		padding-bottom: 90upx;
	}

	.tishi {
		width: 100%;
		height: 110upx;
		background: rgba(255, 234, 200, 1);
	}

	.tishizi {
		padding-top: 14upx;
		margin-left: 30upx;
		margin-right: 30upx;
		line-height: 40upx;
		font-size: 26upx;
		font-family: PingFang SC;
		color: rgba(234, 117, 58, 1);
	}

	.xzrw {
		width: 690upx;
		height: 180upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 4px 16px 0px rgba(235, 235, 235, 1);
		display: flex;
		border-radius: 10upx;
		margin-top: 20upx;
	}

	.rwlg {
		width: 152upx;
		height: 100%;
	}

	.rwlb_img {
		width: 76upx;
		height: 76upx;
		border-radius: 50%;
		display: block;
		margin-top: 52upx;
	}

	.faburw {
		flex: 1;
		height: 100%;

	}

	.rwts {
		width: auto;
		height: 34upx;
		padding-top: 47upx;
	}

	.faburw_m {
		font-size: 36upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(66, 66, 66, 1);
	}

	.rwts2 {
		width: auto;
		height: 27upx;
		padding-top: 23upx;

	}

	.faburw_m2 {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(164, 164, 164, 1);


	}

	.xyb {
		width: 34upx;
		height: 34upx;
		margin-top: 76upx;
		margin-right: 30upx;

	}
</style>
