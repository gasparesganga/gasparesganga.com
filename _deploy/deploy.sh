#!/bin/bash
set -e

if [ $TRAVIS_BRANCH == 'production' ]; then
    export JEKYLL_ENV=production
    export DEPLOY_HOST=$MASTER_DEPLOY_HOST
    export DEPLOY_PATH=$MASTER_DEPLOY_PATH
    export DEPLOY_USER=$MASTER_DEPLOY_USER
    export DEPLOY_PASS=$MASTER_DEPLOY_PASS
else
    export JEKYLL_ENV=development
    export DEPLOY_HOST=$DRAFT_DEPLOY_HOST
    export DEPLOY_PATH=$DRAFT_DEPLOY_PATH
    export DEPLOY_USER=$DRAFT_DEPLOY_USER
    export DEPLOY_PASS=$DRAFT_DEPLOY_PASS
fi

bundle exec jekyll build

openssl aes-256-cbc -pass "env:DEPLOY_PASS" -in _deploy/key.enc -out _deploy/key.rsa -d -a
chmod 600 _deploy/key.rsa

rsync -az -e "ssh -o StrictHostKeyChecking=no -i _deploy/key.rsa" --delete-after _site/ $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
rm _deploy/key.rsa
