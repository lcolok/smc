<template>
	<v-footer padless fixed>
		<!-- <div class="mainHolder">
			<div class="textHolder">
				<p>this is FrostedGlass</p>
			</div>
		</div> -->
		<v-card class="mainHolder text-center">
			<div class="textHolder">
				<p>
					<!-- <v-card-text>
						<div>
							<v-btn
								v-for="icon in icons"
								:key="icon"
								:class="[
									$vuetify.breakpoint.smAndDown || 'mx-4',
									'white--text',
								]"
								icon
							>
								<v-icon size="24px">{{ icon }}</v-icon>
							</v-btn>
						</div>
						<div class="white--text pt-0  caption">
							<div>
								Copyright © 2013 — {{ new Date().getFullYear() }} JUB MEDIA. All
								Rights Reserved.
							</div>
							<div>
								<strong>聚本传媒 版权所有</strong> 高企证书编号:GR201844005339
							</div>
						</div>
					</v-card-text> -->
				</p>
			</div>
		</v-card>
	</v-footer>
</template>

<script>
export default {
	data: () => ({
		icons: [
			'mdi-wechat',
			'mdi-qqchat',
			'mdi-sina-weibo',
			'mdi-apple',
			'mdi-google',
			'mdi-microsoft',
		],
	}),
};
</script>

<style lang="scss" scoped>
.blur_footer {
	background-image: url('~@/assets/img/background/auth.jpg');
	background-position: center top;
	background-size: cover;
	background-attachment: fixed;
	-webkit-filter: blur(20px);
	-moz-filter: blur(20px);
	-ms-filter: blur(20px);
	-o-filter: blur(20px);
	filter: blur(20px);
}

* {
	box-sizing: border-box;
}
.textHolder {
	width: 100%;
	height: auto;
	position: absolute;
	right: 0;
	bottom: 0;
	background: inherit;
	overflow: hidden;
}
.textHolder::before {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: inherit;
	background-attachment: fixed;
	filter: blur(10px);
}
.textHolder::after {
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: rgba(0, 0, 0, 0);
}

p {
	z-index: 1;
	color: white;
	position: relative;
	margin: 0;
}

.v-card__text {
	z-index: 1;
	color: white;
	position: relative;
	margin: 0;
}
</style>
