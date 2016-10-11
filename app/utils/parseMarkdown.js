import React from 'react';
import frontMatter from 'front-matter';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import { parseDOM } from 'htmlparser2';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});

export default function parseMarkdown(markdown, components = {}) {
  const meta = frontMatter(markdown);
  const html = md.render(meta.body);
  const ast = parseDOM(html);

  if (ast == null) {
    console.warn('Wrong format of ast', ast);
    return null;
  }

  return {
    node: React.createElement('div', {}, ...createReactChildren(ast)),
    meta: meta.attributes,
  };

  function createReactChildren(nodes) {
    if (nodes == null) return [];
    return nodes.map(createReactElement);
  }

  function createReactElement(node) {
    if (node.type === 'text') return node.data;
    if (node.type !== 'tag') return null;
    if (node.attribs == null || node.attribs['react-component-name'] == null) {
      return React.createElement(node.name, node.attribs, ...createReactChildren(node.children));
    }

    const { 'react-component-name': componentName, ...props } = node.attribs;
    const Component = components[componentName];

    if (Component == null) {
      console.warn(`No react element ${componentName}`);
      return React.createElement('div', {}, ...createReactChildren(node.children));
    }
    return React.createElement(Component, props, ...createReactChildren(node.children));
  }
}

function highlight(str, lang) {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (_error) {
      console.error(_error);
    }
  }
  try {
    return hljs.highlightAuto(str).value;
  } catch (_error) {
    console.error(_error);
  }
  return '';
}
