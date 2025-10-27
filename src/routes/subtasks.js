const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/subtasksController');
const { authMiddleware } = require('../middleware/auth');

router.post('/', authMiddleware, ctrl.create);
router.get('/', authMiddleware, ctrl.list);
router.get('/:id', authMiddleware, ctrl.get);
router.patch('/:id/status', authMiddleware, ctrl.updateStatus);
router.put('/:id', authMiddleware, ctrl.update);
router.delete('/:id', authMiddleware, ctrl.remove);

module.exports = router;
