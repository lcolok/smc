<template>
	<v-app-bar app id="core-toolbar" style="background: #eee;">
		<v-toolbar-title class="tertiary--text font-weight-light">
			<v-btn
				v-if="responsive"
				class="default v-btn--simple"
				dark
				icon
				@click.stop="onClickBtn"
			>
				<v-icon>mdi-view-list</v-icon> </v-btn
			>{{ $t(title) }}</v-toolbar-title
		>

		<v-spacer />
		<v-toolbar-items>
			<v-flex align-center layout py-2>
				<base-searchbar v-if="responsiveInput" />
				<router-link
					:draggable="false"
					v-ripple
					class="toolbar-items"
					to="/home"
				>
					<v-icon color="tertiary">mdi-home</v-icon>
				</router-link>
				<router-link
					:draggable="false"
					v-ripple
					class="toolbar-items"
					to="/dashboard"
				>
					<v-icon color="tertiary">mdi-view-dashboard</v-icon>
				</router-link>
				<a
					:draggable="false"
					v-ripple
					class="toolbar-items"
					@click="toggleUBS()"
				>
					<lottie-upload-status />
				</a>

				<template v-slot:activator="{ on }">
					<v-menu
						bottom
						left
						content-class="dropdown-menu"
						offset-y
						transition="slide-y-transition"
					>
						<a v-on="on" :draggable="false" v-ripple class="toolbar-items">
							<v-icon color="tertiary">mdi-dots-vertical</v-icon>
						</a>
						<v-list dense>
							<v-list-tile
								v-for="(menuItem, i) in profileMenu"
								:key="i"
								@click="menuItem.action($event)"
							>
								<v-icon>{{ menuItem.icon }}</v-icon>
								<v-list-tile-title>{{ $t(menuItem.text) }}</v-list-tile-title>
							</v-list-tile>
						</v-list>
					</v-menu>
				</template>
			</v-flex>
		</v-toolbar-items>
	</v-app-bar>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
	computed: {
		profileMenu() {
			return this.$store.state.menu.profileMenu;
		},
		toPath(e) {
			return this.$route.fullPath;
		},
		title() {
			return this.$route.name;
		},
	},

	data: () => ({
		notifications: [
			'Mike, John responded to your email',
			'You have 5 new tasks',
			"You're now a friend with Andrew",
			'Another Notification',
			'Another One',
		],
		responsiveInput: false,
		responsive: false,
	}),
	mounted() {
		this.onResponsiveInverted();
		window.addEventListener('resize', this.onResponsiveInverted);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.onResponsiveInverted);
	},

	methods: {
		...mapMutations('app', ['setDrawer', 'toggleDrawer']),
		...mapMutations('upload', ['toggleUBS']),
		// ...mapActions('upload', ['toggleUploadBottomSheet']),

		onResponsiveInverted() {
			if (window.innerWidth < 991) {
				this.responsive = true;
				this.responsiveInput = false;
			} else {
				this.responsive = false;
				this.responsiveInput = true;
			}
		},
		keydown: async function(e) {
			// key.Code === 13表示回车键
			console.log(e);
			if (e.keyCode === 13) {
				//逻辑处理
				this.searchByKeyword({ delay: 0 });
				this.$refs.searchBar.blur();
			}
		},

		querySelections(v) {
			this.loading = true;
			// Simulated ajax query
			setTimeout(() => {
				this.items = this.states.filter(e => {
					return (e || '').toLowerCase().indexOf((v || '').toLowerCase()) > -1;
				});
				this.loading = false;
			}, 0);
		},

		onClickBtn() {
			this.setDrawer(!this.$store.state.app.drawer);
		},
		onClick() {
			//
		},
	},
};
</script>

<style>
#core-toolbar a {
	text-decoration: none;
}
</style>
