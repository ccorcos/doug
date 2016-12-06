set -e
set -o pipefail

test "doug-lib init"
cd ~
doug-lib init doug-lib-test
if [ ! -d ~/doug-lib-test ]; then
  error "init did not create a new directory"
fi
cd ~/doug-lib-test
npm link doug-lib

test "doug-lib build"
cd ~/doug-lib-test
doug-lib build
if [ ! -d ~/doug-lib-test/lib ]; then
  error "distribution files not found"
fi

test "doug-lib test"
cd ~/doug-lib-test
doug-lib test

log "creating a local git repo"
cd ~
mkdir doug-lib-origin
cd ~/doug-lib-origin
git init --bare
cd ~/doug-lib-test
git init
git add .
git config --global user.email "test@gmail.com"
git config --global user.name "Doug Test"
git commit -m "doug-lib-test"
git remote add origin ~/doug-lib-origin
git push origin master

test "doug-lib release"
cd ~/doug-lib-test
function get_version() { cat package.json  | grep -Po '(?<=version": ")[^"]+'; }
PREV_VERSION=`get_version`
doug-lib release minor
NEW_VERSION=`get_version`
if [ $PREV_VERSION = $NEW_VERSION ]; then
  error "new version not created"
fi
cd ~/doug-lib-origin
ORIGIN_TAG=`git tag | grep $NEW_VERSION`
if [ ! $ORIGIN_TAG ]; then
  error "origin tag not found"
fi
