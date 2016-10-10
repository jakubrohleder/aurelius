import React from 'react';
import markdownIt from 'markdown-it';
import { parseDOM } from 'htmlparser2';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

export default function parseMarkdown(markdown, components = {}) {
  const html = md.render(markdown);
  const ast = parseDOM(html);

  if (ast == null) {
    console.warn('Wrong format of ast', ast);
    return null;
  }

  return React.createElement('div', {}, ...createReactChildren(ast));

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
