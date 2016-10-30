/* eslint-disable no-console */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import kebabCase from 'lodash/kebabCase';
import objectToFrontMatter from 'utils/objectToFrontMatter';

export default function packToZip(content, meta, fs) {
  const zip = new JSZip();

  if (!meta.title) {
    console.error('Add post title!');
    return;
  }

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);

  const title = meta.title;
  const date = meta.date || localISOTime;
  const name = `${date.slice(0, 10)}-${kebabCase(title)}`;
  const text = `---\n${objectToFrontMatter({ ...meta, date })}\n---\n${content}`;

  zip.file('index.md', text);

  Object.entries(fs).forEach(([key, value]) => {
    zip.file(key, value.split(',')[1], { base64: true });
  });

  zip.generateAsync({ type: 'blob' })
  .then((file) => {
    saveAs(file, `${name}.zip`);
  });
}
