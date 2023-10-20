const express = require('express');
const app = express();
const port=5000
const dbconnect = require('./config/mongodb')
// const sdk= require('./sdk')

const cors = require('cors');
dbconnect()
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const corsOptions = {
    origin: '*',
  };
 
  app.use(cors(corsOptions));
  app.use('/api',require('./routes/allrotes'))

app.use('/sdk',require('./sdk'))



app.listen(port)