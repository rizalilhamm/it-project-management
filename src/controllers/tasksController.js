const tasksService = require('../services/tasksService');

async function create(req, res) {
  try {
    const { name, description, project_id } = req.body;
    if (!name || !project_id) return res.status(400).json({ error:'missing fields' });
    const t = await tasksService.createTask({ name, description, project_id, supervisor_id: req.user.id });
    res.status(201).json(t);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function list(req, res) {
  const arr = await tasksService.listTasks();
  res.json(arr);
}

async function get(req, res) {
  const t = await tasksService.getTask(req.params.id);
  if (!t) return res.status(404).json({ error:'not found' });
  res.json(t);
}

async function update(req, res) {
  try {
    const updated = await tasksService.updateTask(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function remove(req, res) {
  try {
    await tasksService.deleteTask(req.params.id, req.user.id);
    res.json({ ok:true });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

module.exports = { create, list, get, update, remove };
