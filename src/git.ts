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
  return null
}
