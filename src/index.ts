#!/usr/bin/env node

import { validateResources } from './run_checker'
import * as core from '@actions/core'

export async function runChecker(): Promise<void> {
  try {
    validateResources()
  } catch (error) {
    core.setFailed(error as Error)
  }
}

runChecker()
