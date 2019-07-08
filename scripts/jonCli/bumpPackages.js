const { prompt } = require('enquirer');
const { exec } = require('child_process');
const path = require('path');
const initialPrompt = require('./initialPrompt');
const stageFile = require('./stageFile');
const commitChanges = require('./commitChanges');
const getVersionBumpCommitMessage = require('./getVersionBumpCommitMessage');
const getPaths = require('./getPaths');
const getPackagePath = require('./getPackagePath');
const promptStageAndCommit = require('./promptStageAndCommit');

const promptVersion = async ({ packageNames }) => {
  if (!packageNames.length) throw new Error('No packages selected');

  const { version } = await prompt({
    type: 'select',
    name: 'version',
    choices: ['major', 'minor', 'patch'],
    message: 'Choose the version you wish to bump',
  });
  return { packageNames, version };
};

const runExec = (version, packageDir) =>
  new Promise((resolve, reject) => {
    exec(
      `npm version ${version}`,
      {
        cwd: path.resolve(__dirname, '../../', packageDir),
      },
      error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      },
    );
  });

initialPrompt('How would you like to enter which packages to bump?')
  .then(promptVersion)
  .then(({ packageNames, version }) => {
    const packagePaths = getPaths('package.json');
    const bumpVersion = packageName => {
      const packageDir = getPackagePath(packageName, packagePaths).replace(
        '/package.json',
        '',
      );
      return runExec(version, packageDir);
    };

    return Promise.all([
      packageNames,
      packagePaths,
      ...packageNames.map(bumpVersion),
    ]);
  })
  .then(promptStageAndCommit)
  .then(({ packageNames, paths, shouldCommitChanges }) => {
    if (shouldCommitChanges) {
      const renamePackageJson = packagePath =>
        packagePath.replace('package.json', 'package-lock.json');

      const packageLockPaths = paths.map(renamePackageJson);

      [...paths, ...packageLockPaths].forEach(stageFile);
      commitChanges(getVersionBumpCommitMessage(packageNames));
    }
  })
  // eslint-disable-next-line no-console
  .catch(console.error);
