DOUG_ROOT=`cd "$( dirname "${BASH_SOURCE[0]}" )/.." && pwd`
docker run -v $DOUG_ROOT:/root/doug -t -i node /bin/bash