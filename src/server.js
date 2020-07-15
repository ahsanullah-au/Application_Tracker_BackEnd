const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

const bcrypt = require('bcryptjs'); //For Hashing

const fs = require('fs');

//const config = JSON.parse(fs.readFileSync('configDBAhsan.json')); //Not in hosted

const knex = require('knex'); //For DB Access

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL, //Only in local
    ssl: false //Only in Local
    //host: config.host,
    //user: config.user,
    //password: config.password,
    //database: config.database,
  },


});

const rp = require('request-promise');
const HTMLParser = require('node-html-parser');


const register = require('./register');
const signin = require('./signin');

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });


// Following functions are for job applications

const applications = require('./applications');

app.get('/applications/:userID', (req, res) => { applications.handleGetApplications(req, res, db); });

app.post('/applications', (req, res) => { applications.handleAddApplication(req, res, db); });

app.put('/applications', (req, res) => { applications.handleUpdateApplication(req, res, db); });

app.delete('/applications', (req, res) => { applications.handleDeleteApplication(req, res, db); });


const scraper = require('./scraper');

app.post('/scraper', (req, res) => { scraper.handleScraper(req, res, rp, HTMLParser); });


// Following functions are for documents: 

// Getting presigned URL to upload to AWS S3 and deletion from S3

const docStorage = require('./docStorage');

app.post('/docStorage', (req, res) => { docStorage.handleAWSDocAddition(req, res); });

app.delete('/docStorage', (req, res) => { docStorage.handleAWSDocDeletion(req, res); });

//Storing,Deleting the record in DB and access to the records

const docAccess = require('./docAccess');

app.get('/docAccess/:userID', (req, res) => { docAccess.handleGetDocs(req, res, db); });

app.post('/docAccess', (req, res) => { docAccess.handleAddDoc(req, res, db); });

app.put('/docAccess', (req, res) => { docAccess.handleUpdateDoc(req, res, db); });

app.delete('/docAccess', (req, res) => { docAccess.handleDeleteDoc(req, res, db); });

app.get('/docLink/:appID', (req, res) => { docAccess.handleGetLinkedDocs(req, res, db); });

app.put('/docLink', (req, res) => { docAccess.handleUpdateLinkDoc(req, res, db); });

app.get('/', (req, res) => {res.send('App is running')})



app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT||3001}`);
});
