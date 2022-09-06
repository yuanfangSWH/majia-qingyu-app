<template>
	<view>
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="toubu">
			<view class="shous">
				<image class="shous_img" src="../../static/shoutb1.png"></image><input class="shous-input" type="text" :focus="true"
				 confirm-type="search" placeholder-style="color: #D2D2D2;" placeholder="请输入任务编号或任务关键字进行搜索" v-model="keyData" @confirm="loading" />
			</view>
			<view class="zgsqux" @click="returnData">取消</view>
		</view>
		<view v-show="searchData">
			<view class="zgsj juzho">搜索历史</view>
			<view class="zgslsjl">
				<view class="jildmk" v-for="(item, key) in historyData" :key="key" @click="historyDJ(item)">{{item}}</view>
			</view>
		</view>
		<view v-show="!searchData">
			<view class="zgsj juzho" style="padding-bottom: 30upx;">搜索结果</view>
			<view class="rwlb juzho" v-for="(item, key) in lisData" :key="key" @click="dianjirw(item.Id)">
				<view class="lblg">
					<image class="rwlb_img juzho" :src="item.Headimgurl"></image>
				</view>
				<view class="lwxyzc">
					<view class="rwl_bt">{{item.TaskTitle}}</view>
					<view class="wlt">
						<view class="bmb1">{{item.ItemName}}</view>
						<view class="bmb2">剩余数量：<text>{{item.TaskCount-item.TaskPassedCount}}</text>/{{item.TaskCount}}</view>
					</view>
				</view>
				<view class="zhesgyq">+<text style="font-weight: bold;">{{item.TaskPrice}}</text></view>
			</view>

			<view class="yjdaodi" v-show="there">已经没有更多了~</view>
			<view class="yjdaodi" v-show="there2">没有搜索到相关任务~</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				//关键字
				keyData: "",
				//是否已经数据触底
				there: false,
				//查找为空
				there2: false,
				//是否显示历史记录
				searchData: true,
				//历史记录数据
				historyData: "",
				//最后一位的ID
				page: 0,
				//搜索数据
				lisData: ""
			}
		},
		onLoad() {
			this.history();
		},
		methods: {
			//加载搜索历史记录
			history: function() {
				this.$api.apiPost('/Home/GetSearchKeyList', "", "", 'post', (status, code, res) => {
					if (status) {
						if (res.obj == "") {
							this.historyData = ['空']
						} else {
							this.historyData = res.obj
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
			//点击关键字
			historyDJ: function(value) {
				if (value != "空") {
					this.keyData = value;
					this.loading();
				}
			},
			//搜索加载查询数据
			loading: function() {
				this.searchData = false;
				var data = {
					//查询关键字
					search: this.keyData,
					//数据最后一条ID
					lastid: this.page,
					//需要多少条数据
					count: 20
				};
				this.$api.apiPost('/Home/GetTaskListBySearch', "", data, 'post', (status, code, res) => {
					if (status) {
						if (res.obj == ""||res.obj == null) {
							this.lisData = "";
							this.there2 = true;
						} else {
							this.lisData = res.obj;
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
			//任务详情
			dianjirw: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
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
	@import '../../common/css/search.css';

	/* body属性 */
	page {
		background-color: #F8F8F8;
	}
</style>
