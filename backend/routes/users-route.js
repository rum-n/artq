const express = require('express');

const userscontrollers = require("../controllers/users-controllers");

const router = express.Router();

router.get('/',userscontrollers.getUsers);


router.post('/signup',userscontrollers.signup);

router.post('/login',userscontrollers.login);



module.exports = router;