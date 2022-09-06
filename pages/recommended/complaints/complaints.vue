<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="haiyh juzho">
			<view class="tousbt">投诉原因</view>
			<radio-group @change="radioChange">
				<view class="nbxtsm" @click="complaintsData(1)">
					<view class="wenz" :class="{xuanz:current==1}">任务不合理，根本无法达到要求</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="1" :checked="current==1" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(2)">
					<view class="wenz" :class="{xuanz:current==2}">任务描述与实际操作过程不符，有隐藏步骤</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="2" :checked="current==2" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(3)">
					<view class="wenz" :class="{xuanz:current==3}">任务分类不正确或有其他违规行为</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="3" :checked="current==3" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(4)">
					<view class="wenz" :class="{xuanz:current==4}">联系任务主没有任何回应</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="4" :checked="current==4" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(5)">
					<view class="wenz" :class="{xuanz:current==5}">任务主要求私下交易</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="5" :checked="current==5" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(6)">
					<view class="wenz" :class="{xuanz:current==6}">任务关键词与实际不符</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="6" :checked="current==6" />
					</view>
				</view>
				<view class="nbxtsm" @click="complaintsData(7)">
					<view class="wenz" :class="{xuanz:current==7}">其他</view>
					<view class="wltous">
						<radio style="transform:scale(0.8)" color="#FCBB67" value="7" :checked="current==7" />
					</view>
				</view>
			</radio-group>
		</view>
		<view class="tixian">
			<view class="zgsdianj juzho" @click="submitData">提交</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "投诉",
				//返回图片路径
				path: "../../../static/jiant.png",
				//选择原因
				current: 1,
				//当前任务的ID
				taskIDdata: ""
			}
		},
		//监听页面加载
		onLoad(option) {
			this.taskIDdata = option.id;
		},
		methods: {
			submitData: function() {
				var data = {
					//任务ID
					taskid: this.taskIDdata,
					//投诉ID
					bec:this.current
				};
				this.$api.apiPost('/TaskIssue/ComplaintTask', "", data, 'post', (status, code, res) => {
					if (status) {
						uni.showToast({
							title: "投诉成功",
							icon: 'none',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateBack({
							    delta: 1
							});
						}, 2000)
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//选择投诉原因方法
			radioChange: function(evt) {
				this.current = evt.target.value;
			},
			//选择投诉原因方法
			complaintsData: function(id) {
				this.current = id;
			}
		}
	}
</script>

<style>
	.haiyh {
		width: 690upx;
		height: auto;
	}

	.tousbt {
		width: 100%;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		font-weight: bold;
		color: #101010;
	}

	.nbxtsm {
		width: 100%;
		height: 70upx;
		line-height: 70upx;
		font-size: 30upx;
		color: #B5B5B5;
		display: flex;
	}

	.xuanz {
		color: #2F281C;
	}

	.wenz {
		flex: 1;
		height: 100%;
	}

	.wltous {
		width: 46upx;
		height: 100%;
	}

	/*  */
	.tixian {
		width: 100%;
		height: 180upx;
		position: fixed;
		bottom: 0;
	}

	.zgsdianj {
		width: 630upx;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		color: #FFFFFF;
		text-align: center;
		background-color: #FCBB67;
		border-radius: 50upx;
	}
</style>
