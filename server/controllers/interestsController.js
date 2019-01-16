module.exports = {
    getInterests: async (req, res) => {
        const { user_id } = req.params;
        const db = req.app.get('db');
        if (req.session.user.id === user_id) {
            res.status(401).send('No data')
        } else {
            let getUserInterests = await db.get_interests({ user_id })
            console.log(getUserInterests)
            res.status(200).send(getUserInterests)
        }
    },
    createInterests: async (req, res) => {
        const db = req.app.get('db');
        const { userInput } = req.body;
        const { id } = req.session.user;
        let createdInterest = await db.create_interests({user_interests:userInput, user_id:id});
        return res.status(200).send(createdInterest)
    }
}