fly -t pipeline-app sp -c chocolate-house/job-chocolate-house.yml -p build-test
fly -t pipeline-app up -p build-test
fly -t pipeline-app tj -j build-test/job-chocolate-house -w
fly -t pipeline-app builds
