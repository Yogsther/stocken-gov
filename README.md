# Stocken.gov - Record and file taxes.
Stocken.gov is a web application, which with the help of a minecraft server plugin, records, files and handles taxes through a web interface.

# Server

The server is a nodejs web server running express. It uses mongoDB as its database and mongoose to communicate with it. It (the server) communicates with the minecraft plugin, the frontend web app and the database.
It exposes two API's:
* Client API (used by the web app)
* Plugin API (used by the minecraft plugin)
API specifications for each of the API's can be found in server/src/api/README.md. These are however only drafts right now, and are not implemented yet.

## Setup
1. Go to server directory `cd ./server`
2. Install dependencies with `npm i`
3. Start the server with `npm start`

# Client
The client is a single page app built with React. 

## Setup
1. Go to client directory `cd ./client`
1. Install dependencies with `npm i`
2. Start the dev server with `npm start`

# Minecraft plugin
The plugin listens for block breaks of iron, gold, diamond and coal.
It then sends the income to the server.

See instructions in plugin\README.md

There is a test minecraft server in `mc-test-server`. When building the plugin, it will be copied to the plugins folder of the test server.
Note: The minecraft server runs on port 25566

# Contributing to the project.
Things that need to be done are written down under "issues" in the repository. When staring work on something, assign yourself to an existing issue, or create one and assign yourself to it. Create a branch of branch development, with the issue # as prefix, and then an appropriate name. When you are done, submit a pull request.

The frontend web application and backend API are continously deployed. Changes / commits to the master branch will trigger a set of GitHub actions workflows that deploys both the backend and frontend. The deployed client is avaliable [here](https://gov.stocken.okdev.se)

Unit tests in the server are also automatically run via a GitHub actions workflow on commit/merge to master.

