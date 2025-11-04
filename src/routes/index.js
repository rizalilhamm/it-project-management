const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/users', require('./users'));
// router.use('/projects', require('./projects'));
// router.use('/tasks', require('./tasks'));
// router.use('/subtasks', require('./subtasks'));

module.exports = router;
