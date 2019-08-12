const http = require('http')
const express = require('express')
const RED = require('node-red')

const testEnvs = require('./.bl-config.json')

const app = express()
const server = http.createServer(app)

function getSettings(envs){
  return {
    httpAdminRoot: '/',
    httpNodeRoot: '/', // /api
    userDir: './',
    flowFile: 'flows.json',
    apiMaxLength: '50mb', 
    functionGlobalContext: { // enables global context

      // Spread operator used as shorthand for including Vars from bl-config file
      ...envs.env
      
    }
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

const settings = getSettings(testEnvs)

startNR(settings)