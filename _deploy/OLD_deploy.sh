#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
    export JEKYLL_ENV=production
    export DEPLOY_HOST=$PRODUCTION_DEPLOY_HOST
    export DEPLOY_PATH=$PRODUCTION_DEPLOY_PATH
    export DEPLOY_USER=$PRODUCTION_DEPLOY_USER
    export DEPLOY_PASS=$PRODUCTION_DEPLOY_PASS
else
    export JEKYLL_ENV=development
    export DEPLOY_HOST=$DEVELOPMENT_DEPLOY_HOST
    export DEPLOY_PATH=$DEVELOPMENT_DEPLOY_PATH
    export DEPLOY_USER=$DEVELOPMENT_DEPLOY_USER
    export DEPLOY_PASS=$DEVELOPMENT_DEPLOY_PASS
fi

bundle exec jekyll build

openssl aes-256-cbc -pass "env:DEPLOY_PASS" -in _deploy/key.enc -out _deploy/key.rsa -d -a
chmod 600 _deploy/key.rsa

rsync -az -e "ssh -o StrictHostKeyChecking=no -i _deploy/key.rsa" --delete-after _site/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
rm _deploy/key.rsa
