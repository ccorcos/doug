test "doug-app init"
cd ~
doug-app init doug-app-test
if [ ! -d ~/doug-app-test ]; then
  error "init did not create a new directory"
fi

test "doug-app test"
cd ~/doug-app-test
doug-app test

test "doug-app build"
cd ~/doug-app-test
doug-app build
if [ ! -d ~/doug-app-test/dist ]; then
  error "distribution files not found"
fi

log "creating a local git repo"
cd ~
mkdir doug-app-origin
cd ~/doug-app-origin
git init --bare
cd ~/doug-app-test
git init
git add .
git config --global user.email "test@gmail.com"
git config --global user.name "Doug Test"
git commit -m "doug-app-test"
git remote add origin ~/doug-app-origin
git push origin master

test "doug-app release"
cd ~/doug-app-test
function get_version() { cat package.json  | grep -Po '(?<=version": ")[^"]+'; }
PREV_VERSION=`get_version`
doug-app release minor
NEW_VERSION=`get_version`
if [ $PREV_VERSION = $NEW_VERSION ]; then
  error "new version not created"
fi
cd ~/doug-app-origin
ORIGIN_TAG=`git tag | grep $NEW_VERSION`
if [ ! $ORIGIN_TAG ]; then
  error "origin tag not found"
fi

test "doug-app deploy"
cd ~/doug-app-test
doug-app deploy
cd ~/doug-app-origin
GH_PAGES_BRANCH=`git branch | grep gh_pages`
if [ ! $GH_PAGES_BRANCH ]; then
  error "gh_pages branch not found"
fi

test "doug-app dev"
cd ~/doug-app-test
doug-app dev &
TRIES=10
while true; do
  if [  $TRIES = 0 ]; then
    # kill the background job
    # http://stackoverflow.com/questions/1624691/linux-kill-background-task
    kill $!
    error "dev server didn't start"
  fi
  sleep 1
  log "trying to curl localhost:3000"
  curl -s http://localhost:3000 -o ~/response.html
  RESULT=`cat ~/response.html | grep '<title>Website</title>'`
  rm ~/response.html
  if [ ! $RESULT ]; then
    log "not ready yet"
    let TRIES=TRIES-1
  else
    log "all good"
    # kill the background job
    # http://stackoverflow.com/questions/1624691/linux-kill-background-task
    kill $!
    break
  fi
done
