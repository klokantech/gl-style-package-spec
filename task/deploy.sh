#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit
# https://docs.travis-ci.com/user/customizing-the-build#Implementing-Complex-Build-Steps
set -ev

npm install -g mapbox-gl-style-spec
npm install spritezero-cli
npm install fs-extra

gl-style-validate ../style.json
rm -rf build
mkdir build
./node_modules/.bin/spritezero build/sprite ../icons/
./node_modules/.bin/spritezero --retina build/sprite@2x ../icons/
node task/index.js

git config --global user.email "nobody@nobody.org"
git config --global user.name "Travis CI"

# deploy
cd build
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1


