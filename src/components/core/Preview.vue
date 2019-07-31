<template>
	<v-layout justify-center>
		<v-dialog
			v-model="dialog"
			:fullscreen="$vuetify.breakpoint.mdAndDown"
			:hide-overlay="$vuetify.breakpoint.mdAndDown"
			:scrollable="false"
			:max-width="!$vuetify.breakpoint.mdAndDown ? '70vw' : ''"
			:transition="
				$vuetify.breakpoint.mdAndDown
					? 'dialog-bottom-transition'
					: 'fade-transition'
			"
		>
			<v-card class="rounded_off">
				<v-toolbar
					v-if="$vuetify.breakpoint.mdAndDown"
					flat
					class="v-toolbar--fixed rounded_off"
					color="primary"
				>
					<v-btn icon @click="dialog = false">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-toolbar-title
						><span color="white" class="title">Settings</span></v-toolbar-title
					>
					<v-spacer></v-spacer>
					<v-btn flat @click="dialog = false">Save</v-btn>
				</v-toolbar>
				<v-flex>
					<component :attrs="attrs" :is="tab"></component>
				</v-flex>
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
	data() {
		return {};
	},
	computed: {
		...mapState('preview', ['previewModel', 'tab', 'attrs']),
		dialog: {
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

<style lang="scss" scoped>
.rounded_off {
	border-radius: 0px;
}
</style>
