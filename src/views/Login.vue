<template>
<!--   <div>
    <div >
      <div >
        <div>
          <div >
            <small>Sign in with</small>
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
            <small>Or sign in with credentials</small>
          </div>
       
            <v-text-field
              class="input-group-alternative mb-3"
              :placeholder="$t('Username')+$t('or')+$t('Email')"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
            ></v-text-field>

            <v-text-field
              class="input-group-alternative"
              :placeholder="$t('Password')"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></v-text-field>

            <v-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </v-checkbox>
            <div class="text-center">
              <v-btn color="success" @click="login">{{$t("Sign in")}}</v-btn>
            </div>
        
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light">
            <small>{{$t("Forgot password?")}}</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light">
            <small>{{$t("Create new account")}}</small>
          </router-link>
        </div>
      </div>
    </div>
 
  </div> -->
  <div id="app">
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar  color="primary">
                <v-toolbar-title >Login form</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <v-btn
                    icon
                  
                    target="_blank"
                    slot="activator"
                  >
                    <v-icon large>mdi-help-rhombus</v-icon>
                  </v-btn>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>

                <v-form>
                  <v-text-field box v-model="model.username" prepend-icon="mdi-account" name="login" label="Login" type="text"></v-text-field>
                  <v-text-field box active-class="border-radius: 6px" v-model="model.password" prepend-icon="mdi-lock" name="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      var username = this.model.username;
      var password = this.model.password;

      let __this = this;
      // LeanCloud - 登录
      // https://leancloud.cn/docs/leanstorage_guide-js.html#用户名和密码登录
      this.$AV.User.logIn(username, password)
        .then(function(user) {
          // 登录成功
          console.log(user);
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
        })
        .catch(alert);
    }
  }
};
</script>
<style>
</style>
