const usersRepo = require('../repositories/usersRepository');

async function me(req, res) {
  const u = await usersRepo.findById(req.user.id);
  res.json(u);
}

async function list(req, res) {
  const all = await usersRepo.listAll();
  res.json(all);
}

async function get(req, res) {
  const u = await usersRepo.findById(req.params.id);
  if (!u) return res.status(404).json({ error:'not found' });
  res.json(u);
}

module.exports = { me, list, get };
