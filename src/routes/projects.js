const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/projectsController');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/', authMiddleware, requireRole('supervisor'), ctrl.create);

module.exports = router;