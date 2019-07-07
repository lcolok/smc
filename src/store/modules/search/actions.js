import AV from 'leancloud-storage';
import router from '@/router';

// import axios from 'axios';
// import Qs from 'qs';

const axios = require('axios');
const Qs = require('qs');

export default {
	searchByKey: async function({ dispatch, commit, state }, params) {
		router.push({
			path: 'search_results',
			query: params,
		}); //跳转到搜索结果页面

		if (!params) {
			var data = await AV.Cloud.run('updateShimo');
			console.log(data);

			if (data > 0) {
				showUpdate(data);
			} else {
				// showTop20();
			}

			var query = new AV.Query('ShimoBed');
			query.descending('updatedAt');
			query.limit(20); //请求数量上限为1000条
			var every = await query.find();

			console.log(every);

			result = makeAList(every);
			// console.log(result);
		} else {
			var result = await dispatch('searchLC', {
				key: params.key,
			});
			// console.log(result);
			// alert(JSON.stringify(this.todos[0]));
			if (!result) {
				/*          Vue.toasted.show(`找不到关于“${key}”的项目`, {
                                                 position: 'top-center',
                                                 theme: 'toasted-primary', //Theme of the toast you prefer['toasted-primary', 'outline', 'bubble']
                                                 duration: 3000,
                                                 icon: { name: 'search' },
                                                 iconPack: 'fontawesome',
                                                 fitToScreen: 'true',
                                                 type: 'error', //Type of the Toast ['success', 'info', 'error']
                                                 // fullWidth:"true",
                                         }); */
				return;
			} else {
				state.results = result;
			}
		}
	},
	searchLC: async function({ dispatch, state }, params) {
		var query = new AV.SearchQuery('ShimoBed'); //class名

		query.queryString(params.key); //要搜索的关键词
		let resp = await query.find();
		console.log('找到了 ' + query.hits() + ' 个文件.');

		let results = await Promise.all(
			resp.map(async e => {
				let o = e.toJSON();
				console.log(o);

				let response = await this._vm.$http.get(
					`/functions/expand?url=${o.uploaderURL}`,
				);
				o.attachmentsURL = response.data.expandedURL || o.expandedURL;
				console.log(response.data.expandedURL);
				return o;
			}),
		);

		console.log(results);
		return results;
		return [
			{
				suffix: '7z',
				title: '未知',
				subTitle: '未知',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: 'doc',
				title: '未知',
				subTitle: '未知',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: 'xls',
				title: '未知',
				subTitle: '未知',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: '12321',
				title: '未知',
				subTitle: '未知',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: 'pdf',
				title: 'pdf',
				subTitle: 'pdf',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: 'pages',
				title: 'pages',
				subTitle: 'pages',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
			{
				suffix: 'mp4',
				title: 'Love is in the air',
				subTitle: '爱在空气中',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/2oaRC0QraiQYFZeh/Love_is_in_the_air.mp4',
				uploaderURL: 'https://uploader.shimo.im/f/2oaRC0QraiQYFZeh.mp4',
			},
			{
				suffix: 'mp4',
				title: 'Run Snow run',
				subTitle: '跑啊,雪诺！',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/0OBY67kZa38RVJrE/Run_Snow_run_.mp4',
				uploaderURL: 'https://uploader.shimo.im/f/0OBY67kZa38RVJrE.mp4',
			},
			{
				suffix: 'mp4',
				title: 'Light my fire',
				subTitle: '点燃我的生命',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/1u2nOsrpI24vVL9g/Light_my_fire.mp4',
				uploaderURL: 'https://uploader.shimo.im/f/1u2nOsrpI24vVL9g.mp4',
			},
			{
				suffix: 'mp4',
				title: '꽥&꼬닥 Emoticon ( chicken&egg ) on Behance',
				subTitle: '表情符号（鸡肉和鸡蛋）',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/8IMoog6CYUkkipD7/_Emoticon_chicken_egg_on_Behance.mp4',
				uploaderURL: 'https://uploader.shimo.im/f/8IMoog6CYUkkipD7.mp4',
			},
			{
				suffix: 'mp4',
				title: 'EIGHT DELIGHTS OF TRANSFER _FULL VERSION',
				subTitle: '[仁川机场 x BT21] ',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/hNmEqm9ydwgZdyLs/_IncheonAirport_x_BT21_EIGHT_DELIGHTS_OF_TRANSFER_FULL_VERSION.mp4',
				uploaderURL: 'https://uploader.shimo.im/f/hNmEqm9ydwgZdyLs.mp4',
			},
			{
				suffix: 'jpg',
				title: '图片',
				subTitle: '图片',

				attachmentsURL:
					'https://attachments-cdn.shimo.im/JgBij6l5sis7pMZj/image.jpg',
				uploaderURL: 'https://uploader.shimo.im/f/JgBij6l5sis7pMZj.jpg',
			},
		];
	},
	makeAList: async function({ dispatch, state }, resp) {
		var result = [];

		let fileIndex = {};

		state.fileDescription.forEach((e, index) => {
			fileIndex[e.suffix] = {
				count: 0,
				subClassArr: [],
				icon: e.icon,
				size: e.size,
			};
		});

		resp.forEach(async e => {
			var newDic = await dispatch('makeNewDic', e);
			// console.log(newDic.attributes);

			fileIndex[newDic.attributes.suffix].count++;
			fileIndex[newDic.attributes.suffix].subClassArr.push(newDic);
			state.suffixList[0].count++; //也就是'全部'
			result.push(newDic);
		});

		state.suffixList[0].subClassArr = result; //全部的subClassArr

		state.fileDescription.forEach((e, index) => {
			var subClass = fileIndex[e.suffix];
			state.suffixList.push({
				text: e.suffix,
				count: subClass.count,
				icon: subClass.icon,
				size: subClass.size,
				subClassArr: subClass.subClassArr,
			});
		});
		// console.log(state.suffixList);
		return result;
	},
	makeNewDic: async function({ dispatch, state }, e) {
		if (!e.id) {
			return;
		}

		var dic = e.attributes;

		e.attributes.suffix = dic.suffix; //后缀

		var handle = await dispatch('suffixHandle', dic.suffix);

		var emoji = handle.emoji;

		e.attributes.suffix = handle.suffix;

		// console.log(e.attributes.suffix);

		e.attributes.canPlay = handle.canPlay;

		var name = dic.name;

		var shortURL = await dispatch('cutHTTP', dic.shortURL);

		var copyContent = `${emoji} ${name} | ${shortURL}`;

		e.attributes.copyContent = copyContent;

		e.attributes.content = emoji + name; //在vue的todo里面content代表

		return e;
	},
	suffixHandle: async function({ dispatch, state }, suffix) {
		suffix = suffix.toLowerCase();
		const fileIndex = {};

		state.fileDescription.forEach((e, index) => {
			e.rule.forEach(
				suffix => (fileIndex[suffix] = state.fileDescription[index]),
			);
		});

		if (!fileIndex[suffix]) {
			return {
				emoji: '❓', //未知格式
				suffix: '未知格式',
			};
		}

		return {
			emoji: fileIndex[suffix].emoji,
			suffix: fileIndex[suffix].suffix,
			canPlay: fileIndex[suffix].canPlay,
		};
	},
	cutHTTP({ dispatch, state }, input) {
		return input.replace(/[a-zA-z]+:\/\//g, '');
		return input;
	},
};
