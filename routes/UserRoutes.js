const express = require("express");
const router = express.Router();

const userController = require('../controllers/UserController');

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/update-user', userController.UpdateUser);

module.exports = router;