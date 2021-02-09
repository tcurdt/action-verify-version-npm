const core = require('@actions/core')
const fs = require('fs')

function extractVersion(file) {

  const data = fs.readFileSync(file, {encoding:'utf8', flag:'r'})

  const package = JSON.parse(data)
  const version = package.version

  return version
}

try {

  const ref = process.env['GITHUB_REF']
  console.log(`ref: [${ref}]`)

  const file = core.getInput('file') || './package.json'
  console.log(`file: [${file}]`)

  const prefix = core.getInput('prefix') || 'refs/tags/v'
  console.log(`prefix: [${prefix}]`)

  const version_from_package = '' + extractVersion(file)
  console.log(`version from package: [${version_from_package}]`)

  core.setOutput('version', version_from_package)

  if (ref.startsWith(prefix)) {

    const version_from_tag = ref.substring(prefix.length)
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
