import { describe, expect, it } from '@jest/globals'
import { InvalidDependencyError } from '../src/errors'
import { getFilesFromFolder, setInput } from '../src/utils'
import { resourcesPathKey } from '../src/constants'
import validateDependencies from '../src/run_checker'

describe('Test invalid dependencies in json files', () => {
  for (const filePath of getFilesFromFolder('tests/invalid_dependencies')) {
    it(`${filePath} should throw InvalidDependencyError`, () => {
      expect(() => {
        setInput(resourcesPathKey, filePath)
        return validateDependencies()
      }).toThrow(InvalidDependencyError)
    })
  }
})
