const fs = require('fs');
const path = require('path');
const requireContext = require('require-context');
const AV = require('leancloud-storage');

const filePath = path.resolve('./src/i18n/locales/');

module.exports = async (e) => {
    console.log(e.params);
    const currentLocale = e.params.locale;
    const key = e.params.key;
    /*     const locales = requireContext(
            filePath, true, /\.json$/
        )
        locales.keys().forEach((localeName) => {
            let currentFilePath = filePath + '/' + localeName;
            let locale = require(currentFilePath);
            let matched = localeName.match(/([A-Za-z0-9-_]+)\./i);
            if (matched && matched.length > 1) {
                let missingLocale = matched[1];
    
                console.log(trans);
                if (!locale[key]) {
                    locale[key] = trans;
                }
    
                let json = JSON.stringify(locale, null, '\t');
    
                fs.writeFileSync(currentFilePath, json);
            }
        }) */

    let currentFilePath = filePath + '/' + currentLocale + '.json';
    let locale = require(currentFilePath);
    // console.log(trans);
    if (!locale[key]) {
        let trans = await AV.Cloud.run('googleTranslateByPost', { orig: key.toLowerCase(), tl: currentLocale });
        locale[key] = trans;
    };
    let json = JSON.stringify(locale, null, '\t');
    fs.writeFileSync(currentFilePath, json);

    //默认的en.json,也要加上一个占位符
    const enPath = filePath + '/en.json';
    let en = require(enPath);
    if (!en[key]) {
        en[key] = "";
    }
    let enJSON = JSON.stringify(en, null, '\t');
    fs.writeFileSync(enPath, enJSON);


    return true
}