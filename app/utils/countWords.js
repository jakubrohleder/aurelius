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

export default function countWords(ast) {
  return countWordsInNode({ children: ast });
}
