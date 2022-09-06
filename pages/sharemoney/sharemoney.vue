<template>
	<view>
		<view class="tlidiv">
			<view class="status_bar"></view>
			<view class="zhuandbq">
				<image class="airjcg" src="../../static/jiant.png" @click="returnData"></image>
				红包详情
			</view>
			<view class="touxg1 juzho">
				<image class="zhestoux" :src="shareYM.Headimgurl"></image>
				<image class="zhesvvv" v-show="shareYM.PlusMember == 1" src="../../static/v.png"></image>
			</view>
			<view class="laozdnic">{{ shareYM.Nickname }}</view>
			<view class="fenlyj juzho">
				<view class="fyljwz juzho">
					分享佣金
					<view class="jinxtp">进行中</view>
				</view>
				<view class="tlbtiao juzho"><view class="tiansm" :style="'width:' + progress + '%;'"></view></view>
				<view class="fkhtjao juzho">
					<view class="ptjlt1">总计 ￥{{ shareYM.ForceSumMoney }}</view>
					<view class="ptjlt2">剩余 ￥{{ shareYM.SurplusMoney }}</view>
				</view>
			</view>
			<view class="paihb juzho">
				<view class="bjtljwz juzho">
					<view class="jlwz1">收入排行榜</view>
					<view class="jlwz2">{{ shareYM.Count }}人参与</view>
				</view>
				<view class="rwtslb juzho" v-for="(item, key) in listData" :key="key">
					<view class="wjkey">
						<image class="paihtb" src="../../static/pot1.png" v-show="key + 1 == 1"></image>
						<image class="paihtb" src="../../static/pot2.png" v-show="key + 1 == 2"></image>
						<image class="paihtb" src="../../static/pot3.png" v-show="key + 1 == 3"></image>
						<view class="tliywz" v-show="key + 1 != 1 && key + 1 != 2 && key + 1 != 3">{{ key + 1 }}</view>
					</view>
					<image class="tiansxjbh" :src="item.HeadImgUrl"></image>
					<view class="wtlmwdiv">
						<view class="nijy">{{ item.NickName }}</view>
						<view class="ljyd">{{ item.ShareCount }}位好友阅读</view>
					</view>
					<view class="tljq">{{ item.ShareSumMoney }}元</view>
				</view>
				<view class="loijwl" v-show="listData == '' || listData == null">
					<image class="loimg juzho" src="../../static/paimwk.png"></image>
					<view class="lowz">暂无排名，赶快分享上排名吧</view>
				</view>
			</view>
		</view>
		<view class="fenxdib">
			<view class="yonlwz">获得佣金={{ shareYM.Jlmoney }}×有效浏览人数</view>
			<view class="tilydiv" @click="sharefan(1)">立刻分享</view>
		</view>
		<!--通用遮罩-->
		<view class="gzh-modelmask-box" v-show="blocking"></view>
		<!-- 分享弹框 -->
		<view class="fendiv" v-if="sharetk" :class="{ play4: isActive1, implicit4: isActive2 }"><image class="fenimgtp" :src="shareData.img"></image></view>
		<view class="rhfdiv" v-if="sharetk">
			<view class="dsgt">
				<view class="jbtmp">如何分享？</view>
				<image class="tbdxjt" src="../../static/xzx.png" @click="sharefan(2)"></image>
			</view>
			<view class="dibfx">
				<view class="tiefenk" @click="shareTW(2)">
					<image class="fenltb" src="../../static/yaoq01.png"></image>
					<view class="yngtwz">朋友圈</view>
				</view>
				<view class="tiefenk" @click="shareTW(1)">
					<image class="fenltb" src="../../static/yaoq02.png"></image>
					<view class="yngtwz">微信</view>
				</view>
				<view class="tiefenk" @click="baocImg">
					<image class="fenltb" src="../../static/yaoq04.png"></image>
					<view class="yngtwz">保存图片</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			//页面数据
			shareYM: '',
			//排行榜数据
			listData: '',
			//是否显示遮罩
			blocking: false,
			//是否关闭分享弹框
			sharetk: false,
			//CSS3效果1
			isActive1: false,
			//CSS3效果2
			isActive2: false,
			//当前任务的ID
			taskIDdata: '',
			//分享数据
			shareData: '',
			//页码
			page: 1,
			//总页数
			total: 1,
			//占比进度
			progress: 100,
			//赏金
			bounty: 0
		};
	},
	//监听页面加载
	onLoad(option) {
		this.taskIDdata = option.id;
		this.bounty = option.bounty;
		this.loadingData();
		this.loadingShare();
		this.shareF();
	},
	//上拉加载
	onReachBottom() {
		if (this.page * 10 < this.total) {
			this.page++;
			this.loadingShare();
		} else {
			uni.showToast({
				title: '排行榜已经到底了~',
				icon: 'none',
				duration: 2000
			});
		}
	},
	methods: {
		//加载分享弹框数据
		shareF: function() {
			//从VUEX获取到分享数据
			this.shareData = this.$store.state.userData;
			if (this.shareData.img == '' || this.shareData.img == null) {
				var data = {
					//任务ID
					taskid: this.taskIDdata
				};
				this.$api.apiPost('/TaskIssue/TaskShareInfo', '', data, 'post', (status, code, res) => {
					if (status) {
						this.shareData = res.obj;
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				});
			}
		},
		//加载页面数据
		loadingData: function() {
			var data = {
				//任务ID
				taskid: this.taskIDdata
			};
			this.$api.apiPost('/TaskIssue/TaskShareDetails', '', data, 'post', (status, code, res) => {
				if (status) {
					this.shareYM = res.obj;
					//计算百分比进度条
					this.progress = Math.round(((this.shareYM.SurplusMoney / this.shareYM.ForceSumMoney) * 10000) / 100.0);
				} else {
					uni.showToast({
						title: res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//加载排行榜数据
		loadingShare: function() {
			var data = {
				//任务ID
				taskid: this.taskIDdata,
				//页码
				lastid: this.page,
				//条数
				count: 10
			};
			this.$api.apiPost('/TaskIssue/TaskShareUss', '', data, 'post', (status, code, res) => {
				if (status) {
					//总页数
					this.total = res.obj.count;
					//判断是否是下拉刷新数据
					if (this.page == 1) {
						this.listData = res.obj.data;
					} else {
						this.listData = this.listData.concat(res.obj.data);
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
		//分享图文到微信/朋友圈
		shareTW: function(value) {
			var wxData = '';
			if (value == 1) {
				wxData = 'WXSceneSession';
			} else {
				wxData = 'WXSenceTimeline';
			}
			uni.share({
				provider: 'weixin',
				scene: wxData,
				type: 0, //类型为图文
				href: this.shareData.link,
				title: '做任务赚现金',
				summary: '只需花费5分钟，就可以拿到这个任务的佣金，快来赚钱吧~',
				imageUrl: 'https://lightfish.oss-cn-shenzhen.aliyuncs.com/oss/record/demo2020-07-08/15942115827552839002552.png',
				success: function(res) {
					console.log('success:' + JSON.stringify(res));
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
				}
			});
		},
		//保存图片
		baocImg: function() {
			uni.saveImageToPhotosAlbum({
				filePath: this.shareData.img,
				success: function() {
					uni.showToast({
						title: '保存图片成功',
						icon: 'none',
						duration: 2000
					});
				},
				fail: function() {
					uni.showToast({
						title: '保存图片失败',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		//弹出或关闭分享弹框
		sharefan: function(value) {
			var _this = this;
			if (value == 1) {
				this.isActive2 = false;
				this.isActive1 = true;
				this.blocking = true;
				this.sharetk = true;
			} else {
				this.isActive1 = false;
				this.isActive2 = true;
				setTimeout(function() {
					_this.blocking = false;
					_this.sharetk = false;
				}, 500);
			}
		},
		// 返回上一级页面
		returnData: function() {
			uni.navigateBack({
				delta: 1
			});
		}
	}
};
</script>

<style>
@import '../../common/css/sharemoney.css';

/* body属性 */
page {
	background-color: #f8f8f8;
	padding-bottom: 90upx;
}

.tlidiv {
	width: 100%;
	height: 406upx;
	position: relative;
	background-size: contain;
	background-image: url(~@/static/dibt.png);
	background-repeat: no-repeat;
}

.jinxtp {
	width: 106upx;
	height: 112upx;
	line-height: 112upx;
	font-size: 22upx;
	color: #ffffff;
	text-align: center;
	background-size: contain;
	background-image: url(~@/static/kuaijinx.png);
	background-repeat: no-repeat;
	position: absolute;
	right: -10upx;
	bottom: 10upx;
}
/* CS3动画效果 */
.play4 {
	top: 50%;
	margin-top: -540upx;
	animation: play4 0.5s;
}

@keyframes play4 {
	from {
		top: -200%;
	}

	to {
		top: 50%;
		margin-top: -540upx;
	}
}

.implicit4 {
	top: -200%;
	animation: implicit4 1s;
}

@keyframes implicit4 {
	from {
		top: 50%;
		margin-top: -540upx;
	}

	to {
		top: -200%;
	}
}

/* CS3动画效果结束 */
</style>
