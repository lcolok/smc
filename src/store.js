import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    menu: [
      { to: "/profile", icon: "ni ni-single-02", text: "My profile" },
      { to: "/profile", icon: "ni ni-settings-gear-65", text: "Settings" },
      { to: "/profile", icon: "ni ni-calendar-grid-58", text: "Activity" },
      { to: "/profile", icon: "ni ni-support-16", text: "Support" },
      { to: "/logout", icon: "ni ni-user-run", text: "Logout", divider: true }
    ]
  },
  mutations: {

  },
  actions: {

  }
})
