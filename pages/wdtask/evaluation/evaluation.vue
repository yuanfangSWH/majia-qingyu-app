<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="pjiwz juzho">您的评价</view>
		<view class="whdata juzho"><textarea class="lmtext" maxlength="200" v-model="nrData" placeholder="请输入您对商家所发布任务的评价" auto-height /></view>
		<view class="zgsxiagx juzho">字数限制200个</view>
		<view class="qdbj">
			<view class="ljck juzho" @click="following">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "评价",
				//返回图片路径
				path: "../../../static/jiant.png",
				//内容数据
				nrData:"",
				//当前任务的ID
				taskIDdata: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.taskIDdata = option.id;
		},
		methods: {
			//提交
			following: function() {
				if(this.nrData==""){
					uni.showToast({
						title: "评价不能为空",
						icon: 'none',
						duration: 2000
					});
					return;
				}
				var data = {
					//任务ID
					taskid: this.taskIDdata,
					//内容
					comment:this.nrData
				};
				this.$api.apiPost('/TaskReceive/TaskEvaluation', "", data, 'post', (status, code, res) => {
					if (status) {
						uni.setStorageSync('refreshData', 1);
						uni.showToast({
							title: "评价成功",
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
			}
		}
	}
</script>

<style>
.pjiwz{
	width: 690upx;
	height: 100upx;
	line-height: 100upx;
	font-size: 40upx;
	color: #101010;
}
.whdata{
	width: 690upx;
	height: auto;
}
.lmtext{
	width: 100%;
}
.zgsxiagx{
	width: 690upx;
	height: 60upx;
	line-height: 60upx;
	font-size: 24upx;
	color: #B3B3B3;
	text-align: right;
	padding-top: 70upx;
	border-bottom:1px #E6E6E6 solid;
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
