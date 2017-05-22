/* eslint-disable no-console */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import kebabCase from 'lodash/kebabCase';
import objectToFrontMatter from 'utils/objectToFrontMatter';

import fileSlug from 'utils/fileSlug';
import slugify from 'utils/slugify';

export default function packToZip(content, meta, fs) {
  const newContent = content.replace(/src="(.*?)"/g, (_, v) => `src="${fileSlug(v)}"`);

  const zip = new JSZip();

  const title = meta.get('title');

  if (!title || !title.length) {
    return Promise.reject('Add post title!');
  }

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);

  const date = meta.get('date') || localISOTime;
  const lang = meta.get('lang');
  const name = `${lang}-${date.slice(0, 10)}-${kebabCase(title)}`;
  let path = slugify(meta.get('path'));
  if (path[0] !== '/') path = `/${path}`;
  if (path[path.length - 1] !== '/') path = `${path}/`;

  const improvedMeta = meta
    .set('date', date)
    .set('path', path)
  ;
  const text = `---\n${objectToFrontMatter(improvedMeta.toJS())}\n---\n${newContent}`;

  zip.file('index.md', text);

  fs.forEach((value, key) => {
    zip.file(key, value.split(',')[1], { base64: true });
  });

  return zip.generateAsync({ type: 'blob' })
  .then((file) => {
    saveAs(file, `${name}.zip`);
  });
}
