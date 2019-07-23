import { set } from '@/utils/vuex';
export default {
	setPreviewModel: set('previewModel'),
	openPreview(state) {
		state.previewModel = true;
	},
	setTab: set('tab'),
	setAttrs: set('attrs'),
};
