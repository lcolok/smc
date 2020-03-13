'use strict';

const tasks = {
	gulp: [
		//开发模式下会进行构建
		'dev',
		'autoVersion',
		'leanUp',
	],
	module: [
		//开发环境和生产环境都会运行的组件
	],
};

// 引入进度条显示工具模块
const ProgressBar = require('./utils/progress_bar');

// 初始化一个进度条长度为 50 的 ProgressBar 实例
const pb = new ProgressBar({
	description: 'Server',
	length: 25,
	theme_color: `keyword('orange')`,
	// total: sum(tasks),
	total: (_ => {
		let count = 0;
		for (let i in tasks) {
			count += tasks[i].length;
		}
		return count;
	})(),
	fps: 30,
	delay: 0,
});

selectMode();

function selectMode(index) {
	if (!index) {
		runCore();
		return;
	}
	const allMode = [
		{
			name: 'Progress bar mode',
			stdio: 'pipe',
			consoleMode: true,
		},
		{
			name: 'Gulp details mode',
			stdio: 'inherit',
			consoleMode: false,
		},
		{
			name: 'Silent mode',
			stdio: 'pipe',
			consoleMode: false,
		},
	];

	const child_process = require('child_process'),
		spawn = child_process.spawn,
		exec = child_process.exec,
		stdio = allMode[index].stdio,
		consoleMode = allMode[index].consoleMode || false;

	let i = 0;
	for (let j in tasks.gulp) {
		const ls = spawn('gulp', [tasks.gulp[j]], { stdio }); //如果使用stdio:"inherit",就能显示彩色的console结果;如果是用pipe的话就可以进行下面的 ls.stdout.on

		if (consoleMode) {
			ls.stdout.on('data', data => {
				// console.log(data.toString());
				let sign = '-fs';
				if (data.toString().match(sign)) {
					console.log('\n' + data.toString().replace(sign, ''));
				}
			});
			ls.stderr.on('data', data => {
				console.log(`\n stderr: ${data} \n`);
			});
		}

		ls.on('close', code => {
			// console.log(`child process exited with code ${code}`);
			pb.stepRender(consoleMode);
			i++;
			if (i == tasks.gulp.length) {
				runCore();
			}
		});
	}
}

function runCore() {
	require('./core');
}
