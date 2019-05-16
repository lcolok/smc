import AV from '@/plugins/leancloud'
import router from '@/router'


export default {
  profileMenu: [
    { to: "/profile", icon: "mdi-account-settings", text: "My profile" },
    { to: "/profile", icon: "mdi-settings", text: "Settings" },
    { to: "/profile", icon: "mdi-calendar-multiselect", text: "Activity" },
    { to: "/profile", icon: "mdi-help-circle", text: "Support" },
    {
      to: "/logout", icon: "mdi-exit-run", text: "Logout", divider: true, action: (ent) => {
        // console.log(ent);
        console.log('登出');

        AV.User.logOut().then(e => {
          router.push({
            path: "/login"
          });
        });
      }
    }
  ],
}
