<template>
	<v-flex>
		<v-card>
			<v-flex>
				<v-flex>
					<v-btn color="primary" class="title" @click="generate()">
						<v-icon left>mdi-dice-multiple</v-icon>
						{{ $t('Generate') }}
					</v-btn>
				</v-flex>
				<v-list two-line subheader>
					<v-list-item v-for="item in items" :key="item" @click="copy(item)">
						<v-list-item-content>
							<v-list-item-title v-text="item"></v-list-item-title>
						</v-list-item-content>

						<v-list-item-action>
							<v-btn icon>
								<v-icon color="grey lighten-1">mdi-content-copy</v-icon>
							</v-btn>
						</v-list-item-action>
					</v-list-item>
				</v-list>
			</v-flex>
		</v-card>
	</v-flex>
</template>

<script>
import AV from 'leancloud-storage';
export default {
	created() {
		this.getAll();
	},
	methods: {
		async generate() {
			let resp = await AV.Cloud.run('getRandomCode', {
				len: 64,
			});
			this.items.push(resp);
		},
		copy(e) {
			this.$copyText(e);
		},
		getAll() {
			const query = new AV.Query('InvitationCode');
			query.limit(1000);
			query.find().then(async every => {
				this.items = every.map(e => e.get('code'));
			});
		},
	},
	data: () => ({
		items: [],
	}),
};
</script>

<style lang="scss" scoped></style>
