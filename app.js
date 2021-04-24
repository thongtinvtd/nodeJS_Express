const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors  = require('cors');
const path = require('path');
const Model = require('./models/models');

require('dotenv/config');

//Middleware
app.use(express.json());
// app.use(bodyParser.json());
app.use(cors());
const postRoute = require('./routes/post')
app.use('/post',postRoute);
app.use(express.static(__dirname+'/web'))
app.use('/chess',(req,res) => {
    res.sendFile(__dirname+'/web/chess.html'); 
})
//app.get()
//app.post()
//app.patch()
//app.delete()
app.get('/',(req,res) => {
    res.sendFile(__dirname+'/web/index.html');
 });
 app.get('/info',(req,res) => {
    res.sendFile(__dirname+'/web/info.html');
 });


//Connect to DB --DB_CONNECTION = 'mongodb://127.0.0.1:27017/testDB'
// DB_CONNECTION = "mongodb+srv://thongtinvtd:Trung123@cluster0.dzqtx.mongodb.net/testDB?retryWrites=true&w=majority"

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true,useUnifiedTopology: true },() => {
    console.log('Connected to DB')
})



//start   server listens
app.listen(5000);