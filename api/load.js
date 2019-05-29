const AV = require("leanengine");
const PQueue = require('p-queue');
const queue = new PQueue({ concurrency: 1 });



module.exports = (e) => new Promise((resolve, reject) => {

        let feedback = [], promiseArr = [];
        if (e.params.length > 0) {
                e.params.forEach(element => {
                        promiseArr.push(() => dealWith(element));
                });
        } else {
                promiseArr.push(() => dealWith(e.params));
        }

        /* Promise.all(promiseArr).then(function (feedback) {
                resolve(feedback);
        }); */

        resolve(queue.addAll(promiseArr))


})


function dealWith(input) {
        console.log(input);
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
                                // 遍历设值
                                // for (var i in attributes) {
                                //         cc.set(i, attributes[i]);
                                // }
                                cc.set(attributes);
                                cc.save().then(function (obj) {
                                        for (let i of ['id', 'createdAt', 'updatedAt']) {
                                                if (!obj[`real_${i}`]) {//不存在 real_ 开头的三个参数(id, createdAt, updatedAt)才创建
                                                        obj.set(`real_${i}`, obj[i])
                                                }
                                        }
                                        obj.save().then(function (object) {
                                                resolve({ code: 0, object })
                                        });
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