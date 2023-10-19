#!/usr/bin/env node

import core from '@actions/core'
import validateResources from './run_checker'

async function runChecker(): Promise<void> {
  try {
    validateResources()
  } catch (error) {
    core.error(error as Error)
    core.setFailed(error as Error)
  }
}

runChecker()
