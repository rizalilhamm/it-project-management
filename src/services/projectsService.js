const projectRepo = require("../repositories/projectsRepository");
const userRepo = require("../repositories/usersRepository");

async function createProject(data) {
  const user = await userRepo.findById(data.supervisor_id);
  if (!user) {
    const error = new Error("supervisor not found");
    error.code = 404;
    throw error;
  }

  if (user.role != "supervisor") {
    const error = new Error("user not allowed to create a new project");
    error.code = 401;
    throw error;
  }

  const prjCreated = await projectRepo.create(data);
  return prjCreated;
}

async function listProject(payload) {
  const projects = await projectRepo.listBySupervisor(payload);
  if (!projects) {
    const error = new Error("no projects found");
    error.code = 404;
    throw error;
  }
  

  return projects;
}

module.exports = { createProject, listProject };
