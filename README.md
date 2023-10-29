# i18next Resource Validator Action

[![GitHub Super-Linter](https://github.com/matheusjardimb/i18next-resources-validator-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/matheusjardimb/i18next-resources-validator-action/actions/workflows/ci.yml/badge.svg)
<a href="https://img.shields.io/github/v/release/matheusjardimb/i18next-resources-validator-action"><img alt="release" height="20" src="https://img.shields.io/github/v/release/matheusjardimb/i18next-resources-validator-action"></a>
<a href="https://www.npmjs.com/package/i18next-resources-validator-action"><img src="https://badge.fury.io/js/i18next-resources-validator.svg" alt="npm version" height="20"></a>

GitHub Action for validating i18next resources. Avoid issues with your translations.

This toll checks for:

- Missing translations in all supported languages
- Mal-formed or missing string params (WIP)
- Sort your strings to reduce conflicts (WIP)

## Usage

This tool only takes the path of the folder containing the `.json` files to be checked as a param.

### GitHub actions

Create a file `.github/workflows/i18n-validator.yml` with:

```yaml
name: Validate json files containing i18n strings

on: [ push ]

jobs:
  dependency_check_job:
    runs-on: ubuntu-latest
    name: Check for issues at i18n files
    steps:
      - uses: actions/checkout@v4
      - uses: matheusjardimb/i18next-resources-validator@latest
        with:
          # Assuming the .json files are located at '/i18n/' folder in your project 
          resources_path:
            ${{ github.workspace }}/i18n/
          # Optional param for disabling logs 
          quiet: 'false'
```

### Gitlab

Add the following block to your `.gitlab-ci.yml` file:

```yaml
validate_dependencies:
  image: node:20.5.0
  script:
    - export INPUT_RESOURCES_PATH="${CI_PROJECT_DIR}/i18n"
    - export INPUT_QUIET='true' # This line is optional
    - npx i18next-resources-validator@latest
```

### NPX

Dependencies checker is also [published into npm](https://www.npmjs.com/package/i18next-resources-validator), so you can
run
with:

```shell
export INPUT_RESOURCES_PATH="${CI_PROJECT_DIR}/i18n"
export INPUT_QUIET='true' # This line is optional
npx i18next-resources-validator@latest
```

## License

See more about the MIT licensing at [LICENSE](LICENSE).


