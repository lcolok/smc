<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>{{$t('One more thing')}}...</small>
          </div>
          <div class="text-center">
            <base-button
              type="primary"
              class="my-4"
              @click="checkEmail"
            >{{$t('I have verified the mail')}}</base-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: ""
      }
    };
  },
  mounted() {
    // this.checkEmail();
    // console.log(this.$AV.User.current());
  },
  methods: {
    checkEmail() {
      let __this = this;
      let sessionToken = this.$AV.User.current().getSessionToken(); //获取sessionToken
      this.$AV.User.logOut().then(e => {
        //再登出
        this.$AV.User.become(sessionToken).then(function(user) {
          //利用sessionToken登录,相当于刷新AV.User的信息
          console.log(user);
          if (user.attributes.emailVerified) {
            let dest;
            if (__this.$route.query.redirect) {
              dest = __this.$route.query.redirect;
            } else {
              //默认转跳到
              dest = "/";
            }
            __this.$router.push({
              path: dest
            });
          } else {
            __this.$notify({
              type: "danger",
              title: "请验证你的邮箱"
            });
          }
        });
      });
    }
  }
};
</script>
<style>
</style>
