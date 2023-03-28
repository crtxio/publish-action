const axios = require('axios')
const core = require('@actions/core')
const { Commit } = require('@crtxio/hddata')

async function run() {
  try {
    // Get input values from action.yml
    const publisher = core.getInput('publisher')
    const topic = core.getInput('topic')
    const key = core.getInput('key')
    const ptr = core.getInput('ptr')

    const commit = await Commit.sign({ ptr }, key, topic)
    const { iss } = commit.json

    await axios.post(publisher + '/commits', commit.encoded)

    // Set the output value
    core.setOutput('issuer', iss)
    core.setOutput('commit', commit.encoded)
  } catch (error) {
    core.setFailed(error.message);
  }
}

run()
