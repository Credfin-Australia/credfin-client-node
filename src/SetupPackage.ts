import * as fs from 'fs';

// DO NOT DELETE THIS FILE
// This file is used by build system to build a clean npm package with the compiled js files in the root of the package.
// It will not be included in the npm package.

const createLib = () => {
  const packgeJsonString = fs
    .readFileSync(`${__dirname}/../package.json`)
    .toString('utf-8');
  const packageJson = JSON.parse(packgeJsonString);
  packageJson.devDependencies = {};
  packageJson.scripts = {};

  if (packageJson.main.startsWith('lib/')) {
    packageJson.main = packageJson.main.slice(4);
  }

  fs.writeFileSync(
    `${__dirname}/package.json`,
    Buffer.from(JSON.stringify(packageJson, null, 2), 'utf-8')
  );

  fs.copyFileSync(`${__dirname}/../README.md`, `${__dirname}/README.md`);
}

createLib();
