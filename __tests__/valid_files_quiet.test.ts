import { describe, expect, it } from '@jest/globals'
import { setInput } from '../src/utils'
import { quietModeKey, resourcesPathKey } from '../src/constants'
import { validateResources } from '../src/run_checker'
import * as core from '@actions/core'

const path = require('path')
const i18nResources: string = path.join(__dirname, '/valid_json_files/')

describe('Test valid valid_json_files files', () => {
  it(`${i18nResources} should be valid`, () => {
    expect(() => {
      setInput(quietModeKey, 'true')
      setInput(resourcesPathKey, i18nResources)
      const spy = jest.spyOn(core, 'info')
      validateResources()
      expect(spy).not.toHaveBeenCalled()
    }).not.toThrow()
  })
})
