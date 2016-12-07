#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit

npm install -g mapbox-gl-style-spec
#npm install fontnik
npm install spritezero-cli
npm install fs-extra

gl-style-validate ../style.json
rm -rf build
mkdir -p build
#rm -rf tmp
#mkdir -p tmp/ttf
#wget https://fonts.google.com/download?family=Open%20Sans -O tmp/ttf/open-sans.zip
#unzip tmp/ttf/open-sans.zip -d tmp/ttf/open-sans
#mkdir -p "build/fonts/Open Sans Bold"
#mkdir -p "build/fonts/Open Sans Italic"
#mkdir -p "build/fonts/Open Sans Regular"
#mkdir -p "build/fonts/Open Sans Semibold"
#./node_modules/.bin/build-glyphs tmp/ttf/open-sans/OpenSans-Bold.ttf "build/fonts/Open Sans Bold"
#./node_modules/.bin/build-glyphs tmp/ttf/open-sans/OpenSans-Italic.ttf "build/fonts/Open Sans Italic"
#./node_modules/.bin/build-glyphs tmp/ttf/open-sans/OpenSans-Regular.ttf "build/fonts/Open Sans Regular"
#./node_modules/.bin/build-glyphs tmp/ttf/open-sans/OpenSans-Semibold.ttf "build/fonts/Open Sans Semibold"
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


