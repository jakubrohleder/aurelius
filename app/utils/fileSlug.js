import slugify from 'utils/slugify';

export default (path) => {
  if (!path) return path;

  const index = path.lastIndexOf('.');
  const ext = path.substring(index + 1, path.length);
  const filename = path.substring(0, index);

  return `${slugify(filename)}.${ext}`;
};
