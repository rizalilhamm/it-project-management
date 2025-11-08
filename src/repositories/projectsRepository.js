const db = require('../config/db');

async function create({ name, description, supervisor_id }) {
  
  const now = new Date().toISOString();
  const q = 'INSERT INTO projects (name, description, supervisor_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const result = await db.query(q, [name, description, supervisor_id, now, now]);
  return result;
}

async function listBySupervisor({ supervisor_id, order_by = 'ASC' }) {
  let q = `SELECT * FROM projects WHERE supervisor_id = ${supervisor_id}`;
  if (order_by) {
    q += ` ORDER BY id ${order_by}`;
  }
  const result = await db.query(q);
  return result;
}

async function findById(project_id) {
  const q = `SELECT * FROM projects WHERE id = ${project_id}`;
  const result = await db.query(q);
  return result[0];
}

module.exports = { create, listBySupervisor, findById }