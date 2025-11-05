const projectsService = require("../services/projectsService");
const logger = require("../utils/logger");

async function create(req, res) {
  try {
    const { name, description, supervisor_id } = req.body;

    if (!name || !description || !supervisor_id) {
      return res
        .status(400)
        .json({ error: "name, description and supervisor_id requireds" });
    }
    const createdProject = await projectsService.createProject({
      name: name,
      description: description,
      supervisor_id: supervisor_id,
    });

    if (!createdProject) {
      return res.status(400).json({ error: "project not created" });
    }

    res.status(201).json(createdProject);
  } catch (error) {
    if (error.status == 500) {
      logger.error(
        `Error in createProject for name: ${req.body.name}. Details: ${error.message}`,
        { stack: error.stack[0] },
      );
    }
    res
      .status(error.status)
      .json({ error: error.message, status: error.status });
  }
}
//
async function listBySupervisor(req, res) {
  try {
    const supervisor_id = req.params.supervisorId;
    let order_by = req.query.order_by;
    const projects = await projectsService.listProject({
      supervisor_id,
      order_by,
    });
    if (!projects) {
      const error = new Error("no projects found");
      error.status = 404;
      return res
        .status(404)
        .json({ error: error.message, status: error.status });
    }

    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res
      .status(error.status)
      .json({ error: error.message, status: error.status });
  }
}

async function detail(req, res) {
  try {
    const project_id = req.params.projectId;
    if (!project_id) {
      const error = new Error("project id is required");
      error.status = 400;
      return res
        .status(400)
        .json({ error: error.message, status: error.status });
    }
    
    const project = await projectsService.projectDetail(project_id);
    if (!project) {
      const error = new Error("project not found");
      error.status = 404;
      return res
        .status(404)
        .json({ error: error.message, status: error.status });
    }

    res.status(200).json({ status: 200, data: project });
  } catch (error) {
    console.log(error);
    res
      .status(error.status)
      .json({ error: error.message, status: error.status });
  }
}

module.exports = { create, listBySupervisor, detail };
