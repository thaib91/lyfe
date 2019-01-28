module.exports = {
    getSkills: async (req, res) => {
        const db = req.app.get('db');
        // const {id} = req.session.user;
        let getSkills = await db.get_skills();
        res.status(200).send(getSkills);
    },
    getMySkills: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        if (!id) {
            res.status(401).send('Please Log In!')
        } else {
            let getMySkills = await db.get_my_posts({ user_id: id });
            res.status(200).send(getMySkills)
        }
    },
    createSkills: async (req, res) => {
        const db = req.app.get('db');
        const { id } = req.session.user;
        const { skills_posts, years, description, img } = req.body;
        if (!id) {
            res.status(401).send('Please Sign Up or Log In')
        } else {
            let createSkills = await db.create_skills({
                user_id: id,
                skills_posts,
                years,
                description,
                img
            });
           res.status(200).send(createSkills);
        }
        this.getSkills();
    },
    deleteSkills: async (req, res) => {
        const db = req.app.get('db');
        const { skills_id } = req.params;
        const { id } = req.session.user;
        if (!id) {
            res.status(401).send('Please Sign Up or Log In')
        } else {
            let deleteMySkills = await db.delete_my_skills({ skills_id, user_id: id });
            res.status(200).send(deleteMySkills)
        }
    },
    updateSkills: async (req,res) => {
        const db = req.app.get('db');
        const{skills_id} = req.params;
        const {skills_posts, years, description, img} = req.body.body;
        const {id} = req.session.user;
        console.log(req.body);
        console.log(req.session);
        console.log(req.params);
        if(!id){
            res.status(401).send('Please Sign Up or Log In');
        } else {
            let updateMySkills = await db.update_skills({
                user_id: id,
                skills_posts,
                years,
                description,
                img,
                skills_id
            });
        return res.status(200).send(updateMySkills)
        }
    }
}