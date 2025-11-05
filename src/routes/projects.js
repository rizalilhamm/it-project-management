const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectsController');
// const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/create', ctrl.create);
router.get('/:supervisorId', ctrl.listBySupervisor);

module.exports = router;