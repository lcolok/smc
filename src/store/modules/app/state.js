const images = [
	'https://cdn.dribbble.com/users/59947/screenshots/6145574/run-for-dribbble.gif',
	'https://cdn.dribbble.com/users/500242/screenshots/6357566/scrollboi_finalfinalpdf_render2_dribbble2.gif',
	'https://cdn.dribbble.com/users/634508/screenshots/5755935/kittyyingyang_dribbble.gif',
	'https://cdn.dribbble.com/users/330915/screenshots/6554409/1_new_condo.gif',
	'https://cdn.dribbble.com/users/2453998/screenshots/5895939/fruit_ninja.gif',
	'https://cdn.dribbble.com/users/31664/screenshots/5826010/speed_kills_2.gif',
	'https://cdn.dribbble.com/users/31664/screenshots/6324479/dribbble_1.gif',
	'https://cdn.dribbble.com/users/634508/screenshots/6176810/longwindingroad_dribbble.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6120821/shot_3__1.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6071583/comp_4.gif',
	'https://cdn.dribbble.com/users/1903950/screenshots/6046188/dribble__1_.gif',
	'https://images-cdn.shimo.im/tncnW1p0rUsZA8PR/cat_washer_dribbble.gif',
];

const colors = ['primary', 'info', 'success', 'warning', 'danger'];

const fileDescription = [
	{
		rule: ['mp4', 'mov', 'webm'],
		emoji: '🎬', //常规视频文件
		type: '视频',
		size: '',
		icon: 'mdi-movie',
		canPlay: {
			icon: 'mdi-play',
			color: 'red',
		},
	},
	{
		rule: ['mkv', 'avi', 'flv'],
		emoji: '▶️', //常规视频文件
		type: '非标视频',
		size: '',
		icon: 'mdi-file-video',
	},
	{
		rule: ['mp3', 'ogg', 'wav', 'flac', 'ape', 'alca', 'aac'],
		emoji: '🎵', //音频文件
		type: '音频',
		size: '',
		icon: 'mdi-music',
	},
	{
		rule: ['png', 'jpg', 'bmp', 'gif'],
		emoji: '🖼️', //图片
		type: '图片',
		size: '',
		icon: 'mdi-file-image',
	},
	{
		rule: ['zip', '7z', 'rar'],
		emoji: '📦', //压缩包
		type: '压缩包',
		size: '20',
		icon: 'fas fa-file-archive fa-xs',
	},
	{
		rule: ['dmg', 'iso'],
		emoji: '💽', //光盘映像
		type: '光盘映像',
		size: '',
		icon: 'mdi-harddisk',
	},
	{
		rule: ['ai', 'psd', 'aep'],
		emoji: '📐', //工程文件
		type: '工程文件',
		size: '',
		icon: 'mdi-briefcase-edit',
	},
	{
		rule: ['ppt', 'pptx', 'key'],
		emoji: '📽️', //演示文件
		type: '演示文件',
		icon: 'mdi-projector-screen',
	},
	{
		rule: ['ttf', 'otf'],
		emoji: '🔤️', //字体文件
		type: '字体',
		size: '',
		icon: 'mdi-format-font',
	},
	{
		rule: ['doc', 'pdf', 'txt'],
		emoji: '📄', //文档
		type: '文档',
		size: '',
		icon: 'mdi-file-pdf',
	},
	{
		rule: ['puppet'],
		emoji: '🤖', //
		type: 'Ch人偶模型',
		size: '',
		icon: 'mdi-robot',
	},
	{
		rule: [],
		emoji: '❓', //未知格式
		type: '未知格式',
		size: '',
		icon: 'mdi-file-question',
	},
];

export default {
	devPort: null,
	drawer: null,
	color: 'primary',
	colors: colors,
	image: images[Math.floor(images.length * Math.random())], //随机显示某一张
	images: images,
	sidebarBackgroundColor: 'rgba(27, 27, 27, 0.74)',
	fileDescription: fileDescription,

	typeList: [
		{
			size: '20',
			icon: 'fas fa-globe-americas',
			text: '全部',
			count: 0,
		},
	],
};
