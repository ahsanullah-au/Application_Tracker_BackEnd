//Handles registering of users
//Hashes password and stores in DB
//Uses transaction to ensure both user and login info are stored in respective tables

const handleRegister = (req, res, db, bcrypt) => {
  if (!req.body.email || !req.body.lastname || !req.body.firstname || !req.body.password) {
    return res.status(400).json('Missing Info');
  }


  const hash = bcrypt.hashSync(req.body.password);

  db.transaction((trx) => {
    trx.insert({
      hash,
      email: req.body.email,
    })
      .into('login')
      .returning('email')
      .then((loginEmail) => trx('users')
        .returning('*')
        .insert({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: loginEmail[0],
        }).then((response) => {
          res.json(response[0]);
        })
        .catch((err) => res.status(400).json('Unable to register')))
      .then(trx.commit)
      .catch(trx.rollback);
  })
    .catch((err) => res.status(400).json('Unable to register'));
};

module.exports = {
  handleRegister,
};
