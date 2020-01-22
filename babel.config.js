module.exports = {
	presets: [
		['@vue/app', { absoluteRuntime: false }],
		['@babel/preset-env'],
	],
	plugins: [
		[
			'import',
			{ libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
		],
	],
};
