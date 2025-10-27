const db = require('../config/db');

async function createTask({ name, description, project_id }) {
  const q = 'INSERT INTO tasks (name,description,project_id) VALUES ($1,$2,$3) RETURNING *';
  const r = await db.query(q, [name,description,project_id]);
  return r.rows[0];
}

async function findById(id) {
  const r = await db.query('SELECT * FROM tasks WHERE id=$1', [id]);
  return r.rows[0];
}

async function listAll() {
  const r = await db.query('SELECT t.*, p.name as project_name FROM tasks t JOIN projects p ON t.project_id=p.id');
  return r.rows;
}

async function update(id, { name, description }) {
  const r = await db.query('UPDATE tasks SET name=$1, description=$2 WHERE id=$3 RETURNING *', [name,description,id]);
  return r.rows[0];
}

async function remove(id) {
  await db.query('DELETE FROM tasks WHERE id=$1', [id]);
}

module.exports = { createTask, findById, listAll, update, remove };
