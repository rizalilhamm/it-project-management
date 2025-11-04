const projectsRepo = require('../repositories/projectsRepository');
const usersRepo = require('../repositories/usersRepository');

async function createProject(data) {
    const user = await usersRepo.findById(data)

    if (user.role != 'supervisor') {
        throw new Error('user not allowed to create ')
    }

    const prjCreated = await projectsRepo.create(data)
    return prjCreated
}

module.exports = { createProject };