# Taxplugin for Stocken

# Node server

The node server runs on port 1099
It communicates with the minecraft plugin through an API called /registerTaxableIncome

Startup guide 0. Install nodejs

1. Install dependencies with `npm install`
2. Start the server with `npm start`

# Minecraft plugin

The plugin listens for block breaks of iron, gold, diamond and coal.
It then sends the income to the node server.

Startup guide

0. Install maven
1. Build the plugin with `mvn clean install`
2. Copy the jar file from the target folder to the plugins folder of your minecraft server
3. Start the server
