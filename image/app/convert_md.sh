#!/bin/sh
for f in ./public/md/*.md; do
    #./node_modules/.bin/showdown makehtml -i "$f"
    echo "$f"
done
