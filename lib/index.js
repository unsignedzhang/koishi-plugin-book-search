"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get13DigitTimestamp = exports.apply = exports.Config = exports.usage = exports.name = exports.sleep = void 0;
const koishi_1 = require("koishi");
const axios_1 = __importDefault(require("axios"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
exports.sleep = sleep;
exports.name = 'book-search';
exports.usage = `

发送 [book-search 书名] 或 [搜书 书名] 来搜索电子书并获取下载链接

注意：QQ平台发链接可能会被屏蔽，建议配合以下插件使用
- [qqurl-bypass：绕过官方QQ机器人的url检测](https://forum.koishi.xyz/t/topic/6300)
`;
exports.Config = koishi_1.Schema.object({});
function apply(ctx) {
    ctx.command('book-search <text:string>', '搜索电子书并获取下载链接').alias('搜书').alias('/搜书').action(async (_, message) => {
        void _.session.send(`正在搜索中，请稍候`);
        let bookname = message;
        let time13 = get13DigitTimestamp();
        console.log(bookname);
        let cookies;
        const data = await sendPostRequest("https://www.jiumodiary.com/init_hubs.php", 'q=' + bookname + '&remote_ip=&time_int=' + time13, cookies);
        console.log(data);
        let succeed = data.status;
        let response_text = "";
        if (succeed == "succeed") {
            let id = data.id;
            const response = await sendPostRequest("https://www.jiumodiary.com/ajax_fetch_hubs.php", 'id=' + id + '&set=0', cookies);
            console.log(response);
            if (response.status == 'succeed') {
                let i = 0;
                while (response && i < response.sources.length && response.sources[i]) {
                    if (response.sources[i].view_type == 'view_normal') {
                        let title = response.sources[i].details.data[0].title;
                        let link = response.sources[i].details.data[0].link;
                        response_text = response_text + '\n' + title + '\n' + link + '\n';
                    }
                    i++;
                }
                if (response_text == "")
                    return '未搜索到结果';
                else
                    return response_text;
            }
        }
        else
            return '接口错误';
    });
}
exports.apply = apply;
function get13DigitTimestamp() {
    const now = new Date();
    return now.getTime();
}
exports.get13DigitTimestamp = get13DigitTimestamp;
async function sendPostRequest(url, data, cookies) {
    const options = {
        method: 'post',
        url,
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
            'Connection': 'keep-alive',
        },
        withCredentials: true, // 允许跨域携带 cookies
    };
    if (cookies) {
        options.headers['Cookie'] = cookies;
    }
    try {
        const response = await (0, axios_1.default)(options);
        //console.log(response);
        return response.data;
    }
    catch (error) {
        console.log('Error sending POST request:', error);
        throw error;
    }
}
