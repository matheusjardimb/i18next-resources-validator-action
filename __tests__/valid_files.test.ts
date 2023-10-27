import { describe, expect, it } from '@jest/globals'
import { setInput } from '../src/utils'
import { resourcesPathKey } from '../src/constants'
import { validateResources } from '../src/run_checker'

const path = require('path')
const i18nResources: string = path.join(__dirname, '/valid_json_files/')

describe('Test valid valid_json_files files', () => {
  it(`${i18nResources} should be valid`, () => {
    expect(() => {
      setInput(resourcesPathKey, i18nResources)
      return validateResources()
    }).not.toThrow()
  })
})
