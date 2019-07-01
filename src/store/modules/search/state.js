export default {
	results: [],
	fileDescription: [
		{
			rule: ['mp4', 'mov', 'webm'],
			emoji: '🎬', //常规视频文件
			suffix: '视频',
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
			suffix: '非标视频',
			size: '',
			icon: 'mdi-file-video',
		},
		{
			rule: ['mp3', 'ogg', 'wav', 'flac', 'ape', 'alca', 'aac'],
			emoji: '🎵', //音频文件
			suffix: '音频',
			size: '',
			icon: 'mdi-music',
		},
		{
			rule: ['png', 'jpg', 'bmp', 'gif'],
			emoji: '🖼️', //图片
			suffix: '图片',
			size: '',
			icon: 'mdi-file-image',
		},
		{
			rule: ['zip', '7z', 'rar'],
			emoji: '📦', //压缩包
			suffix: '压缩包',
			size: '20',
			icon: 'fas fa-file-archive fa-xs',
		},
		{
			rule: ['dmg', 'iso'],
			emoji: '💽', //光盘映像
			suffix: '光盘映像',
			size: '',
			icon: 'mdi-harddisk',
		},
		{
			rule: ['ai', 'psd', 'aep'],
			emoji: '📐', //工程文件
			suffix: '工程文件',
			size: '',
			icon: 'mdi-briefcase-edit',
		},
		{
			rule: ['ppt', 'pptx', 'key'],
			emoji: '📽️', //演示文件
			suffix: '演示文件',
			icon: 'mdi-projector-screen',
		},
		{
			rule: ['ttf', 'otf'],
			emoji: '🔤️', //字体文件
			suffix: '字体',
			size: '',
			icon: 'mdi-format-font',
		},
		{
			rule: ['doc', 'pdf', 'txt'],
			emoji: '📄', //文档
			suffix: '文档',
			size: '',
			icon: 'mdi-file-pdf',
		},
		{
			rule: ['puppet'],
			emoji: '🤖', //
			suffix: 'Ch人偶模型',
			size: '',
			icon: 'mdi-robot',
		},
		{
			rule: [],
			emoji: '❓', //未知格式
			suffix: '未知格式',
			size: '',
			icon: 'mdi-file-question',
		},
	]
	, suffixList: [
		{
			size: '20',
			icon: 'fas fa-globe-americas',
			text: '全部',
			count: 0,
		},
	]
};
