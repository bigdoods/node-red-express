const http = require('http')
const path = require('path')

const express = require('express')
const RED = require('node-red')

const app = express()
const server = http.createServer(app)

const moment = require("moment")

const settings = {
  httpAdminRoot: '/',
  httpNodeRoot: '/', // /api
  userDir: './',
  flowFile: 'flows.json',
  apiMaxLength: '50mb',
  editorTheme: {
    page: {
      css: path.join(__dirname, "/ui-styles/midnight.css"),
      scripts: path.join(__dirname, "/ui-styles/theme-tomorrow.js")
    },
    palette: {
        editable: false
    }
  },
  functionGlobalContext: { // enables global context      

    "testValue": "exampleString",

    "testPackage": moment

  }
}

function startNR(settings) {
  console.log(`[INFO] Global settings for Node-Red: ${JSON.stringify(settings.functionGlobalContext)}`)
  const port = 8000

  RED.init(server, settings)

  app.use(settings.httpAdminRoot, RED.httpAdmin)

  app.use(settings.httpNodeRoot, RED.httpNode)

  server.listen(port)

  RED.start()
}

startNR(settings)