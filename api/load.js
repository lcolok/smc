const AV = require("leanengine");
const PQueue = require('p-queue');
const queue = new PQueue({ concurrency: 1 });



module.exports = (e) => new Promise((resolve, reject) => {

        let promiseArr = [];
        if (e.params instanceof Array) {
                e.params.forEach(element => {
                        promiseArr.push(() => dealWith(element));
                });
        } else {
                resolve({ code: 1, error: 'commandArray并不是数组，请输入数组' })
        }
        // console.log(promiseArr);

        /* Promise.all(promiseArr).then(function (feedback) {
                resolve(feedback);
        }); */

        resolve(queue.addAll(promiseArr))


})


function dealWith(input) {
        // console.log(input);
        return new Promise((resolve, reject) => {
                const className = input.className;
                const action = input.action;
                const attributes = input.attributes;
                const real_id = input.real_id;

                // 声明类型
                const CurrentClass = AV.Object.extend(className);
                // 新建对象
                const cc = new CurrentClass();
                cc.disableBeforeHook();
                cc.disableAfterHook();// 如果是其他方式构建对象，则需要在新构建的对象上调用相关的 disable 方法，来确保不会再次触发 Hook 函数

                switch (action) {
                        case 'save':
                                console.log('case save');

                                //不存在 real_ 开头的三个参数(id, createdAt, updatedAt)就不能执行载入
                                for (let i of ['id', 'createdAt', 'updatedAt']) {
                                        let real = `real_${i}`;
                                        if (!input[real]) {
                                                resolve({ code: 1, error: `缺少必要属性 ${real}` })
                                                return
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
                                cc.save().then(function (object) {

                                        resolve({ code: 0, object });
                                }, function (error) {
                                        // console.error(error);
                                        // reject(error)
                                        resolve({ code: 1, error })
                                });
                                break;
                        case 'delete':
                                const query = new AV.Query(className);
                                query.equalTo('real_id', real_id);
                                query.find().then(results => {
                                        if (results.length == 0) { resolve({ code: 1, error: '没有此real_id' }) }
                                        results[0].destroy().then(function (object) {
                                                // 删除成功
                                                resolve({ code: 0, object })
                                        }, function (error) {
                                                // 删除失败
                                                resolve({ code: 1, error })
                                        })
                                })
                                break;
                        default:
                                // reject('没有匹配合适的 Action');
                                resolve({ code: 1, error: '没有匹配合适的 Action' })
                }
        })
}