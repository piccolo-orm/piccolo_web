#!/bin/sh

version=$(cat vars/version.txt)
name=$(cat vars/name.txt)
registry=$(cat vars/registry.txt)

docker push $registry/$name:$version
docker push $registry/$name:latest
