const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

describe('Auth', () => {
  const email = 'testuser@example.com';
  afterAll(async () => {
    await db.query('DELETE FROM users WHERE email=$1', [email]);
    await db.pool.end();
  });
  test('register and login', async () => {
    await db.query('DELETE FROM users WHERE email=$1', [email]);
    const reg = await request(app).post('/auth/register').send({ full_name:'Test User', email, password:'password', role:'staff' });
    expect(reg.statusCode).toBe(201);
    const login = await request(app).post('/auth/login').send({ email, password:'password' });
    expect(login.statusCode).toBe(200);
    expect(login.body).toHaveProperty('token');
  });
});
