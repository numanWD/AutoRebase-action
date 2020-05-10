const core = require('@actions/core');
// const exec = require('@actions/exec');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const token = core.getInput('token');
    if (!token) core.setFailed(`Missing Token`);

    const gitClient = new github.GitHub(token);

    const pull_number = context.payload.issue.number;
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;

    const params = {
      owner,
      repo,
      pull_number
    };

    let pr = await gitClient.pulls.get(params);
    const prInfo = {
        rebaseable: pr.data.rebaseable,
        merged: pr.data.merged,
        base_branch: pr.data.base.ref,
        head_branch: pr.data.head.ref
    };
    
  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
