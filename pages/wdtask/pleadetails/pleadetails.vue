<template>
	<view>
		<Navigation :title="title" :path="path"></Navigation>
		<view class="zgszudiv" v-for="(item,key) in listData" :key="key">
			<view class="tousdiv">
				<image class="xbtimg" src="../../../static/sjtx.png" v-if="item.IsStore==1"></image>
				<image class="xbtimg" src="../../../static/lzdtx.png" v-else></image>
				<view class="jubyibo">
					<view class="zgsxinx">
						<image class="zgmimgtx" :src="item.HeadImg" v-if="item.IsStore!=2"></image>
						<image class="zgmimgtx" src="../../../static/qy.png" v-else></image>
						<view class="zglg">
							<view class="ljgwz1">{{item.Nickname}}</view>
							<view class="ljgwz2">{{item.Ctime}}</view>
						</view>
					</view>
					<view class="tiebw1 juzho" v-if="item.Content!=''">{{item.Content}}</view>
					<view class="tiebw1 juzho" v-if="item.IsStore==2">处理结果：{{item.Result}}</view>
					<view class="tiebw1 juzho" v-if="item.IsStore==2">判决原因：{{item.Because}}</view>
					<view class="tiebw2 juzho">
						<view class="zheyqaind">
							<image class="zheyqaindimg" mode="aspectFill" :src="item" v-for="(item,auimg) in item.Imgs" :key="auimg" @click="previewIMG(item)"></image>
						</view>
						<view class="zheyqaind">
							<image class="zheyqaindimg" mode="aspectFill" :src="item" v-for="(item,buimg) in item.DemoImgs" :key="buimg" @click="previewIMG(item)"></image>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view class="xptzwf"></view>
		<view class="dibujrjk">
			<view class="yonjink"> 截止时间：<text>{{jiezrq}}</text></view>
			<view class="tieanniu">
				<view class="xuybaog2" @click="pleaFF">提交辩诉</view>
			</view>
		</view>
		<view class="zgsdaojsj">等待您在<text>截止时内</text>提交辩诉，超时将判为接单者胜诉</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//标题
				title: "投诉详情",
				//返回图片路径
				path: "../../../static/jiant.png",
				//当前任务的ID
				taskIDdata: "",
				//数据
				listData: "",
				//截止日期
				jiezrq:""
			}
		},
		onShow() {
			var refreshData = uni.getStorageSync('refreshData');
			if(refreshData==1){
				uni.setStorageSync('refreshData', 2);
				this.pullData();
			}
		},
		onLoad(option) {
			if (option.id) {
				this.taskIDdata = option.id;
			}
			this.pullData();
		},
		methods: {
			//加载数据
			pullData: function() {
				var data = {
					//订单ID
					taskreceiveid: this.taskIDdata
				};
				this.$api.apiPost('/TaskReceive/TaskReportInfo', "", data, 'post', (status, code, res) => {
					if (status) {
						this.listData = res.obj.data;
						this.jiezrq = res.obj.outTime;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//辩诉
			pleaFF: function() {
				uni.navigateTo({
					url: '/pages/wdtask/plea/plea?id=' + this.taskIDdata
				});
			},
			//预览图片
			previewIMG: function(url) {
				var imgArr = [];
				imgArr.push(url);
				// 预览图片
				uni.previewImage({
					urls: imgArr
				});
			}
		}
	}
</script>

<style>
	@import '../../../common/css/pleadetails.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
</style>
