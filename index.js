const express = require("express");
const app = express();
const dotenv = require('dotenv');
const body_parser = require('body-parser');

const mongoos = require('mongoose');
 //Import router
 const authRoute = require('./routes/authentication');


dotenv.config();

// connect to DB
mongoos.connect(process.env.DB_connect,
{ useNewUrlParser: true },
 ()=> console.log('connected to DB'));

//middleware
app.use(express.json());

//Route middleware
app.use('/api/user',authRoute);
// body parser to convert data to json
app.use(body_parser.json());

app.listen(3000 , () => (console.log('server is running')));