#  UI 

To install and run the angular application on your machine you need to have the following tools installed:

Preparing libraries
```
Node.js - https://nodejs.org. Please note the version should be >=8 <br/>
Npm - Node.js package manager, comes with Node.js. Please make sure npm version is >=5 <br/>
```
ANGULAR CLI 

To install angular cli open terminal, use below command
```
$ npm install -g --silent @angular/cli@12.2.16

If you need to uninstall @angular/cli, please use following command
$  npm uninstall -g @angular/cli
```

To check angular Cli installed and version, use the following command
```
$ ng version

     _                      _                 ____ _     ___
    / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
   / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
  / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
 /_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
                |___/


Angular CLI: 12.2.16
Node: 14.16.0
Package Manager: npm 6.14.11
OS: win32 x64

Angular: 12.2.16
... animations, cli, common, compiler, compiler-cli, core, forms
... localize, platform-browser, platform-browser-dynamic, router

Package                         Version
---------------------------------------------------------
@angular-devkit/architect       0.1202.16
@angular-devkit/build-angular   12.2.16
@angular-devkit/core            12.2.16
@angular-devkit/schematics      12.2.16
@angular/cdk                    12.2.13
@schematics/angular             12.2.16
rxjs                            6.6.3
typescript                      4.3.5
    
```

RUN THE APPLICATION IN LOCAL MACHINE

To run the source code in local machine , first we have to install the packages.

For installing packages, goto project root Path : $root in terminal and use below command


Path : $root
```
$ npm install
```

Install gzipper globally to access gzip for compression
```
$ npm i gzipper -g
```

After installing packages, we can run the project in local machine by using below command

Path : root
```
$ ng serve --open

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
i ｢wdm｣: Compiled successfully.

```

If we face any issue while running the application, please run the following command
```
npm i --save-dev typescript@4.3.5 . And try again $ ng serve --open
```

TO GENERATE BUILD FOR HOSTING

To change the configuration file for different environments (dev, stage and prod)

Path :http://domain.com/assets/config.json (The file path should be http request, Currently we have in path : $root/src/assets/config.json)

Reference : open config.json  <br/>
```
"webSocketURL": "wss://cloud-stg.calix.com/sockjs/872/q495vp66/websocket"  //STAGE
"webSocketURL": "wss://calixcloud.calix.com/sockjs/910/cay0vlqq/websocket" //PRODUCTION
```

To generate the build  , The build files will be saved in root/dist folder.

$ ng build --configuration production (AOT compilation)

$ ng build (JIT compilation)



Just-in-Time (JIT), compiles your app in the browser at runtime.
Ahead-of-Time (AOT), compiles your app at build time on the server. The bundle size will be smaller than bundle size when we build by JIT mode.

We can go for AOT compilation, the build command will be 

```
ng build --prod
```

To compress the build code in zip format
```
npm run gzip
```

Note - If we face any issue while generating the build for the application, please run the following command
npm i --save-dev typescript@3.4.5 . And try again $ ng build --prod


DOCKER FILE - 
```
We have  the docker file in source code root directory $root, run the docker commands.
```



DOCKER COMMANDS


TO genearte docker image from the build

```
docker build -t cmc-app-latest-image .
```

To list the Docker images 

```
docker images 
```

To run the docker image with the container
```
docker run --name cmc-app-latest-container -d -p 8000:80 cmc-app-latest-image
```

To list the running containers

```
docker ps 
```