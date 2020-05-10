const core = require('@actions/core');
// const exec = require('@actions/exec');
const github = require('@actions/github');


// most @actions toolkit packages have async methods
async function run() {
  try { 
    const token = process.env['GITHUB_TOKEN'];
    if (!token) core.setFailed(`Missing Token`);

    const gitClient = new github.GitHub(token);

    console.log(`env ${JSON.stringify(process.env)}`);

    const context = await github.context;

    console.log(`context ${JSON.stringify(context.payload)}`);
    const prNumber = context.payload.pull_request.number;
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;

    const params = {
      owner,
      repo,
      prNumber
    };

    let pr = await gitClient.pulls.get(params);
    const prInfo = {
        rebaseable: pr.data.rebaseable,
        merged: pr.data.merged,
        base_branch: pr.data.base.ref,
        head_branch: pr.data.head.ref
    };
    
    console.log(`PR info ${JSON.stringify(prInfo)}`);


  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

run()
