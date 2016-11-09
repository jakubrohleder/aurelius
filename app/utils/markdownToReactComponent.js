/* eslint-disable no-console */

import React from 'react';
// import hljs from 'highlight.js';
import markdownIt from 'markdown-it';
import markdownItContainer from 'markdown-it-container';
import { parseDOM } from 'htmlparser2';
import camelCase from 'lodash/camelCase';

import countWords from 'utils/countWords';

function addComponent(md, name) {
  console.log(name);
  const stripNameRegex = new RegExp(`^${name}\\s*(.*)$`);
  md.use(markdownItContainer, name, {
    validate: (params) => params.trim().match(stripNameRegex),
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        const attrs = tokens[idx].info.trim().match(stripNameRegex);

        return `<div react-component-name=${name} ${attrs}>\n`;
      }

      return '</div>\n';
    },
  });
}

export default class MarkdownToReact {
  constructor(components) {
    this.components = components;
    this.md = markdownIt({
      html: true,
      linkify: true,
      typographer: true,
      // highlight,
    });

    Object.keys(components).forEach((name) => addComponent(this.md, name));
  }


  createReactProps(nodes, fs) {
    if (nodes == null) return [];
    return nodes.reduce(
      (acc, node) => {
        const data = this.createReactElementData(node, fs);
        if (data == null) return acc;

        const { propName } = data;
        const element = this.createReactElement(data);

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

  createReactElement(elementData) {
    const { type, props: rawProps, data } = elementData;

    if (type === 'text') return data;
    if (rawProps == null) return React.createElement(type);

    const { children, ...props } = rawProps;

    return React.createElement(type, props, ...children);
  }

  createReactElementData(node, fs) {
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
        props: this.createReactProps(node.children, fs),
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

    const src = fs.get(node.attribs.src) || node.attribs.src;

    const props = { ...rest, className, style, src, ...this.createReactProps(node.children, fs) };

    if (componentName == null) {
      return {
        type: node.name,
        propName,
        props,
      };
    }

    const Component = this.components[componentName];

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

  render(markdownText, fs = {}) {
    const html = this.md.render(markdownText);
    const ast = parseDOM(html);

    if (ast == null) {
      console.warn('Wrong format of ast', ast);
      return null;
    }

    return {
      node: React.createElement('div', this.createReactProps(ast, fs)),
      wordCount: countWords(ast),
    };
  }
}
