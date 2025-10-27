const db = require('../config/db');

async function create({ name, description, supervisor_id }) {
  const q = 'INSERT INTO projects (name,description,supervisor_id) VALUES ($1,$2,$3) RETURNING *';
  const r = await db.query(q, [name,description,supervisor_id]);
  return r.rows[0];
}

module.exports = { create }