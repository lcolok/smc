<template>
	<v-card outlined tile class="ma-2 pa-2 grey lighten-5" :height="cardHeight">
		<v-col align="center" justify="center">
			<v-textarea
				no-resize
				outlined
				name="input-7-4"
				:label="`${$t('Number of characters: ')}${numCharacters}/${limit}`"
				:height="cardHeight - 60"
				autofocus
				:rules="counter"
				value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
			></v-textarea>
		</v-col>
	</v-card>
</template>
<script>
export default {
	data() {
		return {
			cardHeight: 450,
			counter: [
				value => {
					let handledValue = value;
					[
						/\[0\.5秒\]/g,
						/\[1秒\]/g,
						/\[2秒\]/g,
						/\[=[a-z]{1,6}[1-4]\]/g,
					].forEach(e => {
						handledValue = handledValue.replace(e, '');
					});
					let sum = (this.numCharacters = handledValue.length);
					return sum <= this.limit || this.$t('Word limit exceeded');
				},
			],
			limit: 20000,
			numCharacters: 0,
		};
	},
};
</script>
