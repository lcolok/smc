/* eslint-disable no-console */
import * as _ from 'lodash';
const tabMap = {
	视频: 'plyr',
};
export default {
	leftClick({ commit }, { $attrs, typeName, $props }) {
		console.log($attrs);
		if (tabMap[typeName]) {
			//有着对应的preview类型tab才会响应并打开preview
			commit('setTab', tabMap[typeName]);
			commit('openPreview');
			commit('setAttrs', _.merge($attrs, $props));
		}
	},
};
