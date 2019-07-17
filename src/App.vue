<template>
	<router-view />
</template>

<script>
export default {
	watch: {
		title(val) {
			document.title = val;
		},
	},
	computed: {
		title() {
			const vm = this;
			const origTitle = vm.$t('SMC');
			return vm.$route.meta.title
				? `${vm.$t(vm.$route.meta.title)} - ${origTitle}`
				: origTitle;
		},
	},
};
</script>

<style lang="scss">
@import '@/styles/index.scss';

/* Remove in 1.2 */
.v-datatable thead th.column.sortable i {
	vertical-align: unset;
}
</style>
