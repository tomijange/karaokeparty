#!/usr/bin/env bash

DOCKER_STACK=karaokeparty-$BRANCH
DOMAIN="$DOCKER_STACK.tjanke.de"
if [[ $BRANCH == 'master' ]]; then
  DOCKER_STACK=karaokeparty
  DOMAIN=karaokeparty.tjanke.de
fi

exec_docker_compose() {
  cat docker/docker-compose.yml | ssh $SSH_HOST \
  "export DOMAIN=$DOMAIN BRANCH=$BRANCH && \
  echo \"executing command 💻 - \$BRANCH to https://$\DOMAIN\" && \
  docker-compose -f - -p $DOCKER_STACK $*"
}

exec_docker_compose pull
exec_docker_compose up -d
