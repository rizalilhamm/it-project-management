const projectsService = require('../services/projectsService');


async function create(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            return res.status(400).json({error: 'missing required payload'})
        }
        const createdProject = await projectsService.createProject({
            name: name,
            description: description
        });
        
        if (!createdProject) {
            return res.status(400).json({error: 'project not created'})
        }
        
        res.status(201).json(createdProject);

    } catch(error) {
        res.status(error.code).json({ error: error.message, code: error.code });
        
    }
}

module.exports = {create}