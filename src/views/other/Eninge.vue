<template>
	<div class="row justify-content-center">
		<div class="col-lg-5 col-md-7">
			<div class="card bg-secondary shadow border-0">
				<div class="card-header bg-transparent pb-5">
					<div class="text-muted text-center mt-2 mb-3 font-weight-bolder">
						<small>当前二维码</small>
					</div>
				</div>
				<div class="card-body px-lg-5 py-lg-5">
					<div class="text-center text-muted mb-4 font-weight-bolder">
						<small>把新的二维码裁剪好并拖拽上传即可</small>
					</div>
					<base-filepond />
				</div>
			</div>
			<div class="row mt-3">
				<div class="col-6">
					<a href="#" class="text-light font-weight-bolder">
						<small>{{ $t('Forgot password?') }}</small>
					</a>
				</div>
				<div class="col-6 text-right font-weight-bolder">
					<router-link to="/register" class="text-light">
						<small>{{ $t('Create new account') }}</small>
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

export default {
	name: 'login',
	data() {
		return {
			model: {
				username: '',
				password: '',
			},
		};
	},
	methods: {
		login() {
			login(this);
		},
	},
};
</script>
<style></style>
