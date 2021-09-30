const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
var session = require('express-session')
const bcrypt = require('bcryptjs');
const db = require('./dbconnect')
const verifyToken = require('./verifyToken')
require('dotenv').config()
const fileupload = require("express-fileupload");



// Midleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({secret: 'secret',saveUninitialized: true,resave: false}));
app.use(fileupload());

// API
app.get('/verifyToken',verifyToken,(req, res) => {
    return res.send('OK')
 })

 app.use('/', require('./routes/loginProcess'))
 app.use('/', require('./routes/getDataProcess'))
 app.use('/', require('./routes/addProcess'))
 app.use('/', require('./routes/updateProcess'))
 app.use('/', require('./routes/deleteProcess'))
 app.use('/', require('./routes/userProcess'))
 app.use('/', require('./routes/fileUpload'))
 app.use('/', verifyToken ,require('./routes/userSession'))




app.listen(3001, () =>
    console.log('Server running On http://localhost' + 3001))