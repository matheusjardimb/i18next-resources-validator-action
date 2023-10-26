import { describe, expect, it } from '@jest/globals'
import { setInput } from '../src/utils'
import { resourcesPathKey } from '../src/constants'
import { validateResources } from '../src/run_checker'
import { MissingTranslationsError } from '../src/errors'

const path = require('path')
const i18nResources: string = path.join(__dirname, '/invalid_missing_es/')

describe('Test invalid_missing_es files', () => {
  it(`${i18nResources} should be invalid`, () => {
    expect(() => {
      setInput(resourcesPathKey, i18nResources)
      return validateResources()
    }).toThrow(MissingTranslationsError)
  })
})
