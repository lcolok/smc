export default {
	results: [],
	fileDescription: [
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
			icon: 'fas fa-file-archive fa-xs',
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
			suffix: ['doc', 'pdf', 'txt'],
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
	],
	unknownDescription: {
		suffix: [],
		emoji: '❓', //未知格式
		typeName: '未知格式',
		size: '',
		icon: 'mdi-file-question',
	}
	, suffixList: [
		{
			size: '20',
			icon: 'fas fa-globe-americas',
			typeName: '全部',
			count: 0,
		},
	]
};
