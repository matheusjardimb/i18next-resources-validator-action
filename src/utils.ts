import fs from 'fs'

function getTestFileNames(directory: string): string[] {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter(item => item.isFile())
    .filter(item => item.name.endsWith('.json'))
    .map(item => `${directory}/${item.name}`)
}

const setInput = (name: string, value: string): void => {
  process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] = value
}

export { getTestFileNames, setInput }
