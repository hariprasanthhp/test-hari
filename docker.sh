#!/bin/sh
sudo docker build -t occ-app-latest-image2
sudo docker run --name occ-app-latest2-container -d -p 9090:80 occ-app-latest-image2
