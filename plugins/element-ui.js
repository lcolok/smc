import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
Vue.config.productionTip = false

export default () => {
  Vue.use(Element, { locale })
}
