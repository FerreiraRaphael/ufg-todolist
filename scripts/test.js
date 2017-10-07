const util = require('util');
const path = require('path');
const exec = util.promisify(require('child_process').exec);

async function lsExample () {
  try {
    const apiTests = await exec('npm run test:coverage', { cwd: path.resolve(__dirname, '..')});
    console.log(apiTests.stdout, apiTests.stderr);
    const webappTests = await exec('npm test -- --coverage', { cwd: path.resolve(__dirname, '../webapp')});
    console.log(webappTests.stdout, webappTests.stderr);
  } catch(e) {
    console.log(e);
  }
}
lsExample();
