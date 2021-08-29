
<h1 align="center">
  Restricted Files Action 🚀
</h1>

<p align="center">
  <a href="https://github.com/fmonniot/actions-restricted-paths/actions">
    <img src="https://github.com/fmonniot/actions-restricted-paths/workflows/unit-tests/badge.svg" alt="Unit test status badge">
  </a>
  
  <a href="https://github.com/fmonniot/actions-restricted-paths/actions">
    <img src="https://github.com/fmonniot/actions-restricted-paths/workflows/integration-tests/badge.svg" alt="Integration test status badge">
  </a>
  
  <!--
  <a href="https://codecov.io/gh/fmonniot/actions-restricted-paths/branch/dev">
    <img src="https://codecov.io/gh/fmonniot/actions-restricted-paths/branch/dev/graph/badge.svg" alt="Code coverage status badge">
  </a>

  <a href="https://github.com/fmonniot/actions-restricted-paths/releases">
    <img src="https://img.shields.io/github/v/release/fmonniot/actions-restricted-paths.svg?logo=github" alt="Release version badge">
  </a>
  
  <a href="https://github.com/marketplace/actions/deploy-to-github-pages">
    <img src="https://img.shields.io/badge/action-marketplace-blue.svg?logo=github&color=orange" alt="Github marketplace badge">
  </a>
  -->
</p>

<p align="center">
  This <a href="https://github.com/features/actions">GitHub Action</a> will check if the person triggering a job is authorized to execute it based on the file being modified.
</p>


## Getting Started :airplane:

TODO: Change wording: the `only_people_` flag will refer to the user who is responsible for triggering the workflow (the actor in GH Actions terminology).
If that user is including changes from other people, this actions will not know
about it. Code Reviews helps mitigate this issue.

```yaml
jobs:
  job_name:
    steps:
      - uses: fmonniot/actions-deny-execution@v1
        with:
            # Fail execution if someone not mentionned modified a file
            # within the path.
            # For PR: will look at the entire branch diff
            # For tag: will look at the diff with the previous tag
            # For commit: will look at the commit only.
            # The laste one means that someone with write access to a branch
            # can change one the file within `path` in a unit (PR/tag/commit)
            # and then create a second unit outside of `path` to use the
            # previous modification. Grants permission carefully.
          restricted_path: .github
          only_people: |
           fmonniot
           someone
      # If you need to restrict additional paths, you'll have to use multiple
      # steps. GitHub Actions does not support arrays in its inputs.
      # TODO Multiline restricted_paths ?
      - uses: fmonniot/actions-deny-execution@v1
        with:
          restricted_path: dist
          only_people: fmonniot
```

TODO Investigate alternate syntax and features:
```yml
jobs:
  job_name:
    steps:
      - uses: fmonniot/actions-deny-execution@v1
        with:
          codeowners: .github/codeowners.md
          # warn if path/people is also defined, saying owners have priority
      - uses: fmonniot/actions-deny-execution@v1
        with:
          restricted_path: .github
          only_people: |
           fmonniot
           someone
```


GitHub related features: https://docs.github.com/en/actions/reference/environments
On GHE 3.1, env can be protected by reviewer and wait time. On github.com, branches can also be used to restrict execution.

## Configuration 📁

TODO table with options and explanation
TODO Gotcha with commit access

TODO Do I need to keep the required/optional sections below ?

#### Required Setup

TODO

#### Optional Choices


TODO

## Contributing ✏️

See the [contribution guide](./CONTRIBUTING.md).

---

TODO Below is what remains of the typescript getting started guide. Will be removed as development continue.




## Code in Main

TODO Move this stuff into `CONTRIBUTING.md`

> First, you'll need to have a reasonably modern version of `node` handy. This won't work with versions older than 9, for instance.

Install the dependencies  
```bash
$ npm install
```

Build the typescript and package it for distribution
```bash
$ npm run build && npm run package
```

Run the tests :heavy_check_mark:  
```bash
$ npm test

 PASS  ./index.test.js
  ✓ throws invalid number (3ms)
  ✓ wait 500 ms (504ms)
  ✓ test runs (95ms)

...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder. 

Then run [ncc](https://github.com/zeit/ncc) and push the results:
```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket: 

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
with:
  milliseconds: 1000
```

See the [actions tab](https://github.com/actions/typescript-action/actions) for runs of this action! :rocket:

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
