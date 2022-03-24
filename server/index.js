const express = require('express')
const cors = require("cors")
const app = express()
const bodyParser = require('body-parser')

const mysql = require('mysql')

const db = mysql.createPool({
    host: 'localhost',
    user:'root',
    password:'password',
    database:'db_students'
});

app.use(cors({credentials: true, origin: true}));
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.listen(3001, () =>{
    console.log("Running on Port 3001")
});