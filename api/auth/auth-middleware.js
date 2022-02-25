const UM = require('../users/users-model')

const checkPayload = async (req, res, next) => {
    try {
        if(!req.body.username || !req.body.password) {
            res.status(401).json({
                status: 401,
                message: 'Username & Password is required'
            })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const usernameExists = async (req, res, next) => {
    try {
        const { username } = req.body
        const exists = await UM.findBy({ username: username })
          if (exists[0]) {
            res.status(422).json({
                status: 422,
                message: 'Username already exists in the database'
            })
          } else {
              next()
          }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    usernameExists,    
}