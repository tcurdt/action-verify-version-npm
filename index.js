const core = require('@actions/core')
const fs = require('fs')

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

function extractVersion(file) {

  const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'})

  const package = JSON.parse(data)
  const version = package.version

  return version
}

try {

  // const sha = process.env['GITHUB_SHA']
  // console.log(`sha: [${sha}]`)

  const ref = process.env['GITHUB_REF']
  console.log(`ref: [${ref}]`)

  const file = core.getInput('file')
  console.log(`file: [${file}]`)

  const version_from_package = extractVersion(file)
  console.log(`version from package: [${version_from_package}]`)

  core.setOutput('version', version_from_package)

  if (ref.startsWith('refs/tags/v')) {

    const version_from_tag = ref.substring(10)
    console.log(`version from tag: [${version_from_tag}]`)

    if (version_from_package != version_from_tag) {
      core.setFailed(`package version [${version_from_package}] != tag version [${version_from_tag}]`)
    }

  } else {
    console.log(`no tag`)
  }

} catch (error) {
  core.setFailed(error.message);
}
