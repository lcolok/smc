<template>
	<v-card outlined tile class="ma-2 pa-2 grey lighten-5" :height="cardHeight">
		<v-col align="center" justify="center">
			<v-textarea
				no-resize
				outlined
				name="input-7-4"
				:label="`${$t('Number of characters: ')}${totalWord}/${limit}`"
				:height="cardHeight - 60"
				autofocus
				:rules="counter"
				v-model="content"
			></v-textarea>
		</v-col>
	</v-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
	computed: {
		...mapGetters('tts', ['totalWord']),
		content: {
			set(val) {
				this.$store.state.tts.content = val;
			},
			get() {
				return this.$store.state.tts.content;
			},
		},
	},
	data: () => ({
		cardHeight: 450,
		counter: [
			value => this.totalWord <= this.limit || this.$t('Word limit exceeded'),
		],
		limit: 20000,
	}),
};
</script>
