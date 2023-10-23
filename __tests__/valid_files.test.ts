import { describe, expect, it } from '@jest/globals'
import { getFilesFromFolder, setInput } from '../src/utils'
import { resourcesPathKey } from '../src/constants'
import validateResources from '../src/run_checker'

const path = require('path')
const i18nResources: string = path.join(__dirname, '/json/')

describe('Test valid json files', () => {
  it(`${i18nResources} should be valid`, () => {
    expect(() => {
      setInput(resourcesPathKey, i18nResources)
      return validateResources()
    }).not.toThrow()
  })
})