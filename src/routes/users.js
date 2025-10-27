const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/usersController');
const { authMiddleware } = require('../middleware/auth');

router.get('/me', authMiddleware, ctrl.me);
router.get('/', authMiddleware, ctrl.list);
router.get('/:id', authMiddleware, ctrl.get);

module.exports = router;
