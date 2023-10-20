import { getLanguageResources } from './languages'

type langDict = { [key: string]: {} }

function dictLen(dict: {}) {
  return Object.keys(dict).length
}

function checkLang(
  total: langDict,
  language: langDict,
  missing: langDict,
  langName: string
) {
  for (const key in total) {
    if (language[key] === undefined) {
      if (missing[langName] === undefined) {
        missing[langName] = [key]
      } else {
        ;(missing[langName] as string[]).push(key)
      }
    }
  }
}

function checkI18n(languages: langDict) {
  const missing: langDict = {}
  let total: langDict = {}
  for (const langName in languages) {
    const language: langDict = (languages[langName] as langDict)
      .translation as {}
    console.log(`Analyzing ${langName}`)
    if (dictLen(total) === 0) {
      total = language
    } else {
      checkLang(total, language, missing, langName)
      checkLang(language, total, missing, langName)
    }
  }

  if (dictLen(missing) !== 0) {
    console.log('Missing data:', JSON.stringify(missing, null, 2))
    throw new Error('ERROR: missing translations')
  } else {
    console.log('OK')
  }
}

checkI18n(getLanguageResources())
