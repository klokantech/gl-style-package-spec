#!/bin/bash
# See https://medium.com/@nthgergo/publishing-gh-pages-with-travis-ci-53a8270e87db
set -o errexit
# https://docs.travis-ci.com/user/customizing-the-build#Implementing-Complex-Build-Steps
set -ev

npm install
bash ./task/test.sh
bash ./task/deploy.sh
