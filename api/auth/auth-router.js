const router = require('express').Router();
const bcrypt = require('bcrypt')
const Model = require('../users/users-model')
const { BCRYPT_ROUNDS } = require('../../config')
const tokenCreator = require('./tokenCreator')
const { checkPayload, usernameExists } = require('./auth-middleware')

router.post('/register', usernameExists, checkPayload, (req, res, next) => {
  // res.end('implement register, please!');
  const { username, password } = req.body
      const hash = bcrypt.hashSync(password, BCRYPT_ROUNDS);
        Model.add({ username, password: hash })
        .then(newUser => {
          res.status(201).json(newUser)
        })
        .catch(next)
});

router.post('/login', (req, res, next) => {
  // res.end('implement login, please!');
    const { username, password } = req.body
    Model.findByUsername(username)
      .then(([user]) => {
        if(user && bcrypt.compareSync(password, user.password)) {
          const token = tokenCreator(user)
          res.status(200).json({
            status: 200,
            message: `Welcome back, ${username}`, token
          })
        } else {
          res.status(401).json({
            status: 401,
            message: 'Invalid Credentials'
          })
        }
      })
      .catch(next)
});

module.exports = router;
