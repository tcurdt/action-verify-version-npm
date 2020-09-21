const core = require('@actions/core');
//const github = require('@actions/github');

// RUNNER_OS=Linux
// GITHUB_HEAD_REF=
// GITHUB_REPOSITORY_OWNER=tcurdt
// GITHUB_REF=refs/heads/master
// GITHUB_SHA=c525642066471a675ec4e76cff226636266905b2
// GITHUB_RUN_ID=265960061
// GITHUB_BASE_REF=
// GITHUB_JOB=test
// GITHUB_REPOSITORY=tcurdt/action-verify-version-npm
// GITHUB_EVENT_NAME=push
// GITHUB_WORKFLOW=ci

try {

  const sha = process.env['GITHUB_SHA']
  console.log(`sha: [${sha}]`)

  const ref = process.env['GITHUB_REF']
  console.log(`ref: [${ref}]`)

  const file = core.getInput('file')
  console.log(`file: [${file}]`)

  // const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

  const version = (new Date()).toTimeString();
  core.setOutput("version", version);

} catch (error) {
  core.setFailed(error.message);
}

// async function run() {
//     const version = core.getInput("version");
//     const package = core.getInput("package").replace("package.json", "");

//     const child = exec("npm version " + version + " --prefix " + package + " --no-git-tag-version", (error, stdout, stderr) => {
//         if(error != null) {
//             core.setFailed(error);
//         }
//         if(stderr != null) {
//             console.log(stderr);
//         }
//         console.log(stdout);
//     });
// }

// run();
