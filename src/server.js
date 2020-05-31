const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

const cors = require('cors');

app.use(cors());

const bcrypt = require('bcryptjs');

const fs = require('fs');

const config = JSON.parse(fs.readFileSync('configDBAhsan.json'));

const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
  },


});

const rp = require('request-promise');
const HTMLParser = require('node-html-parser');


const register = require('./register');
const signin = require('./signin');
const applications = require('./applications');

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt); });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });


// Following functions are for job applications

app.get('/applications/:userID', (req, res) => { applications.handleGetApplications(req, res, db); });

app.post('/applications', (req, res) => { applications.handleAddApplication(req, res, db); });

app.put('/applications', (req, res) => { applications.handleUpdateApplication(req, res, db); });

app.delete('/applications', (req, res) => { applications.handleDeleteApplication(req, res, db); });


const scraper = require('./scraper');


app.post('/scraper', (req, res) => { scraper.handleScraper(req, res, rp, fs, HTMLParser); });


app.listen(3001, () => {
  console.log('app is running on port 3001');
});
