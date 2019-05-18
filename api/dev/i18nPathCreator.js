const fs = require('fs');
const path = require('path');
const requireContext = require('require-context');  
const filePath = path.resolve('./src/i18n/locales/');

module.exports = (e) => {
    console.log(e.params);
    const key = e.params.key;
    const locales = requireContext(
        filePath, true, /\.json$/
    )
    locales.keys().forEach(localeName => {
        let currentFilePath = filePath + '/' + localeName;
        let locale = require(currentFilePath);
        let matched = localeName.match(/([A-Za-z0-9-_]+)\./i);
        if (matched && matched.length > 1) {
            let missingLocale = matched[1];
            if (!locale[key]) {
                locale[key] = '';
            }

            let json = JSON.stringify(locale, null, '\t');

            fs.writeFileSync(currentFilePath, json);
        }
    })

    return true
}