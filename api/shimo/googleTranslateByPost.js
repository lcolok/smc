const axios = require('axios');

module.exports = async function googleTranslateByPost(e) {

    const orig = e.params.orig;

    var sl = 'auto';
    var tl = e.params.tl || 'zh-CN';
    try {
        var response = await axios({
            method: 'POST',
            url: "http://translate.google.cn/translate_a/single",
            params: { "dt": "t", "q": orig, "tl": tl, "ie": "UTF-8", "sl": sl, "client": "ia", "dj": "1" },
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "br, gzip, deflate",
                "Accept-Language": "zh-cn",
                "Connection": "keep-alive",
                "Cookie": "NID=154=Vf6msfWVov9Icm1WMYfq3dQ3BGHUlq6Txh5RHjnBtN48ZIZAdE_iQjxrrOMsOhbRlXXHtReYEm1rRKGUD3WsP1DhA0sO0nDf5S-J69qEBYRzIAY8nd1cE20wAKOr3cXxxPgwN12Dc5ly07v-F7RY-6Uv3ldkWGYeXWTgwkPR6Cs",
                "Host": "translate.google.cn",
                "User-Agent": "GoogleTranslate/5.26.59113 (iPhone; iOS 12.1; zh_CN; iPhone10,3)"
            }
        });

        var i;
        var output = '';
        var trans = response.data.sentences;
        if (trans.length > 1) {
            for (i = 0; i < trans.length; ++i) {
                output += trans[i]['trans'] + '\n';
            }
        }
        else {
            output = trans[0]['trans'];
        }
        console.log("谷歌翻译成功结果：" + output);
        return output;
    } catch (e) {
        console.log("谷歌翻译失败");
        return orig;
    }

}