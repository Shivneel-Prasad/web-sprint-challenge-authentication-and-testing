const UM = require('../users/users-model')

const checkPayload = async (req, res, next) => {
    try {
        const { username, password } = req.body
        if(!username || !password) {
            res.status(404).json({
                status: 404,
                message: 'Username & Password is required'
            })
        } else {
            req.username = username
            req.password = password
            next()
        }
    } catch (err) {
        next(err)
    }
}

const usernameExists = async (req, res, next) => {
    try {
        const { username } = req.body
        const exists = await UM.findBy({ username })
          if (exists[0]) {
            res.status(422).json({
                status: 422,
                message: 'Username already exists'
            })
          } else {
              next()
          }
    } catch (err) {
        next(err)
    }
}

const validateLogin = async (req, res, next) => {
    try {
        const user = await UM.findByUsername(req.body.username)
        const password = await UM.validatePassword(req.body.password)
        if(!user || !password) {
            res.status(400).json({
                status: 400,
                message: 'Invalid Credentials'
            }) 
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkPayload,
    usernameExists,
    validateLogin,    
}