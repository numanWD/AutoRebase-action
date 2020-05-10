const core = require('@actions/core');
// const exec = require('@actions/exec');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const context = await github.context;
    console.log(`info ${console.log(JSON.stringify(context))}`);
    // const pull_number = context.payload.issue.number;
    const owner = context.payload.repository.full_name.split('/')[0];
    const repo = context.payload.repository.name;
    console.log(`repo ${repo}`)
    console.log(`repo ${owner}`)
    const pull_request = context.payload.pull_request;

    if (! pull_request) {
      core.setFailed(`this is not a pr`);
    }
    // console.log(`pull_number ${pull_number}`)
    console.log(`Rebabled  ${context.payload.pull_request.rebaseable}`)
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
