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
              @click="login"
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
    this.checkEmail();
    console.log(this.$AV.User.current());
  },
  methods: {
    login() {
      console.log(this.$AV.User.current().attributes.emailVerified);
      console.log(this.$route.query.redirect);
      if (this.checkEmail()) {
        this.$router.push({
          path: this.$route.query.redirect,
          query: {}
        });
      }
    },
    checkEmail() {
      if (!this.$AV.User.current().attributes.emailVerified) {
        this.$notify({
          type: "danger",
          title: "请验证你的邮箱"
        });
        return false;
      } else {
        return true;
      }
    }
  }
};
</script>
<style>
</style>
