#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
    export JEKYLL_ENV=production
    export DEPLOY_PATH=www
else
    export JEKYLL_ENV=development
    export DEPLOY_PATH=test
fi

bundle exec jekyll build -V
lftp -e "mirror -R -e _site $DEPLOY_PATH; quit" -u $DEPLOY_USER,$DEPLOY_PASS sftp://$DEPLOY_HOST