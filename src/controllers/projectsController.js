const projectsService = require('../services/projectsService');

async function create(req, res) {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ error:'missing name' });
  const p = await projectsService.createProject({ name, description, supervisor_id: req.user.id });
  res.status(201).json(p);
}

async function list(req, res) {
  const arr = await projectsService.listProjects();
  res.json(arr);
}

async function get(req, res) {
  const p = await projectsService.getProject(req.params.id);
  if (!p) return res.status(404).json({ error:'not found' });
  res.json(p);
}

async function update(req, res) {
  try {
    const p = await projectsService.getProject(req.params.id);
    if (!p) return res.status(404).json({ error:'not found' });
    if (p.supervisor_id !== req.user.id) return res.status(403).json({ error:'not owner' });
    const updated = await projectsService.updateProject(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error:'server error' });
  }
}

async function remove(req, res) {
  const p = await projectsService.getProject(req.params.id);
  if (!p) return res.status(404).json({ error:'not found' });
  if (p.supervisor_id !== req.user.id) return res.status(403).json({ error:'not owner' });
  await projectsService.deleteProject(req.params.id);
  res.json({ ok:true });
}

module.exports = { create, list, get, update, remove };
