const db = require('../config/db');

async function createSubtask({ name, description, task_id, created_by, assigned_to }) {
  const q = 'INSERT INTO subtasks (name,description,task_id,created_by,assigned_to) VALUES ($1,$2,$3,$4,$5) RETURNING *';
  const r = await db.query(q, [name,description,task_id,created_by,assigned_to]);
  return r.rows[0];
}

async function findById(id) {
  const r = await db.query('SELECT * FROM subtasks WHERE id=$1', [id]);
  return r.rows[0];
}

async function listAll() {
  const r = await db.query('SELECT s.*, u.full_name as created_by_name, a.full_name as assigned_to_name FROM subtasks s JOIN users u ON s.created_by=u.id JOIN users a ON s.assigned_to=a.id');
  return r.rows;
}

async function updateStatus(id, status, updaterId) {
  await db.query('UPDATE subtasks SET status=$1, status_updated_by=$2 WHERE id=$3', [status,updaterId,id]);
  const r = await db.query('SELECT * FROM subtasks WHERE id=$1', [id]);
  return r.rows[0];
}

async function update(id, { name, description, assigned_to }) {
  await db.query('UPDATE subtasks SET name=$1, description=$2, assigned_to=$3 WHERE id=$4', [name,description,assigned_to,id]);
  const r = await db.query('SELECT * FROM subtasks WHERE id=$1', [id]);
  return r.rows[0];
}

async function remove(id) {
  await db.query('DELETE FROM subtasks WHERE id=$1', [id]);
}

module.exports = { createSubtask, findById, listAll, updateStatus, update, remove };
