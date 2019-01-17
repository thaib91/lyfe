module.exports = {
    getGoals: async (req, res) => {
        const db = req.app.get('db');
        // console.log(req.session.user)
        const { id } = req.session.user;
            let getGoals = await db.get_goals({ user_id: id });
            res.status(200).send(getGoals);
        // }
    },

    createGoals: async (req, res) => {
        const db = req.app.get('db');
        const { goalInput } = req.body;
        console.log(req.body);
        console.log(req.session);
        const { id } = req.session.user;
        if (!id) {
            res.status(401).send('Not Logged In')
        } else {
            let createdGoal = await db.create_goals({goal:goalInput, user_id: id});
            res.status(200).send(createdGoal)
        }
    },

    deleteGoal: async (req, res) => {
        const db = req.app.get('db');
        const {goal_id} = req.params;
        const {id} = req.session.user;
        let deleteUserGoals = await db.delete_goals({goal_id, user_id:id});
        res.status(200).send(deleteUserGoals)
    }
}