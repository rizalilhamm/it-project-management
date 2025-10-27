const tasksRepo = require('../repositories/tasksRepository');
const projectsRepo = require('../repositories/projectsRepository');

async function createTask({ name, description, project_id, supervisor_id }) {
  const project = await projectsRepo.findById(project_id);
  if (!project) throw { status:400, message:'project not found' };
  if (project.supervisor_id !== supervisor_id) throw { status:403, message:'not owner' };
  return tasksRepo.createTask({ name, description, project_id });
}

async function listTasks() {
  return tasksRepo.listAll();
}

async function getTask(id) {
  return tasksRepo.findById(id);
}

async function updateTask(id, data, supervisor_id) {
  const r0 = await tasksRepo.findById(id);
  if (!r0) throw { status:404, message:'not found' };
  const project = await projectsRepo.findById(r0.project_id);
  if (project.supervisor_id !== supervisor_id) throw { status:403, message:'not owner' };
  return tasksRepo.update(id, data);
}

async function deleteTask(id, supervisor_id) {
  const r0 = await tasksRepo.findById(id);
  if (!r0) throw { status:404, message:'not found' };
  const project = await projectsRepo.findById(r0.project_id);
  if (project.supervisor_id !== supervisor_id) throw { status:403, message:'not owner' };
  return tasksRepo.remove(id);
}

module.exports = { createTask, listTasks, getTask, updateTask, deleteTask };
