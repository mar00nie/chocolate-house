fly -t app sp -c chocolate-house/job-chocolate-house.yml -p bulid-test
fly -t app up -p build-test
fly -t app tj -j build-test/job-chocolate-house -w
