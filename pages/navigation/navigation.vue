<template>
	<view>
		<!-- 通用标题栏 -->
		<view class="status_bar" style="background-color: #FCBB67;"></view>
		<view class="daohdiv">
			<image class="return" :src="path"  @click="returnData"></image>
			{{title}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		props: {
			//标题
			title: '',
			//图片相对路径
			path: ''
		},
		methods: {
			// 返回上一级页面
			returnData:function(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style>
</style>
