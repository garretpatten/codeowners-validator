[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/garretpatten/codeowner-verifier/badge)](https://securityscorecards.dev/viewer/?uri=github.com/garretpatten/codeowner-verifier)

# codeowner-verifier
A GitHub Action that verifies that modified files are owned by codeowners. This Action is intended to run on pull requests to enforce code ownership defined in a repository's CODEOWNERS file.

## Table of Contents
- [Usage](#usage)
	- [Action Parameters](#action-parameters)
		- [changedFiles](#changedFiles)
		- [deletedFiles](#deletedFiles)
	- [Environment Variables](#environment-variables)
		- [GITHUB_TOKEN](#GITHUB_TOKEN)
	- [Files](#files)
		- [.codeownersignore](#.codeownersignore)
- [Maintainers](#maintainers)
- [Contributing](#contributing)

## Usage

This GitHub Action has been built to be consumed by organizations and individual projects. In order to incorporate this Action into a repository's build process, a workflow file must be added to that respository's `.github/workflows` directory. The workflow file can be named as needed and should mirror the `codeowner-verifier.yml` file in this repository.

### Action Parameters
#### changedFiles
`changedFiles` is a required parameter that facilitates the processing of updated files in the context of the CODEOWNERS file. `changedFiles` expects to receive a space-delimited list of the filepaths that have been updated in a given PR or push operation. The example workflow in this repository uses the GitHub CLI to generate the list for this parameter.
#### deletedFiles
`deletedFiles` is a required parameter that facilitates the processing of moved and deleted files in the context of the CODEOWNERS file. `deletedFiles` expects to receive a space-delimited list of the filepaths that have been moved or deleted in a given PR or push operation. The example workflow in this repository uses the GitHub CLI to generate the list for this parameter.
### Environment Variables
#### GITHUB_TOKEN
The `GITHUB_TOKEN` is a required environment variable that is needed for the Action to work in the context of a private GitHub organization. A token should be provided that is connected to a user who has requisite access to the repository in context. The codeowner-verifier workflow in this repository uses the shared `DEVOPS_GITHUB_TOKEN` (associated with the CI user) for this parameter.
### Files
#### .codeownersignore
The `.codeownersignore` is an optional file at the root directory that allows a repository to dictate certain filepaths to ignore when validating the CODEOWNERS file. This ignore file is meant to be used for filepaths like `node_modules`, `.gitignore`, `README.md`, and any other files where it may not make sense to require an explicit owner in the CODEOWNERS file. It should be used like a `.gitignore` file with one filepath pattern per line that gets ignored.

### Environment Variables

#### GITHUB_TOKEN

The `GITHUB_TOKEN` is a required environment variable that is needed for the Action to work as intended in the context of a private GitHub organization. A token should be provided that is connected to a user who has requisite access to the organization and repository in context.

## Maintainers

[@GarretPatten](https://github.com/garretpatten)
