#!/usr/bin/env sh

VERSION=$(python3 -c "import json;print('v'+json.load(open('package.json'))['version'])")

git tag -d "$VERSION"
git tag -a "$VERSION" -m "$VERSION"

git tag -d latest
git tag -a latest -m latest
