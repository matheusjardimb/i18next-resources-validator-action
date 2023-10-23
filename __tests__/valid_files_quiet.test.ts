import { describe, expect, it } from '@jest/globals'
import { getFilesFromFolder, setInput } from '../src/utils'
import { quietModeKey, resourcesPathKey } from '../src/constants'
import validateResources from '../src/run_checker'
import * as core from '@actions/core'

describe('Test valid json files', () => {
  for (const filePath of getFilesFromFolder('tests/valid_files')) {
    it(`${filePath} should not throw error`, () => {
      expect(() => {
        setInput(resourcesPathKey, filePath)
        setInput(quietModeKey, 'true')

        const spy = jest.spyOn(core, 'info')
        validateResources()
        expect(spy).not.toHaveBeenCalled()
      }).not.toThrow()
    })
  }
})
