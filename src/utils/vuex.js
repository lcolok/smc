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