<template>
	<v-navigation-drawer
		id="app-drawer"
		v-model="inputValue"
		dark
		app
		floating
		persistent
		mobile-break-point="991"
		width="260"
	>
		<v-img :src="image" :gradient="sidebarOverlayGradiant" height="100%">
			<v-list nav dense avatar>
				<v-layout column>
					<v-list-item>
						<v-list-item-icon>
							<v-avatar color="white">
								<v-img :src="logo" height="34" contain />
							</v-avatar>
						</v-list-item-icon>
						<v-list-item-content>
							<div class="site_title">{{ $t('Shared Management Center') }}</div>
						</v-list-item-content>
					</v-list-item>
					<v-divider />
					<v-list-item v-if="responsive">
						<base-searchbar />
					</v-list-item>
					<v-list-item
						v-for="(link, i) in links"
						:key="i"
						:to="link.to"
						:color="color"
						:draggable="false"
						class="v-list-item"
					>
						<v-list-item-action>
							<v-icon>{{ link.icon }}</v-icon>
						</v-list-item-action>
						<v-list-item-title v-text="link.text" />
					</v-list-item>
					<!-- <v-list-item
					active-class="primary"
					class="v-list-item v-list-item--buy"
					@click="testClass()"
				>
					<v-list-item-action>
						<v-icon>mdi-package-up</v-icon>
					</v-list-item-action>
					<v-list-item-title class="font-weight-light"
						>测试Class</v-list-item-title
					>
				</v-list-item>
				<v-list-item
					active-class="primary"
					class="v-list-item v-list-item--buy"
					@click="testAPI()"
				>
					<v-list-item-action>
						<v-icon>mdi-package-up</v-icon>
					</v-list-item-action>
					<v-list-item-title class="font-weight-light"
						>测试API</v-list-item-title
					>
				</v-list-item> -->
				</v-layout>
			</v-list>
		</v-img>
	</v-navigation-drawer>
</template>

<script>
// Utilities
import { mapMutations, mapState } from 'vuex';
// import { isEmpty } from 'underscore';
import * as _ from 'lodash';

export default {
	beforeRouteEnter(to, from, next) {
		console.log(to);
	},
	computed: {
		...mapState('app', ['image', 'color']),
		...mapState('search', ['results']),
		links() {
			let vm = this;
			let links = [
				{
					to: '/home',
					icon: 'mdi-home',
					text: this.$t('Home'),
				},
				{
					to: '/search_results',
					icon: 'mdi-cloud-search',
					text: this.$t('Search Results'),
					display: !_.isEmpty(this.results) || _.has(this.$route, 'query.key'),
				},
				// {
				// 	to: '/upload_page',
				// 	icon: 'mdi-cloud-upload',
				// 	text: this.$t('Upload Page'),
				// },
				{
					to: '/dashboard',
					icon: 'mdi-view-dashboard',
					text: this.$t('Dashboard'),
				},
				{
					to: '/management',
					icon: 'mdi-account',
					text: this.$t('User Management'),
				},
				{
					to: '/user-profile',
					icon: 'mdi-account',
					text: this.$t('User Profile'),
				},
				{
					to: '/table-list',
					icon: 'mdi-clipboard-outline',
					text: this.$t('Table List'),
				},
				{
					to: '/typography',
					icon: 'mdi-format-font',
					text: this.$t('Typography'),
				},
				{
					to: '/icons',
					icon: 'mdi-chart-bubble',
					text: this.$t('Icons'),
				},
				{
					to: '/maps',
					icon: 'mdi-map-marker',
					text: this.$t('Maps'),
				},
				{
					to: '/notifications',
					icon: 'mdi-bell',
					text: this.$t('Notifications'),
				},
			];
			return links
				.filter(e => {
					return e.display == undefined ? true : e.display;
				})
				.map(e => {
					e.to = makeTo(e.to);
					// console.log(e);

					function makeTo(to) {
						return {
							path: to,
							query: vm.$route.query,
						};
					}

					return e;
				});
		},
		inputValue: {
			get() {
				return this.$store.state.app.drawer;
			},
			set(val) {
				this.setDrawer(val);
			},
		},
		items() {
			return this.$t('Layout.View.items');
		},
		sidebarOverlayGradiant() {
			return `${this.$store.state.app.sidebarBackgroundColor}, ${this.$store.state.app.sidebarBackgroundColor}`;
		},
	},
	data() {
		return {
			logo: `${this.$baseUrl}img/CloudUploadAlpha.png`,

			responsive: false,
		};
	},

	mounted() {
		this.onResponsiveInverted();
		window.addEventListener('resize', this.onResponsiveInverted);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResponsiveInverted);
	},
	methods: {
		...mapMutations('app', ['setDrawer', 'toggleDrawer']),
		testAPI() {
			this.$AV.Cloud.run('alive', { a: '哈哈哈' }).then(e => {
				console.log(e);
			});
		},
		testClass() {
			/*       this.$AV.Cloud.run("alive", { a: "哈哈哈" }).then(e => {
        console.log(e);
      }); */
			let Comments = this.$AV.Object.extend('Comments');
			let comObject = new Comments();

			comObject.set('guy', '哈哈哈');
			comObject.set('content', '嘻嘻嘻');
			comObject.save().then(
				function(testObject) {
					// 成功
					console.log(testObject);
				},
				function(error) {
					// 失败
				},
			);
		},
		onResponsiveInverted() {
			if (window.innerWidth < 991) {
				this.responsive = true;
			} else {
				this.responsive = false;
			}
		},
	},
};
</script>

<style lang="scss">
.site_title {
	font-size: 20px;
}

#app-drawer {
	.v-list-item {
		border-radius: 8px;

		&--buy {
			margin-top: auto;
			margin-bottom: 17px;
		}
	}

	.v-image__image--contain {
		top: 9px;
		height: 60%;
	}

	.search-input {
		margin-bottom: 30px !important;
		padding-left: 15px;
		padding-right: 15px;
	}

	div.v-responsive.v-image > div.v-responsive__content {
		overflow-y: auto;
	}
}
</style>
