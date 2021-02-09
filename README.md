# Verify Package Version (npm)

Verifies that the package version matches the current tag.

## Inputs

### `file`

Path to the package descriptor. Default `./package.json`.

### `prefix`

Ref prefix. Default `refs/tags/v`.

## Outputs

### `version`

The version from the pom.

## Example usage

    uses: tcurdt/action-verify-version-npm@master
