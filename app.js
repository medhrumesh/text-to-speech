const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const routesA = require("./routes/index.route");

const cors = require("cors")
//env
const dotenv = require('dotenv')
dotenv.config();

//body-parser
app.use(cors())
app.use(bodyParser.urlencoded( { extended: false }));
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));  

// app.use(express.json());
// test
//ejs
app.set("view engine", "ejs");
app.set('views', path.join(__dirname , 'views'))

//call index.route.js for all apis
app.use("/", routesA);

//for using js and css as static
// app.use(express.static(path.resolve('./public')));
app.use(express.static(path.join(__dirname + '/public')));



mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connection...')
})

app.use(express.json())


app.listen(process.env.port, () => {
    console.log('server is running : ' + process.env.port);
})

// divsion:req.body.divsion,
// ZSM:req.body.ZSM,
// RM:req.body.RM,
// TM:req.body.TM,
// HQ:req.body.HQ,
// language: req.body.language,
// Doctorname: req.body.Doctorname,
// hospitalname: req.body.hospitalname,
// hospitaladdress: req.body.hospitaladdress,
// city: req.body.city,
