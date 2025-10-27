const db = require('../config/db');

async function createProject({ name, description, supervisor_id }) {
  const q = 'INSERT INTO projects (name,description,supervisor_id) VALUES ($1,$2,$3) RETURNING *';
  const r = await db.query(q, [name,description,supervisor_id]);
  return r.rows[0];
}

async function findById(id) {
  const r = await db.query('SELECT * FROM projects WHERE id=$1', [id]);
  return r.rows[0];
}

async function listAll() {
  const r = await db.query('SELECT p.*, u.full_name as supervisor_name FROM projects p JOIN users u ON p.supervisor_id=u.id');
  return r.rows;
}

async function update(id, { name, description }) {
  const r = await db.query('UPDATE projects SET name=$1, description=$2 WHERE id=$3 RETURNING *', [name,description,id]);
  return r.rows[0];
}

async function remove(id) {
  await db.query('DELETE FROM projects WHERE id=$1', [id]);
  return;
}

module.exports = { createProject, findById, listAll, update, remove };
