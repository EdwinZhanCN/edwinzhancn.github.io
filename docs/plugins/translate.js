// plugins/translate.js

import axios from 'axios';
import marked from 'marked';

export default (options) => {
    return {
        name: 'vitepress-translate-plugin',

        // 在页面渲染之前调用
        async transform(src, id) {
            if (!id.endsWith('.md')) return; // 仅处理 Markdown 文件

            // 解析 Markdown 段落
            const paragraphs = marked.lexer(src).filter(token => token.type === 'paragraph');

            // 翻译函数
            async function translateParagraph(text, sourceLang, targetLang) {
                // 调用你的 Python 翻译 API
                const response = await axios.post('/api/translate', { text, sourceLang, targetLang });
                return response.data.text;
            }

            // 逐段落翻译
            const translatedParagraphs = await Promise.all(paragraphs.map(async (paragraph) => {
                const text = paragraph.text;
                // ... 获取源语言和目标语言，可以使用 options 传递 ...
                const translatedText = await translateParagraph(text, sourceLang, targetLang);
                return { ...paragraph, text: translatedText };
            }));

            // 将翻译后的段落重新组装成 Markdown
            const translatedMarkdown = translatedParagraphs.map(paragraph => marked.parser([paragraph])).join('\n');

            return translatedMarkdown;
        },
    };
};