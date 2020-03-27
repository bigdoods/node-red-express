const http = require('http')
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