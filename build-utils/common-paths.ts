import * as  path from 'path';

const PROJECT_ROOT = path.resolve(__dirname, '../');

const projectRoot = PROJECT_ROOT;
const outputPath = path.join(PROJECT_ROOT, 'dist');
const appEntry = path.join(PROJECT_ROOT, 'src');
const contentBase = path.join(PROJECT_ROOT, 'public');
const tslint = path.join(PROJECT_ROOT, 'tslint.json');
const tsconfig = path.join(PROJECT_ROOT, 'tsconfig.json');
const faviconPath = path.join(PROJECT_ROOT, 'public/assets/favicon.png');
const antdPalette = path.join(PROJECT_ROOT, 'src/shared/styles/antd-overrides-palette.less');
const swPath = path.join(appEntry, 'core/workers/rootWorker.ts');

export { projectRoot, outputPath, appEntry, contentBase, tslint, tsconfig, faviconPath, antdPalette, swPath };
