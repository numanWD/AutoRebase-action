const core = require('@actions/core');
// const exec = require('@actions/exec');
const github = require('@actions/github');

// most @actions toolkit packages have async methods
async function run() {
  try { 
    const label = core.getInput('label');
    const token = process.env['GITHUB_TOKEN'];
    if (!token) core.setFailed(`Missing Token`);

    const gitClient = new github.GitHub(token);

    console.log(`env ${JSON.stringify(process.env)}`);

    const context = await github.context;

    console.log(`context ${JSON.stringify(context.payload)}`);
    const prNumber = context.payload.repository.open_issues;
    const owner = context.payload.repository.owner.login;
    const repo = context.payload.repository.name;

    const params = {
      owner,
      repo,
      pull_number: 3
    };

    let pr = await gitClient.pulls.get(params);
    const prInfo = {
        rebaseable: pr.data.rebaseable,
        merged: pr.data.merged,
        base_branch: pr.data.base.ref,
        head_branch: pr.data.head.ref,
        labels: pr.data.labels
    };
    
    console.log(`PR info ${JSON.stringify(pr)}`);

    console.log(prInfo.labels.find(({ name }) => name === label)); 

    if (prInfo.merged) core.setFailed('Already Merged');
    if (!prInfo.rebaseable) core.setFailed('The PR is not Rebaseable. We have some conflicts.');
    if (prInfo.rebaseable) await rebase();

  } 
  catch (error) {
    core.setFailed(error.message);
  }
}

const rebase = async (args) => {
  console.log(`Let's reabse`);
};



run()


