const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const signHandler = require('./controllers/signin');
const registerHandler = require('./controllers/register');
const profileHandler = require('./controllers/profile');
const image = require('./controllers/imageEntry');


const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'arrow2000',
      database : 'smart_brain'
    }
  });
 

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send(database.users);
});
app.post('/signin', (req, res) => signHandler(req, res, db, bcrypt));
app.post('/register', (req, res) => registerHandler(req, res, db, bcrypt));
app.get('/profile/:id', (req, res) => profileHandler(req, res, db));
app.put('/image', (req, res) => image.entryHandler(req, res, db));
app.post('/imageurl', (req, res) => image.handleAPICall(req, res));

app.listen(3000, () => {
    console.log('server is running');
});