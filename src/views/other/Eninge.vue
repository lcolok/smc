<template>
	<div class="row justify-content-center">
		<div class="col-lg-5 col-md-7">
			<div class="card bg-custom shadow border-0">
				<div v-if="auth" class="card-header bg-white pb-5">
					<div class="text-center text-muted mb-4 font-weight-bolder">
						<small>把新的二维码裁剪好并拖拽上传即可</small>
					</div>
					<base-filepond
						:uploadedCallBack="updateQRCode"
						accepted-file-types="image/jpeg, image/png"
					/>
				</div>

				<div class="card-body px-lg-5 py-lg-5">
					<div
						v-if="auth"
						class="text-muted text-center mt-2 mb-3 font-weight-bolder"
					>
						<small>当前二维码</small>
					</div>
					<div
						class="center-cropped"
						:style="`background-image: url(${QRcode});`"
					>
						<img :src="QRcode" />
					</div>

					<!-- <div class="center-cropped" :style="`background-image: url(${QRcode});`">
            <img :src="QRcode" />
          </div> -->
					<!-- <v-img :src="QRcode" /> -->
				</div>
			</div>
			<!-- <div class="row mt-3">
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
      </div>-->
		</div>
	</div>
</template>
<script>
import { login, devPort } from '@/utils/user';
import { mapMutations } from 'vuex';
import { setTimeout } from 'timers';
import AV from 'leancloud-storage';

export default {
	name: 'login',
	beforeCreate() {
		const query = new AV.Query('EningeQRCode');
		query.descending('updatedAt');
		let latestPic = query.first().then(obj => {
			this.QRcode = obj.get('images');
		});
	},
	computed: {
		auth() {
			return AV.User.current() ? true : false;
		},
	},
	data() {
		return {
			model: {
				username: '',
				password: '',
			},
			QRcode: '',
		};
	},
	methods: {
		updateQRCode(error, file) {
			let dic = file.file.qiniu.data;
			console.log(dic);
			let EningeQRCode = AV.Object.extend('EningeQRCode');
			let item = new EningeQRCode();
			for (let i in dic) {
				if (i == 'size') {
					item.set(i, Number(dic[i]));
				} else {
					item.set(i, dic[i]);
				}
			}
			item.save().then(
				function() {
					console.log('已上传到LeanCloud');
				},
				function(error) {
					console.log(JSON.stringify(error));
				},
			);
			return;
		},
	},
};
</script>
<style>
.center-cropped {
	width: 100%;
	height: 1200px;
	background-position: center -550px;
	background-repeat: no-repeat;
	overflow: hidden;
	border-radius: 50px;

	zoom: 0.3;
}

/* Set the image to fill its parent and make transparent */
.center-cropped img {
	min-height: 100%;
	min-width: 100%;
	zoom: 5;
	/* IE 8 */
	-ms-filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)';
	/* IE 5-7 */
	filter: alpha(opacity=0);
	/* modern browsers */
	opacity: 0;
}

.v-image {
	height: 850px;
	object-fit: cover;
}
.v-image__image--cover {
	background-size: cover;
}
.bg-custom {
	background-color: #ededed !important;
}
</style>
