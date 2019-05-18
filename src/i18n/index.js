import Vue from 'vue'
import VueI18n from 'vue-i18n'
import AV from 'leancloud-storage'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}


const i18n = new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'zh-CN',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-CN',
  messages: loadLocaleMessages(),
})

i18n.missing = (locale, key, vm) => {

  console.log(locale, key, vm);

  if (process.env.NODE_ENV == "development") {
    AV.Cloud.run('i18nPathCreator', {
      locale: locale,
      key: key
    }).then((e) => {
      console.log(e);
    })
  }

}

export default i18n
