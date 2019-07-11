<template>
	<v-content>
		<div id="core-view">
			<v-fade-transition mode="out-in">
				<router-view />
			</v-fade-transition>
		</div>
		<core-footer v-if="!['Maps', 'Upload Page'].includes($route.name)" />
	</v-content>
</template>

<script>
export default {
	metaInfo() {
		return {
			title: document.title, //默认的网页标题,可以通过 metaInfo 来设置网页 meta 信息
		};
	},
};
</script>

<style>
#core-view {
	padding-bottom: 100px;
}
</style>
