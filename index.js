const core = require('@actions/core');
const exec = require('@actions/exec');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const context = await github.context;
    const pull_number = context.payload.issue.number;
    const owner = context.payload.repository.full_name.split('/')[0];
    const repo = context.payload.repository.name;

    
    console.log(`pull_number ${pull_number}`)
    console.log(`owner ${owner}`)
    console.log(`repo ${repo}`)

    core.debug(`owner ${owner}`);
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
