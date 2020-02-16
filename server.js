const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register.js');
const signIn = require('./controllers/signIn.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

console.log(db.select('*').from('users'));

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', signIn.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(3000, () => {
    console.log('app is running on port 3000');
})