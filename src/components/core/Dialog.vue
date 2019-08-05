<template>
	<v-layout row justify-center>
		<v-dialog v-model="dialogModel" max-width="600px">
			<v-card>
				<component :is="tab"></component>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import { mapState } from 'vuex';
import { upperFirst, camelCase } from 'lodash';

const components = {};

const requireComponent = require.context(
	'@/components/dialog/',
	true,
	/\.vue$/,
);

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName);

	const componentName = upperFirst(
		camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
	);
	components[componentName] = function(resolve) {
		require([`@/components/dialog/${componentName}.vue`], resolve).default;
	};
});

export default {
	data: () => ({}),
	computed: {
		...mapState('dialog', ['tab']),
		dialogModel: {
			get: function() {
				return this.$store.state.dialog.dialogModel;
			},
			set: function(newValue) {
				this.$store.state.dialog.dialogModel = newValue;
			},
		},
	},
	components: components,
};
</script>

<style lang="scss" scoped></style>
