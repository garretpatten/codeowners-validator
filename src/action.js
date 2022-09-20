/* GitHub Dependencies */
const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');

/* Node Dependencies */
const fs = require('fs');
const minimatch = require('minimatch');

/* I/O */
const INPUT_API_TOKEN = 'apiToken';
const INPUT_CHANGED_FILES = 'changedFiles';
const INPUT_IGNORE_LIST = 'ignoreList'
const OUTPUT_TIMESTAMP = 'timestamp';

/*
 * Builds a Map<String, String[]> of
 * filepathPattern to codeowners of
 * that filepathPattern as indicated
 * by the CODEOWNERS file.
 */
function buildCodeownersMap() {
	// TODO: Catch error if CODEOWNERS fails to be
	// be read and exit process early with user
	// friendly error message
	const codeownersMetadata = fs.readFileSync(
		'.github/CODEOWNERS',
		'utf8'
	);
	const codeownersLines = codeownersMetadata.split('\n');

	let codeownerEntry;
	const codeownersMap = new Map();

	for (let codeownerLine of codeownersLines) {
		if (codeownerLine.substring(0,1) != '#'
			&& codeownerLine.length > 1
		) {
			// If there is not an owner after the first space
			// in the codeownerLine, then the filepath has a
			// space and must be handled differently
			if (codeownerLine.indexOf('@') !== -1
				&& codeownerLine[codeownerLine.indexOf(' ') + 1] != '@'
			) {
				codeownerEntry = handleFilepathWithSpace(codeownerLine);
			} else {
				codeownerEntry = codeownerLine.split(' ');
			}

			// Codeowner entries with only a file path
			// are valid but considered unowned, thus
			// they should not be added to the map
			if (codeownerEntry.length > 1) {
				codeownerEntry[0] = cleanPath(codeownerEntry[0]);
				codeownersMap.set(
					codeownerEntry[0],
					getCodeowners(codeownerEntry)
				);
			}
		}
	}

	return codeownersMap;
}

/*
 * Cleans CODEOWNERS filepaths patterns
 * to facilitate filepath pattern to
 * filepath direct matching. Filepaths
 * that start with '/' will have the beginning
 * forward slash removed unless that filepath
 * pattern is the first level root directory
 * pattern - '/*'.
 */
function cleanPath(filepath) {
	if (filepath != '/*'
		&& filepath.substring(0, 1) == '/'
	) {
		filepath = filepath.substring(1);
	}

	return filepath;
}

/*
 * Generates a list of files that have
 * been changed that do not have explicit
 * ownership defined in the CODEOWNERS file.
 */
function getChangedFilesWithoutOwnership(changedFiles, codeownersMap, ignoreList) {
	const codeownersFilepaths = [...codeownersMap.keys()];
	let changedFilesWithoutOwnership = [...changedFiles];

	for (let filepath of changedFiles) {
		ignoreList.forEach((path) => {
			if (filepath.includes(path)) {
				removeFromList(changedFilesWithoutOwnership, filepath);
			}
		});

 		for (let filepathPattern of codeownersFilepaths) {
			// Universal filepath means that all files
			// changed in the PR/Push are owned
			if (filepathPattern == '*'
				|| filepathPattern == '/'
			) {
				return [];
			}

			if (isMatch(filepath, filepathPattern)) {
				console.log('a match has been found for: ' + filepath + ' and ' + filepathPattern);
				console.log('');
				removeFromList(changedFilesWithoutOwnership, filepath);
			}
		}
	}

	return changedFilesWithoutOwnership;
}

/*
 * Returns an array of codeowners given
 * an entry in the CODEOWNERS file. This
 * is done by removing the filepath pattern
 * and isolating the owners by removing any
 * inline comments beginning with a '#'.
 */
function getCodeowners(codeownerEntry) {
	codeownerEntry.splice(0, 1);

	for (let index = 0; index < codeownerEntry.length; index++) {
		if (codeownerEntry[index].substring(0, 1) == '#') {
			codeownerEntry.splice(index);
		}
	}

	return [...codeownerEntry];
}

/*
 * Returns a promise that is either resolved or
 * rejected based on the response from the GitHub
 * Teams API. If the call is successful, the promise
 * will be resolved with an array of valid Teams
 * within the GitHub organization. If the call is
 * unsuccessful, the promise will be rejected with
 * the caught exception.
 */
function getTeams(token) {
	let p = new Promise((resolve, reject) => {
		(async () => {
			let response;
			try {
				response = await new Octokit(
					{ auth: token }
				).request('GET /orgs/ncino/teams');
			} catch(e) {
				reject(e);
			}

			if (response && response.data) {
				const retrievedTeams = [];
				for (let team of response.data) {
					retrievedTeams.push(team.name);
				}

				resolve(retrievedTeams);
			} else {
				reject(response);
			}
		})();
	});

	return p;
}

/*
 * Generates a codeowner entry array
 * given a codeowner line where the
 * filepath contains spaces and thus
 * must be processed accordingly
 */
function handleFilepathWithSpace(codeownerLine) {
	let codeownerEntry = [];
	let filepath = '';
	let indexOfSpace;

	let finished = false;
	while (!finished) {
		indexOfSpace = codeownerLine.indexOf(' ');
		filepath += codeownerLine.substring(0, indexOfSpace + 1);
		codeownerLine = codeownerLine.substring(indexOfSpace + 1);
		if (codeownerLine[0] == '@') {
			// Remove delimiting space from filepath
			filepath = filepath.substring(0, filepath.length - 1);
			codeownerEntry.push(filepath, ...codeownerLine.split(' '));

			finished = true;
		}
	}

	return codeownerEntry;
}

/*
 * Determines whether the filepath of a
 * given changed file matches with a
 * filepath pattern from the CODEOWNERS file.
 *
 * For case:
 *   filepath: script.js
 *   filepathPattern: *.js
 */
function isFileExtensionMatch(filepath, filepathPattern) {
	if (filepathPattern.substring(0,2) == '*.') {
		return filepath.includes(filepathPattern.substring(1));
	}

	return false;
}

/*
 * Determines whether the filepath of a
 * given changed file matches with a
 * filepath pattern from the CODEOWNERS file.
 *
 * For case:
 *   filepath: README.md
 *   filepathPattern: /*
 */
function isFirstLevelDirectoryMatch(filepath, filepathPattern) {
	if (filepathPattern.indexOf('/*') !== -1) {
		if (filepathPattern == '/*') {
			return !filepath.includes('/');
		} else {
			let filepathSplit = filepath.split('/');
			let fileDirectory = filepathSplit[filepathSplit.length - 2];

			return filepathPattern.includes(fileDirectory);
		}
	}

	return false;
}

/*
 * Determines whether the filepath of a
 * given changed file matches with a
 * filepath pattern from the CODEOWNERS file.
 *
 * For case:
 *   filepath: directory/subDirectory/script.js
 *   filepathPattern: directory/
 */
function isFullDirectoryMatch(filepath, filepathPattern) {
	if (filepathPattern.substring(filepathPattern.length - 1) == '/') {
		return filepath.includes(filepathPattern.substring(1));
	}

	return false;
}

/*
 * Orchestrating function to determine
 * whether the filepath of a given changed
 * file matches with a filepath pattern from
 * the CODEOWNERS file.
 *
 * Runs an array of functions that handle
 * different types of matches. When a match
 * is found, true is returned. Otherwise,
 * false is returned.
 */
function isMatch(filepath, filepathPattern) {
	const matchingFunctions = [
		minimatch,
		isFileExtensionMatch,
		isFullDirectoryMatch,
		isFirstLevelDirectoryMatch
	];

	for (let matchingFunction of matchingFunctions) {
		if (matchingFunction(filepath, filepathPattern)) {
			return true;
		}
	}

	return false;
}

/*
 * Helper function to remove a specific
 * item from a given list using the
 * index of the item. A check has been
 * added to avoid errant removal of the
 * incorrect item.
 */
function removeFromList(list, item) {
	const index = list.indexOf(item);
	if (list[index] == item) {
		list.splice(
			list.indexOf(
				item
			),
			1
		);
	}
}

/*
 * Orchestrating function of the
 * codeowners-validator GitHub Action.
 * If unowned files (as determined by
 * the CODEOWNERS file) have been added
 * or updated in the push or pull request
 * in context, errors will be set on the
 * check that identify the unowned files.
 * If an API token is provided, each owner
 * within the CODEOWNERS file will also be
 * validated using the GitHub Teams API. If
 * invalid teams are found in the CODEOWNERS
 * file, errors will be set on the check that
 * identify the invalid owners.
 */
function validateCodeowners() {
	const validTeams = null;

	const repoName = github.context.payload.repository.full_name.split('/')[1];
	console.log('Running codeowners-validator action for the ' + repoName + ' repository...');

	const apiToken = core.getInput(INPUT_API_TOKEN);

	const changedFilesSpaceDelimitedList = core.getInput(INPUT_CHANGED_FILES);
	const changedFiles = changedFilesSpaceDelimitedList.split(' ');

	const ignoreSpaceDelimitedList = core.getInput(INPUT_IGNORE_LIST);
	const ignoreList = ignoreSpaceDelimitedList.split(' ');

	let apiPromise = null;
	if (apiToken != null) {
		apiPromise = new Promise((resolve, reject) => {
			getTeams(apiToken).then((teams) => {
				validTeams = teams;
				resolve(validTeams);
			}).catch((error) => {
				console.log(error);
				reject(error);
			});
		});
	}

	const codeownersMap = buildCodeownersMap();

	const changedFilesWithoutOwnership = getChangedFilesWithoutOwnership(
		changedFiles,
		codeownersMap,
		ignoreList
	);

	let invalidTeams = [];
	if (apiPromise != null) {
		apiPromise.then((response) => {
			let owners;

			for (let key of codeownersMap.keys()) {
				owners = codeownersMap.get(key);
				owners.forEach((owner) => {
					if (!validTeams.includes(owner)) {
						invalidTeams.push(owner);
					}
				});
			}
		}).catch((error) => {});
	}

	let errorMessage = null;
	if (changedFilesWithoutOwnership.length > 0) {
		errorMessage = '\n' + 'There are files without ownership in this work:' + '\n';

		changedFilesWithoutOwnership.forEach((file) => {
			errorMessage += file + '\n';
		});

		errorMessage += '\n' + 'Please update the CODEOWNERS file to take ownership over the updated files '
			+ 'following the CODEOWNERS example file from GitHub Docs found here:' + '\n'
			+ 'https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners#example-of-a-codeowners-file' + '\n'
			+ 'If files should be ignored or have no ownership, they can be added to the .github/workflows/codeowners-validator.yml file. '
			+ 'For reference, see the `ignoreList` parameter in the codeowners-validator README found here:' + '\n'
			+ 'https://github.com/garretpatten/codeowners-validator#ignorelist'
	}

	if (invalidTeams.length > 0) {
		errorMessage = '\n' + 'There are invalid Teams in the CODEOWNERS file:' + '\n';

		invalidTeams.forEach((team) => {
			errorMessage += team + '\n'
		});
	}

	if (errorMessage != null) {
		core.setFailed(errorMessage);
	}

	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
}

validateCodeowners();