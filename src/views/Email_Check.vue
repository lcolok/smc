<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4 font-weight-bolder">
            <small>{{$t('One more thing...')}}</small>
          </div>
          <form role="form">
            <div class="text-center">
              <base-button
                type="primary"
                class="my-4"
                @click="check()"
              >{{$t("I have recieve and confirm the email")}}</base-button>
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
import { login, devPort } from '@/utils/user';
import { mapMutations } from 'vuex';
import { setTimeout } from 'timers';
import router from '@/router';


export default {
        name: 'email_check',
        mounted(){
                this.check();
        },
	data() {
		return {
			model: {
				username: '',
				password: '',
			},
		};
	},
	methods: {
		check() {
			if (this.$AV.User.current()) {
                                console.log('登录成功');
				// 登录成功
				let dest;
				if (this.$route.query.redirect) {
					dest = this.$route.query.redirect;
				} else {
					//默认转跳到
					dest = '/';
				}
				router.push({
					path: dest,
				});
			}
		},
	},
};
</script>
<style>
</style>
