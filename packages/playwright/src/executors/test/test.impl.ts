import { buildCommand, execCommand } from '@nx-extend/core'

import type { ExecutorContext } from '@nrwl/devkit'

export interface TestOptions {
  url?: string

  headed?: boolean
  debug?: boolean
  ui?: boolean
}

export async function testExecutor(
  options: TestOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  const { root } = context.workspace.projects[context.projectName]

  const { url, headed, debug, ui } = options

  return Promise.resolve(execCommand(buildCommand([
    'npx playwright test',
    url,

    headed && '--headed',
    debug && '--debug',
    ui && '--ui'

    // TODO:: Map all other options
  ]), {
    cwd: root
  }))
}

export default testExecutor
