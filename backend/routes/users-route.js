const express = require('express');
const {check} = require('express-validator');

const userscontrollers = require("../controllers/users-controllers");

const router = express.Router();

router.get('/',userscontrollers.getUsers);
router.get('/:uid',userscontrollers.profileById);
router.get('/orders/by/user/:uid',userscontrollers.purchaseHistory);

router.post('/signup',check("name").not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({min:6}),userscontrollers.signup);
router.post('/login',userscontrollers.login);

router.patch("/:uid",userscontrollers.updateprofile)

module.exports = router;