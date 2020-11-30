const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const resRoutes = require('./Routes/Restaurant');
const hostname = "localhost";
const port = 5000;
const app = express();
const env = require("dotenv");
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

env.config();



app.use('/api',resRoutes);
mongoose.connect('mongodb://chelsea:chelsea123@cluster0-shard-00-00.ls8m5.mongodb.net:27017,cluster0-shard-00-01.ls8m5.mongodb.net:27017,cluster0-shard-00-02.ls8m5.mongodb.net:27017/testdb?ssl=true&replicaSet=atlas-x56avb-shard-0&authSource=admin&retryWrites=true&w=majority',
{ useNewUrlParser:true, useUnifiedTopology:true})
.then(client=>{
console.log('Connected');
app.listen(port,hostname, () => {
    console.log(`Server Running at http://${hostname}:${port}/`)
});
}).catch(err=> {
    console.log(err);
})

