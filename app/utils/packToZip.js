/* eslint-disable no-console */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import kebabCase from 'lodash/kebabCase';
import objectToFrontMatter from 'utils/objectToFrontMatter';

export default function packToZip(content, meta, fs) {
  const zip = new JSZip();

  const title = meta.get('title');

  if (!title || !title.length) {
    return Promise.reject('Add post title!');
  }

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);

  const date = meta.get('date') || localISOTime;
  const name = `${date.slice(0, 10)}-${kebabCase(title)}`;
  const text = `---\n${objectToFrontMatter({ ...meta, date })}\n---\n${content}`;

  zip.file('index.md', text);

  fs.forEach((value, key) => {
    zip.file(key, value.split(',')[1], { base64: true });
  });

  return zip.generateAsync({ type: 'blob' })
  .then((file) => {
    saveAs(file, `${name}.zip`);
  });
}
