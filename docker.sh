#!/bin/sh
docker rmi $(docker images -q) -f 
docker rm -f occ-app-latest2-container
docker build -t occ-app-latest-image2 .
docker run --name occ-app-latest2-container -d -p 9090:80 occ-app-latest-image2
