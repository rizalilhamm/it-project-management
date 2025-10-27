const projectsRepo = require('../repositories/projectsRepository');

async function createProject({ name, description, supervisor_id }) {
  return projectsRepo.createProject({ name, description, supervisor_id });
}

async function listProjects() {
  return projectsRepo.listAll();
}

async function getProject(id) {
  return projectsRepo.findById(id);
}

async function updateProject(id, data) {
  return projectsRepo.update(id, data);
}

async function deleteProject(id) {
  return projectsRepo.remove(id);
}

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
