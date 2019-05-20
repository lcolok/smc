const fs = require("fs");

module.exports = {
        save: (path, data) => {
                let json = JSON.stringify(data, null, '\t');
                /* 进行stringify和去除key两边的双引号的格式化 */
                json.replace(/\\"/g, "\uFFFF"); //U+ FFFF
                json = json.replace(/\"([^"]+)\":/g, "$1:").replace(/\uFFFF/g, "\\\"");
                fs.writeFileSync(path, `module.exports = ${json}`)//写入文件
        }
}