const AV = require("leanengine");

module.exports = (e) => {

        const className = e.params.className;
        const action = e.params.action;
        const attributes = e.params.attributes;

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

                        cc.save().then(function (object) {
                                console.log('objectId is ' + object.id);
  

                        }, function (error) {
                                console.error(error);
                        });
                        break;



        }









        // console.log(e.params);
        return '你好厉害'
}