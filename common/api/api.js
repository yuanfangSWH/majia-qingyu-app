//jsencrypt插件
//import JSEncrypt from '../../common/js/jsencrypt.min.js';
//MD5加密
//import md5 from 'js-md5';
// var baseURL = uni.getStorageSync('DomainURL');
//线上地址
var baseURL = 'http://fish.rong298.cn';
//var baseURL = 'http://betterlist.utools.club';



// 通过接口获取数据
function apiPost(url, parameter, data, method, callback) {
	var token = uni.getStorageSync('token');
	uni.request({
		url: baseURL + url + parameter,
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		data: data,
		method: method || 'post',
		success: (res) => {
			//console.log("数据：" + JSON.stringify(res));
			switch (Number(res.data.code)) {
				case 200:
					callback(true, res.data.code, res.data)
					break;
				case 100002: //微信未绑定
					callback(false, res.data.code, res.data)
					break;
				case 100006: //解码手机失败
					callback(false, res.data.code, res.data)
					break;
				case 100007: //手机号未绑定
					callback(false, res.data.code, res.data)
					break;
				default:
					callback(false, res.data.code, res.data)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
// 通过接口获取用户信息
function loadingUser(callback) {
	var token = uni.getStorageSync('token');
	uni.request({
		url: baseURL + '/UserFollowInfo/MyInfo',
		header: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'token': token
		},
		method: 'post',
		success: (res) => {
			switch (Number(res.data.code)) {
				case 200:
					callback(true, res.data.code, res.data)
					break;
				default:
					callback(false, res.data.code, res.data)
			}
		},
		fail: (res) => {
			console.log(res.data);
		}
	});
}
// 发布任务用的表单提交接口
function releaseData(url, parameter, data, imgdata, method, callback) {
	var token = uni.getStorageSync('token');
	uni.uploadFile({
		url: baseURL + url + parameter,
		header: {
			'token': token
		},
		files: imgdata,
		formData: data,
		success: (uploadFileRes) => {
			var res = JSON.parse(uploadFileRes.data);
			switch (Number(res.code)) {
				case 200:
					callback(true, res.code, res)
					break;
				default:
					callback(false, res.code, res)
			}
		}
	});
}
// 图片上传通用接口
function pictureImg(url, parameter, data, imgdata, method, callback) {
	var token = uni.getStorageSync('token');
	uni.uploadFile({
		url: baseURL + url + parameter,
		header: {
			'token': token
		},
		files: imgdata,
		success: (uploadFileRes) => {
			var res = JSON.parse(uploadFileRes.data);
			switch (Number(res.code)) {
				case 200:
					callback(true, res.code, res)
					break;
				default:
					callback(false, res.code, res)
			}
		}
	});
}
export default {
	apiPost,
	loadingUser,
	releaseData,
	pictureImg
}
