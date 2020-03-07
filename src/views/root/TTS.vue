<template>
	<v-card>
		<v-tabs background-color="white" color="deep-purple accent-4" left>
			<v-tab v-for="item in items" :key="item.tab">
				{{ item.tab }}
			</v-tab>

			<v-tab-item v-for="(item,n) in items" :key="item.tab">
				<v-container fluid>
					<v-row>
						<v-col v-for="i in 12" :key="i" cols="4" md="2">
							<v-img
								:src="`https://picsum.photos/500/300?image=${i * (n+1) * 5 + 10}`"
								:lazy-src="`https://picsum.photos/10/6?image=${i * (n+1) * 5 + 10}`"
								aspect-ratio="1"
							></v-img>
						</v-col>
					</v-row>
				</v-container>
			</v-tab-item>
		</v-tabs>
	</v-card>
</template>
<script>
import AV from 'leancloud-storage';

export default {
	async beforeRouteEnter(to, from, next) {
		const speakerList = await AV.Cloud.run('tts_getSpeakerList');

		next(vm => {
			console.log(vm);
			vm.items = speakerList;
			vm.$store.state.tts.items = speakerList;
		});
	},
	computed: {
		items: {
			get() {
				return this.$store.state.tts.items;
			},
			set(val) {
				// this.$store.state.tts.items = val;
			},
		},
	},
	data: () => ({}),
};
</script>
