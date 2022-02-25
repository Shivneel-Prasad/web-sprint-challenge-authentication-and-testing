const router = require('express').Router()
const User = require('./users-model')

router.get('/', (req, res, next) => {
    User.find()
        .then(users => {
            res.json(users)
        })
        .catch(next)
})

module.exports = router