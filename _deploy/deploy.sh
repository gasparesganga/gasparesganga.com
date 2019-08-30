#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
    export JEKYLL_ENV=production
    export DEPLOY_PATH=www
else
    export JEKYLL_ENV=development
    export DEPLOY_PATH=test
fi

bundle exec jekyll build
lftp -c "set sftp:auto-confirm yes ; open -u $DEPLOY_USER,$DEPLOY_PASS sftp://$DEPLOY_HOST ; mirror -R -e _site $DEPLOY_PATH ; quit"