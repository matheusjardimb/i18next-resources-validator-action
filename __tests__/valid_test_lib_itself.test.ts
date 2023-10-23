import { describe, expect, it } from '@jest/globals'
import validateResources from '../src/run_checker'

describe('Test valid dependency-checker package.json file', () => {
  it(`lib's package.json should not throw error`, () => {
    expect(() => validateResources()).not.toThrow()
  })
})