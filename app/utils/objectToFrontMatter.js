export default function objectToFrontMatter(obj) {
  return Object.entries(obj).map(([key, value]) => `"${key}": "${value}"`).join('\n');
}
