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
        <v-text-field
          v-model="searchContent"
          v-if="responsiveInput"
          class="mr-4 mt-2 purple-input"
          :label="$t('Search...')"
          @keyup.enter="search(searchContent)"
          hide-details
          color="purple"
        />
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
import { mapMutations } from 'vuex';
import router from '@/router';
import AV from 'leancloud-storage';

export default {
	computed: {
		profileMenu() {
			return this.$store.state.menu.profileMenu;
		},
	},
	data: () => ({
		searchContent: '',
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
	}),

	watch: {
		$route(val) {
			this.title = val.name;
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
		...mapMutations('app', ['setDrawer', 'toggleDrawer','search111']),
		search: async function(key) {
      // console.log(key);
      this.search111();
			router.push({
				path: 'search_results',
			}); //跳转到搜索结果页面

			if (!key) {
				var data = await AV.Cloud.run('updateShimo');
				console.log(data);

				if (data > 0) {
					showUpdate(data);
				} else {
					// showTop20();
				}

				var query = new AV.Query('ShimoBed');
				query.descending('updatedAt');
				query.limit(20); //请求数量上限为1000条
				var every = await query.find();

				console.log(every);

				result = makeAList(every);
				// console.log(result);
			} else {
				var result = await this.searchLC(key);
				// alert(JSON.stringify(this.todos[0]));
				if (result == '') {
					Vue.toasted.show(`找不到关于“${key}”的项目`, {
						position: 'top-center',
						theme: 'toasted-primary', //Theme of the toast you prefer['toasted-primary', 'outline', 'bubble']
						duration: 3000,
						icon: { name: 'search' },
						iconPack: 'fontawesome',
						fitToScreen: 'true',
						type: 'error', //Type of the Toast ['success', 'info', 'error']
						// fullWidth:"true",
					});
					return;
				}
      }
      


		
		},
		searchLC: async function(key) {
			var query = new AV.SearchQuery('ShimoBed'); //class名
			query.queryString(key); //要搜索的关键词
			var resp = await query.find();
			console.info(resp);
			console.log('找到了 ' + query.hits() + ' 个文件.');
			return this.makeAList(resp);
		},
		makeAList(resp) {
			var result = [];

			app.typeList = [
				{
					size: '20',
					icon: 'fas fa-globe-americas',
					text: '全部',
					count: 0,
				},
			];

			const fileIndex = {};

			this.$store.state.app.fileDescription.forEach((e, index) => {
				fileIndex[e.type] = {
					count: 0,
					subClassArr: [],
					icon: e.icon,
					size: e.size,
				};
			});

			resp.forEach(e => {
				var newDic = this.makeNewDic(e);

				fileIndex[newDic.attributes.type].count++;
				fileIndex[newDic.attributes.type].subClassArr.push(newDic);
				app.typeList[0].count++; //也就是'全部'
				result.push(newDic);
			});

			app.typeList[0].subClassArr = result; //全部的subClassArr

			this.fileDescription.forEach((e, index) => {
				var subClass = fileIndex[e.type];
				app.typeList.push({
					text: e.type,
					count: subClass.count,
					icon: subClass.icon,
					size: subClass.size,
					subClassArr: subClass.subClassArr,
				});
			});

			return result;
		},
		makeNewDic(e) {
			if (!e.id) {
				return;
			}

			var dic = e.attributes;

			e.attributes.suffix = dic.type; //后缀

			// console.log(dic.type);

			var handle = app.suffixHandle(dic.type);

			var emoji = handle.emoji;

			e.attributes.type = handle.type;

			e.attributes.canPlay = handle.canPlay;

			var name = dic.name;

			var shortURL = app.cutHTTP(dic.shortURL);

			var copyContent = `${emoji} ${name} | ${shortURL}`;

			e.attributes.copyContent = copyContent;

			e.attributes.content = emoji + name; //在vue的todo里面content代表

			return e;
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
