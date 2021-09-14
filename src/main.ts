import * as core from '@actions/core'
import * as github from '@actions/github'

/** Status codes for the action. */
enum Status {
  SUCCESS = 'success',
  FAILED = 'failed',
  RUNNING = 'running'
}

// Note: core.debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true

async function run(): Promise<void> {
  let status: Status = Status.RUNNING
  try {
    const restricted_paths: string = core.getInput('restricted_paths')
    const only_people: string[] = core.getMultilineInput('only_people')
    const github_token = core.getInput('github_token')
    core.debug(`Restricting ${restricted_paths} to ${only_people}`)

    const octokit = github.getOctokit(github_token)
    octokit.log.debug('Make eslint happy by using octokit')

    // TODO Check if restricted_paths exists in repo and warn if it doesn't ?
    // TODO Get diff
    // TODO Filter diff based on `restricted_paths`
    // Compile all authors in the filtered diff
    // if author list is contained within `only_people`
    //    set status = succeed
    // else
    //    set status = failed

    status = Status.SUCCESS

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    core.setFailed(error.message)
    status = Status.FAILED
  } finally {
    core.info(
      `${
        status === Status.SUCCESS
          ? 'Authorized to continue! ✅'
          : status === Status.FAILED
          ? 'Deployment failed! ❌'
          : "A decision hasn't been reach, please report this bug 🐛"
      }`
    )
  }
}

run()
