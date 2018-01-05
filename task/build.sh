#!/bin/bash
# https://docs.travis-ci.com/user/customizing-the-build#Implementing-Complex-Build-Steps
set -ev

if [ -d $1/icons ]; then
  npm install @mapbox/spritezero-cli
fi

rm -rf $1/build
mkdir $1/build
if [ -d $1/icons ]; then
  ./node_modules/.bin/spritezero $1/build/sprite $1/icons
  ./node_modules/.bin/spritezero --retina $1/build/sprite@2x $1/icons
fi
node ./task/build.js --style_dir $1 --conf $2
