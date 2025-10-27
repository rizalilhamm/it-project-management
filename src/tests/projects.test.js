const request = require('supertest');
const app = require('../app');
const db = require('../config/db');

let supToken = null;
let supEmail = 'sup-test@example.com';

beforeAll(async () => {
  await db.query('DELETE FROM users WHERE email=$1', [supEmail]);
  await request(app).post('/auth/register').send({ full_name:'Sup Test', email:supEmail, password:'password', role:'supervisor' });
  const login = await request(app).post('/auth/login').send({ email:supEmail, password:'password' });
  supToken = login.body.token;
});

afterAll(async () => {
  await db.query('DELETE FROM users WHERE email=$1', [supEmail]);
  await db.query('DELETE FROM projects WHERE supervisor_id IN (SELECT id FROM users WHERE email=$1)', [supEmail]).catch(()=>{});
  await db.pool.end();
});

test('supervisor creates project', async () => {
  const res = await request(app).post('/projects').set('Authorization','Bearer '+supToken).send({ name:'Proj A', description:'desc' });
  expect(res.statusCode).toBe(201);
  expect(res.body).toHaveProperty('id');
});
