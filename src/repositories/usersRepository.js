const db = require('../config/db');

async function createUser({ full_name, email, password, role }) {
  const query = `
    INSERT INTO users (full_name, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, full_name, email, role, created_at
  `;

  const result = await db.query(query, [full_name, email, password, role]);

  return result[0]
}

async function findByEmail(email) {
  const result = await db.query('SELECT * FROM users WHERE email=$1 limit 1', [email]);
  return result[0]
}

async function findById(id) {
  const r = await db.query('SELECT id,full_name,email,role,created_at FROM users WHERE id=$1', [id]);
  return r.rows[0];
}

async function listAll() {
  const r = await db.query('SELECT id,full_name,email,role,created_at FROM users');
  return r.rows;
}

module.exports = { createUser, findByEmail, findById, listAll };
