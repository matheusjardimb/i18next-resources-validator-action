#!/usr/bin/env node

import * as core from '@actions/core'
import checkResources from './checkTranslations'
import { quietModeKey, resourcesPathKey } from './constants'
import { info } from './log'
import { MissingResourcesPathParamError } from './errors'

function getQuietModeParam(): boolean {
  const quietMode = core.getInput(quietModeKey)
  return quietMode === 'true'
}

function getResourcesPathParam(quietMode: boolean): string {
  const resourcesPath = core.getInput(resourcesPathKey)
  if (!resourcesPath) {
    throw new MissingResourcesPathParamError()
  }
  info(`Reading json files from '${resourcesPath}`, quietMode)
  return resourcesPath
}

function validateResources(): void {
  const quietMode = getQuietModeParam()
  const resourcesPath = getResourcesPathParam(quietMode)
  checkResources(resourcesPath, quietMode)
}

export { validateResources }
