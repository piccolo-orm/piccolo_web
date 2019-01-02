#/bin/bash
set -e
./build-image.sh
./push-image.sh

ssh root@piccolo-orm.com 'docker pull registry-1.dantownsend.co.uk:5000/piccolo_web:latest && cd /home/core/apps/piccolo && /opt/bin/docker-compose up -d && yes y | docker image prune'
