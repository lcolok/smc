const path = require('path');
const autoload = require(path.resolve('server/utils/autoload'));

module.exports = autoload(__dirname);
