<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign up with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/github.svg">
              </span>
              <span class="btn-inner--text">Github</span>
            </a>
            <a href="#" class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon">
                <img src="img/icons/common/google.svg">
              </span>
              <span class="btn-inner--text">Google</span>
            </a>
          </div>
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>{{ $t('Or sign up with credentials') }}</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              :placeholder="$t('Username')"
              addon-left-icon="ni ni-single-02"
              v-model="model.name"
            ></base-input>

            <base-input
              class="input-group-alternative mb-3"
              :placeholder="$t('Email')"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            ></base-input>

            <base-input
              class="input-group-alternative"
              :placeholder="$t('Password')"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>

            <div class="text-muted font-italic">
              <small>
                {{$t("password strength")}}:
                <span class="text-success font-weight-700">strong</span>
              </small>
            </div>

            <div class="row my-4">
              <div class="col-12">
                <base-checkbox class="custom-control-alternative">
                  <span class="text-muted">
                    {{$t("I agree with the")}}
                    <a href="#!">{{$t("Privacy Policy")}}</a>
                  </span>
                </base-checkbox>
              </div>
            </div>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="signUp">{{$t("Create account")}}</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>{{$t('Forgot password?')}}</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/login" class="text-light">
            <small>{{$t('Login into your account')}}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "register",
  data() {
    return {
      model: {
        name: "",
        email: "",
        password: ""
      }
    };
  },
  methods: {
    signUp() {
      var username = this.model.name;
      var password = this.model.password;
      var email = this.model.email;

      // LeanCloud - 注册
      // https://leancloud.cn/docs/leanstorage_guide-js.html#注册
      var user = new this.$AV.User();
      user.setUsername(username);
      user.setPassword(password);
      user.setEmail(email);
      user
        .signUp()
        .then(function(user) {
          // 注册成功
          console.log(user);
          app.user = user.toJSON();
        })
        .catch(alert);
    }
  }
};
</script>
<style>
</style>
