#!/bin/sh

version=$(cat vars/version.txt)
name=$(cat vars/name.txt)
registry=$(cat vars/registry.txt)

docker build -t $registry/$name:$version ./image
docker tag $registry/$name:$version $registry/$name:latest
