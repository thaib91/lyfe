const bcrypt = require('bcryptjs');
require('dotenv').config();


module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const registerUser = await db.find_user({ email })
        if (registerUser[0]) {
            return res.status(200).send({ message: 'Username is taken' })
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.create_user({ email, hash })
        req.session.user = { id: newUser[0].id, email: newUser[0].email }
        res.status(200).send({ message: 'Registered', userData: req.session.user, loggedIn: true })
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const db = req.app.get('db');
        const user = await db.find_user({ email });
        if (!user[0]) {
            return res.status(200).send({ message: 'Username Not Found' })
        }
        let foundUser = bcrypt.compareSync(password, user[0].hash)
        if (!foundUser) {
            res.status(401).send({ message: 'Password Incorrect' });
        }
        req.session.user = { id: user[0].id, email: user[0].email };
        res.status(200).send({ message: 'LoggedIn', userData: req.session.user, loggedIn: true });
    },
    logout: (req, res) => { 
        req.session.destroy();
        res.redirect(process.env.LYFE_LOGOUT)
    }
}