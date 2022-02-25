const db = require('../../data/dbConfig')

function find() {
    return db('users')
}
function findBy(filter) {
    return db('users')
        .select('id', 'username', 'password')
        .where(filter)
}
function findById(id) {
    return db('users')
        .select('id','username','password')
        .where('id', id)
        .first()
}
async function add({ username, password }) {
    const [id] = await db('users').insert({ username, password })
        return findById(id)
}
function findByUsername(username) {
    return db('users')
        .where('username', username)
}
function validatePassword(password) {
    return db('users')
        .where('password', password)
}

module.exports = {
    add,
    find,
    findBy,
    findById,
    findByUsername,
    validatePassword,
}