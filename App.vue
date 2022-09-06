<script>
	export default {
		onLaunch: function() {},
		onShow: function() {},
		onHide: function() {}
	}
</script>

<style>
	/*每个页面公共css */
	/* 占位div */
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/* 居中CSS */
	.juzho {
		margin-left: auto;
		margin-right: auto;
	}

	/* 通用遮罩 */
	.gzh-modelmask-box {
		background-color: rgba(0, 0, 0, 0.4);
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		z-index: 20;
	}

	/* 顶部标题栏CSS */
	.daohdiv {
		width: 100%;
		height: 44px;
		line-height: 44px;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		background-color: #FCBB67;
		position: relative;
	}

	.return {
		position: absolute;
		width: 40upx;
		height: 40upx;
		display: block;
		top: 24upx;
		left: 20upx;
	}

	.return2 {
		position: absolute;
		width: 36upx;
		height: 36upx;
		display: block;
		top: 26upx;
		right: 30upx;
	}

	.return3 {
		position: absolute;
		width: 50upx;
		height: 50upx;
		display: block;
		top: 16upx;
		right: 30upx;
	}

	.return4 {
		position: absolute;
		width: 70upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
		color: #FFFFFF;
		top: 16upx;
		right: 30upx;
	}
.return5 {
		position: absolute;
		width: 140upx;
		height: 50upx;
		line-height: 50upx;
		font-size: 30upx;
		color: #FFFFFF;
		top: 16upx;
		right: 20upx;
	}
	/* 触底CSS */
	.yjdaodi {
		font-size: 26upx;
		color: #A4A4A4;
		text-align: center;
	}

	/* 清除浮动 */
	.qcfd {
		clear: both;
		height: 1px;
		margin-top: -1px;
		overflow: hidden;
	}

	/* 没有数据CSS */
	.zgsweik {
		width: 100%;
		height: 500upx;
	}

	.fuzdtp {
		width: 400upx;
		height: 300upx;
		display: block;
		padding-top: 50upx;
	}

	.fuzdtp1 {
		width: 312upx;
		height: 190upx;
		display: block;
		padding-top: 50upx;
	}

	.weikms {
		width: 100%;
		height: 90upx;
		line-height: 90upx;
		font-size: 28upx;
		color: #A6A6A6;
		text-align: center;
	}
	/* 固定在头部 */
	.gudztou{
		width: 100%;
		height: auto;
		position: fixed;
		top: 0;
		z-index: 10;
	}
	/* 任务被抢光 */
	.rwyqguan{
		width:100%;
		height: auto;
		padding-top: 180upx;
	}
	.rwqgimg{
		width: 300upx;
		height: 286upx;
		display: block;
	}
	.rwqgwz{
		width: 100%;
		font-size: 28upx;
		text-align: center;
		color: #BFBFBF;
		line-height: 40upx;
	}
	/* 结束 */
	/* 5个弹框CSS */
	.tijiatk {
		width: 550upx;
		height: 300upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: fixed;
		left: 50%;
		margin-left: -275upx;
		top: 50%;
		margin-top: -150upx;
		z-index: 20;
	}
	
	.querwz1 {
		width: 100%;
		height: auto;
		line-height: 60upx;
		color: #101010;
		font-size: 34upx;
		text-align: center;
		padding-top: 40upx;
		margin-bottom: 30upx;
	}
	.juzyd{
		width: 100%;
		height: auto;
		display: flex;
	}
	
	.nbdulan {
		width: 220upx;
		height: 70upx;
		background-color: #FC6930;
		border-radius: 35upx;
		line-height: 70upx;
		color: #FFFFFF;
		font-size: 26upx;
		text-align: center;
		margin-left: 20upx;
	}
	.nbdulan2 {
		width: 218upx;
		height: 68upx;
		border-radius: 35upx;
		line-height: 68upx;
		color: #8E8E8E;
		font-size: 26upx;
		text-align: center;
		border: 2upx #B5B5B5 solid;
		margin-left: 44upx;
	}
	/* CSS结束 */
	.tijiatk2 {
		width: 550upx;
		height: 480upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: fixed;
		left: 50%;
		margin-left: -275upx;
		top: 50%;
		margin-top: -240upx;
		z-index: 20;
	}
	.tlwzt{
		width: 100%;
		height: 68upx;
		line-height: 68upx;
		font-size: 36upx;
		color: #101010;
		text-indent: 30upx;
		padding-top: 20upx;
		padding-bottom: 10upx;
	}
	.querwz2 {
		width: 450upx;
		height: auto;
		line-height: 50upx;
		color: #ACACAC;
		font-size: 28upx;
		padding-top: 10upx;
		margin-bottom: 30upx;
	}
</style>
