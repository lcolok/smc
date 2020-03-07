import AV from 'leancloud-storage';

export default {
	getSpeakerList: ({ dispatch, commit, state }, { vm, type }) => {
		return new Promise((resolve, reject) => {
			AV.Cloud.run('tts_getSpeakerList').then(
				data => {
					console.log(data);
					commit('speakersList', data);
					resolve();
				},
				err => reject(err),
			);
		});
	},
};
