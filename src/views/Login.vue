<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3 font-weight-bolder">
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
          <div class="text-center text-muted mb-4 font-weight-bolder">
            <small>Or sign in with credentials</small>
          </div>
          <form role="form">
            <base-input
              class="input-group-alternative mb-3"
              :placeholder="$t('Username')+$t('or')+$t('Email')"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
            ></base-input>

            <base-input
              class="input-group-alternative"
              :placeholder="$t('Password')"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted font-weight-bolder">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4" @click="login()">{{$t("Sign in")}}</base-button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light font-weight-bolder">
            <small>{{$t("Forgot password?")}}</small>
          </a>
        </div>
        <div class="col-6 text-right font-weight-bolder">
          <router-link to="/register" class="text-light">
            <small>{{$t("Create new account")}}</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/vendor/nucleo/css/nucleo.css"; //主要为argon中的icon
import "@/assets/scss/argon.scss";
import { login, devPort } from "@/utils/user";
import { mapMutations } from "vuex";
import { setTimeout } from "timers";

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
      login(this);
    }
  }
};
</script>
<style>
</style>
