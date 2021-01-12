const express = require('express');
const {check} = require('express-validator');
const fileUpload = require('../middleware/file-upload')
const userscontrollers = require("../controllers/users-controllers");

const router = express.Router();

router.get('/',userscontrollers.getUsers);
router.get('/:uid',userscontrollers.profileById);
router.get('/orders/by/user/:uid',userscontrollers.purchaseHistory);
router.get("/images/name/search",userscontrollers.artistSearch)
router.post('/signup',fileUpload.single('prof'),check("name").not().isEmpty(),check('email').normalizeEmail().isEmail(),check('password').isLength({min:6}),userscontrollers.signup);
router.post('/login',userscontrollers.login);
router.put("/following/:uid/",userscontrollers.updateFollowing)
router.put("/followers/:uid/",userscontrollers.updateFollowers)
router.patch("/:uid",userscontrollers.updateprofile)

module.exports = router;