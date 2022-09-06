<template>
	<view><web-view :webview-styles="webviewStyles" src="http://fishh5.hitao580.com/customer.html" v-if="According"></web-view></view>
</template>

<script>
var wv; //计划创建的webview
export default {
	data() {
		return {
			//是否销毁或渲染容器
			According: true,
			//webview 的样式
			webviewStyles: {
				progress: {
					color: '#FF3333'
				}
			}
		};
	},
	// onReady() {
	// 	// #ifdef APP-PLUS
	// 	var currentWebview = this.$scope.$getAppWebview();
	// 	//此对象相当于html5plus里的plus.webview.currentWebview()。
	// 	//在uni-app里vue页面直接使用plus.webview.currentWebview()无效，非v3编译模式使用this.$mp.page.$getAppWebview()
	// 	setTimeout(function() {
	// 		wv = currentWebview.children()[0];
	// 		wv.setStyle({ height: 300 });
	// 	}, 1000); //如果是页面初始化调用时，需要延时一下
	// 	// #endif
	// },
	//监听页面加载
	onLoad(option) {},
	methods: {}
};
</script>

<style></style>
