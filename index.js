const core = require('@actions/core');
const github = require('@actions/github');

try {

  // input
  const file = core.getInput('file');
  console.log(`Hello ${file}!`);

  // payload
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);

  // output
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
