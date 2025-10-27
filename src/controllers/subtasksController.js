const subtasksService = require('../services/subtasksService');

async function create(req, res) {
  try {
    const { name, description, task_id, assigned_to } = req.body;
    if (!name || !task_id || !assigned_to) return res.status(400).json({ error:'missing fields' });
    const s = await subtasksService.createSubtask({ name, description, task_id, created_by: req.user.id, assigned_to });
    res.status(201).json(s);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function list(req, res) {
  const arr = await subtasksService.listSubtasks();
  res.json(arr);
}

async function get(req, res) {
  const s = await subtasksService.listSubtasks(req.params.id);
  res.json(s);
}

async function updateStatus(req, res) {
  try {
    const updated = await subtasksService.updateStatus(req.params.id, req.body.status, req.user.id);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function update(req, res) {
  try {
    const updated = await subtasksService.updateSubtask(req.params.id, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function remove(req, res) {
  try {
    await subtasksService.deleteSubtask(req.params.id, req.user.id);
    res.json({ ok:true });
  } catch (err) {
    if (err.status) return res.status(err.status).json({ error: err.message });
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

module.exports = { create, list, get, updateStatus, update, remove };
