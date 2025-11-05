const projectsService = require("../services/projectsService");

async function create(req, res) {
  try {
    const { name, description, supervisor_id } = req.body;
    
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: 'name, description and supervisor_id requireds' });
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
    res.status(error.code).json({ error: error.message, code: error.code });
  }
}

async function listBySupervisor(req, res) {
  try {
    const supervisor_id = req.params.supervisorId;
    let order_by = req.query.order_by;
    const projects = await projectsService.listProject({ supervisor_id, order_by });
    if (!projects) {
      const error = new Error("no projects found");
      error.code = 404;
      return res.status(404).json({ error: error.message, code: error.code });
    }
    
    res.status(200).json(projects);
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ error: error.message, code: error.code });
  }
}

module.exports = { create, listBySupervisor };
