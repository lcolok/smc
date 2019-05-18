import { set, toggle } from '@/utils/vuex'
import AV from '@/plugins/leancloud'

export default {
  setDrawer: set('drawer'),
  setImage: set('image'),
  setColor: set('color'),
  toggleDrawer: toggle('drawer'),
  toggleDevPort: (state, payload) => {
    if (process.env.NODE_ENV !== "development") { return }
    if (state['devPort']) {

      var devPort = require('../../../../config/api.config').server.devPort || 3000;
      AV._setServerURLs('http://localhost:' + devPort)//设置本地服务器端口(必须先进行 lean up 操作)

    } else {
      AV._setServerURLs(state.origServerURLs)//设置本地服务器端口(必须先进行 lean up 操作)
    }
    state['devPort'] = !state['devPort'];
  },
}
