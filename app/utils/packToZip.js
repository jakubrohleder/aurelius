import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import frontMatter from 'front-matter';
import kebabCase from 'lodash/kebabCase';
import objectToFrontMatter from 'utils/objectToFrontMatter';

export default function packToZip(markdown, fs) {
  const zip = new JSZip();
  const meta = frontMatter(markdown);

  if (!meta.attributes || !meta.attributes.title) {
    console.error('Add post title!');
    return;
  }

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);

  const title = meta.attributes.title;
  const date = meta.attributes.date || localISOTime;
  const name = `${date.slice(0, 10)}-${kebabCase(title)}`;
  const content = `---\n${objectToFrontMatter({ ...meta.attributes, date })}\n---\n${meta.body}`;

  zip.file('index.md', content);

  Object.entries(fs).forEach(([key, value]) => {
    zip.file(key, value.split(',')[1], { base64: true });
  });

  zip.generateAsync({ type: 'blob' })
  .then((file) => {
    saveAs(file, `${name}.zip`);
  });
}
