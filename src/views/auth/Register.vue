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
						<!-- <base-input
							class="input-group-alternative mb-3"
							:placeholder="$t('Username')"
							addon-left-icon="ni ni-hat-3"
							v-model="username"
            ></base-input>-->

						<!-- <base-input
							class="input-group-alternative mb-3"
							:placeholder="$t('Email')"
							addon-left-icon="ni ni-email-83"
							v-model="email"
            ></base-input>-->
						<!-- <div>
							<base-input
								class="input-group-alternative"
								:placeholder="$t('Password')"
								type="password"
								addon-left-icon="ni ni-lock-circle-open"
								v-model="password"
							></base-input>
            </div>-->

						<v-text-field
							v-model="username"
							autocapitalize="off"
							prepend-icon="mdi-account"
							:placeholder="$t('Username') + $t('or') + $t('Email')"
							solo
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
								invitationCodeStatus
									? 'mdi-check-decagram'
									: 'mdi-alert-decagram'
							"
							:color="invitationCodeStatus ? 'success' : 'error'"
						></v-text-field>
						<!-- <div class="text-muted font-italic">
							<small>
								{{ $t('password strength') }}:
								<span class="text-success font-weight-700">strong</span>
							</small>
            </div>-->

						<!-- <div class="row my-4">
							<div class="col-12">
								<base-checkbox class="custom-control-alternative">
									<span class="text-muted">
										{{ $t('I agree with the') }}
										<a href="#!">{{ $t('Privacy Policy') }}</a>
									</span>
								</base-checkbox>
							</div>
            </div>-->
						<div class="text-center">
							<base-button type="primary" class="my-4" @click="signUp()">{{
								$t('Create account')
							}}</base-button>
						</div>
					</form>
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-6">
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
export default {
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

			if (!this.checkInvitationCode(val)) {
				console.log(val);
				this.oldInvitationCode = val;
				let resp = await AV.Cloud.run('checkInvitationCode', { code: val });
				if (resp) {
					this.invitationCodeStatus = true;
				} else {
					this.invitationCodeStatus = false;
				}
				return resp;
			}
			this.invitationCodeStatus = false;
			return;
		},
	},
	data() {
		return {
			mask: 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX',

			invitationCodeStatus: false,

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
		signUp() {
			signUp(this);
		},
		showFeedback({ suggestions, warning }) {
			console.log('🙏', suggestions);
			console.log('⚠️', warning);
			this.suggestions = suggestions;
			this.warning = warning;
		},
		showScore(score) {
			console.log('💯', score);
		},
	},
};
</script>
<style></style>
