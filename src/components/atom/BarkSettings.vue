<template>
	<div class="text-center">
		<v-dialog v-model="dialog" width="500">
			<template v-slot:activator="{ on }">
				<a v-on="on" class="btn btn-neutral btn-icon">
					<span class="btn-inner--icon">
						<img :src="`${$baseUrl}img/icons/common/bark_icon.svg`" />
					</span>
					<span class="btn-inner--text">{{ $t('Bark settings') }}</span>
				</a>
			</template>

			<v-card>
				<v-card-title class="headline grey lighten-2" primary-title>{{
					$t('Bark settings')
				}}</v-card-title>

				<v-container grid-list-md>
					<v-layout wrap>
						<v-flex>
							<v-text-field
								v-model="barkURL"
								label="Bark URL"
								placeholder="请把 Bark App 中的任意一条链接粘贴于此"
								outlined
							></v-text-field>
						</v-flex>
					</v-layout>
				</v-container>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" text @click="dialog = false">I accept</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
import AV from 'leancloud-storage';

export default {
	data: () => ({
		dialog: false,
		barkURL: null,
	}),
	watch: {
		barkURL(val) {
			let matcher = val.match(/http[s]?:\/\/api\.day\.app\/(\w*)\//i);

			let barkID = matcher[1];
			let userID = AV.User.current().id;
			let token = AV.User.current().getSessionToken();
			let domain = window.location.host;
			console.log(barkID);
			if (barkID) {
				AV.Cloud.run('InitialBinding', { barkID, userID, domain, token });
			}
		},
	},
};
</script>
