const handleRegister = (req, res, db, bcrypt) => {

    const { email, password, name } = req.body;

    if (!email || !name || !password) {
        return res.status(400).json('Incorrect Submission')
    }

    else {
        const hash = bcrypt.hashSync(password);

        db.transaction(trx => {
            trx.insert({
                hash: hash,
                email: email
            })
                .into('login')
                .returning('email')
                .then(loginEmail => {
                    return trx('users')
                        .returning('*')
                        .insert({
                            firstname: name,
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