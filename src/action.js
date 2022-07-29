/*
	GitHub Dependencies
const core = require('@actions/core');
const github = require('@actions/github');
const { Octokit } = require('@octokit/core');
*/

/* Node Dependencies */
const fs = require('fs');
const minimatch = require('minimatch');

/*
	I/O
const INPUT_API_TOKEN = 'apiToken';
const INPUT_CODEOWNERS_PATH = 'codeownersPath';
const INPUT_CHANGED_FILES = 'changedFiles';
const OUTPUT_TIMESTAMP = 'timestamp';
*/

/*
 * Builds a Map<String, String[]> of
 * filepath to codeowners of that filepath
 * as indicated by the CODEOWNERS file
 */
function buildCodeownersMap(codeownersLines) {
	let codeownerEntry;
	const codeownersMap = new Map();

	for (let codeownerLine of codeownersLines) {
		if (codeownerLine.substring(0,1) != '#'
			&& codeownerLine.length > 1) {
				codeownerEntry = codeownerLine.split(' ');
				codeownerEntry[0] = cleanPath(codeownerEntry[0]);
				codeownersMap.set(
					codeownerEntry[0],
					getCodeowners(codeownerEntry)
				);
		}
	}

	return codeownersMap;
}


/*
 * Cleans CODEOWNERS filepaths to
 * facilitate filepattern/filepath
 * matching. Filepaths that start
 * with '/' will have them removed,
 * and directory paths that end in '/'
 * will have a '*' added. The all
 * encompassing '/*' filepath will
 * be unaltered.
 */
function cleanPath(filepath) {
	if (filepath == '/*') {
		return filepath
	} else {
		if (filepath.substring(0, 1) == '/') {
			filepath = filepath.substring(1);
		}

		if (filepath.substring(filepath.length - 1, filepath.length) == '/') {
			filepath += '*';
		}

		return filepath;
	}
}

/*
 * Generates a list of files that have
 * been changed in the commit in context
 * that do not have a corresponding entry
 * in the CODEOWNERS file.
 */
function getChangedFilesWithoutOwnership(changedFiles, codeownersMap) {
	const codeownersFilepaths = [...codeownersMap.keys()];
	const changedFilesWithoutOwnership = [...changedFiles];

	for (let filepath of changedFiles) {
		codeownersFilepaths.forEach((filepathPattern) => {
			if (minimatch(filepath, filepathPattern)) {
				changedFilesWithoutOwnership.splice(
					changedFilesWithoutOwnership.indexOf(
						filepath
					),
					1
				);
			}
		});
	}

	return changedFilesWithoutOwnership;
}

/*
 * Returns a list of codeowners given
 * an entry in the CODEOWNERS file.
 */
function getCodeowners(codeownerEntry) {
	codeownerEntry.splice(0, 1);

	return [...codeownerEntry];
}

async function getTeams(token) {
	const response = await new Octokit(
		{ auth: token }
	).request('GET /orgs/ncino/teams');

	console.log(response);

	for (let team of response.data) {
		validTeams.push(team.name);
	}
}

function validateCodeowners() {
	/*
	const validTeams = null;

	const repoName = github.context.payload.repository.full_name.split('/')[1];
	console.log('Running codeowners-validator action for the ' + repoName + ' repository...');

	const apiToken = core.getInput(INPUT_API_TOKEN);
	const codeownersPath = core.getInput(INPUT_CODEOWNERS_PATH);
	const changedFilesSpaceDelimitedList = core.getInput(INPUT_CHANGED_FILES);
	const changedFiles = changedFilesSpaceDelimitedList.split(' ');

	if (apiToken != null) {
		getTeams(apiToken);
	}

	console.log(validTeams);

	console.log('');
	console.log('Changed files in this commit:');
	console.log(changedFiles);

	const codeownersMetadata = fs.readFileSync(codeownersPath, 'utf8');
	const codeownersLines = codeownersMetadata.split('\n');
	*/

	const apiToken = null;

	const codeownersLines = [
		'# This should be validated',
		'/.github/* @garretpatten',
		'',
		'# This should lead to an error',
		'/dist/ @invalidOwner',
		'',
		'# This should be validated',
		'**/action.js @garretpatten',
		'',
		'# This should be validated',
		'/src/nSECURE/juice-shop/*'
	];

	const changedFiles = [
		'src/action.js',
		'LICENSE',
		'.github/workflows/ExampleWorkflow.yml',
		'src/nSECURE/juice-shop/objects/Email__c.field-meta.xml'
	];

	const validTeams = [ '@garretpatten' ];

	const codeownersMap = buildCodeownersMap(codeownersLines);

	console.log('codeownersMap');
	console.log(codeownersMap);
	console.log('');

	const changedFilesWithoutOwnership = getChangedFilesWithoutOwnership(
		changedFiles,
		codeownersMap
	);

	console.log('');
	console.log('Changed files without ownership in this commit:');
	console.log(changedFilesWithoutOwnership);

	if (validTeams != null) {
		let invalidTeams = [];
		let owners;

		for (let key of codeownersMap.keys()) {
			owners = codeownersMap.get(key);
			owners.forEach((owner) => {
				if (!validTeams.includes(owner)) {
					invalidTeams.push(owner);
				}
			});
		}

		if (invalidTeams.length > 0) {
			let errorMessage = 'There are invalid Teams in the CODEOWNERS file: ';

			invalidTeams.forEach((team) => {
				errorMessage += team + ' '
			});


			// core.setFailed(errorMessage);
			console.log(errorMessage);
		}
	}

	/*
	core.setOutput(
		OUTPUT_TIMESTAMP,
		new Date().toTimeString()
	);
	*/
	console.log(new Date().toTimeString());
}

validateCodeowners();