module.exports = {
    getInterests : async (req, res) => {
        const {user_id} = req.params;
        const db = req.app.get('db');
        console.log(req.params)
        console.log(req.session.user)
        console.log(user_id)
        
            if(req.session.user.id === user_id){
                res.status(401).send('No data')
            
            } else {
                let getUserInterests = await db.get_interests({user_id})
                console.log(getUserInterests);
                req.session.user = {...req.session.user, user_interests: getUserInterests}
                res.status(200).send({message: 'you got the information!', userData: req.session.user})
        }
    }
}