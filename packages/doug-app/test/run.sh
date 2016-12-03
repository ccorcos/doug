
echo "TEST: install and setup"
cd ~
npm install -g lerna@prerelease
git clone -b $GIT_BRANCH https://github.com/ccorcos/doug.git
if [ ! -d ~/doug ]; then
  echo "ERROR: failed to clone"
  exit 1
fi
cd ~/doug
lerna bootstrap
cd ~/doug/packages/doug-app
npm link

echo "TEST: doug-app init"
cd ~
doug-app init doug-app-origin
if [ ! -d ~/doug-app-origin ]; then
  echo "ERROR: init did not create a new directory"
  exit 1
fi
cd ~/doug-app-origin
git init --base
git add .
git commit -m "doug-app-origin"
cd ~
git clone doug-app-origin doug-app-test
cd ~/doug-app-test
npm install

echo "TEST: doug-app test"
cd ~/doug-app-test
doug-app test

echo "TEST: doug-app build"
cd ~/doug-app-test
doug-app build
if [ ! -d ~/doug-app-test/dist ]; then
  echo "ERROR: distribution files not found"
  exit 1
fi

echo "TEST: doug-app release"
cd ~/doug-app-test
NEW_VERSION=`doug-app release minor`
if [ ! $NEW_VERSION ]; then
  echo "ERROR: new version not returned"
  exit 1
fi
cd ~/doug-app-origin
ORIGIN_TAG=`git tag | grep $NEW_VERSION`
if [ ! $ORIGIN_TAG ]; then
  echo "ERROR: origin tag not found"
  exit 1
fi

echo "TEST: doug-app deploy"
cd ~/doug-app-test
doug-app deploy
cd ~/doug-app-origin
GH_PAGES_BRANCH=`git branch | grep gh_pages`
if [ ! $GH_PAGES_BRANCH ]; then
  echo "ERROR: gh_pages branch not found"
  exit 1
fi

# echo "TEST: doug-app dev"
# cd ~/doug-app-test
# doug-app dev

exit 0
