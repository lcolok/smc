<template>
	<v-container>
		<!-- Stack the columns on mobile by making one full-width and the other half-width -->

		<v-layout row wrap>
			<!-- <v-flex md6 sm12> </v-flex> -->
			<v-flex xl8 lg7 md6 sm12>
				<tts-textarea />
			</v-flex>
			<v-flex xl4 lg5 md6 sm12>
				<tts-settings :speaker="speaker" />
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	props: {
		speaker: {
			type: Object,
			required: true,
		},
	},
};
</script>
