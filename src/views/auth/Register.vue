<template>
	<div class="row justify-content-center">
		<div class="col-lg-5 col-md-7">
			<div class="card bg-secondary shadow border-0">
				<div class="card-header bg-transparent pb-5">
					<div class="text-muted text-center mt-2 mb-3">
						<small>{{ $t('Sign up with') }}</small>
					</div>
					<div class="btn-wrapper text-center">
						<a href="#" class="btn btn-neutral btn-icon">
							<span class="btn-inner--icon">
								<img src="img/icons/common/github.svg" />
							</span>
							<span class="btn-inner--text">Github</span>
						</a>
						<a href="#" class="btn btn-neutral btn-icon">
							<span class="btn-inner--icon">
								<img src="img/icons/common/google.svg" />
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
						<v-text-field
							v-model="username"
							autocapitalize="off"
							prepend-icon="mdi-account"
							:placeholder="$t('Username') + $t('or') + $t('Email')"
							solo
							spellcheck="false"
							:append-outer-icon="
								status.username ? 'mdi-check-decagram' : 'mdi-alert-decagram'
							"
							:color="status.username ? 'success' : 'error'"
							:rules="[rules.required]"
							:hint="userHint"
						></v-text-field>
						<v-text-field
							v-model="password"
							prepend-icon="mdi-lock"
							:append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
							:type="visible ? 'text' : 'password'"
							@click:append="visible = !visible"
							:placeholder="$t('Password')"
							solo
							:hint="warning"
							:rules="[rules.required, rules.min, rules.verification]"
							:append-outer-icon="
								status.password ? 'mdi-check-decagram' : 'mdi-alert-decagram'
							"
							:color="status.password ? 'success' : 'error'"
							autocomplete="new-password"
						></v-text-field>
						<password
							v-model="password"
							:strength-meter-only="true"
							:secureLength="8"
							@score="showScore"
							@feedback="showFeedback"
						/>
						<v-text-field
							v-model="invitationCode"
							v-mask="mask"
							prepend-icon="mdi-barcode-scan"
							autocapitalize="off"
							spellcheck="false"
							:placeholder="$t('Invitation Code')"
							solo
							:rules="[rules.required, rules.checkInvitationCode]"
							:append-outer-icon="
								status.invitationCode
									? 'mdi-check-decagram'
									: 'mdi-alert-decagram'
							"
							:color="status.invitationCode ? 'success' : 'error'"
						></v-text-field>

						<div class="text-center">
							<base-button
								type="primary"
								class="my-4"
								@click="signUp({ username, password, invitationCode, status })"
								>{{ $t('Create account') }}</base-button
							>
						</div>
					</form>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-6 text-left">
					<a href="#" class="text-light">
						<small>{{ $t('Forgot password?') }}</small>
					</a>
				</div>
				<div class="col-6 text-right">
					<router-link to="/login" class="text-light">
						<small>{{ $t('Login into your account') }}</small>
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { signUp } from '@/utils/user';
import Password from 'vue-password-strength-meter';
import { mask } from 'vue-the-mask';
import AV from 'leancloud-storage';
import * as _ from 'lodash';
export default {
	beforeRouteEnter(to, from, next) {
		//beforeRouteEnter 守卫 不能 访问 this，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

		if (!AV.User.current()) {
			next(vm => {
				if (_.has(vm.$route, 'query.code')) {
					vm.invitationCode = vm.$route.query.code;
				}
				// vm.invitationCode=vm.$route
			});
		} else {
			next({ path: from.path });
		}
	},
	name: 'register',
	components: { Password },
	directives: {
		mask,
	},
	watch: {
		invitationCode: async function(val) {
			if (this.oldInvitationCode == val) {
				return;
			}

			this.oldInvitationCode = val;

			if (!this.checkInvitationCode(val)) {
				console.log(val);

				let resp = await AV.Cloud.run('checkInvitationCode', { code: val });
				if (resp) {
					this.status.invitationCode = true;
				} else {
					this.status.invitationCode = false;
				}
				return resp;
			}
			this.status.invitationCode = false;
			return;
		},
		username: async function(val) {
			setTimeout(async () => {
				if (!val) return (this.status.username = false);

				let resp = await AV.Cloud.run('checkUsername', { username: val });
				if (resp) {
					this.status.username = false;
				} else {
					this.status.username = true;
				}
			}, 500);
		},
	},
	data() {
		return {
			mask: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',

			status: { invitationCode: false, password: false, username: false },

			username: null,
			email: null,
			password: null,
			invitationCode: null,
			oldInvitationCode: null,
			visible: false,
			suggestions: null,
			warning: null,

			rules: {
				required: value => !!value || 'Required.',
				min: v => v == null || (v.length >= 8 || 'Min 8 characters'),
				verification: val => {
					return this.warning || true;
				},
				checkInvitationCode: val => this.checkInvitationCode(val),
			},
		};
	},
	computed: {
		userHint() {
			return !this.status.username ? 'Username has been registered' : '';
		},
	},
	methods: {
		checkInvitationCode(val) {
			let len = 'e5c632e4-4ad2-4105-b91c-2dd9c7165bfc'.length;
			if (!val) {
				return true;
			}
			if (val.length < len) {
				return `Need more ${len - val.length} characters`;
			}
			if (val.length == len) {
				return false;
			}
			return true;
		},
		signUp({ username, password, invitationCode, status }) {
			let newArr = [];
			_.forIn(status, function(value, key) {
				if (value) {
					newArr.push(key);
				}
			});
			if (newArr.length == _.values(status).length) {
				console.log('通过认证');
				signUp({ username, password, invitationCode });
			}
		},
		showFeedback({ suggestions, warning }) {
			console.log('🙏', suggestions);
			console.log('⚠️', warning);
			this.suggestions = suggestions;
			this.warning = warning;
		},
		showScore(score) {
			console.log('💯', score);

			this.status.password = score == 4 ? true : false;
		},
	},
};
</script>
<style></style>
