let placeholderMapping = [
	{
		name: 'pdf',
		suffix: ['pdf'],
		width: 140,
	},
	{
		name: 'pages',
		suffix: ['pages'],
		width: 220,
	},
	{
		name: 'keynote',
		suffix: ['key'],
		width: 220,
	},
	{
		name: 'numbers',
		suffix: ['numbers'],
		width: 220,
	},
	{
		name: 'excel',
		suffix: ['xls', 'xlsx'],
		width: 170,
	},
	{
		name: 'word',
		suffix: ['doc', 'docx'],
		width: 180,
	},
	{
		name: 'powerpoint',
		suffix: ['ppt', 'pptx'],
		width: 220,
	},
	{
		name: '7z',
		suffix: ['7z'],
		width: 140,
	},
	{
		name: 'zip',
		suffix: ['zip'],
		width: 140,
	},
	{
		name: 'rar',
		suffix: ['rar'],
		width: 140,
	},
	{
		name: 'tgz',
		suffix: ['tgz'],
		width: 160,
	},
	{
		name: 'dmg',
		suffix: ['dmg'],
		width: 180,
	},
	{
		name: 'ps',
		suffix: ['psd'],
		width: 220,
	},
	{
		name: 'pkg',
		suffix: ['pkg'],
		width: 160,
	},
	{
		name: 'txt',
		suffix: ['txt'],
		width: 160,
	},
	{
		name: 'music',
		suffix: ['mp3', 'wav'],
		width: 160,
	},
	{
		name: 'html',
		suffix: ['html'],
		width: 180,
	},
];

let fileDescription = [
	{
		suffix: ['mp4', 'mov', 'webm'],
		emoji: '🎬', //常规视频文件
		typeName: '视频',
		size: '',
		icon: 'mdi-video',
		canPlay: {
			icon: 'mdi-play',
			color: 'red',
		},
	},
	{
		suffix: ['mkv', 'avi', 'flv'],
		emoji: '▶️', //常规视频文件
		typeName: '非标视频',
		size: '',
		icon: 'mdi-file-video',
	},
	{
		suffix: ['mp3', 'ogg', 'wav', 'flac', 'ape', 'alca', 'aac'],
		emoji: '🎵', //音频文件
		typeName: '音频',
		size: '',
		icon: 'mdi-music',
	},
	{
		suffix: ['png', 'jpg', 'bmp', 'gif'],
		emoji: '🖼️', //图片
		typeName: '图片',
		size: '',
		icon: 'mdi-image-size-select-actual',
	},
	{
		suffix: ['zip', '7z', 'rar'],
		emoji: '📦', //压缩包
		typeName: '压缩包',
		size: '20',
		icon: 'mdi-zip-box',
	},
	{
		suffix: ['dmg', 'iso'],
		emoji: '💽', //光盘映像
		typeName: '光盘映像',
		size: '',
		icon: 'mdi-harddisk',
	},
	{
		suffix: ['ai', 'psd', 'aep'],
		emoji: '📐', //工程文件
		typeName: '工程文件',
		size: '',
		icon: 'mdi-briefcase-edit',
	},
	{
		suffix: ['ppt', 'pptx', 'key'],
		emoji: '📽️', //演示文件
		typeName: '演示文件',
		icon: 'mdi-projector-screen',
	},
	{
		suffix: ['ttf', 'otf'],
		emoji: '🔤️', //字体文件
		typeName: '字体',
		size: '',
		icon: 'mdi-format-font',
	},
	{
		suffix: ['doc', 'docx', 'pdf', 'txt', 'pages', 'numbers', 'xls', 'xlsx'],
		emoji: '📄', //文档
		typeName: '文档',
		size: '',
		icon: 'mdi-file-pdf',
	},
	{
		suffix: ['puppet'],
		emoji: '🤖', //
		typeName: 'Ch人偶模型',
		size: '',
		icon: 'mdi-robot',
	},
];

function mapToList(placeholderMapping) {
	let map = arrayToObject(placeholderMapping, 'suffix');
	let nameList = [];

	let placeholderContext = require.context(
		'@/assets/img/placeholder',
		false,
		/@2x\.png$/ /* 只读取二倍体 */,
	);

	placeholderContext.keys().map(fileName => {
		// console.log(fileName);
		let regExp = /(file_cover_(bg|name)_)([a-z0-9]+)(@2x\.png)/i;
		let group = fileName.match(regExp);

		if (group) {
			let name = group[3];
			if (!map[name]) {
				//没有手动添加才进行自动加载
				map[name] = { name };
			}
			nameList.push(name);
		}
	});

	// //数组去重
	// function unique2(array) {
	// 	var n = {},
	// 		r = [],
	// 		len = array.length,
	// 		val,
	// 		type;
	// 	for (var i = 0; i < array.length; i++) {
	// 		val = array[i];
	// 		type = typeof val;
	// 		if (!n[val]) {
	// 			n[val] = [type];
	// 			r.push(val);
	// 		} else if (n[val].indexOf(type) < 0) {
	// 			n[val].push(type);
	// 			r.push(val);
	// 		}
	// 	}
	// 	return r;
	// }

	// console.log(unique2(nameList).join('\n'));

	return map;
}

function arrayToObject(array, key) {
	let object = {};
	array.forEach((eachObject, index) => {
		eachObject[key].forEach((eachKey, index) => {
			object[eachKey] = eachObject;
			delete object[eachKey][key]; //可以删除json里的一项key
		});
	});
	return object;
}

export default {
	oldKey: null,

	key: null,
	results: [],

	unknownDescription: {
		suffix: [],
		emoji: '❓', //未知格式
		typeName: '未知格式',
		size: '',
		icon: 'mdi-file-question',
	},
	suffixList: [
		{
			size: '20',
			icon: 'fas fa-globe-americas',
			typeName: '全部',
			count: 0,
		},
	],

	placeholderList: mapToList(placeholderMapping),

	descriptionList: arrayToObject(fileDescription, 'suffix'),
};
