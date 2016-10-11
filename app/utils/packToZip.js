import JSZip from 'jszip';
import { saveAs } from 'file-saver';

export default function packToZip(markdown, fs) {
  const zip = new JSZip();
  const dir = zip.folder('post');

  dir.file('index.md', markdown);

  Object.entries(fs).forEach(([key, value]) => {
    dir.file(key, value.path.split(',')[1], { base64: true });
  });

  zip.generateAsync({ type: 'blob' })
  .then((content) => {
    saveAs(content, 'example.zip');
  });
}
