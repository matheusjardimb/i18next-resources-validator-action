# TODO

- [ ] Add input param for ignoring certain files
- [ ] Ignore non-versioned files?
- [ ] Add param for writing fixes to input files (e.g. sorting translations)
- [ ] Resource main language key (e.g. 'en') must match the file name?
- [ ] Can a single file keep multiple translations?
- [ ] Add 'fail-fast' option (fail at first error found)
- [ ] check whether there are duplicated keys in the same json file
- [ ] overwrite the original .json files, sorting translations
- [ ] fail when an empty translation is found
- [ ] check for translation params (using same var names in all languages)

export INPUT_RESOURCES_PATH="$(pwd)/i18n/json"
export INPUT_RESOURCES_PATH="${CI_PROJECT_DIR}/i18n/json"


