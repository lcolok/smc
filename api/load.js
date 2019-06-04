const AV = require('leanengine');
const PQueue = require('p-queue');
const queue = new PQueue({ concurrency: 1 });

module.exports = e =>
	new Promise((resolve, reject) => {
		let promiseArr = [];
		if (e.params instanceof Array) {
			e.params.forEach(element => {
				promiseArr.push(() => dealWith(element));
			});
		} else {
			resolve({
				code: 1,
				error: 'commandArray并不是数组，请输入数组',
			});
		}
		// console.log(promiseArr);

		/* Promise.all(promiseArr).then(function (feedback) {
                resolve(feedback);
        }); */

		resolve(queue.addAll(promiseArr));
	});

function getItem(className, target_id) {
	return new Promise((resolve, reject) => {
		if (!className) {
			return reject('GetItem缺少ClassName');
		}
		if (!target_id) {
			return reject('GetItem缺少target_id');
		}

		const query = new AV.Query(className);
		query.equalTo('real_id', target_id);
		resolve(query.first());
	});
}

function dealWith(input) {
	// console.log(input);
	return new Promise((resolve, reject) => {
		const className = input.className;
		const action = input.action;
		const attributes = input.attributes;
		const real_id = input.real_id;
		const target_id = input.target_id;

		// 声明类型
		const CurrentClass = AV.Object.extend(className);
		// 新建对象
		const cc = new CurrentClass();
		cc.disableBeforeHook();
		cc.disableAfterHook(); // 如果是其他方式构建对象，则需要在新构建的对象上调用相关的 disable 方法，来确保不会再次触发 Hook 函数

		switch (action) {
			case 'save':
				console.log('case save');

				//不存在 real_ 开头的三个参数(id, createdAt, updatedAt)就不能执行载入
				for (let i of ['id', 'createdAt', 'updatedAt']) {
					let real = `real_${i}`;
					if (!input[real]) {
						resolve({
							code: 1,
							error: `缺少必要属性 ${real}`,
						});
						return;
					} else {
						let val;
						if (real == 'real_createdAt' || real == 'real_updatedAt') {
							val = new Date(input[real]);
						} else {
							val = input[real];
						}
						cc.set(real, val);
					}
				}
				//正常情况执行载入
				cc.set(attributes);
				cc.save()
					.then(object => resolve({ code: 0, object, action }))
					.catch(error => resolve({ code: 1, error, action }));
				break;
			case 'delete':
				console.log('case delete');
				getItem(className, target_id).then(item => {
					//first() 就是只返回第一条结果的 find()
					if (!item) {
						resolve({
							code: 1,
							error: '没有此real_id',
						});
					} else {
						item
							.destroy()
							.then(object => resolve({ code: 0, object, action })) // 删除成功
							.catch(error => resolve({ code: 1, error, action }));
					}
				});
				break;
			case 'update':
				console.log('case update');
				getItem(className, target_id).then(item => {
					//first() 就是只返回第一条结果的 find()
					if (!item) {
						resolve({
							code: 1,
							error: '没有此real_id',
						});
					} else {
						item.set(attributes);
						item
							.save()
							.then(object => resolve({ code: 0, object, action }))
							.catch(error => resolve({ code: 1, error, action }));
					}
				});
				break;
			default:
				// reject('没有匹配合适的 Action');
				resolve({
					code: 1,
					error: '没有匹配合适的 Action',
				});
		}
	});
}
