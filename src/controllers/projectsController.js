const projectsService = require('../services/projectsService');


async function create(req, res) {
    try {
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({error: 'missing required payload'})
        }
        const createdProject = await projectsService.createProject({
            name: name,
            description: description
        });
    } catch {
        console.error(err);
        res.status(err.code).json({ error: err.message, code: err.code });
    }
}

module.exports = {create}