const express = require('express');
const body_parser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
mongoose.Promise=global.Promise;
let User = require("./models/user");
const route = require("./routes");


const db=mongoose.connection;
db.on('error',console.error);
db.once('open',()=>{
  console.log('DB connection good.');
})

mongoose.connect("mongodb://localhost:27017/test",{useMongoClient: true});
/*app.use(body_parser.json());*/

let users = [
  {
    id: 1,
    name: 'alice'
  },
  {
    id: 2,
    name: 'bek'
  },
  {
    id: 3,
    name: 'chris'
  }
]


app.use(route);
app.listen(80, () => {
  console.log('Example app listening on port 3000!');
});
