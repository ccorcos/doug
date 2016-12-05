# exit on error
# http://stackoverflow.com/questions/821396/aborting-a-shell-script-if-any-command-returns-a-non-zero-value
set -e
set -o pipefail

source /root/doug/test/utils.sh
source /root/doug/test/setup.sh
source /root/doug/test/doug-app.sh
source /root/doug/test/doug-lib.sh

log "all done :)"
