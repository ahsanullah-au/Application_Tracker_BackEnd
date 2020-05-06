const handleRegister = (req, res, db, bcrypt) => {

    
    if (!req.body.email || !req.body.lastname || !req.body.firstname || !req.body.password) {
        return res.status(400).json('Missing Info')
    }

    else {
        const hash = bcrypt.hashSync(req.body.password);

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: req.body.email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            email: loginEmail[0]
                        }).then(response => {
                            res.json(response[0])
                        }).catch(err => res.status(400).json("Unable to register"))
                })
                .then(trx.commit)
                .catch(trx.rollback)
        })
        .catch(err => res.status(400).json("Unable to register"))
    }

}

module.exports = {
    handleRegister: handleRegister
}