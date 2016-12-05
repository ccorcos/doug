set -e
set -o pipefail

DOUG_ROOT=`cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd`
cd $DOUG_ROOT
git clean -fXd
docker run -v $DOUG_ROOT:/root/doug node /bin/bash /root/doug/test/run.sh
