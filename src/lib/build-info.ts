import { execFileSync } from 'node:child_process'

function readGit(args: string[]) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', cwd: process.cwd(), timeout: 2000, windowsHide: true, stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return ''
  }
}

// Called by next.config at dev/build time, never by the browser or per request.
export function resolveBuildInfo(env: NodeJS.ProcessEnv = process.env, git: (args: string[]) => string = readGit) {
  const validBranch = (value: string | undefined) => Boolean(value && value !== 'HEAD' && value.length <= 150 && !/[\u0000-\u001f\u007f]/.test(value))
  const branch = [env.APP_GIT_BRANCH, env.VERCEL_GIT_COMMIT_REF, env.COMMIT_REF, env.GITHUB_HEAD_REF, env.GITHUB_REF_NAME].find(validBranch)
  const localBranch = branch || git(['branch', '--show-current'])
  const commit = [env.APP_GIT_COMMIT, env.VERCEL_GIT_COMMIT_SHA, env.COMMIT, env.GITHUB_SHA].find(value => value && /^[a-f0-9]{7,40}$/i.test(value)) || git(['rev-parse', 'HEAD'])
  return {
    branch: validBranch(localBranch) ? localBranch : 'Tidak tersedia',
    commit: /^[a-f0-9]{7,40}$/i.test(commit) ? commit.slice(0, 7) : 'Tidak tersedia',
  }
}
