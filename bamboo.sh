#!/bin/sh
sudo apt update
sudo apt install wget
sudo apt install curl
sudo curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh
sudo source ~/.bashrc
sudo nvm list-remote
sudo nvm install v16.14.2
sudo apt-get install npm
sudo npm install -g @angular/cli
sudo ng version
node --max_old_space_size=6096 ./node_modules/@angular/cli/bin/ng build --configuration production
