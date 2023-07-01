const express = require('express');
const next = require('next');
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cors = require("cors");
const path = require('path');
const connectToMongodb = require('./src/db/mongodb');
dotenv.config({ path: "./.env" });
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
app.prepare().then(() => {
  const server = express();
  server.use(morgan('dev'))
  server.use(express.json());
  server.use(cors());
  server.use(bodyParser.json());
  server.use(express.static(path.join(__dirname, 'public')))
  connectToMongodb();
  server.all('*', (req,res) => {
    return handle(req, res);
  });
  server.listen(process.env.PORT, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:'+process.env.PORT);
  });
});
