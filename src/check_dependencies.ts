import { DuplicateTranslationEntryError, InvalidResourceFileError } from './errors'
import fs from 'fs'
import findDuplicatedPropertyKeys from 'find-duplicated-property-keys'

import { info } from './log'
import { getFilesFromFolder } from './utils'

type packageJsonType = { [p: string]: { [q: string]: string } }

function isValidDependency(dependencyVersion: string, invalidDescriptors: string[]): boolean {
  // TODO: consider evaluating url dependencies
  // https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies
  // http://... See 'URLs as Dependencies' below
  // git... See 'Git URLs as Dependencies' below
  // user/repo See 'GitHub URLs' below
  // tag A specific version tagged and published as tag See npm dist-tag
  // path/path/path See Local Paths bel

  for (const descriptor of invalidDescriptors) {
    if (dependencyVersion.includes(descriptor)) {
      return false
    }
  }
  return dependencyVersion !== ''
}

function isIgnoredDependency(dependency: string, ignoredDepList: string[]): boolean {
  return ignoredDepList.includes(dependency)
}

function checkDependencyList(
  packageJson: packageJsonType,
  ignoredDepList: string[],
  dependencyBlockKey: string,
  allDependencies: string[],
  invalidDescriptors: string[],
  quietMode: boolean
): void {
  info(`Checking block '${dependencyBlockKey}'`, quietMode)

  if (packageJson[dependencyBlockKey] === undefined) {
    throw new DependencyBlockNotFoundError(dependencyBlockKey)
  }

  const dependencyBlock: { [index: string]: string } = packageJson[dependencyBlockKey] as {}
  for (const [dependency, version] of Object.entries(dependencyBlock)) {
    const dep_label = `{ ${dependency}: ${version} }`
    if (isValidDependency(version, invalidDescriptors)) {
      if (allDependencies.includes(dependency)) {
        throw new DuplicateDependencyError(dependency)
      }
      allDependencies.push(dependency)
      info(`\tDependency checked: ${dep_label}`, quietMode)
    } else {
      if (isIgnoredDependency(dependency, ignoredDepList)) {
        info(`\tInvalid dependency IGNORED: ${dep_label}`, quietMode)
      } else {
        throw new InvalidDependencyError(dep_label)
      }
    }
  }
}

function isDependencyBlock(keyName: string): boolean {
  const keyNameLower = keyName.toLowerCase()
  return (
    keyNameLower !== constants.libSettingsKey &&
    (keyNameLower.includes('dependency') || keyNameLower.includes('dependencies'))
  )
}

function getBlocksToCheck(packageJson: packageJsonType, libSettings: libSettingsType): string[] {
  const dependencyBlocksToCheck: string[] = []
  for (const [entryName] of Object.entries(packageJson)) {
    if (isDependencyBlock(entryName)) {
      dependencyBlocksToCheck.push(entryName)
    }
  }
  return dependencyBlocksToCheck
}

function getIgnoredDependencies(
  packageJson: packageJsonType,
  libSettings: libSettingsType,
  quietMode: boolean
): string[] {
  const ignoredDependencies = libSettings[constants.ignoredDependenciesKey] as string[]
  if (ignoredDependencies !== undefined) {
    info(`Ignoring dependencies ${ignoredDependencies}`, quietMode)
    return ignoredDependencies
  }

  info(`Checking all dependencies`, quietMode)
  return constants.ignoredDependenciesDefault
}

function getInvalidDescriptors(
  packageJson: packageJsonType,
  libSettings: libSettingsType,
  quietMode: boolean
): string[] {
  let res = constants.invalidVersionDescriptorsDefault

  const invalidDescriptors = libSettings[constants.validVersionDescriptorsKey] as string[]
  if (invalidDescriptors !== undefined) {
    res = res.filter((x: string) => !invalidDescriptors.includes(x))
  }

  info(`Invalid descriptors: '${res.join(', ')}'`, quietMode)
  return res
}

function readPackageJsonFileAsRaw(packageJsonPath: string): string {
  try {
    return fs.readFileSync(packageJsonPath, 'utf8')
  } catch (e) {
    throw new InvalidPackageFileError(packageJsonPath)
  }
}

function checkDuplicateEntries(rawJsonData: string): void {
  const result = findDuplicatedPropertyKeys(rawJsonData)
  if (result.length > 0) {
    throw new DuplicateTranslationEntryError(result[0]['key'])
  }
}

function parseJsonFile(rawJsonFile: string, packageJsonPath: string): packageJsonType {
  try {
    return JSON.parse(rawJsonFile)
  } catch (e) {
    throw new InvalidResourceFileError(packageJsonPath)
  }
}

function checkResources(resourcesPath: string, quietMode: boolean): void {
  info('Started validating resources', quietMode)

  const resourceFiles = getFilesFromFolder(resourcesPath)
  for (const resourceFile in resourceFiles) {
    const rawResourceFile = readPackageJsonFileAsRaw(resourceFile)
    const validJson = parseJsonFile(rawResourceFile, resourceFile)
    checkDuplicateEntries(rawResourceFile)
  }

  const dependencyBlocksToCheck: string[] = getBlocksToCheck(packageJson, libSettings)
  const ignoredDepList: string[] = getIgnoredDependencies(packageJson, libSettings, quietMode)
  const invalidDescriptors: string[] = getInvalidDescriptors(packageJson, libSettings, quietMode)

  const allDependencies: string[] = []
  for (const dependencyBlock of dependencyBlocksToCheck) {
    checkDependencyList(packageJson, ignoredDepList, dependencyBlock, allDependencies, invalidDescriptors, quietMode)
  }
  info('Finished validating without errors!', quietMode)
}

export default checkResources
