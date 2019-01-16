const express = require('express');
require('dotenv').config();
const massive = require('massive');
const session = require('express-session');
const {SERVER_PORT, CONNECTION_PORT, SECRET} = process.env;

//controllers
const lc = require('./controllers/loginController');
const uc = require('./controllers/userController');
const ic = require('./controllers/interestsController');

//middleware to make sure user is logged in before they can create posts
const authMiddle = require('./middleware/authMiddleware')

const app = express();
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

//endpoints for login/registration
app.post('/auth/register', lc.register);
app.post('/auth/login', lc.login);
app.get('/auth/logout', lc.logout);

//endpoint to get data from redux //user controller
app.get('/api/user/data', uc.userData);

//get interests based on session id of user

app.get('/api/user/my_interests/:user_id', ic.getInterests);
app.post('/api/user/interests/', ic.createInterests)





massive(CONNECTION_PORT).then(connection => {
    app.set('db', connection)
    app.listen(SERVER_PORT, ()=>{
        console.log(`The Personal Project is over ${SERVER_PORT} hours!`)
    })
}).catch(err => console.log(err))