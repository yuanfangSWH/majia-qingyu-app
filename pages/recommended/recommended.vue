<template>
	<view>
		<view class="tba_div">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="tba juzho">
				<view class="kuaisf" @click="chooseF(3)">
					<view class="tba_wz" :class="{ xuanzl: chooseData == 3 }">关注</view>
					<view class="tba_xuanztian juzho" v-show="chooseData==3"></view>
				</view>
				<view class="kuaisf" @click="chooseF(1)">
					<view class="tba_wz" :class="{ xuanzl: chooseData == 1 }">热门</view>
					<view class="tba_xuanztian juzho" v-show="chooseData==1"></view>
				</view>
				<view class="kuaisf" @click="chooseF(2)">
					<view class="tba_wz" :class="{ xuanzl: chooseData == 2 }">高价</view>
					<view class="tba_xuanztian juzho" v-show="chooseData==2"></view>
				</view>
			</view>
		</view>
		<view class="status_bar"></view>
		<view style="width: 100%;height: 96upx;"></view>
		<view class="wfl">
			<!-- <view class="smjb"></view> -->
		</view>
		<!-- 热门 -->
		<view v-show="chooseData==1">
			<view class="liebdiv">
				<view class="rwmok" @click="dianjirw(item.Id)" v-for="(item, key) in hotData2" :key="key">
					<view class="bilh">
						<view class="zgstoux">
							<image class="bilh_img" :src="item.Headimgurl"></image>
							<view class="zgbzg">
								<view class="yonhzcm">{{item.TaskTitle}}</view>
								<view class="shumo">
									<view class="dtwz">{{item.TaskPassedCount}}人已赚</view>
									<view class="dtwz2"></view>
									<view class="dtwz">剩余{{item.TaskRemainCount}}</view>
								</view>
							</view>
						</view>
						<view class="tebsm juzho">{{item.ItemName}}</view>
						<view class="annzjz">+<text style="font-weight: bold;">{{item.TaskPrice}}</text></view>
					</view>
				</view>
			</view>
			<view class="yjdaodi" v-show="there2==1">已经没有更多了~</view>
		</view>
		<!-- 高价 -->
		<view v-show="chooseData==2">
			<view class="liebdiv">
				<view class="rwmok" @click="dianjirw(item.Id)" v-for="(item, key) in hotData3" :key="key">
					<view class="bilh">
						<view class="zgstoux">
							<image class="bilh_img" :src="item.Headimgurl"></image>
							<view class="zgbzg">
								<view class="yonhzcm">{{item.TaskTitle}}</view>
								<view class="shumo">
									<view class="dtwz">{{item.TaskPassedCount}}人已赚</view>
									<view class="dtwz2"></view>
									<view class="dtwz">剩余{{item.TaskRemainCount}}</view>
								</view>
							</view>
						</view>
						<view class="tebsm juzho">{{item.ItemName}}</view>
						<view class="annzjz">+<text style="font-weight: bold;">{{item.TaskPrice}}</text></view>
					</view>
				</view>
			</view>
			<view class="yjdaodi" v-show="there2==1">已经没有更多了~</view>
		</view>
		<view class="rwyqguan" v-show="noteNULL2==1">
			<image class="rwqgimg juzho" src="../../static/rwqk1.png"></image>
			<view class="rwqgwz">任务已被抢光，请稍后再来</view>
		</view>
		<!-- 关注 -->
		<view v-show="chooseData==3" style="padding-bottom: 80upx;">
			<view class="liebdiv">
				<view class="rwmok" @click="dianjirw(item.Id)" v-for="(item, key) in guanData" :key="key">
					<view class="bilh">
						<view class="zgstoux">
							<image class="bilh_img" :src="item.HeadImg"></image>
							<view class="zgbzg">
								<view class="yonhzcm">{{item.Task_title}}</view>
								<view class="shumo">
									<view class="dtwz">{{item.task_passed_count}}人已赚</view>
									<view class="dtwz2"></view>
									<view class="dtwz">剩余{{item.task_count-item.task_passed_count}}</view>
								</view>
							</view>
						</view>
						<view class="tebsm juzho">{{item.item_name}}</view>
						<view class="annzjz">+<text style="font-weight: bold;">{{item.task_price}}</text></view>
					</view>
				</view>
			</view>
			<view class="yjdaodi" v-show="there2==1">已经没有更多了~</view>
			<!-- 关注为空时 -->
			<view class="gzwkdiv" v-show="noteNULL==1">
				<image class="glzwk juzho" src="../../static/jilwk1.png"></image>
				<view class="xblyfg1">尚未关注任何用户~</view>
				<view class="xblyfg2">关注后可在这里看到他们发布的任务</view>
			</view>
			<view v-show="noteNULL==1">
				<view class="gxqubt juzho">你可能感兴趣的用户</view>
				<view class="rwlb2 juzho" v-for="(item, key) in recommendedData" :key="key">
					<view class="lblg2">
						<image class="rwlb_img2" :src="item.Headimgurl"></image>
					</view>
					<view class="lwxyzc2">
						<view class="rwl_bt2">{{item.NickName}}</view>
						<view class="wltii">
							{{item.FansCount}}位粉丝
						</view>
					</view>
					<view class="tbdgzan2">
						<view class="zhesgyqan" @click="guanzhu(item.Id)">+关注</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中的分类
				chooseData: 1
			}
		},
		props: {
			//热门任务列表数据
			hotData2: "",
			//高价任务列表数据
			hotData3: "",
			//是否已经数据触底
			there2: "",
			//关注的用户为空
			noteNULL: "",
			//关注用户数据
			guanData: "",
			//热门/高价为空
			noteNULL2:"",
			//推荐页面兴趣用户推荐数据
			recommendedData:""
		},
		methods: {
			//关注/取消关注
			guanzhu: function(id) {
				var data = {
					//用户ID
					follow_user_id: id
				};
				this.$api.apiPost('/UserFollowInfo/Follow', "", data, 'post', (status, code, res) => {
					if (status) {
						uni.showToast({
							title: "关注成功",
							icon: 'none',
							duration: 2000
						});
						this.$emit('gzflData', 3);
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			},
			//选择分类
			chooseF: function(id) {
				this.chooseData = id;
				this.$emit('gzflData', this.chooseData);
			},
			//任务详情
			dianjirw: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			},
			//关注用户详情
			gzyhxq: function(id) {
				uni.navigateTo({
					url: '/pages/noteshang/noteshang?id=' + id
				});
			},
		}
	}
</script>

<style>
	@import '../../common/css/recommended.css';
</style>
