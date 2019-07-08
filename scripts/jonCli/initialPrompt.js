const { prompt } = require('enquirer');
const getPackageNames = require('./getPackageNames');
const getPaths = require('./getPaths');
const promptPackageMultiselect = require('./promptPackageMultiselect');
const promptPackageInput = require('./promptPackageInput');

module.exports = message =>
  prompt({
    message,
    type: 'select',
    name: 'method',
    choices: [
      'Choose from a list of all packages',
      'Enter a comma separated list of package names',
    ],
  }).then(({ method }) => {
    return method === 'Choose from a list of all packages'
      ? promptPackageMultiselect(getPackageNames(getPaths('CHANGELOG.md')))
      : promptPackageInput();
  });
