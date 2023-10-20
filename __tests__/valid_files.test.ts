import { describe, expect, it } from '@jest/globals'
import { getFilesFromFolder, setInput } from '../src/utils'
import { resourcesPathKey } from '../src/constants'
import validateDependencies from '../src/run_checker'

describe('Test valid json files', () => {
  for (const filePath of getFilesFromFolder('tests/valid_files')) {
    it(`${filePath} should not throw error`, () => {
      expect(() => {
        setInput(resourcesPathKey, filePath)
        return validateDependencies()
      }).not.toThrow()
    })
  }
})
