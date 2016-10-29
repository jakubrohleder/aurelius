/* eslint-disable no-console */

import React from 'react';
import frontMatter from 'front-matter';
import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import { parseDOM } from 'htmlparser2';
import camelCase from 'lodash/camelCase';

const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight,
});

/**
 * Transforms markdownText and returns React Component
 * @param  {string} markdownText [description]
 * @param  {Object} components   Object containing React Components that will be used to replace divs
 * @param  {Object} fs           Object containing 'file system' tree, that will be used to replace images
 * @return {ReactComponent}
 */
export default function markdownToReactComponent(markdownText, components = {}, fs = {}) {
  const meta = frontMatter(markdownText);
  const html = md.render(meta.body);
  const ast = parseDOM(html);

  if (ast == null) {
    console.warn('Wrong format of ast', ast);
    return null;
  }

  return {
    node: React.createElement('div', createReactProps(ast)),
    meta: meta.attributes,
  };

  function createReactProps(nodes) {
    if (nodes == null) return [];
    return nodes.reduce(
      (acc, node) => {
        const data = createReactElementData(node);
        if (data == null) return acc;

        const { propName } = data;
        const element = createReactElement(data);

        if (propName == null) {
          return {
            ...acc,
            children: acc.children.concat([element]),
          };
        }

        return {
          ...acc,
          [propName]: element,
        };
      },
      { children: [] }
    );
  }

  function createReactElement(elementData) {
    const { type, props: rawProps, data } = elementData;

    if (type === 'text') return data;
    if (rawProps == null) return React.createElement(type);

    const { children, ...props } = rawProps;

    return React.createElement(type, props, ...children);
  }

  function createReactElementData(node) {
    if (node.type === 'text') {
      if (node.data.trim().length === 0) return null;
      return node;
    }
    if (node.type !== 'tag') {
      console.warn('Type other then tag', node);
      return null;
    }
    if (node.attribs == null) {
      return {
        type: node.name,
        props: createReactProps(node.children),
      };
    }

    const {
      'react-component-name': componentName,
      'react-prop-name': propName,
      class: className,
      style: styleString,
      ...rest
    } = node.attribs;

    const style = (styleString || '').split(';').reduce(
      (acc, element) => {
        const [name, value] = element.split(':');
        const reactName = camelCase(name);

        return { ...acc, [reactName]: value };
      }, {}
    );

    const src = fs[node.attribs.src] || node.attribs.src;

    const props = { ...rest, className, style, src, ...createReactProps(node.children) };

    if (componentName == null) {
      return {
        type: node.name,
        propName,
        props,
      };
    }

    const Component = components[componentName];

    if (Component == null) {
      console.warn(`No react element ${componentName}`);
      return {
        type: 'div',
        propName,
        props,
      };
    }

    return {
      type: Component,
      propName,
      props,
    };
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
