# Node-red-Forge-Amgen

This  project is to accompany Comhar Design participation in the POC BIM program for Amgen. It contains requests for Autodesk Forge APIs.


### Overview
[Node-red](https://nodered.org/) is an open source and freely available visual programming environment that makes it easy to chain requests to understand the higher level developer workflows.


### Prerequisites:
1. [Install npm and node.js](https://nodejs.org/en/download/)
2. Install node dependencies

```$npm install```

3. Go to Forge developer account and setup Application. For the purposes of development, it is advised that a demo application is setup in the Forge environment and credentials.
4. Enter FORGE_CLIENT_ID, FORGE_CLIENT_SECRET and FORGE_CALLBACK_URL in `.bl-config.json` file found at the root of this project.
5. Start the server 

```$node index.js```

6. Open "http://localhost:8000 in your favourite browser.
7. Open Authentication tab. Click `step 1` to open comments and to begin testing Forge APIs.

For more information on node-red, please refer to the [project documentation](https://nodered.org/docs/) or resources available on the web.