log "install and setup"
cd ~
git clone -b $GIT_BRANCH https://github.com/ccorcos/doug.git
if [ ! -d ~/doug ]; then
  error "failed to clone"
fi
cd ~/doug
npm install -g lerna@prerelease
lerna bootstrap
cd ~/doug/packages/doug-app
npm link
