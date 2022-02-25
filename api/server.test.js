const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(true).toBe(true)
})

test('environment', () => {
expect(process.env.NODE_ENV).toBe('testing')})

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
afterAll(async () => {
  await db.destroy()
})

beforeEach(async () => {
  await request(server).post('/api/auth/register')
    .send({
      username: "user",
      password: "key"
    })
})

describe('[POST] /register', () => {  
  test('creates a new user onto the database', async () => {
    const users = await db('users')
    expect(users).toHaveLength(1)
  })
  test('responds with a newly created user', async () => {
    const users = await db('users')
    expect(users[0].username).toEqual('user')
  })
})

describe('[POST] /login', () => {
  test('responds with error when no username', async () => {
      const res = await request(server).post('/login').send({
        username: '', 
        password: 'foobar'
      })
      expect(res.status).toBe(404)
  })
  test('responds with error when no password', async () => {
    const res = await request(server).post('/login').send({
      username: 'Captain Marvel', 
      password: ''
    })
    expect(res.status).toBe(404)
})
  
})