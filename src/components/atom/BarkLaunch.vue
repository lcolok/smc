<template>
	<div class="text-center">
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			:nudge-width="200"
			offset-x
		>
			<template v-slot:activator="{ on }">
				<a v-on="on" class="btn btn-neutral btn-icon">
					<span class="btn-inner--icon">
						<img :src="`${$baseUrl}img/icons/common/bark_icon.svg`" />
					</span>
					<span class="btn-inner--text">Bark</span>
				</a>
			</template>

			<v-card>
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<img
								src="https://images-cdn.shimo.im/pZxf2ZWkuAYha0iK__thumbnail"
								alt="LCO"
								@click="launch('lcolok')"
							/>
						</v-list-item-avatar>
					</v-list-item>
				</v-list>
			</v-card>
		</v-menu>
	</div>
</template>
<script>
import AV from 'leancloud-storage';

export default {
	data: () => ({
		fav: true,
		menu: false,
		message: false,
		hints: true,
	}),
	methods: {
		launch(user) {
			AV.Cloud.run('launchByBark', { user });
		},
	},
};
</script>
