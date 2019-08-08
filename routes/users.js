var express = require('express');
var router = express.Router();

const User = require('../models/user');
const userController = require('../controllers/userController')

/* GET users listing. */
router.get('/', userController.listUser);

router.get('/register', userController.registerGet);

router.get('/login',userController.loginGet);

router.get('/logout', userController.logout)

router.get('/update', userController.updateAccount)

/* POST users listing. */
router.post('/register', userController.createUser);

router.post('/login', userController.loginPost);

router.post('/update', userController.updateUser);


module.exports = router;
