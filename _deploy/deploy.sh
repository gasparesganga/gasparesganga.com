#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
    export JEKYLL_ENV=production
    export DEPLOY_PATH=www/
    
    #export DEPLOY_HOST=$PRODUCTION_DEPLOY_HOST
    #export DEPLOY_PATH=$PRODUCTION_DEPLOY_PATH
    #export DEPLOY_USER=$PRODUCTION_DEPLOY_USER
    #export DEPLOY_PASS=$PRODUCTION_DEPLOY_PASS
else
    export JEKYLL_ENV=development
    export DEPLOY_PATH=test/
    
    #export DEPLOY_HOST=$DEVELOPMENT_DEPLOY_HOST
    #export DEPLOY_PATH=$DEVELOPMENT_DEPLOY_PATH
    #export DEPLOY_USER=$DEVELOPMENT_DEPLOY_USER
    #export DEPLOY_PASS=$DEVELOPMENT_DEPLOY_PASS
fi

bundle exec jekyll build
lftp -e "mirror -R -e _site $DEPLOY_PATH; quit" -u $DEPLOY_USER,$DEPLOY_PASS sftp://$DEPLOY_HOST