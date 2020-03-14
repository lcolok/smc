const ttsPlayTemp = require('../../../../../../api/xunfei/tts_playTemp');
const apiAdapter = require('../../../../../../tools/apiAdapter');

module.exports = (...args) => apiAdapter.post(...args, ttsPlayTemp);
