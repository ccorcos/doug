# exit on error
# http://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
set -e
set -o pipefail

# some formatted logging commands
function log() { echo "LOG: $@"; }
function test() { echo "TEST: $@"; }
function error() { echo "ERROR: $@"; exit 1; }

source ./setup.sh
source ./doug-app.sh
source ./doug-lib.sh

log "all done :)"
