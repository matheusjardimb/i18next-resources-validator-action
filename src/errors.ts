export class MissingResourcesPathParam extends Error {
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
