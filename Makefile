export DOUG_ROOT=${PWD}

clean:
	git clean -fXd

install:
	npm install
	./node_modules/.bin/lerna bootstrap

link:
	cd ${DOUG_ROOT}/packages/doug-app && npm link
	cd ${DOUG_ROOT}/packages/doug-lib && npm link

test-ci:
	make clean
	make install
	make link
	make test-setup
	bash ${DOUG_ROOT}/test/run-ci.sh

install-docker:
	brew install docker
	brew install boot2docker
	boot2docker upgrade

init-docker:
	boot2docker init
	boot2docker up
	boot2docker shellinit 1>tmp; . ./tmp; rm ./tmp;

setup-docker:
	make install-docker
	make init-docker

test-local:
	boot2docker shellinit 1>tmp; . ./tmp; rm ./tmp; docker run -v ${DOUG_ROOT}:/root/doug -e DOUG_ROOT=/root/doug node /bin/bash /root/doug/test/run-local.sh

test-debug:
	boot2docker shellinit 1>tmp; . ./tmp; rm ./tmp; docker run -v ${DOUG_ROOT}:/root/doug -e DOUG_ROOT=/root/doug -t -i node /bin/bash
