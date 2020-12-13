const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")
const userscontrollers = require("../controllers/users-controllers");
const {generateToken} = require("../controllers/braintree");


router.get('/braintree/getToken/:userId',generateToken)


module.exports = router;