const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const {SERVER_PORT, CONNECTION_PORT, SECRET} = process.env;
const lc = require('./controllers/loginController')

const app = express();
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

app.post('/auth/register', lc.register)
app.post('/auth/login', lc.login)



massive(CONNECTION_PORT).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, ()=>{
        console.log(`The Personal Project is over ${SERVER_PORT} hours!`)
    })
}).catch(err => console.log(err))