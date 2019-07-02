<template>
  <v-toolbar id="core-toolbar" app prominent style="background: #eee;">
    <div class="v-toolbar-title">
      <v-toolbar-title class="tertiary--text font-weight-light">
        <v-btn v-if="responsive" class="default v-btn--simple" dark icon @click.stop="onClickBtn">
          <v-icon>mdi-view-list</v-icon>
        </v-btn>
        {{ $t(title) }}
      </v-toolbar-title>
    </div>

    <v-spacer />
    <v-toolbar-items>
      <v-flex align-center layout py-2>
<!--          <form action="javascript:return true">
        <v-text-field
          v-model="searchContent"
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          :label="$t('Search...')"
          @keyup.enter="search(searchContent)"
          hide-details
          color="purple"
        />
         </form> -->
        <form action="javascript:return true">
          <v-autocomplete
            v-model="searchContent"
            :loading="loading"
            :items="items"
            v-if="responsiveInput"
            class="mr-4 mt-2 purple-input"
            :label="$t('Search...')"
            @keyup.enter="search(suggest);"
   
            hide-details
            hide-no-data
            no-filter
            :search-input.sync="suggest"
          />
        </form>
        <router-link v-ripple class="toolbar-items" to="/">
          <v-icon color="tertiary">mdi-view-dashboard</v-icon>
        </router-link>
        <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <router-link v-ripple slot="activator" class="toolbar-items" to="/notifications">
            <v-badge color="error" overlap>
              <template slot="badge">{{ notifications.length }}</template>
              <v-icon color="tertiary">mdi-bell</v-icon>
            </v-badge>
          </router-link>
          <v-card>
            <v-list dense>
              <v-list-tile
                v-for="notification in notifications"
                :key="notification"
                @click="onClick"
              >
                <v-list-tile-title v-text="notification" />
              </v-list-tile>
            </v-list>
          </v-card>
        </v-menu>
        <!-- <router-link v-ripple class="toolbar-items" to="/user-profile">
          <v-icon color="tertiary">mdi-account</v-icon>
        </router-link>-->

        <v-menu bottom left content-class="dropdown-menu" offset-y transition="slide-y-transition">
          <a v-ripple slot="activator" class="toolbar-items">
            <v-icon color="tertiary">mdi-dots-vertical</v-icon>
          </a>
          <v-list dense>
            <v-list-tile
              v-for="(menuItem, i) in profileMenu"
              :key="i"
              @click="menuItem.action($event)"
            >
              <!--               <v-list-tile-avatar color="rgba(0, 0, 0, 0)">
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-tile-avatar>-->
              <v-icon>{{ menuItem.icon }}</v-icon>
              <v-list-tile-title>{{$t(menuItem.text)}}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
	computed: {
		profileMenu() {
			return this.$store.state.menu.profileMenu;
		},
	},
	data: () => ({
		searchContent: null,
		notifications: [
			'Mike, John responded to your email',
			'You have 5 new tasks',
			"You're now a friend with Andrew",
			'Another Notification',
			'Another One',
		],

		title: null,
		responsive: false,
		responsiveInput: false,

		items: [],
		suggest: null,

		loading: false,
		states: [
			'Alabama',
			'Alaska',
			'American Samoa',
			'Arizona',
			'Arkansas',
			'California',
			'Colorado',
			'Connecticut',
			'Delaware',
			'District of Columbia',
			'Federated States of Micronesia',
			'Florida',
			'Georgia',
			'Guam',
			'Hawaii',
			'Idaho',
			'Illinois',
			'Indiana',
			'Iowa',
			'Kansas',
			'Kentucky',
			'Louisiana',
			'Maine',
			'Marshall Islands',
			'Maryland',
			'Massachusetts',
			'Michigan',
			'Minnesota',
			'Mississippi',
			'Missouri',
			'Montana',
			'Nebraska',
			'Nevada',
			'New Hampshire',
			'New Jersey',
			'New Mexico',
			'New York',
			'North Carolina',
			'North Dakota',
			'Northern Mariana Islands',
			'Ohio',
			'Oklahoma',
			'Oregon',
			'Palau',
			'Pennsylvania',
			'Puerto Rico',
			'Rhode Island',
			'South Carolina',
			'South Dakota',
			'Tennessee',
			'Texas',
			'Utah',
			'Vermont',
			'Virgin Island',
			'Virginia',
			'Washington',
			'West Virginia',
			'Wisconsin',
			'Wyoming',
		],
	}),

	watch: {
		$route(val) {
			this.title = val.name;
		},
		suggest(val) {
			val && val !== this.searchContent && this.baiduSuggest(val);
		},
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
    ...mapActions('search', ['searchByKey']),
    keydown:async function(e) {
      // key.Code === 13表示回车键 
      console.log(e);
      if (e.keyCode === 13) {
        //逻辑处理
        this.searchByKeyword({ delay: 0 })
        this.$refs.searchBar.blur();
      }
    },
		search: async function(key) {
			console.log(key);

			this.items = [];
			this.searchByKey({ key });
		},

		baiduSuggest: async function(v) {
			this.loading = true;
			// Simulated ajax query
			setTimeout(() => {
				var vm = this;
				this.$http
					.get(`/functions/su?wd=${v}&action=opensearch`)
					.then(function(response) {
						let items = JSON.parse(response.data.data)[1];
						// console.log(items);
						vm.items = items;
					});
				this.loading = false;
			}, 0);
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
		onResponsiveInverted() {
			if (window.innerWidth < 991) {
				this.responsive = true;
				this.responsiveInput = false;
			} else {
				this.responsive = false;
				this.responsiveInput = true;
			}
		},
	},
};
</script>

<style>
#core-toolbar a {
	text-decoration: none;
}
</style>
