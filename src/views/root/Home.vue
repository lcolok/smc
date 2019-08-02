<template>
	<v-container fluid grid-list-md fill-height>
		<v-layout wrap align-space-around justify-center row fill-height>
			<v-flex v-if="$vuetify.breakpoint.smAndDown">
				<v-card>
					<base-searchbar class="pa-3" />
				</v-card>
			</v-flex>
			<v-flex xs12>
				<material-card color="white" :dark="false">
					<v-layout row wrap>
						<v-flex md6 sm12>
							<h2 class="title font-weight-light">
								{{ $t('Recently uploaded') }}
							</h2>
							<v-container fill-height fluid grid-list-md>
								<v-layout wrap>
									<v-flex
										v-for="(item, index) in results"
										:key="index"
										sm6
										xs12
										md12
										lg6
									>
										<material-results-card
											v-bind="item"
											:title="item.name"
											:subTitle="item.name_trans"
											:index="index"
										/>
									</v-flex>
								</v-layout>
							</v-container>
						</v-flex>

						<v-flex md6 sm12>
							<h2 class="title font-weight-light mb-3">
								Notifications Style
							</h2>

							<material-notification class="mb-3" color="info"
								>This is a plain notification</material-notification
							>
							<material-notification class="mb-3" color="info" dismissible
								>This is a notification with close
								button.</material-notification
							>
							<material-notification
								class="mb-3"
								color="info"
								dismissible
								icon="mdi-bell-plus"
								>This is a notification with close button and
								icon.</material-notification
							>
							<material-notification
								class="mb-3"
								color="info"
								dismissible
								icon="mdi-bell-plus"
							>
								This is a notification with close button and icon and have many
								lines. You can see that the icon and the close button are always
								vertically aligned. This is a beautiful notification. So you
								don't have to worry about the style.
							</material-notification>
						</v-flex>
					</v-layout>
					<div class="text-xs-center">
						<h2 class="title font-weight-light mb-2">Notification Places</h2>
						<span class="subheading font-weight-light grey--text"
							>Click to view notifications</span
						>
					</div>

					<v-container grid-list-lg>
						<v-layout justify-center row wrap>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('top', 'left')"
									>Top Left</v-btn
								>
							</v-flex>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('top')"
									>Top Center</v-btn
								>
							</v-flex>
						</v-layout>
						<v-layout justify-center row wrap>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('top', 'right')"
									>Top Right</v-btn
								>
							</v-flex>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('bottom', 'left')"
									>Bottom Left</v-btn
								>
							</v-flex>
						</v-layout>
						<v-layout justify-center row wrap>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('bottom')"
									>Bottom Center</v-btn
								>
							</v-flex>
							<v-flex xs12 sm4>
								<v-btn block color="success" @click="snack('bottom', 'right')"
									>Bottom Right</v-btn
								>
							</v-flex>
						</v-layout>
					</v-container>

					<v-snackbar
						:color="color"
						:bottom="bottom"
						:top="top"
						:left="left"
						:right="right"
						v-model="snackbar"
						dark
					>
						<v-icon color="white" class="mr-3">mdi-bell-plus</v-icon>
						<div>
							Welcome to
							<b>Vue Material Dashboard</b> - a beautiful freebie for every web
							developer.
						</div>
						<v-icon size="16" @click="snackbar = false"
							>mdi-close-circle</v-icon
						>
					</v-snackbar>
				</material-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import AV from 'leancloud-storage';
import { mapMutations } from 'vuex';
export default {
	beforeRouteLeave(to, from, next) {
		// 导航离开该组件的对应路由时调用
		// 可以访问组件实例 `this`
		this.showMenu(false);
		next();
	},
	data: () => ({
		color: null,
		colors: ['purple', 'info', 'success', 'warning', 'error'],
		top: true,
		bottom: false,
		left: false,
		right: false,
		snackbar: false,
		results: [],
	}),
	created() {
		this.getRecent();
	},
	methods: {
		...mapMutations('rightClickMenu', ['showMenu']),
		snack(...args) {
			this.top = false;
			this.bottom = false;
			this.left = false;
			this.right = false;

			for (const loc of args) {
				this[loc] = true;
			}

			this.color = this.colors[Math.floor(Math.random() * this.colors.length)];

			this.snackbar = true;
		},
		getRecent() {
			var query = new AV.Query('ShimoBed');
			query.descending('updatedAt');
			query.limit(20); //请求数量上限为1000条
			query.find().then(r => {
				this.results = r.map(e => {
					return e.toJSON();
				});
				console.log(r);
			});
		},
	},
};
</script>
