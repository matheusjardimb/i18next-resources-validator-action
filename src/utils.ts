import fs from 'fs'

function getFilesFromFolder(
  directory: string,
  extension: string = '.json'
): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(item => item.isFile())
    .filter(item => item.name.endsWith(extension))
    .map(item => `${directory}/${item.name}`)
}

const setInput = (name: string, value: string): void => {
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value
}

export { getFilesFromFolder, setInput }
