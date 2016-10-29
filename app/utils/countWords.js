/* eslint-disable no-console */

import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';
import { parseDOM } from 'htmlparser2';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

function countWordsInText(text) {
  return text
    .split(' ')
    .filter((str) => str !== '\n' && str.length)
    .length;
}

function countWordsInNode(ast) {
  // dont count words in custom elements
  if (ast.name === 'div') return 0;
  if (ast.type === 'text') return ast.data ? countWordsInText(ast.data) : 0;
  if (!ast.children) return 0;
  return ast.children.reduce((sum, node) => sum + countWordsInNode(node), 0);
}

export default function countWords(markdownText) {
  const meta = frontMatter(markdownText);
  const html = md.render(meta.body);
  const ast = parseDOM(html);

  return countWordsInNode({ children: ast });
}
