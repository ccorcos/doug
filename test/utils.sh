# some formatted logging commands
function log() { echo "LOG: $@"; }
function test() { echo "TEST: $@"; }
function error() { echo "ERROR: $@"; exit 1; }
