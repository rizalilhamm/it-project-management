const subtasksRepo = require('../repositories/subtasksRepository');
const tasksRepo = require('../repositories/tasksRepository');
const usersRepo = require('../repositories/usersRepository');
const projectsRepo = require('../repositories/projectsRepository');

async function createSubtask({ name, description, task_id, created_by, assigned_to }) {
  const task = await tasksRepo.findById(task_id);
  if (!task) throw { status:400, message:'task not found' };
  const user = await usersRepo.findById(assigned_to);
  if (!user || user.role !== 'staff') throw { status:400, message:'assigned_to must be staff' };
  return subtasksRepo.createSubtask({ name, description, task_id, created_by, assigned_to });
}

async function listSubtasks() {
  return subtasksRepo.listAll();
}

async function updateStatus(id, status, updaterId) {
  return subtasksRepo.updateStatus(id, status, updaterId);
}

async function updateSubtask(id, data, userId) {
  const s = await subtasksRepo.findById(id);
  if (!s) throw { status:404, message:'not found' };
  const t = await tasksRepo.findById(s.task_id);
  const p = await projectsRepo.findById(t.project_id);
  if (s.created_by !== userId && p.supervisor_id !== userId) throw { status:403, message:'not owner' };
  return subtasksRepo.update(id, data);
}

async function deleteSubtask(id, userId) {
  const s = await subtasksRepo.findById(id);
  if (!s) throw { status:404, message:'not found' };
  const t = await tasksRepo.findById(s.task_id);
  const p = await projectsRepo.findById(t.project_id);
  if (s.created_by !== userId && p.supervisor_id !== userId) throw { status:403, message:'not owner' };
  return subtasksRepo.remove(id);
}

module.exports = { createSubtask, listSubtasks, updateStatus, updateSubtask, deleteSubtask };
