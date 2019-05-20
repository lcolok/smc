import AV from '@/plugins/lc_client_init'
import router from '@/router'

export const logout = evt => {

        console.log('登出');
        AV.User.logOut().then(e => {
                router.push({
                        path: "/login"
                });
        });
}

export const devPort = function (bool) {


        if (process.env.NODE_ENV !== "development") { return }
        if (bool) {
                console.log('本地⮕远程');
                AV._setServerURLs(AV._config.devServerURLs)//设置本地服务器端口(必须先进行 lean up 操作)

        } else {
                console.log('远程⮕本地');
                AV._setServerURLs(AV._config.origServerURLs)
        }


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