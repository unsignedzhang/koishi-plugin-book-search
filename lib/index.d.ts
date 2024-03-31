import { Context, Schema } from 'koishi';
export declare const sleep: (ms: number) => Promise<void>;
export declare const name = "book-search";
export declare const usage = "\n\n\u53D1\u9001 [book-search \u4E66\u540D] \u6216 [\u641C\u4E66 \u4E66\u540D] \u6765\u641C\u7D22\u7535\u5B50\u4E66\u5E76\u83B7\u53D6\u4E0B\u8F7D\u94FE\u63A5\n\n\u6CE8\u610F\uFF1AQQ\u5E73\u53F0\u53D1\u94FE\u63A5\u53EF\u80FD\u4F1A\u88AB\u5C4F\u853D\uFF0C\u5EFA\u8BAE\u914D\u5408\u4EE5\u4E0B\u63D2\u4EF6\u4F7F\u7528\n- [qqurl-bypass\uFF1A\u7ED5\u8FC7\u5B98\u65B9QQ\u673A\u5668\u4EBA\u7684url\u68C0\u6D4B](https://forum.koishi.xyz/t/topic/6300)\n";
export interface Config {
}
export declare const Config: Schema<Config>;
export declare function apply(ctx: Context): void;
export declare function get13DigitTimestamp(): number;
