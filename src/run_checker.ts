#!/usr/bin/env node

import core from '@actions/core'
import checkResources from './check_dependencies'
import { quietModeKey, resourcesPathKey } from './constants'
import { info } from './log'
import { MissingResourcesPathParam } from './errors'

function getQuietModeParam(): boolean {
  const quietMode = core.getInput(quietModeKey)
  return quietMode === 'true'
}

function getResourcesPathParam(quietMode: boolean): string {
  const resourcesPath = core.getInput(resourcesPathKey)
  if (!resourcesPath) {
    throw new MissingResourcesPathParam()
  }
  info(`Reading json files from '${resourcesPath}`, quietMode)
  return resourcesPath
}

function validateDependencies(): void {
  const quietMode = getQuietModeParam()
  const resourcesPath = getResourcesPathParam(quietMode)
  checkResources(resourcesPath, quietMode)
}

export default validateDependencies
