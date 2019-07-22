<template>
	<v-layout row justify-center>
		<v-dialog v-model="model" max-width="80vw">
			<v-card>
				<component :is="tab"></component>
			</v-card>
		</v-dialog>
	</v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { upperFirst, camelCase } from 'lodash';

const components = {};

const requireComponent = require.context(
	'@/components/preview/',
	true,
	/\.vue$/,
);

requireComponent.keys().forEach(fileName => {
	const componentConfig = requireComponent(fileName);

	const componentName = upperFirst(
		camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')),
	);
	components[componentName] = function(resolve) {
		require([`@/components/preview/${componentName}.vue`], resolve).default;
	};
});

export default {
	data: () => ({}),
	computed: {
		...mapState('preview', ['previewModel', 'tab']),
		model: {
			get() {
				return this.previewModel;
			},
			set(val) {
				this.setPreviewModel(val);
			},
		},
	},
	methods: {
		...mapMutations('preview', ['setPreviewModel']),
	},
	components: components,
};
</script>

<style lang="scss" scoped></style>
