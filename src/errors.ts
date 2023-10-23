export class MissingTranslationsError extends Error {
  constructor() {
    super(`Missing translations found`)
  }
}

export class MissingResourcesPathParamError extends Error {
  constructor() {
    super(`Resources path parameter is missing`)
  }
}

export class InvalidResourceFileError extends Error {
  constructor(fileName: string) {
    super(`Invalid file: '${fileName}'`)
  }
}

export class DuplicateTranslationEntryError extends Error {
  constructor(entry: string) {
    super(`Duplicated translation entry found: '${entry}'`)
  }
}
