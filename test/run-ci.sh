# exit on error
# http://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
set -e
set -o pipefail

cd ${DOUG_ROOT}
./node_modules/.bin/ava ${DOUG_ROOT}/packages/*/test/index.js
