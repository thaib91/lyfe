
const express = require('express');
require('dotenv').config();
const { SERVER_PORT, CONNECTION_PORT, SECRET, NODE_ENV} = process.env;
const massive = require('massive');
const session = require('express-session');
const socket = require('socket.io');


//controllers
const lc = require('./controllers/loginController');
const uc = require('./controllers/userController');
const ic = require('./controllers/interestsController');
const gc = require('./controllers/goalController');
const sc = require('./controllers/skillsController');
const mc = require('./controllers/messengerController');
const rc = require('./Recommend/recommendController')
//middleware to make sure user is logged in before they can create posts
const authMiddle = require('./middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: false
}))

// brain.js recommend engine
app.get('/recommend', rc.recommendCategory)
app.get('/brain', rc.getBrain)
app.get('/body', rc.getBody)


const io = socket(app.listen(SERVER_PORT, ()=>console.log(`Sockets listening on port ${SERVER_PORT}`)))

//Sockets Serverside implementation for global chatroom using Socket.io

io.on('connection', socket =>{
    console.log('socket connected')
    socket.on('emit message to general', data =>{
        console.log('general socket hit: emit')
        socket.emit('generate general response', data)
    })
    socket.on('broadcast message to general', data => {
        console.log('general socket hit: broadcast', data)
        socket.broadcast.emit('generate general response', data);
    });
    socket.on('blast message to general', data => {
        console.log(data)
        console.log('general socket hit: blast')
        io.sockets.emit('generate general response', data)
    });

    //userTyping Notification
    socket.on('user is typing', data => {
        // console.log(data)
        socket.broadcast.emit('user is typing', data)
    })
    socket.on('user not typing', data => {
        socket.broadcast.emit('user is not typing', data)
    })
})



// DEVELOPMENT USER
app.use(async (req,res,next)=>{
    if(NODE_ENV === 'development'){
        const db = req.app.get('db')
        const userData = await db.set_data()
        req.session.user = userData[0]
        next()
    }else{
        next()
    }
})

//TWILIO

// app.post('/sms', mc.respondText)
app.get('/sms', mc.getText)
app.get('/email', mc.getEmail)


//TWILIO SERVER ON 1337 to link send/receive
// http.createServer(app).listen(1337, () => {
//     console.log('Express server listening on port 1337');
// });



//endpoints for login/registration
app.post('/auth/register', lc.register);
app.post('/auth/login', lc.login);
app.get('/auth/logout', lc.logout);

//endpoint to get data from redux //user controller
app.get('/api/user/data', authMiddle.usersOnly, uc.userData);

//get interests based on session id of user//interestsController

app.get('/api/user/my_interests/:user_id', authMiddle.usersOnly, ic.getInterests);
app.post('/api/user/interests/', authMiddle.usersOnly, ic.createInterests);
app.delete('/api/user/delete/:interests_id', authMiddle.usersOnly, ic.deleteInterests);
app.put('/api/user/update_interests/:interests_id', authMiddle.usersOnly, ic.updateInterests);

//get goals // goalController
app.get('/api/user/get_goals', gc.getGoals);
app.post('/api/user/goals', gc.createGoals);
app.delete('/api/user/deleteGoals/:goal_id', gc.deleteGoal);
app.put('/api/user/updateGoal/:goal_id', gc.updateGoal);

//getSkills // skillsController
app.get('/api/get_skills', sc.getSkills);
app.get('/api/get_my_skills', sc.getMySkills);
app.post('/api/create_skills', sc.createSkills);
app.delete('/api/delete_skills/:skills_id', sc.deleteSkills)
app.put('/api/update_skills/:skills_id', sc.updateSkills)


massive(CONNECTION_PORT).then(connection => {
    app.set('db', connection)
    // app.listen(SERVER_PORT, () => {
    //     console.log(`The Personal Project is over ${SERVER_PORT} hours!`)
    // }) //not necessary, only for develper use. 
}).catch(err => console.log(err))

