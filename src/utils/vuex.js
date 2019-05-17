import AV from '@/plugins/leancloud'
import router from '@/router'

export const set = property => (state, payload) => (state[property] = payload)

export const toggle = property => state => (state[property] = !state[property])

export const logout = evt => {

        console.log('登出');
        AV.User.logOut().then(e => {
                router.push({
                        path: "/login"
                });
        });
}

export const login = function () {
        let __this = arguments[0];
        let username = __this.model.username;
        let password = __this.model.password;
        // LeanCloud - 登录
        // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
        AV.User.logIn(username, password)
                .then(function (user) {
                        // 登录成功
                        let dest;
                        if (__this.$route.query.redirect) {
                                dest = __this.$route.query.redirect;
                        } else {
                                //默认转跳到
                                dest = "/";
                        }
                        router.push({
                                path: dest
                        });
                })
                .catch(alert);
}