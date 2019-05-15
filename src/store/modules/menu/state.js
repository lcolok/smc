// https://vuex.vuejs.org/en/state.html

export default {
  profileMenu: [
    { to: "/profile", icon: "ni ni-single-02", text: "My profile" },
    { to: "/profile", icon: "ni ni-settings-gear-65", text: "Settings" },
    { to: "/profile", icon: "ni ni-calendar-grid-58", text: "Activity" },
    { to: "/profile", icon: "ni ni-support-16", text: "Support" },
    { to: "/logout", icon: "ni ni-user-run", text: "Logout", divider: true }
  ],
  drawerMenu: [
    { name: 'Dashboard', icon: 'ni ni-tv-2 text-primary', path: '/dashboard' },
    // { name: 'Icons', icon: 'ni ni-planet text-blue', path: '/icons' },
    // { name: 'Maps', icon: 'ni ni-pin-3 text-orange', path: '/maps' },
    { name: 'My profile', icon: 'ni ni-single-02 text-yellow', path: '/profile' },
    // { name: 'Tables', icon: 'ni ni-bullet-list-67 text-red', path: '/tables' },
    // { name: 'Login', icon: 'ni ni-key-25 text-info', path: '/login' },
    // { name: 'Register', icon: 'ni ni-circle-08 text-pink', path: '/register' }
  ]
}
