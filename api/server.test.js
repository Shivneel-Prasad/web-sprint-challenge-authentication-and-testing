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

