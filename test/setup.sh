set -e
set -o pipefail

log "install and setup"
cd /root
if [ ! -d /root/doug ]; then
  error "doug does not exist!"
fi
cd /root/doug
npm install -g lerna@prerelease
lerna bootstrap
cd /root/doug/packages/doug-app
npm link
cd /root/doug/packages/doug-lib
npm link
