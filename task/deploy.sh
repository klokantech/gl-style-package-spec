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

# deploy
cd build
git init
git add .
git commit -m "Deploy to Github Pages"
git push --force --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1

mkdir preview
cd preview
docker pull klokantech/thumbnail-gl
docker run -v $(pwd):/data klokantech/thumbnail-gl "https://raw.githubusercontent.com/${TRAVIS_REPO_SLUG}/gh-pages/style-cdn.json"
cd ..
git add preview/
git commit -m "Add previews to Github Pages"
git push --quiet "https://${GITHUB_TOKEN}@github.com/${TRAVIS_REPO_SLUG}.git" master:gh-pages > /dev/null 2>&1