import { set, toggle } from '@/utils/vuex';

export default {
	setStatus: set('status'),
	toggleUBS: toggle('uploadBottomSheet'),
};
