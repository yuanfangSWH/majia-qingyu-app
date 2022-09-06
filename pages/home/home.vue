<template>
	<view>
		<!-- <view class="head">
			<view class="gcseg">
				<view class="qddk">
					<image class="qddk_img juzho" src="../../static/qianda.png"></image>
					<view class="yaowz">排行榜</view>
				</view>
				<view class="xiaotz"  @click="xiaoxiTZ">
					<image class="xiaotz_img juzho" src="../../static/xiaoxi.png"></image>
					<view class="xiaoxi">消息</view>
				</view>
			</view>
		</view> -->
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view style="width: 100%;height: 220upx;"></view>
		<view class="fudyun">
			<view class="status_bar" style="background-color: #FCBB67;"></view>
			<view class="wbxsd">
				<view class="shous">
					<image class="shous_img" src="../../static/shoutb1.png"></image>
					<view class="shous-input" @click="search">请输入任务编号或任务关键字进行搜索</view>
				</view>
				<view class="xiaotz" @click="xiaoxiTZ">
					<image class="xiaotz_img juzho" src="../../static/xiaoxi.png"></image>
					<view class="xiaoxi">消息</view>
				</view>
			</view>
			<view class="cdiaozgfz">
				<view class="biaotl">
					<view class="yihsqy" :style="{ width: widthData1 + 'upx' }">
						<view class="biz" style="width: 100upx;">
							<view class="nroo" @click="xuanz(11)">
								<view class="bibt" :class="{ sells: conditionsGD == 11 }">全部</view>
								<view class="tgdlj juzho" v-show="conditionsGD==11"></view>
							</view>
						</view>
						<view class="biz" style="width: 100upx;">
							<view class="nroo" @click="xuanz(12)">
								<view class="bibt" :class="{ sells: conditionsGD == 12 }">推荐</view>
								<view class="tgdlj juzho" v-show="conditionsGD==12"></view>
							</view>
						</view>
						<view class="biz" v-for="(item, key) in classification" :key="key">
							<view class="nroo" @click="xuanz(item.Id)">
								<view class="bibt" :class="{ sells: conditions == item.Id }">{{item.TypeName}}</view>
								<view class="tgdlj juzho" v-show="conditions==item.Id"></view>
							</view>
						</view>
					</view>
				</view>
				<image class="saixuimg" @click="fenlTK(1)" src="../../static/saix.png"></image>
			</view>
			<!-- <view class="dnmbhy">
				<view class="fbgsqn"></view>
			</view> -->
		</view>
		<view v-show="conditionsGD==12">
			<!-- <view class="swiper_div juzho">
				<swiper class="swiper" :indicator-dots="indicatorDots" indicator-color="#FFFFFF" indicator-active-color="#FCBB67"
				 :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, key) in BannerData" :key="key">
						<view>
							<image class="swiper_img" :src="item.ImgUrl" @click="tiaozlj(key)"></image>
						</view>
					</swiper-item>
				</swiper>
			</view> -->
			<view class="rwliebth">
				<view class="tiejli" @click="yaoqzqi">
					<image class="tiedimg juzho" src="../../static/shouy01.png"></image>
					<view class="tiwzdiv">邀请赚钱</view>
				</view>
				<view class="tiejli" @click="jiedjc">
					<image class="tiedimg juzho" src="../../static/shouy02.png"></image>
					<view class="tiwzdiv">接单教程</view>
				</view>
				<view class="tiejli" @click="paihsj">
					<image class="tiedimg juzho" src="../../static/shouy03.png"></image>
					<view class="tiwzdiv">排行榜单</view>
				</view>
				<view class="tiejli" @click="huiytq">
					<image class="tiedimg juzho" src="../../static/shouy04.png"></image>
					<view class="tiwzdiv">会员特权</view>
				</view>
			</view>
			<view class="guanbo">
				<view class="baog">
					<view class="botb">
						<image class="botb_img" src="../../static/guangbo.png"></image>
					</view>
				</view>
				<view class="shurwz">
					<!-- <uni-notice-bar class="timdwz" color="#101010" background-color="#ffffff" :speed="40" scrollable="true" single="true"
					 :text="messageData"></uni-notice-bar> -->
					<swiper class="pmdiv" :indicator-dots="false" :autoplay="true" :vertical="true" :interval="interval" :duration="duration">
						<swiper-item>
							<view>{{messageData}}</view>
						</swiper-item>
						<swiper-item>
							<view>{{messageData}}</view>
						</swiper-item>
						<swiper-item>
							<view>{{messageData}}</view>
						</swiper-item>
					</swiper>
				</view>
				<view class="hnxr">
					<view class="chaka" @click="NMSL">查看</view>
				</view>
			</view>
			<!-- 当前版本暂不启用 -->
			<!-- <view class="daohzl juzho">
				<view class="mok" style="margin-left: 36upx;">
					<image class="mok_img" src="../../static/dao1.png"></image>
					<view class="wzoo">新手任务</view>
				</view>
				<view class="mok">
					<image class="mok_img" src="../../static/dao2.png"></image>
					<view class="wzoo">视频任务</view>
				</view>
				<view class="mok">
					<image class="mok_img" src="../../static/dao3.png"></image>
					<view class="wzoo">签到任务</view>
				</view>
				<view class="mok">
					<image class="mok_img" src="../../static/dao4.png"></image>
					<view class="wzoo">红包任务</view>
				</view>
				<view class="mok">
					<image class="mok_img" src="../../static/dao5.png"></image>
					<view class="wzoo">游戏任务</view>
				</view>
			</view> -->
			<view class="tuij_bt juzho">
				<view class="wzsp1">新人立赚</view>
				<view class="wzsp2" @click="NMSL">更多 ></view>
			</view>
			<view class="wdtjrw">
				<view class="wmjtsqtoo" :style="{ width: (widthData2+30) + 'upx' }">
					<view class="tuijrw" v-for="(item, key) in hotData" :key="key" @click="dianjirw(item.Id)">
						<image class="tuijrw_img juzho" :src="item.Headimgurl"></image>
						<view class="tjrwm juzho">{{item.TaskTitle}}</view>
						<view class="huiy juzho">{{item.ItemName}}</view>
						<view class="tuijan"><text>+</text><text style="font-weight: bold;">{{item.TaskPrice}}</text></view>
					</view>
				</view>
			</view>
			<view class="tuij_bt juzho">
				<view class="wzsp1">为你推荐</view>
			</view>
			<view class="rwlb juzho" v-for="(item, key) in HomeData" :key="key" @click="dianjirw(item.Id)">
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
		</view>
		<view v-show="conditionsGD==11">
			<view class="tuij_bt juzho" style="padding-top: 0upx;" v-show="there==0">
				<view class="wzsp1" v-show="conditionsGD==11">全部任务</view>
				<view class="wzsp3">
					<view :class="{tiaojcss:orderData==0}" @click="qiehtj(0)">全部</view>
					<text style="margin-left: 10upx;margin-right: 10upx;display: block;">·</text>
					<view :class="{tiaojcss:orderData==1}" @click="qiehtj(1)">耗时最短</view>
					<text style="margin-left: 10upx;margin-right: 10upx;display: block;">·</text>
					<view :class="{tiaojcss:orderData==2}" @click="qiehtj(2)">价格最高</view>
				</view>
			</view>
			<view class="rwlb juzho" v-for="(item, key) in allhomeData" :key="key" @click="dianjirw(item.Id)">
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
		</view>
		<view v-show="conditions!=0">
			<view class="tuij_bt juzho" style="padding-top: 0upx;" v-show="there==0">
				<view class="wzsp1" v-for="(item, key) in classification" :key="key" v-show="conditions==item.Id">{{item.TypeName}}</view>
				<view class="wzsp3">
					<view :class="{tiaojcss:orderData==0}" @click="qiehtj(0)">全部</view>
					<text style="margin-left: 10upx;margin-right: 10upx;display: block;">·</text>
					<view :class="{tiaojcss:orderData==1}" @click="qiehtj(1)">耗时最短</view>
					<text style="margin-left: 10upx;margin-right: 10upx;display: block;">·</text>
					<view :class="{tiaojcss:orderData==2}" @click="qiehtj(2)">价格最高</view>
				</view>
			</view>
			<view class="rwlb juzho" v-for="(item, key) in allhomeData" :key="key" @click="dianjirw(item.Id)">
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
		</view>
		<view class="rwyqguan" v-show="there==1">
			<image class="rwqgimg juzho" src="../../static/rwqk1.png"></image>
			<view class="rwqgwz">任务已被抢光，请稍后再来</view>
		</view>
		<view class="yjdaodi" v-show="there1==1">已经没有更多了~</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 任务分类弹框 -->
		<view class="rwfltk" v-show="stepsData" :class="{ play: isActive1, implicit: isActive2 }">
			<view class="zgsbtwza">
				<view class="wzrwbt1">任务分类 </view>
				<view class="wzrwbt2">点击进入频道</view>
				<image class="xzxli" @click="fenlTK(2)" src="../../static/xzx.png"></image>
			</view>
			<view class="rwmkdj">
				<view class="lnidtmk" v-for="(item, key) in classification" :key="key" @click="xuanz(item.Id,1)">
				<image class="fenldtktb juzho" :src="item.Img"></image>
				<view class="titkwz">{{item.TypeName}}</view>
				</view>
			</view>
			<view class="qcfd"></view>
			<view class="juzguanb">
			</view>
		</view>
	</view>
</template>

<script>
	//跑马灯
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		components: {
			uniNoticeBar
		},
		data() {
			return {
				//选中的分类
				current: "1",
				//CSS3动画样式1
				isActive1: false,
				//CSS3动画样式2
				isActive2: false,
				//是否显示遮罩
				blocking: false,
				//任务分类弹框
				stepsData: false,
				// 是否显示面板指示点
				indicatorDots: true,
				// 是否自动切换
				autoplay: true,
				// 自动切换时间间隔
				interval: 4000,
				//滑动动画时长
				duration: 500,
				//选中的分类
				conditions: 0,
			}
		},
		props: {
			//分类数据
			classification: "",
			//首页固定分类
			conditionsGD: "",
			//分类模块宽度
			widthData1: "",
			//热门任务数据
			hotData: "",
			//热门模块宽度
			widthData2: "",
			//为你推荐任务数据
			HomeData:"",
			//按分类-任务数据
			allhomeData: "",
			//是否没有数据
			there: "",
			//是否已经数据触底
			there1:"",
			//Banner数据
			BannerData: "",
			//公告消息数据
			messageData: "",
			//筛选分类条件
			orderData:""
		},
		methods: {
			NMSL: function() {
				uni.showToast({
					title: '功能完善中，敬请期待',
					icon: 'none',
					duration: 2000
				});
			},
			//跳转消息
			xiaoxiTZ: function() {
				//向父传递参数
				this.$emit("mobileXi", 3);
			},
			//选择分类
			xuanz: function(id, value) {
				if (id == 11 || id == 12) {
					this.conditions = 0;
				} else {
					this.conditions = id;
				}
				this.$emit('chooseData', id);
				if (value == 1) {
					this.isActive1 = false;
					this.isActive2 = true;
					this.blocking = false;
					this.stepsData = false;
				}
			},
			//选择条件
			qiehtj:function(id){
				this.$emit('orderF', id);
			},
			//弹出/关闭任务分类弹框
			fenlTK: function(value) {
				if (value == 1) {
					this.isActive2 = false;
					this.isActive1 = true;
					this.blocking = true;
					this.stepsData = true;
				} else {
					var _this = this;
					this.isActive1 = false;
					this.isActive2 = true;
					setTimeout(function() {
						_this.blocking = false;
						_this.stepsData = false;
					}, 500)
				}
			},
			//搜索
			search: function() {
				uni.navigateTo({
					url: '/pages/search/search'
				});
			},
			//任务详情
			dianjirw: function(id) {
				uni.navigateTo({
					url: '/pages/recommended/rwdetails/rwdetails?id=' + id
				});
			},
			//跳转图片外链接(废弃)
			tiaozlj: function(key) {
				plus.runtime.openURL(this.BannerData[key].Link, function(res) {
					uni.showToast({
						title: res,
						icon: 'none',
						duration: 3000
					});
				});
			},
			//邀请赚钱
			yaoqzqi: function() {
				uni.navigateTo({
					url: '/pages/invitation/invitation'
				});
			},
			//接单教程
			jiedjc: function() {
				uni.navigateTo({
					url: '/pages/agreement/tutorial/tutorial'
				});
			},
			//排行榜
			paihsj: function() {
				uni.showToast({
					title: "暂未上线，敬请期待",
					icon: 'none',
					duration: 3000
				});
			},
			//会员特权
			huiytq: function() {
				uni.navigateTo({
					url: '/pages/vippage/vippage'
				});
			},
		}
	}
</script>

<style>
	@import '../../common/css/home.css';

	/* CS3动画效果 */
	.play {
		bottom: 0;
		animation: play 0.5s;
	}

	@keyframes play {
		from {
			bottom: -100%;
		}

		to {
			bottom: 0;
		}
	}

	.implicit {
		bottom: -100%;
		animation: implicit 1s;
	}

	@keyframes implicit {
		from {
			bottom: 0;
		}

		to {
			bottom: -100%;
		}
	}

	/* CS3动画效果结束 */
</style>
