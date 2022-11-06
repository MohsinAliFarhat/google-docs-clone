require('module-alias/register')
require('dotenv').config({path:"config/.env"});

const express       = require('express');
const http          = require('http');
const routes        = require("@routes/index.js");
var   cors          = require('cors')
const app           = express()
const server        = http.createServer(app);
const port          = process.env.PORT || 3000;
const mongoose      = require('mongoose');
var fs              = require('fs')
var morgan          = require('morgan');
var path            = require('path')
var rfs             = require('rotating-file-stream') // version 2.x

var accessLogStream = rfs.createStream('requests.log', {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log')
})

mongoose.connect(`${process.env.DB_CONNECTION_URL}`).then(resp=>console.log(`Connection with MongoDB Successfull!`));
require("./socket").realTimeDocumentCollaboration(server);

app.use(cors())
app.use(express.json());
app.use(morgan('combined', { stream: accessLogStream }))
routes(app);

server.listen(port, () => {
  console.log(`Google Docs listening on port ${port}`)
})