import {
  CreateEvent,
  PullRequestEvent,
  PushEvent
} from '@octokit/webhooks-definitions/schema'
import {WebhookPayload} from '@actions/github/lib/interfaces'

interface Refs {
  from: string
  to: string
}

/**
 * Try to find the base and the head reference to build the diff against.
 *
 * | condition           | from                   | to
 * | tag push            | previous tag           | context.ref (TODO how to get previous tag ?)
 * | pull request        | pull.base.ref          | context.ref
 * | push (on pr)        | pull.base.ref          | refs/pull/${pull.number}/merge
 * | push (first commit) | default branch         | context.payload.after (TODO detect first commit ?)
 * | other cases         | context.payload.before | context.payload.after
 *
 *
 * @param eventName The name of the GitHub Actions event that triggered the step
 * @param payload The payload of the step webhook
 * @returns the references to check the diff on
 */
export function getRefs(
  eventName: string,
  payload: WebhookPayload
): Refs | null {
  if (eventName === 'create') {
    const createPayload = payload as CreateEvent
    // new tag is available in GITHUB_REF, commit pointed at is GITHUB_SHA
    // TODO Look at the ref to know if it is a tag or a branch. Skip branch.
    if (createPayload.ref_type === 'tag') {
      // new tag
      const to = createPayload.ref
      const from = `refs/heads/${createPayload.master_branch}` // TODO refs/heads/ or heads/

      return {from, to}
    } else {
      // new branch. Does the push event is also triggered ?
    }
    return null
  } else if (eventName === 'push') {
    const pushPayload = payload as PushEvent
    // new tag is available in GITHUB_REF, commit pointed at is GITHUB_SHA
    // TODO Can it be triggered on a pull request ? If yes, filter out (needs to know the main branch for that)
    const from = pushPayload.before
    const to = pushPayload.after

    return {from, to}
  } else if (eventName === 'pull_request') {
    const prPayload = payload as PullRequestEvent
    // Look at event types opened, synchronize, reopened or ready_for_review
    // GITHUB_REF points to the PR merge branch (refs/pull/:prNumber/merge)
    // GITHUB_SHA points to the latest commit on the merge branch
    // TODO action type closed ? Or rely on the push type ?
    const from = prPayload.pull_request.base.ref
    const to = prPayload.pull_request.head.ref

    return {from, to}
  } else {
    return null
  }
}
