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

See instructions in plugin\README.md

There is a test minecraft server in `mc-test-server`. When building the plugin, it will be copied to the plugins folder of the test server.
Note: The minecraft server runs on port 25566
