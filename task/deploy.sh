#!/bin/bash
# https://docs.travis-ci.com/user/customizing-the-build#Implementing-Complex-Build-Steps
set -ev

if [ -d ../icons ]; then
  npm install spritezero-cli
fi

rm -rf build
mkdir build
if [ -d ../icons ]; then
  ./node_modules/.bin/spritezero build/sprite ../icons/
  ./node_modules/.bin/spritezero --retina build/sprite@2x ../icons/
fi
node task/deploy.js

git config --global user.email "openmaptiles@klokantech.com"
git config --global user.name "OpenMapTiles Travis"

cd build

# hack: renders preview of last-but-one commit
# doing it after first push often crashed on travis with
#   [ERROR] {mbgl-render}[Style]: Failed to load sprite: HTTP status code 404
mkdir preview
cd preview
docker pull klokantech/thumbnail-gl
docker run -v $(pwd):/data klokantech/thumbnail-gl "https://raw.githubusercontent.com/${TRAVIS_REPO_SLUG}/gh-pages/style-cdn.json"
cd ..

# deploy
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1
