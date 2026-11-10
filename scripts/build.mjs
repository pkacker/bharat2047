import { copyFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'dist');
const files = [
  'index.html',
  'test.html',
  'learn.html',
  'Ashoka_Chakra.svg',
  'styles.css',
  'settings.css',
  'topic-pages.css',
  'app.js',
  'settings.js',
  'topic-pages.js',
  'topic-data.js',
  'topic-categories.js',
  'i18n.js',
  'firebase-init.js'
];

await mkdir(output, { recursive: true });
await Promise.all(files.map(file => copyFile(join(root, file), join(output, file))));
console.log(`Copied ${files.length} site files to dist/`);
