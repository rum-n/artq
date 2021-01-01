const express = require('express');
const router = express.Router();
const checkAuth = require("../middleware/check-auth")
const userscontrollers = require("../controllers/users-controllers");
const {generateToken,processPayment} = require("../controllers/braintree");

router.get('/braintree/getToken/:userId',generateToken)
router.post('/braintree/payment/:userId',processPayment)

module.exports = router;