const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/userController');

router.get('/detail/:user_id', ctrl.detail);
router.put('/detail/:user_id', ctrl.update);

module.exports = router;
