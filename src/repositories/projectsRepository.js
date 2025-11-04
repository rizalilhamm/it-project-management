const db = require('../config/db');

async function create({ name, description, supervisor_id }) {
  const q = 'INSERT INTO projects (name, description, supervisor_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await db.query(q, [name, description, supervisor_id, Date.now(), Date.now()]);
  return result[0];
}

async function listBySupervisor({ supervisor_id }) {
  const q = 'SELECT * FROM projects WHERE supervisor_id = $1';
  const result = await db.query(q, [supervisor_id]);
  return result;
}

module.exports = { create, listBySupervisor }