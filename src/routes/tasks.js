const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/tasksController');
const { authMiddleware, requireRole } = require('../middleware/auth');

router.post('/', authMiddleware, requireRole('supervisor'), ctrl.create);
router.get('/', authMiddleware, ctrl.list);
router.get('/:id', authMiddleware, ctrl.get);
router.put('/:id', authMiddleware, requireRole('supervisor'), ctrl.update);
router.delete('/:id', authMiddleware, requireRole('supervisor'), ctrl.remove);

module.exports = router;
