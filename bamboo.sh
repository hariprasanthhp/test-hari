#!/bin/sh
ng version
node --max_old_space_size=6096 ./node_modules/@angular/cli/bin/ng build --configuration production
