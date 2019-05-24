const fs = require("fs");
const path = require('path');

function init(src) {
        let config
        if (!src.includes('/')) {
                const absolutePath = path.resolve(`./config/${src}.config.js`);
                config = require(absolutePath);
                if (config) {
                        src = absolutePath;
                }
        } else {
                config = require(src);
        }
        return { src, config };
}

module.exports = {
        load: (src) => {
                return init(src).config
        },
        save: (src, data) => {
                src = init(src).src;
                let json = JSON.stringify(data, null, '\t');
                /* 进行stringify和去除key两边的双引号的格式化 */
                json.replace(/\\"/g, "\uFFFF"); //U+ FFFF
                json = json.replace(/\"([^"]+)\":/g, "$1:").replace(/\uFFFF/g, "\\\"");
                fs.writeFileSync(src, `module.exports = ${json}`)//写入文件
        },

}